
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { dataReservation, dataReservationEdit, dataReservationEditArray } from "@/types";
import clsx from "clsx";
import { FormEvent,useLayoutEffect, useState } from "react";

type ModalEditProps = {
    dataReservationId: undefined | dataReservation;
    openEdit: boolean;
    setOpenEdit: (setOpenEdit: boolean) => void;
    editReserv: (dataform: dataReservationEdit, dataId: string) => Promise<void>;
    isProcessing: boolean;
    dataReservationEditArray: dataReservationEditArray | undefined;
}

export default function ModalEdit({ dataReservationId, openEdit, setOpenEdit, editReserv, isProcessing, dataReservationEditArray }: ModalEditProps) {
    
    console.count("ModalEdit render");
    const [payment_status, setPayment_status] = useState<string>(() => String(dataReservationId?.payment_status_id ?? ""));
    const [reservation_status, setReservation_status] = useState(() => String(dataReservationId?.reservation_status_id ?? ""));
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!dataReservationId) return;

        const formData = new FormData(e.currentTarget);

        const dataform: dataReservationEdit = {
            payment_status: formData.get("payment_status_id") as string,
            reservation_status: formData.get("reservation_status_id") as string,
        };
        const dataId = dataReservationId.id.toString();
        editReserv(dataform, dataId);
    };

    
    useLayoutEffect(() => {
        if (!openEdit) return;
        if (!dataReservationId) {
            setPayment_status("");
            setReservation_status("");
            return;
        }

        setPayment_status(String(dataReservationId.payment_status_id ?? ""));
        setReservation_status(String(dataReservationId.reservation_status_id ?? ""));
    }, [openEdit, dataReservationId]);

    return (
        <form
            onSubmit={handleSubmit}
            className={clsx(
                " fixed inset-0 h-screen flex items-center justify-center bg-zinc-950/60 backdrop-blur-xs px-4 transition-all duration-300  ease-in-out z-50",
                openEdit
                    ? "opacity-100 pointer-events-auto"
                    : "opacity-0 pointer-events-none ",
            )}
        >
            <div
                className={clsx(
                    "w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden transition-all duration-300 ease-in-out transform",
                    openEdit ? "scale-100 opacity-100 translate-y-0" : "scale-75 opacity-0 translate-y-4",
                )}
                role="dialog"
                aria-modal="true"
            >

                <div className="flex items-center justify-between border-b border-gray-100 px-6 py-5 bg-white text-gray-800">
                    <h2 className="text-xl font-bold text-gray-900">Edit Reservation</h2>
                    <button
                        type="button"
                        className="rounded-full p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                        onClick={() => setOpenEdit(false)}
                        aria-label="Close modal"
                        disabled={isProcessing}
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>
                </div>

                {}
                <div className="px-6 py-6 space-y-5 bg-gray-50/50 text-gray-700">
                    <div className="grid grid-cols-2 gap-4">
                        {
                            dataReservationId?.id ? (
                                <>
                                    <div className="bg-white p-3 rounded-xl border border-gray-100 shadow-sm">
                                        <p className="text-xs text-gray-400 uppercase font-bold tracking-wider mb-1">Id</p>
                                        <p className="text-sm font-semibold text-gray-800">{dataReservationId.id}</p>
                                    </div>
                                    <div className="bg-white p-3 rounded-xl border border-gray-100 shadow-sm">
                                        <p className="text-xs text-gray-400 uppercase font-bold tracking-wider mb-1">Customer</p>
                                        <p className="text-sm font-semibold text-gray-800 truncate" title={dataReservationId.customer}>{dataReservationId.customer}</p>
                                    </div>
                                    <div className="bg-white p-3 rounded-xl border border-gray-100 shadow-sm">
                                        <p className="text-xs text-gray-400 uppercase font-bold tracking-wider mb-1">Date</p>
                                        <p className="text-sm font-semibold text-gray-800">{dataReservationId.reservation_date}</p>
                                    </div>
                                    <div className="bg-white p-3 rounded-xl border border-gray-100 shadow-sm">
                                        <p className="text-xs text-gray-400 uppercase font-bold tracking-wider mb-1">Schedule</p>
                                        <p className="text-sm font-semibold text-gray-800">{dataReservationId.start_time} - {dataReservationId.end_time}</p>
                                    </div>
                                </>
                            ) : (
                                <>
                                    {[...Array(4)].map((_, index) => (
                                        <div key={index} className="bg-white p-3 rounded-xl border border-gray-100 shadow-sm animate-pulse">
                                            <div className="h-3 bg-gray-200 rounded-full w-1/3 mb-2.5"></div>
                                            <div className="h-4 bg-gray-200 rounded-full w-2/3"></div>
                                        </div>
                                    ))}
                                </>
                            )
                        }
                    </div>

                    <div className="space-y-4 pt-2">
                        {}
                        {payment_status ? <>
                            {}
                            <div className="flex flex-col gap-1.5 hidden">
                                <label htmlFor="payment_status_id" className="text-sm font-semibold text-gray-700">
                                    Payment Status
                                </label>
                                <input
                                    type="text"
                                    id="payment_status_id"
                                    name="payment_status_id"
                                    className="w-full rounded-xl border border-zinc-200 px-4 py-2.5 text-sm text-zinc-800 focus:border-zinc-900 focus:ring-4 focus:ring-zinc-900/10 focus:outline-none disabled:bg-zinc-100 disabled:text-zinc-500 transition-all font-medium"
                                    value={payment_status}

                                />
                            </div>

                            {}
                            <div className="grid w-full max-w-sm items-center gap-3">
                                <Label htmlFor="payment_status_id">
                                    Payment Status <span className="text-red-500">*</span>
                                </Label>
                                <input
                                    type="text"
                                    className="hidden"
                                    name="payment_status_id"
                                    value={payment_status}
                                />

                                <Select
                                    value={payment_status}
                                    onValueChange={(value) => setPayment_status(value)}
                                    disabled={isProcessing}
                                >
                                    <SelectTrigger className="h-11 w-full rounded-xl border-zinc-200 focus-visible:border-zinc-400 focus-visible:ring-4 focus-visible:ring-zinc-400/20 shadow-sm transition-all text-zinc-900 bg-white outline-none">
                                        <SelectValue placeholder="Select" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {dataReservationEditArray?.reservationDataEditArray.paymentStatus.map(function (item) {
                                            return (
                                                <SelectItem
                                                    value={item.id.toString()}
                                                    key={item.id.toString()}
                                                >
                                                    {item.payment_status}
                                                </SelectItem>
                                            );
                                        })}
                                    </SelectContent>
                                </Select>
                            </div>
                            {}
                            {}
                            <div className="flex flex-col gap-1.5 hidden">
                                <label htmlFor="reservation_status_id" className="text-sm font-semibold text-gray-700">
                                    Reservation Status
                                </label>
                                <input
                                    type="text"
                                    id="reservation_status_id"
                                    name="reservation_status_id"
                                    className="w-full rounded-xl border border-zinc-200 px-4 py-2.5 text-sm text-zinc-800 focus:border-zinc-900 focus:ring-4 focus:ring-zinc-900/10 focus:outline-none disabled:bg-zinc-100 disabled:text-zinc-500 transition-all font-medium"
                                    value={reservation_status}

                                />
                            </div>
                            {}
                            <div className="grid w-full max-w-sm items-center gap-3">
                                <Label htmlFor="reservation_status_id">
                                    Reservation Status <span className="text-red-500">*</span>
                                </Label>
                                <input
                                    type="text"
                                    className="hidden"
                                    name="reservation_status_id"
                                    value={reservation_status}
                                />

                                <Select
                                    value={reservation_status}
                                    onValueChange={(value) => setReservation_status(value)}
                                    disabled={isProcessing}
                                >
                                    <SelectTrigger className="h-11 w-full rounded-xl border-zinc-200 focus-visible:border-zinc-400 focus-visible:ring-4 focus-visible:ring-zinc-400/20 shadow-sm transition-all text-zinc-900 bg-white outline-none">
                                        <SelectValue placeholder="Select" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {dataReservationEditArray?.reservationDataEditArray.reservationStatus.map(function (item) {
                                            return (
                                                <SelectItem
                                                    value={item.id.toString()}
                                                    key={item.id.toString()}
                                                >
                                                    {item.reservation_status}
                                                </SelectItem>
                                            );
                                        })}
                                    </SelectContent>
                                </Select>
                            </div>
                        </> : (
                            <>
                                <div className="bg-white p-3 rounded-xl border border-gray-100 shadow-sm animate-pulse">
                                    <div className="h-3 bg-gray-200 rounded-full w-1/3 mb-2.5"></div>
                                    <div className="h-4 bg-gray-200 rounded-full w-2/3"></div>
                                </div>
                                <div className="bg-white p-3 rounded-xl border border-gray-100 shadow-sm animate-pulse">
                                    <div className="h-3 bg-gray-200 rounded-full w-1/3 mb-2.5"></div>
                                    <div className="h-4 bg-gray-200 rounded-full w-2/3"></div>
                                </div>
                            </>
                        )}
                    </div>
                </div>

                {}
                <div className="px-6 py-4 bg-white border-t border-zinc-100">
                    <button
                        type="submit"
                        disabled={isProcessing}
                        className="w-full bg-orange-500 text-white rounded-xl py-3 font-semibold hover:bg-orange-600 hover:shadow-md active:scale-[0.98] transition-colors duration-200 border border-orange-600 disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center gap-2"
                    >
                        {isProcessing ? (
                            <>
                                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Saving...
                            </>
                        ) : (
                            "Save Changes"
                        )}
                    </button>
                </div>


            </div>
        </form>
    );
}