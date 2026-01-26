import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { reservationColumnsHeader, ReservationProps } from "@/types";
import clsx from "clsx";

type SearchTableProps = {
    dataHeader: reservationColumnsHeader[];
    reservationsData: ReservationProps["reservationsData"];
    viewReserv: (id: number) => void;
};

export default function SearchTable({
    dataHeader,
    reservationsData,
    viewReserv,
}: SearchTableProps) {
    debugger;
    return (
        <>
            <Table>
                <TableCaption>A list of your recent invoices.</TableCaption>
                <TableHeader>
                    <TableRow>
                        {dataHeader.map(function (item) {
                            return (
                                <TableHead
                                    className={clsx(
                                        "w-[100px]",
                                        item.label == "Actions"
                                            ? "text-center"
                                            : "text-start",
                                    )}
                                    key={item.key}
                                >
                                    {item.label}
                                </TableHead>
                            );
                        })}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {reservationsData.data.map(function (item) {
                        return (
                            <TableRow key={item.id}>
                                <TableCell>{item.customer}</TableCell>
                                <TableCell>{item.user_name}</TableCell>
                                <TableCell>{item.reservation_date}</TableCell>
                                <TableCell>{item.start_time}</TableCell>
                                <TableCell>{item.end_time}</TableCell>
                                <TableCell>{item.payment_status}</TableCell>
                                <TableCell>{item.reservation_status}</TableCell>
                                <div className="flex gap-3 justify-center">
                                    <Button
                                        onClick={() => viewReserv(item.id)}
                                        size="sm"
                                        className="w-15 bg-deep-koamaru-900/90"
                                    >
                                        View
                                    </Button>
                                    {/* <Button
                                        onClick={() => EditReserv(item.id)}
                                        size="sm"
                                        className="w-15 bg-orange-600"
                                    >
                                        Edit
                                    </Button> */}
                                </div>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </>
    );
}
