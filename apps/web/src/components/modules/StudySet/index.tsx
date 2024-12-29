"use client";

import { EditorGlobalStyles } from "@/components/core/common/editor-global-style";
import { PhotoViewProvider } from "@/components/core/providers/photo-provider";
import { DescriptionArea } from "@/components/core/study-set/description-area";
import { FlashcardPreview } from "@/components/core/study-set/flashcard-preview";
import { HeadingArea } from "@/components/core/study-set/heading-area";
import { SetLoading } from "@/components/core/study-set/set-loading";
import { TermOverView } from "@/components/core/study-set/term-overview";

import { HydrateSetData } from "./hydrate-set-data";

function StudySetModule() {
  return (
    <PhotoViewProvider>
      <HydrateSetData placeholder={<SetLoading />} isPublic>
        <EditorGlobalStyles />
        <div className="mx-auto w-full max-w-7xl">
          <div className="flex flex-col gap-12">
            <HeadingArea />
          </div>
        </div>
        <div className="w-full py-6">
          <div className="mx-auto w-full max-w-7xl py-4">
            <div className="flex flex-col gap-10">
              <FlashcardPreview />
              <DescriptionArea />
            </div>
          </div>
        </div>
        <div className="mx-auto w-full max-w-7xl">
          <div className="flex flex-col gap-12">
            <TermOverView />
          </div>
        </div>
      </HydrateSetData>
    </PhotoViewProvider>
  );
}

export default StudySetModule;
