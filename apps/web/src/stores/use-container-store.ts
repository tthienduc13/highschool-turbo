import { createStore, useStore } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";
import React from "react";
import {
  LimitedStudySetAnswerMode,
  MultipleAnswerMode,
  StudiableTerm,
  StudySetAnswerMode,
} from "@highschool/interfaces";

export interface ContainerStoreProps {
  hideFlashcard: boolean;
  cardPerDay: number;
  flashcardHideWith: LimitedStudySetAnswerMode;
  shuffleFlashcards: boolean;
  autoplayFlashcards: boolean;
  shuffleLearn: boolean;
  studyStarred: boolean;
  answerWith: StudySetAnswerMode;
  multipleAnswerMode: MultipleAnswerMode;
  extendedFeedbackBank: boolean;
  enableCardsSorting: boolean;
  cardsStudyStarred: boolean;
  cardsAnswerWith: LimitedStudySetAnswerMode;
  matchStudyStarred: boolean;
  starredTerms: string[];
  studiableTerms: StudiableTerm[];
}

interface ContainerState extends ContainerStoreProps {
  toggleShuffleFlashcards: () => void;
  toggleAutoplayFlashcards: () => void;
  toggleHideFlashcard: () => void;
  setFlashcardHideWith: (flashcardHideWith: LimitedStudySetAnswerMode) => void;
  setShuffleLearn: (shuffleLearn: boolean) => void;
  setStudyStarred: (studyStarred: boolean) => void;
  setAnswerWith: (answerWith: StudySetAnswerMode) => void;
  setMultipleAnswerMode: (multipleAnswerMode: MultipleAnswerMode) => void;
  setExtendedFeedbackBank: (extendedFeedbackBank: boolean) => void;
  setEnableCardsSorting: (enableCardsSorting: boolean) => void;
  setCardsStudyStarred: (cardsStudyStarred: boolean) => void;
  setCardsAnswerWith: (cardsAnswerWith: LimitedStudySetAnswerMode) => void;
  setMatchStudyStarred: (matchStudyStarred: boolean) => void;
  setCardPerDay: (cardPerDay: number) => void;
  starTerm: (termId: string) => void;
  unstarTerm: (termId: string) => void;
}

export type ContainerStore = ReturnType<typeof createContainerStore>;

export const createContainerStore = (
  initProps?: Partial<ContainerStoreProps>,
) => {
  const DEFAULT_PROPS: ContainerStoreProps = {
    shuffleFlashcards: false,
    cardPerDay: 0,
    hideFlashcard: false,
    flashcardHideWith: LimitedStudySetAnswerMode.Definition,
    autoplayFlashcards: false,
    shuffleLearn: false,
    studyStarred: false,
    answerWith: StudySetAnswerMode.FlashcardContentDefinition,
    extendedFeedbackBank: false,
    multipleAnswerMode: MultipleAnswerMode.Unknown,
    cardsAnswerWith: LimitedStudySetAnswerMode.Definition,
    cardsStudyStarred: false,
    enableCardsSorting: false,
    matchStudyStarred: false,
    starredTerms: [],
    studiableTerms: [],
  };

  return createStore<ContainerState>()(
    subscribeWithSelector((set) => ({
      ...DEFAULT_PROPS,
      ...initProps,
      toggleShuffleFlashcards: () => {
        set((state) => {
          return {
            shuffleFlashcards: !state.shuffleFlashcards,
          };
        });
      },
      toggleAutoplayFlashcards: () => {
        set((state) => {
          return {
            autoplayFlashcards: !state.autoplayFlashcards,
          };
        });
      },
      toggleHideFlashcard: () => {
        set((state) => {
          return {
            hideFlashcard: !state.hideFlashcard,
          };
        });
      },
      setFlashcardHideWith: (flashcardHideWith: LimitedStudySetAnswerMode) => {
        set({ flashcardHideWith });
      },
      setCardPerDay: (cardPerDay: number) => {
        set({ cardPerDay });
      },
      setShuffleLearn: (shuffleLearn: boolean) => set({ shuffleLearn }),
      setStudyStarred: (studyStarred: boolean) => set({ studyStarred }),
      setAnswerWith: (answerWith: StudySetAnswerMode) => set({ answerWith }),
      setMultipleAnswerMode: (multipleAnswerMode: MultipleAnswerMode) =>
        set({ multipleAnswerMode }),
      setExtendedFeedbackBank: (extendedFeedbackBank: boolean) =>
        set({ extendedFeedbackBank }),
      setEnableCardsSorting: (enableCardsSorting: boolean) =>
        set({ enableCardsSorting }),
      setCardsStudyStarred: (cardsStudyStarred: boolean) =>
        set({ cardsStudyStarred }),
      setCardsAnswerWith: (cardsAnswerWith: LimitedStudySetAnswerMode) =>
        set({ cardsAnswerWith }),
      setMatchStudyStarred: (matchStudyStarred: boolean) =>
        set({ matchStudyStarred }),
      starTerm: (termId: string) => {
        set((state) => {
          return {
            starredTerms: [...state.starredTerms, termId],
          };
        });
      },
      unstarTerm: (termId: string) => {
        set((state) => {
          return {
            starredTerms: state.starredTerms.filter((id) => id !== termId),
          };
        });
      },
    })),
  );
};

export const ContainerContext = React.createContext<ContainerStore | null>(
  null,
);

// Hook to use the container context
export const useContainerContext = <T>(
  selector: (state: ContainerState) => T,
): T => {
  const store = React.useContext(ContainerContext);

  if (!store) throw new Error("Missing ContainerContext.Provider in the tree");

  return useStore(store, selector);
};
