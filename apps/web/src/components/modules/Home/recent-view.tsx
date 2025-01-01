"use client";

import Link from "next/link";

import { DocumentType } from "@highschool/interfaces";
import { useRecentViewQuery } from "@highschool/react-query/queries";
import { Button } from "@highschool/ui/components/ui/button";
import { Skeleton } from "@highschool/ui/components/ui/skeleton";

import { IconBooks, IconCards, IconFileTypePdf } from "@tabler/icons-react";

import { getRelativeTime } from "@/utils/time";

import { EmptyRecent } from "./empty-recent";
import { Wrapper } from "./wrapper";

export const RecentView = () => {
  const { data, isLoading } = useRecentViewQuery();
  if (isLoading) {
    return (
      <Wrapper title="Xem gần đây">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {[...Array(4)].map((_, index) => (
            <div key={index} className="w-full">
              <div className="flex h-full w-full flex-row gap-4 p-4">
                <Skeleton className="h-10 w-10 rounded-md" />
                <div className="flex flex-1 flex-col justify-start">
                  <Skeleton className="mb-2 h-5 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </Wrapper>
    );
  }

  if (!data?.items.length) {
    return <EmptyRecent />;
  }
  return (
    <Wrapper title={"Xem gần đây"}>
      <div className="grid grid-cols-1 md:grid-cols-2">
        {data?.items.slice(0, 4).map((item) => (
          <Link
            className="w-full"
            key={String(item.time)}
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
              className="group h-full w-full justify-start whitespace-pre-wrap p-4"
            >
              <div className="flex w-full flex-row gap-4">
                <div className="bg-primary/20 text-primary rounded-md p-2">
                  {IconRenderer(item.typeDocument)}
                </div>
                <div className="flex flex-col justify-start">
                  <p className="line-clamp-1 w-full text-start text-sm font-medium">
                    {item.documentName}
                  </p>
                  <p className="text-muted-foreground text-start text-sm">
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
        <IconCards className="ease-cubic-ease !size-6 transition-all duration-100 group-hover:-rotate-3 group-hover:scale-110" />
      );
    case DocumentType.Document:
      return (
        <IconFileTypePdf className="ease-cubic-ease !size-6 transition-all duration-100 group-hover:-rotate-3 group-hover:scale-110" />
      );
    case DocumentType.Subject:
      return (
        <IconBooks className="ease-cubic-ease !size-6 transition-all duration-100 group-hover:-rotate-3 group-hover:scale-110" />
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
      return "Môn học";
    default:
      break;
  }
};
