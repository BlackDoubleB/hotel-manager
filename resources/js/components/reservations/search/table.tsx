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
import { dataReservationEdit, reservationColumnsHeader, ReservationProps } from "@/types";
import clsx from "clsx";
import { memo } from "react";

type SearchTableProps = {
    dataHeader: reservationColumnsHeader[];
    reservationsData: ReservationProps["reservationsData"];
    viewReserv: (id: number, action: "view" | "edit") => void;
};

const SearchTable = memo(function SearchTable({
    dataHeader,
    reservationsData,
    viewReserv
}: SearchTableProps) {
    return (
        <div className="w-full bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
                <Table className="w-full text-sm text-left">
                    <TableCaption className="pb-4 text-zinc-500">A list of your recent reservations.</TableCaption>
                    <TableHeader className="bg-zinc-50/50">
                        <TableRow className="border-b border-gray-100 hover:bg-transparent">
                            {dataHeader.map(function (item) {
                                return (
                                    <TableHead
                                        className={clsx(
                                            "py-4 px-4 font-semibold text-gray-700 whitespace-nowrap",
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
                                <TableRow
                                    key={item.id}
                                    className="border-b border-zinc-100 hover:bg-zinc-50/80 transition-colors duration-200"
                                >
                                    <TableCell className="py-3 px-4 text-zinc-900 font-medium">{item.customer}</TableCell>
                                    <TableCell className="py-3 px-4 text-zinc-600">{item.user_name}</TableCell>
                                    <TableCell className="py-3 px-4 text-zinc-600">{item.reservation_date}</TableCell>
                                    <TableCell className="py-3 px-4 text-zinc-600">{item.start_time}</TableCell>
                                    <TableCell className="py-3 px-4 text-zinc-600">{item.end_time}</TableCell>
                                    <TableCell className="py-3 px-4">
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100">
                                            {item.payment_status}
                                        </span>
                                    </TableCell>
                                    <TableCell className="py-3 px-4">
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-100">
                                            {item.reservation_status}
                                        </span>
                                    </TableCell>
                                    <TableCell className="py-3 px-4">
                                        <div className="flex gap-2 justify-center">
                                            <Button
                                                onClick={() => viewReserv(item.id, "view")}
                                                size="sm"
                                                className="cursor-pointer bg-blue-500 hover:bg-blue-600 text-zinc-50 border border-blue-600 shadow-sm transition-colors duration-200"
                                            >
                                                <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                                                </svg>
                                                View
                                            </Button>
                                            <Button
                                                onClick={() => viewReserv(item.id, "edit")}
                                                size="sm"
                                                className="cursor-pointer bg-orange-500 hover:bg-orange-600 text-white border border-orange-600 shadow-sm transition-colors duration-200"
                                            >
                                                <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                                                </svg>
                                                Edit
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
)

export default SearchTable;