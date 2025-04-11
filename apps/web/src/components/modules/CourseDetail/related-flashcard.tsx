import { FlashcardAttachToType } from "@highschool/interfaces";
import { useInifiniteFlashcard } from "@highschool/react-query/queries";
import { Skeleton } from "@highschool/ui/components/ui/skeleton";
import { useCallback, useMemo, useRef } from "react";

import { StudySetCard } from "@/components/core/common/study-set-card";

interface RelatedFlashcardProps {
  courseId: string;
}

export const RelatedFlashcard = ({ courseId }: RelatedFlashcardProps) => {
  const observer = useRef<IntersectionObserver>(null);

  const { data, error, fetchNextPage, hasNextPage, isFetching, isLoading } =
    useInifiniteFlashcard({
      pageSize: 6,
      entityId: courseId,
      flashcardType: FlashcardAttachToType.Subject,
    });

  const lastElementRef = useCallback(
    (node: HTMLDivElement) => {
      if (isLoading) return;

      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetching) {
          fetchNextPage();
        }
      });

      if (node) observer.current.observe(node);
    },
    [fetchNextPage, hasNextPage, isFetching, isLoading],
  );

  const flashcards = useMemo(() => {
    return data?.pages.reduce<any[]>((acc, page) => {
      return [...acc, ...(page.data || [])];
    }, []);
  }, [data]);

  if (isLoading) {
    return (
      <div className="grid grid-cols-[repeat(auto-fill,_minmax(256px,_1fr))] gap-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <Skeleton key={index} className="h-[120px] w-full" />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-[repeat(auto-fill,_minmax(256px,_1fr))] gap-4">
      {flashcards &&
        flashcards.map((flashcard) => (
          <div key={flashcard.id} ref={lastElementRef}>
            <StudySetCard
              numTerms={flashcard.numberOfFlashcardContent}
              studySet={flashcard}
              user={{
                fullname: "Highschool",
                image: "/logo.svg",
              }}
              userLoading={false}
              onRemove={() => {}}
            />
          </div>
        ))}
    </div>
  );
};
