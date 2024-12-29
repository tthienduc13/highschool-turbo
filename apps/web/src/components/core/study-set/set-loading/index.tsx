"use client";

import { memo } from "react";

import { DescriptionAreaSkeleton } from "./description-area-skeleton";
import { FlashcardPreviewSkeleton } from "./flashcard-preview-skeleton";
import { HeadingAreaSkeleton } from "./heading-skeleton";

export const SetLoadingRaw = () => {
  return (
    <>
      <div className="mx-auto max-w-7xl">
        <div className="mt-10 flex flex-col space-y-10">
          <HeadingAreaSkeleton />
        </div>
      </div>
      <div className="w-full overflow-hidden px-0">
        <div className="mx-auto max-w-7xl py-4">
          <div className="flex w-full flex-col space-y-10">
            <FlashcardPreviewSkeleton />
            <DescriptionAreaSkeleton />
          </div>
        </div>
      </div>
    </>
  );
};
export const SetLoading = memo(SetLoadingRaw);
