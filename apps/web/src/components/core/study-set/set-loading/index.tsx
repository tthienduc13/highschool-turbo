"use client";

import { memo } from "react";

import { Container } from "../../layouts/container";
import { DescriptionAreaSkeleton } from "./description-area-skeleton";
import { FlashcardPreviewSkeleton } from "./flashcard-preview-skeleton";
import { HeadingAreaSkeleton } from "./heading-skeleton";

export const SetLoadingRaw = () => {
  return (
    <>
      <Container maxWidth="7xl">
        <div className="mt-10 flex flex-col space-y-10">
          <HeadingAreaSkeleton />
        </div>
      </Container>
      <Container maxWidth="full" className="overflow-hidden px-0">
        <Container maxWidth="7xl" className="py-4">
          <div className="flex w-full flex-col space-y-10">
            <FlashcardPreviewSkeleton />
            <DescriptionAreaSkeleton />
          </div>
        </Container>
      </Container>
    </>
  );
};
export const SetLoading = memo(SetLoadingRaw);
