import { dataReservation } from "@/types";
import clsx from "clsx";

type ModalViewProps = {
    dataReservationId: undefined | dataReservation ;
    openView:boolean;
    setOpenView: (setOpenView: boolean) => void;

}
export default function ModalView ({dataReservationId,openView,setOpenView}:ModalViewProps) {
    return (
        <div
            // pointer-events-none: permite que los hermanos capturen click(ademas de continuar propagacion a su padre) pero el que lo tiene(incluido hijos) no.
            // pointer-events-auto: permite que solo el elemento que lo tiene capture click y no sus hermanos.(continua propagacion con su padre)
            // opacity: un overlay con opacity-0 puede “estar invisible” pero igual bloquear.
            // Si no hay index el ultimo se pone por encima.
            className={clsx(
                "fixed inset-0 h-screen flex items-center justify-center bg-deep-koamaru-1400/40 backdrop-blur-xs px-4",
                openView
                    ? "opacity-100 scale-100 pointer-events-auto z-10"
                    : "opacity-0 scale-95 pointer-events-none ",
            )}
        >
            <div
                className={clsx(
                    "w-full max-w-md rounded-xl  shadow-2xl border border-white/10 overflow-hidden transition ease-in-out duration-100  bg-deep-koamaru-900 ",
                    openView ? "scale-100" : "scale-0",
                )}
                role="dialog"
                aria-modal="true"
            >
                {/* Header */}
                <div className="flex items-center justify-between border-b border-white/10 px-6 py-4 bg-deep-koamaru-900/90 text-white">
                    <h2 className="text-lg font-semibold">Reservation</h2>

                    <button
                        className="rounded-md bg-red-500 px-3 py-1 text-sm font-medium hover:bg-red-600 transition cursor-pointer"
                        onClick={() => setOpenView(false)}
                        aria-label="Close modal"
                    >
                        X
                    </button>
                </div>

                {/* Content */}
                <div className="px-6 py-5 space-y-4 bg-deep-koamaru-100 text-black">
                    <div className="flex justify-between border-b border-black/5 pb-2">
                        <p className="text-sm">Id</p>
                        <p className="text-sm font-medium">
                            {dataReservationId?.id}
                        </p>
                    </div>
                    <div className="flex justify-between border-b border-black/5 pb-2">
                        <p className="text-sm">Customer</p>
                        <p className="text-sm font-medium">
                            {dataReservationId?.customer}
                        </p>
                    </div>
                    <div className="flex justify-between border-b border-black/5 pb-2">
                        <p className="text-sm">Date</p>
                        <p className="text-sm font-medium">
                            {dataReservationId?.reservation_date}
                        </p>
                    </div>
                    <div className="flex justify-between border-b border-black/5 pb-2">
                        <p className="text-sm">Start Time</p>
                        <p className="text-sm font-medium">
                            {dataReservationId?.start_time}
                        </p>
                    </div>
                    <div className="flex justify-between border-b border-black/5 pb-2">
                        <p className="text-sm">End Time</p>
                        <p className="text-sm font-medium">
                            {dataReservationId?.end_time}
                        </p>
                    </div>
                    <div className="flex justify-between border-b border-black/5 pb-2">
                        <p className="text-sm">Payment Status</p>
                        <p className="text-sm font-medium">
                            {dataReservationId?.payment_status}
                        </p>
                    </div>
                    <div className="flex opacity-95 justify-between border-b border-black/5 pb-2">
                        <p className="text-sm">Reservation Status</p>
                        <p className="text-sm font-medium">
                            {dataReservationId?.reservation_status}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
