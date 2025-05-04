import {
  useRecommendedDataQuery,
  useTopFlashcardQuery,
  useZonesQuery,
} from "@highschool/react-query/queries";
import { RecentView as RecentViewType } from "@highschool/interfaces";

import { FinishProfile } from "./finish-profile";
import { RecentView } from "./recent-view";
import { RecommendFlashcard } from "./recommend-flashcard";
import { RecommendCourse } from "./recommend-course";
import { RecommendDocument } from "./recommend-document";
import { TopFlashcard } from "./top-flashcard";
import { ZoneList } from "./zone-list";

import { Container } from "@/components/core/layouts/container";

interface StudentHomeProps {
  recentViewData: RecentViewType;
  isLoading: boolean;
}

export const StudentHome = ({
  recentViewData,
  isLoading,
}: StudentHomeProps) => {
  const { data: recommendedData } = useRecommendedDataQuery(true);

  const { data } = useZonesQuery({
    pageNumber: 1,
    pageSize: 1000,
  });

  const { data: topFlashcardData, isLoading: topFlashcardIsLoading } =
    useTopFlashcardQuery();

  return (
    <Container className="flex flex-col gap-12" maxWidth="7xl">
      <FinishProfile />

      <RecentView data={recentViewData} isLoading={isLoading} />

      <ZoneList data={data?.data ?? []} />

      <RecommendFlashcard data={recommendedData?.flashcards ?? []} />

      <RecommendCourse data={recommendedData?.subjects ?? []} />

      <RecommendDocument data={recommendedData?.documents ?? []} />

      <TopFlashcard data={topFlashcardData} isLoading={topFlashcardIsLoading} />
    </Container>
  );
};
