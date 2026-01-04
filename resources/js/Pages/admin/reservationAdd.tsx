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

    async function registerReserv(
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

        const xsrf = getCookie("XSRF-TOKEN");
        const headers: HeadersInit = {
            "Content-Type": "application/json",
            Accept: "application/json",
        };

        if (xsrf) {
            headers["X-XSRF-TOKEN"] = decodeURIComponent(xsrf);
        }

        return fetch("/registerReservation", {
            method: "POST",
            credentials: "same-origin",
            headers,
            body: JSON.stringify(form),
        }).then((res) => {
            if (res.ok) {
                return res.json();
            } else return { message: "Ocurrio un error" };
        });
    }

    const [state, formAction] = useActionState(registerReserv, prevState);

    const datePicker = new Date();
    const matcher: DateBefore = { before: datePicker };

    useEffect(() => {
        if (auth.user?.name) setAdministrator(auth.user.name);
    }, [auth.user?.name]);

    function handleChangeDateTime() {
    //    date?.toISOString().slice(0, 10)
        const selectDate = { date: date?.toISOString().slice(0, 10), room: room };
        axios
            .get("/dateStartTime", { params: selectDate })
            .then(function (response) {
                console.log("estooooooooooooo ", response.data);
                
                setDataDateStartAvaible(response.data);
                 
            });
    }
    function handleChangeEndTime() {
        const selectHourStart = {
            hourStartSelected: hourStart,
            listHoursStart: dataDateStartAvaible.hours_start,
        };
        axios
            .get("/dateEndTime", { params: selectHourStart })
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
            console.log("estado");
        }
    }, [room, date]);

    return (
        <div className="p-5 space-y-5 bg-deep-koamaru-50 mx-10 shadow-md">
            <div className="border-b border-deep-koamaru-100 pb-5">
                <h1 className="text-gray-950"> {title[0].label}</h1>
            </div>
            ESTA DATA
            {state.message}
            <form
                id="reservAddForm"
                className="grid grid-template-columns-1 md:grid-cols-2 lg:grid-cols-4 gap-4 "
            >
                <div className="grid w-full max-w-sm items-center gap-3">
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
                        className="bg-white"
                    />
                </div>

                <div className="grid w-full max-w-sm items-center gap-3 pointer-events-none">
                    <Label htmlFor="administrator">Administrator</Label>
                    <Input
                        id="user_id"
                        value={auth.user?.id}
                        name="user_id"
                        type="text"
                        className="hidden"
                    />
                    <Input
                        id="user_id"
                        value={auth.user?.name}
                        type="text"
                        className="opacity-50"
                    />
                </div>

                <div className="flex flex-col gap-3">
                    <Label htmlFor="date" className="px-1">
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
                                className="w-48 justify-between font-normal"
                            >
                                {date
                                    ? date.toLocaleDateString()
                                    : "Select date"}
                                <ChevronDownIcon />
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
                </div>

                <div className="grid w-full max-w-sm items-center gap-3">
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
                        <SelectTrigger>
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
                </div>

                <div className="grid w-full max-w-sm items-center gap-3">
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
                        <SelectTrigger>
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
                </div>

                <div className="grid w-full max-w-sm items-center gap-3">
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
                        <SelectTrigger>
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
                </div>

                <div className="grid w-full max-w-sm items-center gap-3 pointer-events-none">
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
                        className="cursor-auto opacity-50"
                        value={status_reserv[0][1]}
                        readOnly
                    />
                </div>

                <div className="grid w-full max-w-sm items-center gap-3">
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
                        <SelectTrigger id="payment_status_id">
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
                </div>

                <div className="grid w-full max-w-sm items-center gap-3 pointer-events-none">
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
                        className="bg-white opacity-50"
                        readOnly
                    />
                </div>
            </form>
            <div className="flex gap-5">
                <Button
                    type="button"
                    className="w-40 bg-orange-600 rounded-sm shadow-md"
                    form="reservAddForm"
                >
                    Cancelar
                </Button>
                <Button
                    formAction={formAction}
                    type="submit"
                    className="w-40 bg-deep-koamaru-900/90 rounded-sm shadow-md"
                    form="reservAddForm"
                >
                    Guardar Reserva
                </Button>
            </div>
        </div>
    );
}

ReservationAdd.layout = (page: React.ReactNode) => (
    <MainLayout title="New Reservation | Hotel Manager" children={page} />
);

export default ReservationAdd;
