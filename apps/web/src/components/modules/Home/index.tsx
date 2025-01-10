"use client";

import { useRecommendedDataQuery } from "@highschool/react-query/queries";

import { WithFooter } from "@/components/core/common/with-footer";
import { Container } from "@/components/core/layouts/container";
import { useMe } from "@/hooks/use-me";

import { Activities } from "./activities";
import { FinishProfile } from "./finish-profile";
import { RecentView } from "./recent-view";
import { RecommendCourse } from "./recommend-course";
import { RecommendDocument } from "./recommend-document";
import { RecommendFlashcard } from "./recommend-flashcard";
import { TopFlascard } from "./top-flashcard";

function HomeModule() {
  const me = useMe();
  const { data, isLoading } = useRecommendedDataQuery(
    me?.roleName?.toLocaleLowerCase() === "student",
  );

  if (isLoading || me?.roleName?.toLocaleLowerCase() === "teacher") {
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
        {data?.flashcards && <RecommendFlashcard data={data?.flashcards!} />}
        {data?.documents && <RecommendDocument data={data?.documents!} />}
        <Activities />
        <TopFlascard />
      </Container>
    </WithFooter>
  );
}
export default HomeModule;
