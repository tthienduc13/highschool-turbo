"use client";

import {
  useRecommendedDataQuery,
  useRecentViewQuery,
  useTopFlashcardQuery,
} from "@highschool/react-query/queries";

import { FinishProfile } from "./finish-profile";
import { RecentView } from "./recent-view";
import { RecommendCourse } from "./recommend-course";
import { RecommendDocument } from "./recommend-document";
import { RecommendFlashcard } from "./recommend-flashcard";
import { TopFlashcard } from "./top-flashcard";

import { useMe } from "@/hooks/use-me";
import { Container } from "@/components/core/layouts/container";
import { WithFooter } from "@/components/core/common/with-footer";
import { GenericCard } from "@/components/core/common/generic-card";

function HomeModule() {
  const me = useMe();
  const isStudent = me?.roleName?.toLocaleLowerCase() === "student";

  const {
    data: recommendedData,
    isLoading: recommendedIsLoading,
    isError: recommendedIsError,
  } = useRecommendedDataQuery(isStudent);

  const {
    data: recentViewData,
    isLoading: recentViewIsLoading,
    isError: recentViewIsError,
  } = useRecentViewQuery();

  const {
    data: topFlashcardData,
    isLoading: topFlashcardIsLoading,
    isError: topFlashcardIsError,
  } = useTopFlashcardQuery();

  const isLoading = recommendedIsLoading || !isStudent || recentViewIsLoading;

  if (isLoading) {
    return (
      <Container maxWidth="7xl">
        <div className="grid grid-cols-[repeat(auto-fill,minmax(256px,1fr))] items-stretch gap-4">
          {Array.from({ length: 16 }).map((_, i) => (
            <div key={i} className="h-[156px]">
              <GenericCard.Skeleton />
            </div>
          ))}
        </div>
      </Container>
    );
  }

  if (me?.roleName?.toLocaleLowerCase() === "teacher") {
    return (
      <WithFooter>
        <Container className="flex flex-col gap-12" maxWidth="7xl">
          <FinishProfile />
          {!recentViewIsError ? (
            <RecentView data={recentViewData} isLoading={recentViewIsLoading} />
          ) : (
            <ErrorSection message="Không thể tải dữ liệu xem gần đây" />
          )}
          {!topFlashcardIsError ? (
            <TopFlashcard
              data={topFlashcardData}
              isLoading={topFlashcardIsLoading}
            />
          ) : (
            <ErrorSection message="Không thể tải flashcard hàng đầu" />
          )}
        </Container>
      </WithFooter>
    );
  }

  return (
    <WithFooter>
      <Container className="flex flex-col gap-12" maxWidth="7xl">
        <FinishProfile />
        {!recentViewIsError ? (
          <RecentView data={recentViewData} isLoading={recentViewIsLoading} />
        ) : (
          <ErrorSection message="Không thể tải dữ liệu xem gần đây" />
        )}

        {!recommendedIsError && recommendedData?.flashcards && (
          <RecommendFlashcard data={recommendedData.flashcards} />
        )}

        {!recommendedIsError && recommendedData?.subjects && (
          <RecommendCourse data={recommendedData.subjects} />
        )}

        {!recommendedIsError && recommendedData?.documents && (
          <RecommendDocument data={recommendedData.documents} />
        )}

        {!topFlashcardIsError ? (
          <TopFlashcard
            data={topFlashcardData}
            isLoading={topFlashcardIsLoading}
          />
        ) : (
          <ErrorSection message="Không thể tải flashcard hàng đầu" />
        )}
      </Container>
    </WithFooter>
  );
}

// Component hiển thị lỗi
const ErrorSection = ({ message }: { message: string }) => {
  return (
    <div className="rounded-md bg-red-50 p-4">
      <p className="text-red-500">{message}. Vui lòng thử lại sau.</p>
    </div>
  );
};

export default HomeModule;
