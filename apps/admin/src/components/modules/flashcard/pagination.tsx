import React from "react";

import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";

interface PaginationListProps {
    page: number;
    setPage: React.Dispatch<React.SetStateAction<number>>;
    totalPages: number;
}

export const PaginationList = ({
    page,
    setPage,
    totalPages,
}: PaginationListProps) => {
    return (
        <div className="flex items-center justify-center gap-2">
            <Pagination>
                <PaginationContent>
                    <PaginationItem>
                        {page > 1 && (
                            <PaginationPrevious onClick={() => setPage(page - 1)} />
                        )}
                    </PaginationItem>
                    <PaginationItem>
                        {Array.from({ length: totalPages > 3 ? 3 : totalPages }, (_, i) => (
                            <PaginationLink
                                key={i}
                                href="#"
                                isActive={page === i + 1}
                                onClick={() => setPage(i + 1)}
                            >
                                {i + 1}
                            </PaginationLink>
                        ))}
                    </PaginationItem>
                    {totalPages > 3 && (
                        <>
                            <PaginationItem>
                                <PaginationEllipsis />
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationLink
                                    key={totalPages}
                                    href="#"
                                    isActive={page === totalPages}
                                    onClick={() => setPage(totalPages)}
                                >
                                    {totalPages}
                                </PaginationLink>
                            </PaginationItem>
                        </>
                    )}

                    <PaginationItem>
                        {page < totalPages && (
                            <PaginationNext onClick={() => setPage(page + 1)} />
                        )}
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
    );
};
