"use client";

import { getRelativeTime } from "@/utils/time";
import { DocumentType } from "@highschool/interfaces";
import { useRecentViewQuery } from "@highschool/react-query/queries";
import { Button } from "@highschool/ui/components/ui/button";
import { IconBooks, IconCards, IconFileTypePdf } from "@tabler/icons-react";
import { Wrapper } from "./wrapper";
import Link from "next/link";

export const RecentView = () => {
    const { data, isLoading } = useRecentViewQuery();
    if (isLoading) {
        return;
    }

    if (!data?.items.length) {
        return;
    }
    return (
        <Wrapper title={"Xem gần đây"}>
            <div className="grid  md:grid-cols-2 grid-cols-1">
                {data?.items.map((item) => (
                    <Link
                        className="w-full"
                        key={item.idDocument}
                        href={
                            item.typeDocument === DocumentType.Subject
                                ? `/courses/${item.slugDocument}`
                                : item.typeDocument === DocumentType.Flashcard
                                  ? `/study-set/${item.slugDocument}`
                                  : `/document/${item.slugDocument}`
                        }
                        passHref
                    >
                        <Button
                            variant={"ghost"}
                            className="p-4 h-full w-full justify-start group"
                        >
                            <div className="flex flex-row gap-4 w-full">
                                <div className="p-2 bg-primary/20 rounded-md text-primary">
                                    {IconRenderer(item.typeDocument)}
                                </div>
                                <div className="flex flex-col justify-start ">
                                    <p className="text-sm text-start font-medium w-full line-clamp-1 ">
                                        {item.documentName}
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                        {LabelRenderer(item.typeDocument)} •{" "}
                                        {getRelativeTime(new Date(item.time))}
                                    </p>
                                </div>
                            </div>
                        </Button>
                    </Link>
                ))}
            </div>
        </Wrapper>
    );
};

const IconRenderer = (type: DocumentType) => {
    switch (type) {
        case DocumentType.Flashcard:
            return (
                <IconCards className="!size-6 group-hover:scale-110 group-hover:-rotate-3 transition-all duration-100 ease-cubic-ease" />
            );
        case DocumentType.Document:
            return (
                <IconFileTypePdf className="!size-6 group-hover:scale-110 group-hover:-rotate-3 transition-all duration-100 ease-cubic-ease" />
            );
        case DocumentType.Subject:
            return (
                <IconBooks className="!size-6 group-hover:scale-110 group-hover:-rotate-3 transition-all duration-100 ease-cubic-ease" />
            );
        default:
            break;
    }
};

const LabelRenderer = (type: DocumentType) => {
    switch (type) {
        case DocumentType.Flashcard:
            return "Thẻ ghi nhớ";
        case DocumentType.Document:
            return "Tài liệu";
        case DocumentType.Subject:
            return "Khoá học";
        default:
            break;
    }
};
