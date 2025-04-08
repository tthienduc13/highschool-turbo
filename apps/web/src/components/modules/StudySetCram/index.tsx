"use client";

import { useParams } from "next/navigation";

import { HydrateSetData } from "../StudySet/hydrate-set-data";

import { CreateCramData } from "./create-cram-data";

import { Container } from "@/components/core/layouts/container";
import { useCramContext } from "@/stores/use-study-set-cram-store";
import { Completed } from "@/components/core/study-set-learn/completed";
import { InteractionCard } from "@/components/core/study-set-cram/interaction-card";
import { ActionBar } from "@/components/core/study-set-cram/action-bar";

function StudySetCramModule() {
  const { slug } = useParams();

  return (
    <HydrateSetData slug={slug as string}>
      <CreateCramData>
        <Container className="md:mt-10" maxWidth="4xl">
          <div className="flex flex-col gap-8">
            {/* <TitleBar /> */}
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
  const summary = useCramContext((s) => s.summary);

  if (completed) return <Completed />;

  return <InteractionCard />;
};

export default StudySetCramModule;
