"use client";

import { useParams } from "next/navigation";

import { FlashcardsLoading } from "./flashcard-loading";
import { HydrateFSRSData } from "./hydrate-fsrs-data";
import { TitleBar } from "./title-bar";
import { FlashcardArea } from "./flashcard-area";

import { Container } from "@/components/core/layouts/container";

function StudySetFlashcardModule() {
  const { slug } = useParams();

  return (
    <>
      <HydrateFSRSData
        placeholder={<FlashcardsLoading />}
        slug={slug as string}
      >
        <Container
          className="h-[calc(100vh-80px-32px)] min-h-[720px] w-full overflow-hidden p-0"
          maxWidth="full"
        >
          <Container
            className=" h-[calc(100vh-180px)] min-h-[620px] w-full "
            maxWidth="7xl"
          >
            <div className="flex flex-col gap-6">
              <TitleBar />
              <FlashcardArea />
            </div>
          </Container>
        </Container>
      </HydrateFSRSData>
    </>
  );
}

export default StudySetFlashcardModule;
