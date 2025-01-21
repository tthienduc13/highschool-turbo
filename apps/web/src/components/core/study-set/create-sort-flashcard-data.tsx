import React, { useContext, useRef } from "react";

import {
  FlashcardContent,
  SetData,
  StudiableTerm,
} from "@highschool/interfaces";

import { queryEventChannel } from "@/events/query";
import { useSet } from "@/hooks/use-set";
import { useContainerContext } from "@/stores/use-container-store";
import {
  SortFlashcardsContext,
  SortFlashcardsStore,
  createSortFlashcardsStore,
} from "@/stores/use-sort-flashcard-store";

import { RootFlashcardContext } from "./root-flashcard-wrapper";

export const CreateSortFlashcardsData: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const { terms } = useSet();
  const { termOrder } = useContext(RootFlashcardContext);
  const starredTerms = useContainerContext((s) => s.starredTerms);
  const storeRef = useRef<SortFlashcardsStore>(null);

  const initState = (
    round: number,
    studiableTerms: Pick<
      StudiableTerm,
      "id" | "correctness" | "appearedInRound" | "incorrectCount"
    >[],
    terms: FlashcardContent[],
    termOrder: string[],
    studyStarred: boolean,
  ) => {
    let flashcardTerms: StudiableTerm[] = termOrder.map((id) => {
      const term = terms.find((t) => t.id === id)!;
      const studiableTerm = studiableTerms.find((s) => s.id === term.id);
      return {
        ...term,
        correctness: studiableTerm?.correctness ?? 0,
        appearedInRound: studiableTerm?.appearedInRound ?? undefined,
        incorrectCount: studiableTerm?.incorrectCount ?? 0,
      };
    });

    if (studyStarred) {
      flashcardTerms = flashcardTerms.filter((x) =>
        starredTerms.includes(x.id),
      );
    }

    storeRef.current!.getState().initialize(round, flashcardTerms, terms);
  };

  //   if (!storeRef.current) {
  //     storeRef.current = createSortFlashcardsStore();
  //     initState(
  //       container.cardsRound,
  //       container.studiableTerms.filter((x) => x.mode == "Flashcards"),
  //       terms,
  //       termOrder,
  //       container.cardsStudyStarred,
  //     );
  //   }

  //   React.useEffect(() => {
  //     const trigger = (data: SetData) =>
  //       initState(
  //         data.container!.cardsRound,
  //         data.container!.studiableTerms.filter((x) => x.mode == "Flashcards"),
  //         data.terms,
  //         termOrder,
  //         data.container!.cardsStudyStarred,
  //       );

  //     queryEventChannel.on("setQueryRefetched", trigger);
  //     return () => {
  //       queryEventChannel.off("setQueryRefetched", trigger);
  //     };
  //     // eslint-disable-next-line react-hooks/exhaustive-deps
  //   }, []);

  return (
    <SortFlashcardsContext.Provider value={storeRef.current}>
      {children}
    </SortFlashcardsContext.Provider>
  );
};
