import { dataReservation } from "@/types";
import clsx from "clsx";

type ModalViewProps = {
    dataReservationId: undefined | dataReservation;
    openView: boolean;
    setOpenView: (setOpenView: boolean) => void;

}
export default function ModalView({ dataReservationId, openView, setOpenView }: ModalViewProps) {
    return (
        <div
            // pointer-events-none: permite que los hermanos capturen click(ademas de continuar propagacion a su padre) pero el que lo tiene(incluido hijos) no.
            // pointer-events-auto: permite que solo el elemento que lo tiene capture click y no sus hermanos.(continua propagacion con su padre)
            // opacity: un overlay con opacity-0 puede “estar invisible” pero igual bloquear.
            // Si no hay index el ultimo se pone por encima.
            className={clsx(
                "fixed inset-0 h-screen flex items-center justify-center bg-zinc-950/60 backdrop-blur-xs px-4 transition-opacity duration-300 z-50",
                openView
                    ? "opacity-100 pointer-events-auto"
                    : "opacity-0 pointer-events-none ",
            )}
        >
            <div
                className={clsx(
                    "w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden transition-all duration-300 ease-out transform",
                    openView ? "scale-100 opacity-100 translate-y-0" : "scale-95 opacity-0 translate-y-4",
                )}
                role="dialog"
                aria-modal="true"
            >
                {/* Header */}
                <div className="flex items-center justify-between border-b border-zinc-100 px-6 py-5 bg-white text-zinc-800">
                    <h2 className="text-xl font-bold text-zinc-900">Reservation</h2>

                    <button
                        className="rounded-full p-2 text-zinc-400 hover:text-zinc-600 hover:bg-zinc-100 transition duration-200 cursor-pointer"
                        onClick={() => setOpenView(false)}
                        aria-label="Close modal"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>
                </div>

                {/* Content */}
                <div className="px-6 py-6 space-y-5 bg-zinc-50/50 text-zinc-700">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-white p-3 rounded-xl border border-zinc-100 shadow-sm">
                            <p className="text-xs text-zinc-500 uppercase font-bold tracking-wider mb-1">Id</p>
                            <p className="text-sm font-semibold text-zinc-800">{dataReservationId?.id}</p>
                        </div>
                        <div className="bg-white p-3 rounded-xl border border-zinc-100 shadow-sm">
                            <p className="text-xs text-zinc-500 uppercase font-bold tracking-wider mb-1">Customer</p>
                            <p className="text-sm font-semibold text-zinc-800 truncate" title={dataReservationId?.customer}>{dataReservationId?.customer}</p>
                        </div>
                        <div className="bg-white p-3 rounded-xl border border-zinc-100 shadow-sm">
                            <p className="text-xs text-zinc-500 uppercase font-bold tracking-wider mb-1">Date</p>
                            <p className="text-sm font-semibold text-zinc-800">{dataReservationId?.reservation_date}</p>
                        </div>
                        <div className="bg-white p-3 rounded-xl border border-zinc-100 shadow-sm">
                            <p className="text-xs text-zinc-500 uppercase font-bold tracking-wider mb-1">Schedule</p>
                            <p className="text-sm font-semibold text-zinc-800">{dataReservationId?.start_time} - {dataReservationId?.end_time}</p>
                        </div>
                        <div className="bg-white p-3 rounded-xl border border-zinc-100 shadow-sm">
                            <p className="text-xs text-zinc-500 uppercase font-bold tracking-wider mb-1">Payment</p>
                            <p className="text-sm font-semibold text-zinc-800">{dataReservationId?.payment_status}</p>
                        </div>
                        <div className="bg-white p-3 rounded-xl border border-zinc-100 shadow-sm">
                            <p className="text-xs text-zinc-500 uppercase font-bold tracking-wider mb-1">Status</p>
                            <p className="text-sm font-semibold text-zinc-800">{dataReservationId?.reservation_status}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
