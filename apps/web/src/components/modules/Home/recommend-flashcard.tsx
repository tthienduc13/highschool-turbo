"use client";

import { useEffect, useState } from "react";
import { Flashcard } from "@highschool/interfaces";
import { useAuthorsQuery } from "@highschool/react-query/queries";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@highschool/ui/components/ui/carousel";

import { Wrapper } from "./wrapper";

import { StudySetCard } from "@/components/core/common/study-set-card";

interface RecommendFlashcardProps {
  data: Flashcard[];
}

export const RecommendFlashcard = ({ data }: RecommendFlashcardProps) => {
  const [userIds, setUserIds] = useState<string[]>([]);
  const { data: users, isLoading: userLoading } = useAuthorsQuery({ userIds });

  useEffect(() => {
    if (data) {
      const uniqueUserIds = Array.from(
        new Set(data.map((flashcard) => flashcard.userId)),
      );

      setUserIds(uniqueUserIds);
    }
  }, [data]);

  if (!data) return null;

  return (
    <Wrapper title="Thẻ ghi nhớ gợi ý">
      <div className="group w-full">
        <Carousel
          className="w-full px-4"
          opts={{ dragFree: true, align: "start" }}
        >
          <CarouselContent>
            {data.map((flashcard) => {
              const matchedUser = users?.find(
                (user) => user.id === flashcard.userId,
              );

              return (
                <CarouselItem
                  key={flashcard.id}
                  className="md:basis-1/2 lg:basis-1/4"
                >
                  <div className="py-4">
                    <StudySetCard
                      numTerms={flashcard.numberOfFlashcardContent}
                      studySet={flashcard}
                      user={{
                        fullname: matchedUser?.fullname ?? "Highschool",
                        image: matchedUser?.profilePicture ?? "/logo.svg",
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
            style={{ zIndex: 10000 }}
          />
          <CarouselNext
            className="right-0 hidden group-hover:flex"
            style={{ zIndex: 10000 }}
          />
        </Carousel>
      </div>
    </Wrapper>
  );
};
