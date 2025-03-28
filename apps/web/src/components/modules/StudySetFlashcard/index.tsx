"use client";

import { useState } from "react";
import { useParams } from "next/navigation";

import { HydrateSetData } from "../StudySet/hydrate-set-data";

import { ControlsBar } from "./control-bar";
import { FlashcardArea } from "./flashcard-area";
import { FlashcardsLoading } from "./flashcard-loading";
import { TitleBar } from "./title-bar";

import { SettingModal } from "@/components/core/study-set/setting-modal";
import { PhotoViewProvider } from "@/components/core/providers/photo-provider";
import { EditorGlobalStyles } from "@/components/core/common/editor-global-style";
import { Container } from "@/components/core/layouts/container";

function StudySetFlashcardModule() {
  const { slug } = useParams();
  const [settingsOpen, setSettingsOpen] = useState(false);

  return (
    <>
      <EditorGlobalStyles />
      <PhotoViewProvider>
        <HydrateSetData
          isPublic
          placeholder={<FlashcardsLoading />}
          slug={slug as string}
        >
          <SettingModal
            isOpen={settingsOpen}
            onClose={() => setSettingsOpen(false)}
          />
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
                <ControlsBar onSettingsClick={() => setSettingsOpen(true)} />
              </div>
            </Container>
          </Container>
        </HydrateSetData>
      </PhotoViewProvider>
    </>
  );
}

export default StudySetFlashcardModule;
