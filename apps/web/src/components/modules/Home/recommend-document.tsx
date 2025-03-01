"use client";

import { Document } from "@highschool/interfaces";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@highschool/ui/components/ui/carousel";
import { useEffect, useState } from "react";
import { useAuthorsQuery } from "@highschool/react-query/queries";

import { Wrapper } from "./wrapper";

import { DocumentCard } from "@/components/core/common/document-card";

interface RecommendDocumentProps {
  data: Document[];
}

export const RecommendDocument = ({ data }: RecommendDocumentProps) => {
  const [userIds, setUserIds] = useState<string[]>([]);

  const { data: user, isLoading: userLoading } = useAuthorsQuery({ userIds });

  useEffect(() => {
    if (data) {
      const uniqueUserIds = Array.from(
        new Set(
          data.map((document: { createdBy: string }) => document.createdBy),
        ),
      );

      setUserIds(uniqueUserIds);
    }
  }, [data]);

  if (!data) {
    return;
  }

  return (
    <Wrapper title="Tài liệu tham khảo">
      <div className="group w-full">
        <Carousel
          className="w-full px-4"
          opts={{
            dragFree: true,

            align: "start",
          }}
        >
          <CarouselContent>
            {data?.map((document) => {
              const matchedUser = user?.find(
                (user) => user.id === document.createdBy,
              );

              return (
                <CarouselItem
                  key={document.id}
                  className="md:basis-1/2 lg:basis-1/4"
                >
                  <div className="py-4">
                    <DocumentCard
                      data={document}
                      user={{
                        fullname: matchedUser?.fullname!,
                        image: matchedUser?.profilePicture!,
                      }}
                      userLoading={userLoading}
                      onRemove={() => {}}
                    />
                  </div>
                </CarouselItem>
              );
            })}
          </CarouselContent>
          <CarouselPrevious
            className="left-0 hidden group-hover:flex"
            style={{
              zIndex: 10000,
            }}
          />
          <CarouselNext
            className="right-0 hidden group-hover:flex"
            style={{
              zIndex: 10000,
            }}
          />
        </Carousel>
      </div>
    </Wrapper>
  );
};
