import MainLayout from "@/Layouts/MainLayout";
import { usePage } from "@inertiajs/react";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
type SidebarItem = {
    label: string;
    route: string;
    icon: string;
    roles: string[];
};
type PageProps = {
    sidebar: SidebarItem[];
};
type DataHeader = string[];
type dataReservation = {
    id: number;
    payment_status_id: number;
    payment_id: number;
    user_id: number;
    reservation_status_id: number;
    room_id: 1;
    customer: string;
    reservation_date: string;
    start_time: string;
    end_time: string;
    created_at: string;
    updated_at: string;
};
type ReservationProps = {
    reservationsData: dataReservation[];
};
function ReservationSearch() {
    const { sidebar } = usePage<PageProps>().props;
    const { reservationsData } = usePage<ReservationProps>().props;
    const title = sidebar.filter((item) => item.label === "Search Reservation");
    const dataHeader = [
        "Customer",
        "Admin",
        "Date",
        "Start Time",
        "End Time",
        "Payment Status",
        "Reservation Status",
        "Actions",
    ];

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
                    <Input type="text" placeholder="Reservation ID" />
                    <Button type="button" variant="outline">
                        Search
                    </Button>
                </div>
            </div>
            <Table>
                <TableCaption>A list of your recent invoices.</TableCaption>
                <TableHeader>
                    <TableRow>
                        {dataHeader.map(function (item) {
                            return (
                                item == 'Actions'? <TableHead className="w-[100px] text-center" key={item}>
                                    {item}
                                </TableHead>: <TableHead className="w-[100px]" key={item}>
                                    {item}
                                </TableHead>
                            );
                        })}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {reservationsData.map(function (item) {
                        return (
                            <TableRow key={item.id}>
                                <TableCell>{item.customer}</TableCell>
                                <TableCell>{item.user_id}</TableCell>
                                <TableCell>{item.reservation_date}</TableCell>
                                <TableCell>{item.start_time}</TableCell>
                                <TableCell>{item.end_time}</TableCell>
                                <TableCell>{item.payment_status_id}</TableCell>
                                <TableCell>
                                    {item.reservation_status_id}
                                </TableCell>
                                <div className="flex gap-3 justify-center">
                                    <Button size="sm" className="w-15 bg-deep-koamaru-900/90">View</Button>
                                    <Button size="sm" className="w-15 bg-orange-600">Edit</Button>
                                </div>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
            <Pagination>
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious href="#" />
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink href="#">1</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink href="#" isActive>
                            2
                        </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink href="#">3</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationEllipsis />
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationNext href="#" />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
    );
}

ReservationSearch.layout = (page: React.ReactNode) => (
    <MainLayout title="New Reservation | Hotel Manager" children={page} />
);

export default ReservationSearch;
