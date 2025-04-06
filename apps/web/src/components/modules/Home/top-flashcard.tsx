"use client";

import { useEffect, useState } from "react";
import { useAuthorsQuery } from "@highschool/react-query/queries";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@highschool/ui/components/ui/carousel";
import { Flashcard } from "@highschool/interfaces";

import { Wrapper } from "./wrapper";

import { StudySetCard } from "@/components/core/common/study-set-card";

interface TopFlashcardProps {
  data?: Flashcard[];
  isLoading: boolean;
}

export const TopFlashcard = ({ data, isLoading }: TopFlashcardProps) => {
  const [userIds, setUserIds] = useState<string[]>([]);

  const { data: user, isLoading: userLoading } = useAuthorsQuery({ userIds });

  useEffect(() => {
    if (data) {
      const uniqueUserIds = Array.from(
        new Set(data.map((flashcard: { userId: string }) => flashcard.userId)),
      );

      setUserIds(uniqueUserIds);
    }
  }, [data]);

  if (isLoading) {
    return;
  }

  return (
    <Wrapper title="Bộ thẻ ghi nhớ nổi bật">
      <div className="group w-full">
        <Carousel
          className="w-full px-4"
          opts={{
            dragFree: true,

            align: "start",
          }}
        >
          <CarouselContent>
            {data?.map((flashcard) => {
              const matchedUser = user?.find(
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
