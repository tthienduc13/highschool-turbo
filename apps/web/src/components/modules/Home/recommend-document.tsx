"use client";

import { Document } from "@highschool/interfaces";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@highschool/ui/components/ui/carousel";

import { DocumentCard } from "@/components/core/common/document-card";

import { Wrapper } from "./wrapper";

interface RecommendDocumentProps {
  data: Document[];
}

export const RecommendDocument = ({ data }: RecommendDocumentProps) => {
  if (!data) {
    return;
  }

  return (
    <Wrapper title="Tài liệu tham khảo">
      <div className="group w-full">
        <Carousel
          opts={{
            dragFree: true,

            align: "start",
          }}
          className="w-full px-4"
        >
          <CarouselContent>
            {data?.map((document) => {
              return (
                <CarouselItem
                  key={document.id}
                  className="md:basis-1/2 lg:basis-1/4"
                >
                  <div className="py-4">
                    <DocumentCard data={document} />
                  </div>
                </CarouselItem>
              );
            })}
          </CarouselContent>
          <CarouselPrevious
            style={{
              zIndex: 10000,
            }}
            className="left-0 hidden group-hover:flex"
          />
          <CarouselNext
            style={{
              zIndex: 10000,
            }}
            className="right-0 hidden group-hover:flex"
          />
        </Carousel>
      </div>
    </Wrapper>
  );
};
