import { useEffect, useState } from "react";
import {
  useAuthorsQuery,
  useRelatedFlashcard,
} from "@highschool/react-query/queries";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@highschool/ui/components/ui/carousel";
import { IconRefreshDot } from "@tabler/icons-react";

import { StudySetCard } from "@/components/core/common/study-set-card";

export const RelatedResources = () => {
  const { data: relatedFlashcard } = useRelatedFlashcard();

  const [userIds, setUserIds] = useState<string[]>([]);

  const { data: user, isLoading: userLoading } = useAuthorsQuery({ userIds });

  useEffect(() => {
    if (relatedFlashcard) {
      const uniqueUserIds = Array.from(
        new Set(relatedFlashcard.map((flashcard) => flashcard.userId)),
      );

      setUserIds(uniqueUserIds);
    }
  }, [relatedFlashcard]);

  if (!relatedFlashcard || relatedFlashcard.length === 0) {
    return;
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col justify-between gap-6 md:flex-row">
        <h2 className="text-lg">
          <div className="flex flex-row items-center gap-3 text-2xl font-bold">
            <div className="flex flex-row items-center">
              <IconRefreshDot size={28} />
            </div>
            <p> Mọi người cũng đang học</p>
          </div>
        </h2>
      </div>
      <div className="group w-full rounded-xl bg-gray-100 dark:bg-gray-900/50">
        <Carousel
          className="w-full px-4"
          opts={{
            dragFree: true,
            align: "start",
          }}
        >
          <CarouselContent>
            {relatedFlashcard?.map((flashcard) => {
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
    </div>
  );
};
