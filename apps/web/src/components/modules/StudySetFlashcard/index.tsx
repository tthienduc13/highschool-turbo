"use client";

import { useState } from "react";

import { EditorGlobalStyles } from "@/components/core/common/editor-global-style";
import { PhotoViewProvider } from "@/components/core/providers/photo-provider";
import { SettingModal } from "@/components/core/study-set/setting-modal";

import { HydrateSetData } from "../StudySet/hydrate-set-data";
import { ControlsBar } from "./control-bar";
import { FlashcardArea } from "./flashcard-area";
import { FlashcardsLoading } from "./flashcard-loading";
import { TitleBar } from "./title-bar";

function StudySetFlashcardModule() {
  const [settingsOpen, setSettingsOpen] = useState(false);
  return (
    <>
      <EditorGlobalStyles />
      <PhotoViewProvider>
        <HydrateSetData isPublic placeholder={<FlashcardsLoading />}>
          <SettingModal
            isOpen={settingsOpen}
            onClose={() => setSettingsOpen(false)}
          />
          <div className="h-[calc(100vh-80px-32px)] min-h-[720px] w-full overflow-hidden p-0">
            <div className="mx-auto h-[calc(100vh-180px)] min-h-[620px] w-full max-w-7xl">
              <div className="flex flex-col gap-6">
                <TitleBar />
                <FlashcardArea />
                <ControlsBar onSettingsClick={() => setSettingsOpen(true)} />
              </div>
            </div>
          </div>
        </HydrateSetData>
      </PhotoViewProvider>
    </>
  );
}

export default StudySetFlashcardModule;
