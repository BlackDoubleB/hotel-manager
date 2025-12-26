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

function ReservationAdd({ numberRoom }: ReservationAddProps) {
    const { auth } = usePage<PageProps>().props;
    const { sidebar } = usePage<SidebarProps>().props;
    const { status_reserv } = usePage<DataStatusReserv>().props;
    const { status_payment } = usePage<DataStatusPayment>().props;
    const { amount_payment } = usePage<DataAmountPayment>().props;
    const title = sidebar.filter((item) => item.label === "New Reservation");

    const [administrator, setAdministrator] = useState("");
    const [open, setOpen] = useState(false);
    const [date, setDate] = useState<Date | undefined>(undefined);
    const [room, setRoom] = useState<string>("");
    const [hourStart, setHourStart] = useState<string>("");
    const [hourEnd, setHourEnd] = useState<string>("");
    const [customer, setCustomer] = useState<string>("");
    const [paymentStatus, setPaymentStatus] = useState<string>("");
    const [paymentAmount, setPaymentAmount] = useState<string>("");
    let [dataDateStartAvaible, setDataDateStartAvaible] =
        useState<DataHoursStart>({ hours_start: [] });
    let [dataDateEndAvaible, setDataDateEndAvaible] = useState<DataHoursEnd>({
        hours_end: [],
    });

    const datePicker = new Date();
    const matcher: DateBefore = { before: datePicker };
    const status_interfaz_r = status_reserv[0][1];
    const amount_interfaz_p = amount_payment[0][1];
    useEffect(() => {
        if (auth.user?.name) setAdministrator(auth.user.name);
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

    function createReserv(){
        
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
        <div className="p-5 space-y-5 bg-deep-koamaru-50 mx-10 shadow-md">
            <div className="border-b border-deep-koamaru-100 pb-5">
                <h1 className="text-gray-950"> {title[0].label}</h1>
            </div>
            <form id="reservAddForm" className="grid grid-template-columns-1 md:grid-cols-2 lg:grid-cols-4 gap-4 ">
                <div className="grid w-full max-w-sm items-center gap-3">
                    <Label htmlFor="customer">
                        Customer <span className="text-red-500">*</span>
                    </Label>

                    <Input
                        value={customer}
                        onChange={(e)=>setCustomer(e.target.value)}
                        type="text"
                        id="customer"
                        placeholder="Full Name"
                        className="bg-white"
                    />
                </div>

                <div className="grid w-full max-w-sm items-center gap-3">
                    <Label htmlFor="administrator">Administrator</Label>
                    <Select
                        value={administrator}
                        onValueChange={setAdministrator}
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
                        Reservation Date <span className="text-red-500">*</span>
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
                    <Label htmlFor="room">
                        Room <span className="text-red-500">*</span>
                    </Label>
                    <Select value={room} onValueChange={setRoom} disabled={!date}>
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
                    <Select value={hourEnd} onValueChange={setHourEnd} disabled={!date || !room || !hourStart}  >
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

                <div className="grid w-full max-w-sm items-center gap-3">
                    <Label htmlFor="reserv_status">Reserve Status</Label>
                    <Input
                        type="text"
                        id="reserv_status"
                        placeholder="Customer"
                        className="bg-white"
                        defaultValue={status_interfaz_r}
                        disabled
                    />
                </div>

                <div className="grid w-full max-w-sm items-center gap-3">
                    <Label htmlFor="payment_status">
                        Payment Status <span className="text-red-500">*</span>
                    </Label>
                    <Select onValueChange={setPaymentStatus} value={paymentStatus} >
                        <SelectTrigger>
                            <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                            {status_payment.map(x => {
                                return (
                                    <SelectItem value={x[0].toString()} key={x[0].toString()}>
                                       {x[1]}
                                    </SelectItem>
                                );
                            })}
                        </SelectContent>
                    </Select>
                </div>

                <div className="grid w-full max-w-sm items-center gap-3">
                    <Label htmlFor="payment_amount">Payment Amount</Label>
                    <Input
                        value={paymentAmount}
                        onChange={(e)=>{setPaymentAmount(e.target.value)}}
                        type="text"
                        id="payment_amount"
                        placeholder="Amount"
                        className="bg-white"
                        defaultValue={amount_interfaz_p.toString()}
                        disabled
                    />
                </div>
            </form>

            <div className="flex gap-5">
                <Button type="button" className="w-40 bg-orange-600 rounded-sm shadow-md" form="reservAddForm">
                    Cancelar
                </Button>
                <Button formAction={formAction} type="button" className="w-40 bg-deep-koamaru-900/90 rounded-sm shadow-md" onClick={createReserv} form="reservAddForm">
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
