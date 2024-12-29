"use client";

import { useEffect, useState } from "react";

import {
  useAuthorsQuery,
  useTopFlashcardQuery,
} from "@highschool/react-query/queries";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@highschool/ui/components/ui/carousel";

import { StudySetCard } from "@/components/core/common/study-set-card";

import { Wrapper } from "./wrapper";

export const TopFlascard = () => {
  const [userIds, setUserIds] = useState<string[]>([]);
  const {
    data,
    isLoading: flashcardLoading,
    isSuccess,
    error: flashcardError,
  } = useTopFlashcardQuery();
  const { data: user, isLoading: userLoading } = useAuthorsQuery({ userIds });

  useEffect(() => {
    if (isSuccess) {
      const uniqueUserIds = Array.from(
        new Set(data.map((flashcard: { userId: string }) => flashcard.userId)),
      );
      setUserIds(uniqueUserIds);
    }
  }, [isSuccess]);

  const isLoading = flashcardLoading;

  if (isLoading) {
    return;
  }

  if (flashcardError) {
    return;
  }

  return (
    <Wrapper title="Bộ thẻ ghi nhớ nổi bật">
      <div className="group w-full">
        <Carousel
          opts={{
            dragFree: true,

            align: "start",
          }}
          className="w-full px-4"
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
                      studySet={flashcard}
                      numTerms={flashcard.numberOfFlashcardContent}
                      userLoading={userLoading}
                      user={{
                        fullname: matchedUser?.fullname!,
                        image: matchedUser?.profilePicture!,
                      }}
                      onRemove={() => {}}
                    />
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
