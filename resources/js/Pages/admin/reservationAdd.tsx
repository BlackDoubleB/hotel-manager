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
import { SidebarProps, PageProps, AmountProps } from "@/types";
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

type Room = {
    id: number;
    room_number: number;
    created_at: string;
    updated_at: string;
};
type ReservationAddProps = {
    numberRoom: Room[];
};

type DataHoursStart = {
    hours_start: string[];
};
type DataHoursEnd = {
    hours_end: string[];
};
type DataStatusReserv = {
    status_reserv: string[];
};

type DataStatusPayment = {
    status_payment: string[];
};

type ItemAmountPayment = [number, number];
type DataAmountPayment = {
    amount_payment: ItemAmountPayment[];
}
function ReservationAdd({ numberRoom }: ReservationAddProps) {
    const { auth } = usePage<PageProps>().props;
    const { sidebar } = usePage<SidebarProps>().props;
    const { status_reserv } = usePage<DataStatusReserv>().props;
    const { status_payment } = usePage<DataStatusPayment>().props;
    const { amount_payment } = usePage<DataAmountPayment>().props;
    const title = sidebar.filter((item) => item.label === "New Reservation");

    const [selected, setSelected] = useState("");
    const [open, setOpen] = useState(false);
    const [date, setDate] = useState<Date | undefined>(undefined);
    const [room, setRoom] = useState<string>("");
    const [hourStart, setHourStart] = useState<string>("");
    const [hourEnd, setHourEnd] = useState<string>("");
    let [dataDateStartAvaible, setDataDateStartAvaible] = useState<DataHoursStart>({ hours_start: [] });
    let [dataDateEndAvaible, setDataDateEndAvaible] = useState<DataHoursEnd>({ hours_end: [] });

    const datePicker = new Date();
    const matcher: DateBefore = { before: datePicker };

    useEffect(() => {
        if (auth.user?.name) setSelected(auth.user.name);
    }, [auth.user?.name]);

    function handleChangeDateTime() {
        const selectDate = { date: date, room: room };
        axios
            .get("/dateStartTime", { params: selectDate })
            .then(function (response) {
                console.log("esto ", response.data);
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
        }
    }, [room, date]);
    console.log("status_payment", status_payment);
console.log("amount_payment", amount_payment);
    return (
        <div className="p-5 space-y-5 bg-deep-koamaru-50 mx-10 shadow-md">
            <div className="border-b border-deep-koamaru-100 pb-5">
                <h1 className="text-gray-950"> {title[0].label}</h1>
            </div>
            {/* <div>ESTO ES ESTATUS {status_reserv}</div> */}
            <div className="grid grid-template-columns-1 md:grid-cols-2 lg:grid-cols-4 gap-4 ">
                <div className="grid w-full max-w-sm items-center gap-3">
                    <Label htmlFor="client">Cliente</Label>
                    <Input type="text" id="client" placeholder="Email" />
                </div>
                <div className="grid w-full max-w-sm items-center gap-3">
                    <Label htmlFor="email">Administrator</Label>
                    <Select
                        value={selected}
                        onValueChange={setSelected}
                        disabled
                    >
                        <SelectTrigger className="disabled:cursor-default">
                            <SelectValue placeholder="Usuario" />
                        </SelectTrigger>

                        <SelectContent>
                            <SelectItem value={auth.user?.name ?? ""}>
                                {auth.user?.name}
                            </SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="flex flex-col gap-3">
                    <Label htmlFor="date" className="px-1">
                        Fecha de la Reserva
                    </Label>
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
                    <Label htmlFor="texto">Room</Label>
                    <Select onValueChange={setRoom}>
                        <SelectTrigger>
                            <SelectValue placeholder="Theme" />
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
                    <Label htmlFor="texto">Hora de Inicio</Label>
                    <Select onValueChange={setHourStart}>
                        <SelectTrigger>
                            <SelectValue placeholder="Theme" />
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
                    <Label htmlFor="texto">Hora Fin</Label>
                    <Select>
                        <SelectTrigger>
                            <SelectValue placeholder="Theme" />
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
                <div className="grid w-full max-w-sm items-center gap-3">
                    <Label htmlFor="texto">Estado de la Reserva</Label>
                    <Select>
                        <SelectTrigger>
                            <SelectValue placeholder="Theme" />
                        </SelectTrigger>
                        <SelectContent>
                            {status_reserv.map((x) => {
                                return (
                                    <SelectItem value={x} key={x}>
                                        {x[1]}
                                    </SelectItem>
                                );
                            })}
                        </SelectContent>
                    </Select>
                </div>

                <div className="grid w-full max-w-sm items-center gap-3">
                    <Label htmlFor="texto">Estado del pago</Label>
                    <Select>
                        <SelectTrigger>
                            <SelectValue placeholder="Theme" />
                        </SelectTrigger>
                        <SelectContent>
                            {status_payment.map((x) => {
                                return (
                                    <SelectItem value={x[0]} key={x[1]}>
                                        {x[1]}
                                    </SelectItem>
                                );
                            })}
                        </SelectContent>
                    </Select>
                </div>
                <div className="grid w-full max-w-sm items-center gap-3">
                    <Label htmlFor="texto">Total a Pagar</Label>
                    <Select>
                        <SelectTrigger>
                            <SelectValue placeholder="Theme" />
                        </SelectTrigger>
                        <SelectContent>
                            {amount_payment.map(([id, amount]) => (
                                <SelectItem value={String(id)} key={id}>
                                    {amount}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </div>
            <div className="flex gap-5">
                <Button className="w-40 bg-orange-600 rounded-sm shadow-md">
                    Cancelar
                </Button>
                <Button className="w-40 bg-deep-koamaru-900/90 rounded-sm shadow-md">
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
