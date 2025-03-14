import { Pagination as PaginationType } from "@highschool/interfaces";
import { News } from "@highschool/interfaces";
import { Button } from "@highschool/ui/components/ui/button";
import { IconArrowRight } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
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

interface ListNewsProps {
    listNews: PaginationType<News[]>;
    page: number;
    setPage: (page: number) => void;
}

export const ListNews = ({ listNews, page, setPage }: ListNewsProps) => {
    const router = useRouter();

    return (
        <>
            {/* Blog Grid */}
            <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {listNews.data.map((post, index) => (
                    <div
                        key={`${post.id}-${index}`}
                        className="border-border group overflow-hidden rounded-lg border bg-white transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
                    >
                        <div className="relative aspect-[16/9] overflow-hidden">
                            <img
                                alt={post.newName}
                                className="size-full object-cover transition-transform duration-200 group-hover:scale-105"
                                src={post.image}
                            />
                        </div>

                        <div className="space-y-4 p-6">
                            <h2 className="group-hover:text-primary line-clamp-2 text-xl font-semibold">
                                {post.newName}
                            </h2>

                            <p className="text-muted-foreground line-clamp-3 h-[12vh]">
                                {post.content}
                            </p>

                            <Button
                                className="h-auto p-0 font-semibold text-blue-600 hover:text-blue-700"
                                variant="link"
                                onClick={() => router.push(`/news-management/${post.slug}`)}
                            >
                                Read more
                                <IconArrowRight className="ml-1 size-4" />
                            </Button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-center gap-2">
                <Pagination>
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious href="#" onClick={() => setPage(page - 1)} />
                        </PaginationItem>
                        <PaginationItem>
                            {Array.from(
                                { length: listNews.totalPages > 3 ? 3 : listNews.totalPages },
                                (_, i) => (
                                    <PaginationLink
                                        key={i}
                                        href="#"
                                        isActive={page === i + 1}
                                        onClick={() => setPage(i + 1)}
                                    >
                                        {i + 1}
                                    </PaginationLink>
                                ),
                            )}
                        </PaginationItem>
                        {listNews.totalPages > 3 && (
                            <>
                                <PaginationItem>
                                    <PaginationEllipsis />
                                </PaginationItem>
                                <PaginationItem>
                                    <PaginationLink
                                        key={listNews.totalPages}
                                        href="#"
                                        isActive={page === listNews.totalPages}
                                        onClick={() => setPage(listNews.totalPages)}
                                    >
                                        {listNews.totalPages}
                                    </PaginationLink>
                                </PaginationItem>
                            </>
                        )}

                        <PaginationItem>
                            <PaginationNext href="#" onClick={() => setPage(page + 1)} />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            </div>
        </>
    );
};

export default ListNews;
