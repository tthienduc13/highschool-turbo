import React, { useRef, useEffect, useState } from "react";
import {
  FlashcardContent,
  StudiableTerm,
  DueCard,
  FlashcardLearnState,
} from "@highschool/interfaces";
import { useFSRSByIdQuery } from "@highschool/react-query/queries";

import { useSet } from "@/hooks/use-set";
import { useContainerContext } from "@/stores/use-container-store";
import {
  createSortFlashcardsStore,
  SortFlashcardsContext,
  SortFlashcardsStore,
} from "@/stores/use-sort-flashcard-store";

export const CreateSortFlashcardsData: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const { flashcard } = useSet();
  const [isReview, setIsReview] = useState(false);
  const {
    data: fsrsData,
    isLoading,
    refetch,
  } = useFSRSByIdQuery({
    flashcardId: flashcard.id,
    isReview,
  });
  const starredTerms = useContainerContext((s) => s.starredTerms);
  const storeRef = useRef<SortFlashcardsStore>(null);

  // Initialize the store with FSRS data when it's available
  useEffect(() => {
    if (fsrsData && storeRef.current) {
      const dueCards = fsrsData.dueCards;

      // Filter by starred terms if needed
      const filteredDueCards =
        starredTerms.length > 0
          ? dueCards.filter((card) => starredTerms.includes(card.contentId))
          : dueCards;

      // Initialize the store with the due cards and total card count
      storeRef.current
        .getState()
        .initialize(filteredDueCards, fsrsData.totalCardCount);
    }
  }, [fsrsData, starredTerms]);

  // Handle round completion
  const handleRoundComplete = async () => {
    // Check if all cards were rated as known (3)
    const allCardsKnown =
      storeRef.current?.getState().checkAllCardsKnown() || false;

    // If all cards were rated as known (3), set isReview to false to get new cards
    // Otherwise, keep reviewing the same cards
    setIsReview(!allCardsKnown);

    // We don't automatically revalidate here anymore
    // The user will need to manually revalidate by clicking a button
  };

  // Listen for round completion events
  useEffect(() => {
    if (storeRef.current) {
      const unsubscribe = storeRef.current.subscribe(
        (state) => state.progressView,
        (progressView) => {
          if (progressView) {
            handleRoundComplete();
          }
        },
      );

      return () => unsubscribe();
    }
  }, []);

  // Listen for manual revalidation flag
  useEffect(() => {
    if (storeRef.current) {
      const unsubscribe = storeRef.current.subscribe(
        (state) => state.manualRevalidate,
        (manualRevalidate) => {
          // We don't automatically revalidate here
          // The user will need to manually revalidate by clicking a button
        },
      );

      return () => unsubscribe();
    }
  }, []);

  useEffect(() => {
    if (storeRef.current) {
      const unsubscribe = storeRef.current.subscribe(
        (state) => state.dueCardCount,
        (dueCardCount) => {
          if (dueCardCount === 0) {
            storeRef.current?.getState().nextRound(isReview);
          }
        },
      );

      return () => unsubscribe();
    }
  }, []);

  const initState = (
    studiableTerms: Pick<
      StudiableTerm,
      "id" | "correctness" | "appearedInRound" | "incorrectCount"
    >[],
    terms: FlashcardContent[],
    termOrder: string[],
    studyStarred: boolean,
  ) => {
    const dueCards: DueCard[] = termOrder.map((id) => {
      const term = terms.find((t) => t.id === id)!;
      const studiableTerm = studiableTerms.find((s) => s.id === term.id);

      return {
        contentId: term.id,
        term: term.flashcardContentTerm,
        definition: term.flashcardContentDefinition,
        state: FlashcardLearnState.New,
        dueDate: null,
        difficulty: 0,
        stability: 0,
        retrievability: 0,
        isOverdue: false,
        isNew: true,
        isReview: false,
        isDueToday: false,
        isEarlyReview: false,
        isLowRating: false,
        rating: 0,
        priority: 0,
        correctness: studiableTerm?.correctness ?? 0,
        incorrectCount: studiableTerm?.incorrectCount ?? 0,
        appearedInRound: 0,
      };
    });

    if (studyStarred) {
      const filteredDueCards = dueCards.filter((x) =>
        starredTerms.includes(x.contentId),
      );

      storeRef
        .current!.getState()
        .initialize(filteredDueCards, dueCards.length);
    } else {
      storeRef.current!.getState().initialize(dueCards, dueCards.length);
    }
  };

  if (!storeRef.current) {
    storeRef.current = createSortFlashcardsStore();
  }

  return (
    <SortFlashcardsContext.Provider value={storeRef.current}>
      {children}
    </SortFlashcardsContext.Provider>
  );
};
