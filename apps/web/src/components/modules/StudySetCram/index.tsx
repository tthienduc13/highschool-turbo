"use client";

import { useParams } from "next/navigation";

import { HydrateSetData } from "../StudySet/hydrate-set-data";

import { CreateCramData } from "./create-cram-data";

import { Container } from "@/components/core/layouts/container";
import { useCramContext } from "@/stores/use-study-set-cram-store";
import { Completed } from "@/components/core/study-set-learn/completed";
import { InteractionCard } from "@/components/core/study-set-cram/interaction-card";
import { ActionBar } from "@/components/core/study-set-cram/action-bar";
import { TitleBar } from "@/components/core/study-set-cram/title-bar";
import { LearnLoading } from "@/components/core/study-set-learn/learn-loading";

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
  const completed = useCramContext((s) => s.completed);

  if (completed) return <Completed />;

  return <InteractionCard />;
};

export default StudySetCramModule;
