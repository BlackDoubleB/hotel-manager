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
import { ReservationProps } from "@/types";
import { useState } from "react";

type PaginationButtonProps = {
    pagesInterfaz: number[];
    reservationsData: ReservationProps["reservationsData"];
    changePage: (page: number) => void;
};
export default function PaginationButton({
    pagesInterfaz,
    reservationsData,
    changePage,
}: PaginationButtonProps) {
    const [ind, setInd] = useState(1);
    return (
        <Pagination>
            <PaginationContent>
                <PaginationItem>
                    {reservationsData.current_page - 1 == 0 ? (
                        <PaginationPrevious href="#" className="opacity-35" />
                    ) : (
                        <PaginationPrevious
                            href="#"
                            onClick={(e) => {
                                e.preventDefault();
                                setInd(ind - 1);
                                changePage(reservationsData.current_page - 1);
                            }}
                        />
                    )}
                </PaginationItem>

                {pagesInterfaz.map(function (x: number, i: number) {
                    if (i < 3) {
                        return (
                            <PaginationItem key={i}>
                                <PaginationLink
                                    isActive={
                                        reservationsData.current_page == x
                                    }
                                    onClick={(e) => {
                                        e.preventDefault();
                                        changePage(x);
                                    }}
                                >
                                    {x}
                                </PaginationLink>
                            </PaginationItem>
                        );
                    } else return;
                })}

                <PaginationItem>
                    {reservationsData.current_page <
                    reservationsData.last_page ? (
                        <PaginationNext
                            href="#"
                            onClick={(e) => {
                                e.preventDefault();
                                setInd(ind + 1);
                                changePage(reservationsData.current_page + 1);
                            }}
                        />
                    ) : (
                        <PaginationNext href="#" className="opacity-35" />
                    )}
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
}
