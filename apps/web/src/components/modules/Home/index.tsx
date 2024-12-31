"use client";

import { WithFooter } from "@/components/core/common/with-footer";
import { Container } from "@/components/core/layouts/container";

import { Activities } from "./activities";
import { FinishProfile } from "./finish-profile";
import { RecentView } from "./recent-view";
import { TopFlascard } from "./top-flashcard";
import { useRecommendedDataQuery } from "@highschool/react-query/queries";
import { RecommendFlashcard } from "./recommend-flashcard";
import { RecommendDocument } from "./recommend-document";
import { RecommendCourse } from "./recommend-course";

function HomeModule() {
  const { data, isLoading } = useRecommendedDataQuery();

  if (isLoading) {
    return (
      <WithFooter>
        <Container maxWidth="7xl" className="flex flex-col gap-12">
          <FinishProfile />
          <RecentView />
          <TopFlascard />
          <Activities />
        </Container>
      </WithFooter>
    );
  }
  return (
    <WithFooter>
      <Container maxWidth="7xl" className="flex flex-col gap-12">
        <FinishProfile />
        <RecentView />
        {data?.subjects && <RecommendCourse data={data?.subjects!} />}
        <TopFlascard />
        <Activities />
        {data?.flashcards && <RecommendFlashcard data={data?.flashcards!} />}
        {data?.documents && <RecommendDocument data={data?.documents!} />}
      </Container>
    </WithFooter>
  );
}
export default HomeModule;
