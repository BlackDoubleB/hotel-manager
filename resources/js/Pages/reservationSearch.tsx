import MainLayout from "@/Layouts/MainLayout";
import { Link, router, usePage } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCallback, useMemo, useState, useEffect } from "react";
import { CheckCircle2, AlertCircle, X } from "lucide-react";
import SearchTable from "@/components/ui/tableReservatión";
import { dataReservation, dataReservationEdit, dataReservationEditArray, PagePropsAuth, ReservationProps } from "@/types";
import PaginationButton from "@/components/ui/buttonPagination";
import ModalView from "@/components/modals/view";
import { fetchCsrf } from "./Helpers/fetchCsrf";
import ModalEdit from "@/components/modals/edit";
function ReservationSearch() {

    const tokenData = usePage().props;
    const { sidebar } = usePage<PagePropsAuth>().props;
    const { reservationsData } = usePage<ReservationProps>().props;
    const title = sidebar.filter((item) => item.label === "Search Reservation");
    const reservationColumns = [
        { key: "customer", label: "Customer" },
        { key: "admin", label: "Admin" },
        { key: "date", label: "Date" },
        { key: "startTime", label: "Start Time" },
        { key: "endTime", label: "End Time" },
        { key: "paymentStatus", label: "Payment Status" },
        { key: "reservationStatus", label: "Reservation Status" },
        { key: "actions", label: "Actions" },
    ];
    const pages: number[] = useMemo(() => {
        const result: number[] = [];
        for (let i = 1; i <= reservationsData.last_page; i++) {
            result.push(i);
        }
        return result;
    }, [reservationsData.last_page]);

    const [pagesInterfaz, setPagesInterfaz] = useState<number[]>(
        pages.slice(0),
    );
    const [valueFilter, setValueFilter] = useState<string>("");
    const [dataReservationId, setDataReservationId] = useState<dataReservation | undefined>(undefined);
    const [openView, setOpenView] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);

    const [dataReservationEditArray, setDataReservationEditArray] = useState<dataReservationEditArray | undefined>(undefined);

    const [isProcessing, setIsProcessing] = useState(false);
    const [toast, setToast] = useState<{ show: boolean; message: string; type: "success" | "error" | null }>({
        show: false,
        message: "",
        type: null,
    });

    function changePage(page: number) {
        router.get(
            "/reservations",
            {
                ...(valueFilter ? { reservation_status: valueFilter } : {}),
                page,
            },
            { preserveScroll: true, preserveState: true },
        );

        if (page == 1) {
            setPagesInterfaz(pages.slice(page - 1));
        } else if (page == 2) {
            setPagesInterfaz(pages.slice(page - 2));
        } else if (page == 3 && page == reservationsData.last_page) {
            setPagesInterfaz(pages.slice(page - 3, page + 2));
        } else if (page < reservationsData.last_page) {
            setPagesInterfaz(pages.slice(page - 2, page + 3));
        } else if (page == reservationsData.last_page) {
            setPagesInterfaz(pages.slice(page - 3, page));
        }
    }

    function filterPage() {
        const status_reserv = valueFilter.trim();
        const convertMin = status_reserv.toLocaleLowerCase();
        if (status_reserv) {

            setPagesInterfaz([...pages]);
            router.get(
                "/reservations",
                { reservation_status: convertMin },
                { preserveScroll: true, preserveState: true },
            );
        }
        else if (!status_reserv) router.get(
            "/reservations"
        );;
    }


    const viewReserv = useCallback(async function ViewReserv(id: number, action: "view" | "edit") {

        try {
            if (action === "view") {
                const res = await fetchCsrf(`/reservations/${id}`, {
                    method: "GET",
                }, tokenData.csrf_token as string);

                if (!res.ok) throw new Error("Error en la respuesta al buscar detalle");

                const valor = await res.json();
                const reservationId = valor?.reservationDataId?.[0];
                if (!reservationId) throw new Error("No llegó reservationDataId");

                setDataReservationId(reservationId)
                setOpenView(true)
            }

            else if (action === "edit") {
                setOpenEdit(true);
                setDataReservationEditArray(undefined);
                setDataReservationId(undefined);
                const [res, resSearchEdit] = await Promise.all([
                    fetchCsrf(`/reservations/${id}`, {
                        method: "GET",
                    }, tokenData.csrf_token as string),
                    fetchCsrf(`/api/reservations/edit-options`, {
                        method: "GET",
                    }, tokenData.csrf_token as string)
                ]);

                if (!resSearchEdit.ok || !res.ok) throw new Error("Error obteniendo los datos");

                const valor = await res.json();
                const valorEdit: dataReservationEditArray = await resSearchEdit.json();
                const reservationData = valor?.reservationDataId?.[0];

                if (!reservationData) throw new Error("No llegaron los datos de la reservación");

                setDataReservationEditArray(valorEdit);
                setDataReservationId(reservationData);
            }

        } catch (error) {
            console.error(error);
        }

    }, [tokenData.csrf_token]);


    useEffect(() => {
        if (toast.show) {
            const timer = setTimeout(() => setToast((prev) => ({ ...prev, show: false })), 4000);
            return () => clearTimeout(timer);
        }
    }, [toast.show, toast.message, toast.type]);

    const editReserv = useCallback(async function EditReserv(dataform: dataReservationEdit, dataId: string) {
        setIsProcessing(true);
        try {
            const res = await fetchCsrf(`/reservations/${dataId}`, {
                method: "PATCH",
                body: JSON.stringify({
                    payment_status_id: Number(dataform.payment_status),
                    reservation_status_id: Number(dataform.reservation_status)
                }),
                headers: {
                    "Content-Type": "application/json",
                },
            },
                tokenData.csrf_token as string);

            if (!res.ok) {
                const text = await res.json();
                throw new Error(`${text.message}`);
            }
            router.reload({
                only: ['reservationsData'],
                onSuccess: () => {
                    setOpenEdit(false);
                    setToast({ show: true, message: "Reservation updated successfully!", type: "success" });
                },
                onFinish: () => setIsProcessing(false)

            });

        } catch (error: any) {
            setIsProcessing(false);
            setToast({ show: true, message: error?.message || "Something went wrong", type: "error" });
        };

    }, [tokenData.csrf_token]);

    return (
        <div className="w-full h-full p-4 md:p-6 lg:p-8">
            <div className="max-w-7xl mx-auto space-y-8 bg-white p-6 md:p-8 lg:p-10 rounded-[2rem] shadow-sm border border-gray-100">
                { }
                <div
                    className={`fixed bottom-8 right-8 z-[100] transition-all duration-500 transform ease-[cubic-bezier(0.23,1,0.32,1)] ${toast.show
                        ? "translate-y-0 opacity-100 scale-100"
                        : "translate-y-8 opacity-0 scale-90 pointer-events-none"
                        }`}
                >
                    <div className={`relative flex items-center gap-4 px-5 py-4 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-white/10 backdrop-blur-md min-w-[340px] ${toast.type === "error" ? "bg-red-600/95" : "bg-green-600/95"
                        }`}>
                        { }
                        <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-xl bg-white/20">
                            {toast.type === "success" ? (
                                <CheckCircle2 className="h-6 w-6 text-white" />
                            ) : (
                                <AlertCircle className="h-6 w-6 text-white" />
                            )}
                        </div>

                        { }
                        <div className="flex-1 pr-4">
                            <h4 className="text-[12px] font-bold text-white uppercase tracking-wider mb-0.5 opacity-80">
                                {toast.type === "success" ? "Success" : "Error"}
                            </h4>
                            <p className="text-[15px] text-white font-medium leading-tight">
                                {toast.message}
                            </p>
                        </div>

                        { }
                        <button
                            onClick={() => setToast(prev => ({ ...prev, show: false }))}
                            className="bg-white/10 hover:bg-white/20 text-white p-2 rounded-lg transition-all duration-200"
                        >
                            <X className="h-4 w-4" />
                        </button>
                    </div>
                </div>

                { }
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-gray-100 pb-6">
                    <div className="space-y-1">
                        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
                            {title[0]?.label || "Search Reservation"}
                        </h1>
                        <p className="text-sm text-gray-500 font-medium">Manage and view all your hotel reservations.</p>
                    </div>

                    <Button
                        asChild
                        type="button"
                        className="cursor-pointer group flex items-center justify-center bg-white hover:bg-zinc-50 text-zinc-900 border border-zinc-200 rounded-xl px-6 h-11 shadow-sm transition-all duration-300 hover:shadow-md font-semibold"
                    >

                        <Link href="/reservations/create"> New Reservation
                            <span className="relative flex items-center z-10">
                                <svg className="w-5 h-5 mr-2 text-zinc-700 group-hover:text-zinc-900 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
                                </svg>

                            </span>
                        </Link>
                    </Button>
                </div>

                <div className="flex flex-col sm:flex-row justify-between items-center gap-4  p-4">
                    <div className="flex w-full sm:w-auto gap-3">
                        <div className="relative w-full sm:w-80">
                            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                                <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>
                            <Input
                                type="text"
                                placeholder="reservation status..."
                                className="pl-10 h-11 w-full rounded-xl border border-zinc-200 bg-white focus:ring-2 focus:ring-zinc-900 focus:border-zinc-900 shadow-sm transition-all text-zinc-900 placeholder:text-zinc-400"
                                value={valueFilter}
                                onChange={(e) => setValueFilter(e.target.value)}
                            />
                        </div>
                        <Button
                            type="button"
                            onClick={() => filterPage()}
                            className=" group relative overflow-hidden h-11 px-8 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white shadow-md hover:shadow-lg font-semibold flex items-center justify-center border-0 transition-shadow duration-300"
                        >

                            <span className="absolute inset-0 w-full h-full bg-zinc-800 scale-90 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300 ease-out rounded-xl"></span>


                            <span className="relative z-10 flex items-center gap-2">
                                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                                Search
                            </span>
                        </Button>
                    </div>
                </div>

                <div className="space-y-6 pt-2">
                    <SearchTable
                        dataHeader={reservationColumns}
                        reservationsData={reservationsData}
                        viewReserv={viewReserv}
                    />

                    <div className="flex justify-end pt-4">
                        <PaginationButton
                            pagesInterfaz={pagesInterfaz}
                            reservationsData={reservationsData}
                            changePage={changePage}
                        />
                    </div>
                </div>

                <ModalView
                    dataReservationId={dataReservationId}
                    openView={openView}
                    setOpenView={setOpenView}
                />


                <ModalEdit
                    dataReservationId={dataReservationId}
                    openEdit={openEdit}
                    setOpenEdit={setOpenEdit}
                    editReserv={editReserv}
                    isProcessing={isProcessing}
                    dataReservationEditArray={dataReservationEditArray}

                />
            </div>
        </div>
    );
}

ReservationSearch.layout = (page: React.ReactNode) => (
    <MainLayout title="New Reservation | Hotel Manager" children={page} />
);

export default ReservationSearch;
