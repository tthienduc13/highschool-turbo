"use client";

import { useParams } from "next/navigation";

import { HydrateSetData } from "../StudySet/hydrate-set-data";

import { CreateLearnData } from "./create-learn-data";

import { EditorGlobalStyles } from "@/components/core/common/editor-global-style";
import { Container } from "@/components/core/layouts/container";
import { ActionBar } from "@/components/core/study-set-learn/action-bar";
import { Completed } from "@/components/core/study-set-learn/completed";
import { InteractionCard } from "@/components/core/study-set-learn/interaction-card";
import { LearnLoading } from "@/components/core/study-set-learn/learn-loading";
import { RoundSummary } from "@/components/core/study-set-learn/round-summary";
import { TitleBar } from "@/components/core/study-set-learn/title-bar";
import { TermImageLayer } from "@/components/core/study-set/term-image-layer";
import { useLearnContext } from "@/stores/use-study-set-learn-store";

function StudySetLearnModule() {
  const { slug } = useParams();

  return (
    <>
      <EditorGlobalStyles />
      <TermImageLayer />
      <HydrateSetData
        disallowDirty
        withDistractors
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
        <CreateLearnData>
          <Container className="md:mt-10" maxWidth="4xl">
            <div className="flex flex-col gap-8">
              <TitleBar />
              <LearnContainer />
            </div>
          </Container>
          <ActionBar />
        </CreateLearnData>
      </HydrateSetData>
    </>
  );
}

const LearnContainer = () => {
  const completed = useLearnContext((s) => s.completed);
  const roundSummary = useLearnContext((s) => s.roundSummary);

  if (completed) return <Completed />;

  if (roundSummary) return <RoundSummary />;

  return <InteractionCard />;
};

export default StudySetLearnModule;
