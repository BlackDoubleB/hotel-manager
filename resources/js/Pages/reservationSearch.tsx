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
type SidebarItem = {
    label: string;
    route: string;
    icon: string;
    roles: string[];
};
type PageProps = {
    sidebar: SidebarItem[];
};
type DataHeader = string[]

function ReservationSearch() {
    const { sidebar } = usePage<PageProps>().props;
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
                <div className="flex items-center gap-2">
                    <p>Show</p>
                    <Select>
                        <SelectTrigger className="w-20">
                            <SelectValue placeholder="5" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Fruits</SelectLabel>
                                <SelectItem value="apple">Apple</SelectItem>
                                <SelectItem value="banana">Banana</SelectItem>
                                <SelectItem value="blueberry">
                                    Blueberry
                                </SelectItem>
                                <SelectItem value="grapes">Grapes</SelectItem>
                                <SelectItem value="pineapple">
                                    Pineapple
                                </SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                    <p>registers</p>
                </div>
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
                           return  <TableHead className="w-[100px]" key={item}>{item}</TableHead>;
                        })}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow>
                        <TableCell>INV001</TableCell>
                    </TableRow>
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
