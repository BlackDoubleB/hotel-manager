import MainLayout from "@/Layouts/MainLayout";
import { router, usePage } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCallback, useMemo, useState } from "react";
import SearchTable from "@/components/reservations/search/table";
import { dataReservation, PagePropsAuth, ReservationProps } from "@/types";
import PaginationButton from "@/components/reservations/search/buttonPagination";
import ModalView from "@/components/reservations/search/modalView";

function ReservationSearch() {
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
    //     id: 0,
    //     user_id: 0,
    //     payment_id: 0,
    //     payment_status_id: 0,
    //     reservation_status_id: 0,
    //     room_id: 0,
    //     customer: "",
    //     reservation_date: "",
    //     start_time: "",
    //     end_time: "",
    //     user_name: "",
    //     payment_amount: 0,
    //     payment_status: "",
    //     reservation_status: "",
    //     room_number: 0,
    // };
    const [dataReservationId, setDataReservationId] = useState<
        dataReservation | undefined
    >(undefined);
    const [openView, setOpenView] = useState(false);

    function changePage(page: number) {
        router.get(
            "/reservation/search",
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

        if (!status_reserv) return;

        const convertMin = status_reserv.toLocaleLowerCase();
        setPagesInterfaz([...pages]);
        router.get(
            "/reservation/search",
            { reservation_status: convertMin },
            { preserveScroll: true, preserveState: true },
        );
    }

    const viewReserv = useCallback(async function ViewReserv(id: number) {
        const res = await fetch(`/reservation/search/${id}`, {
            method: "GET",
            mode: "cors",
            cache: "no-cache",
            credentials: "same-origin",
        });

        if (!res.ok) throw new Error("Error en la respuesta");
        const valor = await res.json();
        setDataReservationId(valor.reservationDataId[0]);
        setOpenView(true);
    }, []);

    const editReserv = useCallback(async function EditReserv(id: number) {
        const res = await fetch(`/reservation/edit/${id}`, {
            method: "GET",
            mode: "cors",
            cache: "no-cache",
            credentials: "same-origin",
        });

        if (!res.ok) throw new Error("Error en la respuesta");
        const valor = await res.json();
        setDataReservationId(valor.reservationDataId[0]);
        setOpenView(true);
    }, []);

    
    return (
        <div className="p-5 space-y-5 bg-deep-koamaru-50 mx-10 shadow-md">
            <div className="border-b border-deep-koamaru-100 pb-5">
                <h1 className="text-gray-950"> {title[0].label}</h1>
            </div>
            <Button type="button" variant="outline">
                New Reservation
            </Button>
            <div className="flex justify-between">
                <div className="flex w-fit gap-2">
                    <Input
                        type="text"
                        placeholder="Reservation ID"
                        value={valueFilter}
                        onChange={(e) => setValueFilter(e.target.value)}
                    />
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => filterPage()}
                    >
                        Search
                    </Button>
                </div>
            </div>

            <SearchTable
                dataHeader={reservationColumns}
                reservationsData={reservationsData}
                viewReserv={viewReserv}
            />
            <PaginationButton
                pagesInterfaz={pagesInterfaz}
                reservationsData={reservationsData}
                changePage={changePage}
            />
            <ModalView
                dataReservationId={dataReservationId}
                openView={openView}
                setOpenView={setOpenView}
            />
        </div>
    );
}

ReservationSearch.layout = (page: React.ReactNode) => (
    <MainLayout title="New Reservation | Hotel Manager" children={page} />
);

export default ReservationSearch;
