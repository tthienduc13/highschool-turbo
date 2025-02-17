"use client";

import { useRecommendedDataQuery } from "@highschool/react-query/queries";

import { Activities } from "./activities";
import { FinishProfile } from "./finish-profile";
import { RecentView } from "./recent-view";
import { RecommendCourse } from "./recommend-course";
import { RecommendDocument } from "./recommend-document";
import { RecommendFlashcard } from "./recommend-flashcard";
import { TopFlascard } from "./top-flashcard";

import { useMe } from "@/hooks/use-me";
import { Container } from "@/components/core/layouts/container";
import { WithFooter } from "@/components/core/common/with-footer";

function HomeModule() {
  const me = useMe();
  const { data, isLoading } = useRecommendedDataQuery(
    me?.roleName?.toLocaleLowerCase() === "student",
  );

  if (isLoading || me?.roleName?.toLocaleLowerCase() === "teacher") {
    return (
      <WithFooter>
        <Container className="flex flex-col gap-12" maxWidth="7xl">
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
      <Container className="flex flex-col gap-12" maxWidth="7xl">
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
