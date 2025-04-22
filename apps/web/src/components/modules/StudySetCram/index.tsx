"use client";

import { useParams } from "next/navigation";
import { useEffect } from "react";
import { CORRECT, INCORRECT } from "@highschool/lib/constants";

import { HydrateSetData } from "../StudySet/hydrate-set-data";

import { CreateCramData } from "./create-cram-data";

import { Container } from "@/components/core/layouts/container";
import { useCramContext } from "@/stores/use-study-set-cram-store";
import { InteractionCard } from "@/components/core/study-set-cram/interaction-card";
import { ActionBar } from "@/components/core/study-set-cram/action-bar";
import { TitleBar } from "@/components/core/study-set-cram/title-bar";
import { useContainerContext } from "@/stores/use-container-store";
import { CompletedView } from "@/components/core/study-set-cram/completed-view";
import { RoundSummary } from "@/components/core/study-set-cram/round-sumary";
import { LearnLoading } from "@/components/core/common/learn-loading";

function StudySetCramModule() {
  const { slug } = useParams();

  return (
    <HydrateSetData
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
      <CreateCramData>
        <Container className="md:mt-10" maxWidth="4xl">
          <div className="flex flex-col gap-8">
            <TitleBar />
            <CramContainer />
          </div>
        </Container>
        <ActionBar />
      </CreateCramData>
    </HydrateSetData>
  );
}

const CramContainer = () => {
  const extendedFeedbackBank = useContainerContext(
    (s) => s.extendedFeedbackBank,
  );
  const completed = useCramContext((s) => s.completed);
  const roundSummary = useCramContext((s) => s.roundSummary);
  const setFeedbackBank = useCramContext((s) => s.setFeedbackBank);

  useEffect(() => {
    if (!extendedFeedbackBank) setFeedbackBank(CORRECT, INCORRECT);
  }, [extendedFeedbackBank, setFeedbackBank]);

  if (completed) return <CompletedView />;
  if (roundSummary) return <RoundSummary />;

  return <InteractionCard />;
};

export default StudySetCramModule;
