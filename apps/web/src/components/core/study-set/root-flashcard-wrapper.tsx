"use client";

import { useSession } from "next-auth/react";
import { createContext, useState } from "react";
import React from "react";
import { FlashcardContent } from "@highschool/interfaces";
import {
  useStarTermMutation,
  useUnStarTermMutation,
} from "@highschool/react-query/queries";

import { CreateSortFlashcardsData } from "./create-sort-flashcard-data";
import { DefaultFlashcardWrapper } from "./default-flashcard-wrapper";
import { EditTermModal } from "./edit-term-modal";
import { FlashcardsEmpty } from "./flashcard-empty";
import { LoadingFlashcard } from "./loading-flashcard";
import { SortFlashcardWrapper } from "./sort-flashcard-wrapper";

import { useContainerContext } from "@/stores/use-container-store";
import { menuEventChannel } from "@/events/menu";
import { useSet } from "@/hooks/use-set";

export interface RootFlashcardWrapperProps {
  terms: FlashcardContent[];
  termOrder: string[];
  h?: string;
  isDirty?: boolean;
}

interface RootFlashcardContextProps {
  terms: FlashcardContent[];
  termOrder: string[];
  h?: string;
  editTerm: (term: FlashcardContent, focusDefinition: boolean) => void;
  starTerm: (term: FlashcardContent) => void;
}

export const RootFlashcardContext = createContext<RootFlashcardContextProps>({
  terms: [],
  termOrder: [],
  editTerm: () => undefined,
  starTerm: () => undefined,
});

export const RootFlashcardWrapper: React.FC<RootFlashcardWrapperProps> = ({
  terms,
  termOrder,
  h = "500px",
  isDirty = false,
}) => {
  const { flashcard } = useSet();
  const authed = useSession().status == "authenticated";
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editTerm, setEditTerm] = useState<FlashcardContent | null>(null);
  const [focusDefinition, setFocusDefinition] = useState(false);

  const setStarMutation = useStarTermMutation();
  const unStarMutation = useUnStarTermMutation();

  const enableCardsSorting = useContainerContext((s) => s.enableCardsSorting);
  const starredTerms = useContainerContext((s) => s.starredTerms);
  const starTerm = useContainerContext((s) => s.starTerm);
  const unstarTerm = useContainerContext((s) => s.unstarTerm);

  const FlashcardWrapper = enableCardsSorting
    ? SortFlashcardWrapper
    : DefaultFlashcardWrapper;

  const Wrapper = authed ? CreateSortFlashcardsData : React.Fragment;

  if (isDirty || (!termOrder.length && !flashcard.container))
    return <LoadingFlashcard h={h} />;
  if (!termOrder.length) return <FlashcardsEmpty h={h} />;

  return (
    <RootFlashcardContext.Provider
      value={{
        terms,
        termOrder,
        h,
        editTerm: (term, focusDefinition) => {
          setEditTerm(term);
          setFocusDefinition(focusDefinition);
          setEditModalOpen(true);
        },
        starTerm: (term) => {
          if (!authed) {
            menuEventChannel.emit("openSignup", {
              message:
                "Tạo tài khoản miễn phí để tùy chỉnh và đánh dấu thuật ngữ.",
            });

            return;
          }

          if (!starredTerms.includes(term.id)) {
            setStarMutation.mutate({
              flashcardContentId: term.id,
            });

            starTerm(term.id);
          } else {
            unStarMutation.mutate({
              flashcardContentId: term.id,
            });
            unstarTerm(term.id);
          }
        },
      }}
    >
      <Wrapper>
        <div
          className="relative size-full"
          style={{ minHeight: h, zIndex: 100 }}
        >
          <EditTermModal
            isOpen={editModalOpen}
            term={editTerm}
            onClose={() => {
              setEditModalOpen(false);
            }}
            onDefinition={focusDefinition}
          />
          <FlashcardWrapper />
        </div>
      </Wrapper>
    </RootFlashcardContext.Provider>
  );
};
