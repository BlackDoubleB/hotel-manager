import clsx from "clsx";
import { CheckCircle2 } from "lucide-react";

export default function ModalRegister({ openModal }: { openModal: boolean }) {
    return (
        <div
            className={clsx(
                "fixed inset-0 z-50 flex items-center justify-center bg-zinc-950/60 backdrop-blur-sm transition-all duration-300 ease-in-out px-4",
                openModal
                    ? "opacity-100 pointer-events-auto"
                    : "opacity-0 pointer-events-none delay-100"
            )}
        >
            <div
                className={clsx(
                    "bg-white rounded-[2rem] shadow-2xl max-w-[400px] w-full p-8 flex flex-col items-center text-center transform transition-all duration-500 ease-out border border-zinc-100",
                    openModal
                        ? "scale-100 translate-y-0 opacity-100 delay-100"
                        : "scale-95 translate-y-8 opacity-0"
                )}
            >
                <div className="w-20 h-20 bg-green-50 rounded-[1.5rem] flex items-center justify-center mb-6 shadow-inner ring-4 ring-green-50/50">
                    <CheckCircle2
                        className="w-10 h-10 text-green-500"
                        strokeWidth={2.5}
                    />
                </div>

                <h2 className="text-2xl font-bold text-zinc-900 mb-2 tracking-tight">
                    Reserva Exitosa
                </h2>
                <p className="text-sm text-zinc-500 leading-relaxed max-w-[280px] mb-8 font-medium">
                    La reserva ha sido guardada correctamente en el sistema.
                </p>

                <button
                    onClick={() => window.location.reload()}
                    type="button"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold h-12 rounded-xl flex items-center justify-center transition-all duration-200 shadow-md shadow-blue-600/20 active:scale-[0.98]"
                >
                    Cerrar
                </button>
            </div>
        </div>
    );
}