"use client";

import { SortFlashcardWrapper } from "./sort-flashcard-wrapper";

import { useStudySetFSRSContext } from "@/stores/use-study-set-fsrs-store";

export const FlashcardArea = () => {
  const dueCards = useStudySetFSRSContext((s) => s.dueCards);

  if (!dueCards) throw new Error("Terms data is missing in unison!");

  return <SortFlashcardWrapper h="max(calc(100vh - 240px), 560px)" />;
};
