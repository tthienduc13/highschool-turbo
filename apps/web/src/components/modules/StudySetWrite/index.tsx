"use client";

import { useParams } from "next/navigation";

import { HydrateWritingData } from "./hydrate-writing-data";

import { Container } from "@/components/core/layouts/container";
import { ActionBar } from "@/components/core/study-set-write/action-bar";
import { TitleBar } from "@/components/core/study-set-write/titlebar";
import { WritingCard } from "@/components/core/study-set-write/writing-card";
import { useWritingContext } from "@/stores/use-study-set-writing-store";
import { Completed } from "@/components/core/study-set-write/completed";
import { LearnLoading } from "@/components/core/common/learn-loading";

function StudySetWriteModule() {
  const { slug } = useParams();

  return (
    <HydrateWritingData
      placeholder={
        <Container className="md:mt-10" maxWidth="4xl">
          <div className="flex w-full flex-col gap-8">
            <TitleBar.Skeleton />
            <LearnLoading />
          </div>
        </Container>
      }
      slug={slug as string}
    >
      <Container maxWidth="4xl">
        <div className="flex flex-col gap-8">
          <TitleBar />
          <WritingContainer />
        </div>
      </Container>
      <ActionBar />
    </HydrateWritingData>
  );
}

const WritingContainer = () => {
  const completed = useWritingContext((s) => s.completed);

  if (completed) {
    return <Completed />;
  }

  return <WritingCard />;
};

export default StudySetWriteModule;
