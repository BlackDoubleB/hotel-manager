import * as React from "react";
import MainLayout from "@/Layouts/MainLayout";
import { usePage } from "@inertiajs/react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
    SidebarProps,
    PageProps,
    AmountProps,
    ReservationAddProps,
    DataStatusReserv,
    DataStatusPayment,
    DataAmountPayment,
    DataHoursStart,
    DataHoursEnd,
} from "@/types";
import { useEffect, useState } from "react";
import { ChevronDownIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { DateBefore } from "react-day-picker";
import axios from "axios";
import { useActionState } from "react";
import { useCallback } from 'react';
import ModalRegister from "@/components/modals/register";

type ReservationFormState = {
    user_id: string;
    room_id: number;
    payment_id: string;
    payment_status_id: string;
    reservation_status_id: string;
    customer: string;
    reservation_date: string;
    start_time: string;
    end_time: string;
};

type RegisterReservationResponse = {
    message: string;
    status?: string;
};
function ReservationAdd({ numberRoom }: ReservationAddProps) {
    const { auth } = usePage<PageProps>().props;
    const { sidebar } = usePage<SidebarProps>().props;
    const { status_reserv } = usePage<DataStatusReserv>().props;
    const { status_payment } = usePage<DataStatusPayment>().props;
    const { payment_id } = usePage<DataAmountPayment>().props;
    const title = sidebar.filter((item) => item.label === "New Reservation");

    const [administrator, setAdministrator] = useState("");
    const [open, setOpen] = useState(false);
    const [date, setDate] = useState<Date | undefined>(undefined);
    const [room, setRoom] = useState<string>("");
    const [hourStart, setHourStart] = useState<string>("");
    const [hourEnd, setHourEnd] = useState<string>("");
    const [customer, setCustomer] = useState<string>("");
    const [paymentStatus, setPaymentStatus] = useState<string>("");
    const [responseProcess, setResponseProcess] = useState<boolean>(true);
    let [dataDateStartAvaible, setDataDateStartAvaible] =
        useState<DataHoursStart>({ hours_start: [] });
    let [dataDateEndAvaible, setDataDateEndAvaible] = useState<DataHoursEnd>({
        hours_end: [],
    });

    const prevState: RegisterReservationResponse = {
        message: " ",
    };
    function getCookie(name: string) {
        return document.cookie
            .split("; ")
            .find((row) => row.startsWith(name + "="))
            ?.split("=")[1];
    }
    const [dataValidate, setDataValidate] = useState<Record<string, string>>({});

    const registerReserv = useCallback(async function registerReserv(
        previos: RegisterReservationResponse,
        formData: FormData
    ): Promise<RegisterReservationResponse> {

        const form: ReservationFormState = {
            customer: formData.get("customer")?.toString() || "",
            user_id: formData.get("user_id")?.toString() || "",
            reservation_date:
                formData.get("reservation_date")?.toString() || "",
            room_id:
                typeof formData.get("room") == "string"
                    ? Number(formData.get("room"))
                    : 0 || 0,
            start_time: formData.get("start_time")?.toString() || "",
            end_time: formData.get("end_time")?.toString() || "",
            reservation_status_id:
                formData.get("reservation_status_id")?.toString() || "",
            payment_status_id:
                formData.get("payment_status_id")?.toString() || "",
            payment_id: formData.get("payment_id")?.toString() || "",
        };

        Object.entries(form).forEach(([key, value]) => {
            if (value.toString().trim() === "" || value === 0) {
                setDataValidate(prev => ({ ...prev, [key]: "Field is required" }));
            }
            if (value.toString().trim() !== "" && value !== 0) {
                setDataValidate(prev => {
                    const newState = { ...prev };
                    delete newState[key];
                    return newState;
                });
            }
        })

        if ((Object.values(form).some(valor => valor === "")) === true) {
            return { message: "An error occurred" };
        }
        setResponseProcess(false);

        const xsrf = getCookie("XSRF-TOKEN");
        const headers: HeadersInit = {
            "Content-Type": "application/json",
            Accept: "application/json",
        };

        if (xsrf) {
            headers["X-XSRF-TOKEN"] = decodeURIComponent(xsrf);
        }

        return fetch("/reservations", {
            method: "POST",
            credentials: "same-origin",
            headers,
            body: JSON.stringify(form),
        }).then(async (res) => {
            if (res.ok) {
                const data = await res.json();
                setTimeout(() => {
                    setResponseProcess(true);
                }, 5000);
                return { ...data, status: "200" };
            } else return { message: "An error occurred" };
        });
    }, [])

    const [state, formAction] = useActionState(registerReserv, prevState);
    const datePicker = new Date();
    const matcher: DateBefore = { before: datePicker };

    useEffect(() => {
        if (auth.user?.name) setAdministrator(auth.user.name);
    }, [auth.user?.name]);

    function handleChangeDateTime() {
        const selectDate = { date: date?.toISOString().slice(0, 10), room: room };
        axios
            .get("/api/reservations/availability/start-time", { params: selectDate })
            .then(function (response) {
                setDataDateStartAvaible(response.data);

            });
    }
    function handleChangeEndTime() {
        const selectHourStart = {
            hourStartSelected: hourStart,
            listHoursStart: dataDateStartAvaible.hours_start,
        };
        axios
            .get("/api/reservations/availability/end-time", { params: selectHourStart })
            .then(function (response) {
                setDataDateEndAvaible(response.data);
            });
    }

    useEffect(() => {
        if (hourStart) {
            handleChangeEndTime();
        }
    }, [hourStart]);

    useEffect(() => {
        if (room.trim() && date !== undefined) {
            handleChangeDateTime();
        }
    }, [room, date]);

    return (
        <div className="w-full h-full p-4 md:p-6 lg:px-8 ">
            <div className="max-w-7xl mx-auto space-y-8 bg-white p-6 md:p-8 lg:p-10 rounded-[2rem] shadow-sm border border-gray-100">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-gray-100 pb-6">
                    <div className="space-y-1">
                        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
                            {title[0]?.label || "New Reservation"}
                        </h1>
                        <p className="text-sm text-gray-500 font-medium">Capture a new reservation quickly and effectively.</p>
                    </div>
                </div>
                <form
                    id="reservAddForm"
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10"
                >
                    <div className="flex flex-col w-full max-w-sm gap-1.5 relative">
                        <Label htmlFor="customer">
                            Customer <span className="text-red-500">*</span>
                        </Label>

                        <Input
                            name="customer"
                            value={customer}
                            onChange={(e) => setCustomer(e.target.value)}
                            type="text"
                            id="customer"
                            placeholder="Full Name"
                            className="h-11 w-full rounded-xl border-zinc-200 focus-visible:border-zinc-400 focus-visible:ring-4 focus-visible:ring-zinc-400/20 shadow-sm transition-all text-zinc-900 bg-white outline-none"
                        />

                        {dataValidate.customer && (
                            <p className="absolute top-full left-0 mt-1 text-red-500 text-[13px] font-medium">
                                {dataValidate.customer}
                            </p>
                        )}
                    </div>

                    <div className="flex flex-col w-full max-w-sm gap-1.5 relative pointer-events-none">
                        <Label htmlFor="administrator">Administrator</Label>
                        <Input
                            id="user_id"
                            value={auth.user?.id}
                            name="user_id"
                            type="text"
                            className="hidden"
                        />
                        <Input
                            id="user_id_display"
                            value={auth.user?.name}
                            type="text"
                            className="h-11 w-full rounded-xl border-dashed border-zinc-300 shadow-none text-zinc-600 bg-zinc-200/60 cursor-not-allowed font-medium opacity-80"
                            readOnly
                        />

                    </div>

                    <div className="flex flex-col w-full max-w-sm gap-1.5 relative">
                        <Label htmlFor="date">
                            Reservation Date <span className="text-red-500">*</span>
                        </Label>
                        <input
                            className="hidden"
                            name="reservation_date"
                            value={date ? date.toISOString().slice(0, 10) : ""}
                        />
                        <Popover open={open} onOpenChange={setOpen}>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    id="date"
                                    className="w-full justify-between font-normal h-11 rounded-xl border-zinc-200 shadow-sm text-zinc-900 hover:bg-zinc-50 hover:text-zinc-900 focus-visible:border-zinc-400 focus-visible:ring-4 focus-visible:ring-zinc-400/20 outline-none transition-all"
                                >
                                    {date
                                        ? date.toLocaleDateString()
                                        : "Select date"}
                                    <ChevronDownIcon className="h-4 w-4 opacity-50" />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent
                                className="w-auto overflow-hidden p-0"
                                align="start"
                            >
                                <Calendar
                                    mode="single"
                                    startMonth={
                                        new Date(
                                            datePicker.getFullYear(),
                                            datePicker.getMonth()
                                        )
                                    }
                                    endMonth={
                                        new Date(
                                            datePicker.getFullYear(),
                                            datePicker.getMonth() + 3
                                        )
                                    }
                                    disabled={matcher}
                                    selected={date}
                                    captionLayout="dropdown"
                                    onSelect={(date) => {
                                        setDate(date);
                                        setOpen(false);
                                    }}
                                />
                            </PopoverContent>
                        </Popover>
                        {dataValidate.reservation_date && (
                            <p className="absolute top-full left-0 mt-1 text-red-500 text-[13px] font-medium">
                                {dataValidate.reservation_date}
                            </p>
                        )}
                    </div>

                    <div className="flex flex-col w-full max-w-sm gap-1.5 relative">
                        <Label htmlFor="room">
                            Room <span className="text-red-500">*</span>
                        </Label>
                        <input
                            type="text"
                            className="hidden"
                            name="room"
                            value={room}
                        />
                        <Select
                            value={room}
                            onValueChange={setRoom}
                            disabled={!date}
                        >
                            <SelectTrigger className="h-11 w-full rounded-xl border-zinc-200 focus-visible:border-zinc-400 focus-visible:ring-4 focus-visible:ring-zinc-400/20 shadow-sm transition-all text-zinc-900 bg-white outline-none">
                                <SelectValue placeholder="Select" />
                            </SelectTrigger>
                            <SelectContent>
                                {numberRoom.map(function (number) {
                                    return (
                                        <SelectItem
                                            value={String(number.id)}
                                            key={String(number.id)}
                                        >
                                            {number.room_number}
                                        </SelectItem>
                                    );
                                })}
                            </SelectContent>
                        </Select>
                        {dataValidate.room_id && (
                            <p className="absolute top-full left-0 mt-1 text-red-500 text-[13px] font-medium">
                                {dataValidate.room_id}
                            </p>
                        )}
                    </div>

                    <div className="flex flex-col w-full max-w-sm gap-1.5 relative">
                        <Label htmlFor="start_time">
                            Start Time <span className="text-red-500">*</span>
                        </Label>
                        <input
                            type="string"
                            name="start_time"
                            value={hourStart}
                            className="hidden"
                        />
                        <Select
                            value={hourStart}
                            onValueChange={setHourStart}
                            disabled={!date || !room}
                        >
                            <SelectTrigger className="h-11 w-full rounded-xl border-zinc-200 focus-visible:border-zinc-400 focus-visible:ring-4 focus-visible:ring-zinc-400/20 shadow-sm transition-all text-zinc-900 bg-white outline-none">
                                <SelectValue placeholder="Select" />
                            </SelectTrigger>
                            <SelectContent>
                                {dataDateStartAvaible.hours_start.map(function (
                                    hour
                                ) {
                                    return (
                                        <SelectItem value={hour} key={hour}>
                                            {hour}
                                        </SelectItem>
                                    );
                                })}
                            </SelectContent>
                        </Select>
                        {dataValidate.start_time && (
                            <p className="absolute top-full left-0 mt-1 text-red-500 text-[13px] font-medium">
                                {dataValidate.start_time}
                            </p>
                        )}
                    </div>

                    <div className="flex flex-col w-full max-w-sm gap-1.5 relative">
                        <Label htmlFor="end_time">
                            End Time <span className="text-red-500">*</span>
                        </Label>
                        <input
                            type="text"
                            name="end_time"
                            value={hourEnd}
                            className="hidden"
                        />
                        <Select
                            value={hourEnd}
                            onValueChange={setHourEnd}
                            disabled={!date || !room || !hourStart}
                        >
                            <SelectTrigger className="h-11 w-full rounded-xl border-zinc-200 focus-visible:border-zinc-400 focus-visible:ring-4 focus-visible:ring-zinc-400/20 shadow-sm transition-all text-zinc-900 bg-white outline-none">
                                <SelectValue placeholder="Select" />
                            </SelectTrigger>
                            <SelectContent>
                                {dataDateEndAvaible.hours_end.map(function (hour) {
                                    return (
                                        <SelectItem value={hour} key={hour}>
                                            {hour}
                                        </SelectItem>
                                    );
                                })}
                            </SelectContent>
                        </Select>
                        {dataValidate.end_time && (
                            <p className="absolute top-full left-0 mt-1 text-red-500 text-[13px] font-medium">
                                {dataValidate.end_time}
                            </p>
                        )}
                    </div>

                    <div className="flex flex-col w-full max-w-sm gap-1.5 relative pointer-events-none">
                        <Label htmlFor="reservation_status_id">
                            Reserve Status
                        </Label>
                        <Input
                            name="reservation_status_id"
                            type="text"
                            className="hidden"
                            value={status_reserv[0][0]}
                        />
                        <Input
                            id="reservation_status_id"
                            type="text"
                            className="h-11 w-full rounded-xl border-dashed border-zinc-300 shadow-none text-zinc-600 bg-zinc-200/60 cursor-not-allowed font-medium opacity-80"
                            value={status_reserv[0][1]}
                            readOnly
                        />
                        {dataValidate.reservation_status_id && (
                            <p className="absolute top-full left-0 mt-1 text-red-500 text-[13px] font-medium">
                                {dataValidate.reservation_status_id}
                            </p>
                        )}
                    </div>

                    <div className="flex flex-col w-full max-w-sm gap-1.5 relative">
                        <Label htmlFor="payment_status_id">
                            Payment Status <span className="text-red-500">*</span>
                        </Label>
                        <input
                            type="text"
                            name="payment_status_id"
                            className="hidden"
                            value={paymentStatus}
                        />
                        <Select
                            onValueChange={setPaymentStatus}
                            value={paymentStatus}
                        >
                            <SelectTrigger id="payment_status_id" className="h-11 w-full rounded-xl border-zinc-200 focus-visible:border-zinc-400 focus-visible:ring-4 focus-visible:ring-zinc-400/20 shadow-sm transition-all text-zinc-900 bg-white outline-none">
                                <SelectValue placeholder="Select" />
                            </SelectTrigger>
                            <SelectContent>
                                {status_payment.map((x) => {
                                    return (
                                        <SelectItem
                                            value={x[0].toString()}
                                            key={x[0].toString()}
                                        >
                                            {x[1]}
                                        </SelectItem>
                                    );
                                })}
                            </SelectContent>
                        </Select>
                        {dataValidate.payment_status_id && (
                            <p className="absolute top-full left-0 mt-1 text-red-500 text-[13px] font-medium">
                                {dataValidate.payment_status_id}
                            </p>
                        )}
                    </div>

                    <div className="flex flex-col w-full max-w-sm gap-1.5 relative pointer-events-none">
                        <Label htmlFor="payment_id">Payment Amount</Label>
                        <Input
                            name="payment_id"
                            value={payment_id[0][0].toString()}
                            type="text"
                            id="payment_id"
                            className="hidden"
                        />
                        <Input
                            value={payment_id[0][1].toString()}
                            type="text"
                            id="payment_id"
                            className="h-11 w-full rounded-xl border-dashed border-zinc-300 shadow-none text-zinc-600 bg-zinc-200/60 cursor-not-allowed font-medium opacity-80"
                            readOnly
                        />

                    </div>
                </form>
                <div className="flex justify-end gap-3 mt-4 pt-4 border-t border-zinc-100">
                    <Button
                        type="button"
                        className="w-40 bg-orange-500 hover:bg-orange-600 text-zinc-100 border border-zinc-200 rounded-xl h-11 shadow-sm font-semibold transition-colors duration-200 cursor-pointer"
                        form="reservAddForm"
                    >
                        Cancel
                    </Button>
                    <Button
                        disabled={!responseProcess}
                        formAction={formAction}
                        type="submit"
                        className="w-40 bg-blue-600 hover:bg-blue-700 text-white rounded-xl h-11 shadow-sm font-semibold transition-colors duration-200 cursor-pointer"
                        form="reservAddForm"
                    >
                        Save Reservation
                    </Button>
                </div>
            </div>
            {state.status === "200" ? (
                <ModalRegister openModal={true} />
            ) : null}
        </div>
    );
}

ReservationAdd.layout = (page: React.ReactNode) => (
    <MainLayout title="New Reservation | Hotel Manager" children={page} />
);

export default ReservationAdd;
