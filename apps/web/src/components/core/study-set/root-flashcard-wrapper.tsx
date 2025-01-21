"use client";

import { useSession } from "next-auth/react";

import { createContext, useState } from "react";
import React from "react";

import { FlashcardContent } from "@highschool/interfaces";

import { menuEventChannel } from "@/events/menu";
import { useContainerContext } from "@/stores/use-container-store";

import { CreateSortFlashcardsData } from "./create-sort-flashcard-data";
import { DefaultFlashcardWrapper } from "./default-flashcard-wrapper";
import { EditTermModal } from "./edit-term-modal";
import { FlashcardsEmpty } from "./flashcard-empty";
import { LoadingFlashcard } from "./loading-flashcard";
import { SortFlashcardWrapper } from "./sort-flashcard-wrapper";

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
  const authed = useSession().status == "authenticated";
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editTerm, setEditTerm] = useState<FlashcardContent | null>(null);
  const [focusDefinition, setFocusDefinition] = useState(false);

  // const setStarMutation = api.container.starTerm.useMutation();
  // const folderStarMutation = api.folders.starTerm.useMutation();
  // const unstarMutation = api.container.unstarTerm.useMutation();

  const enableCardsSorting = useContainerContext((s) => s.enableCardsSorting);

  const FlashcardWrapper = enableCardsSorting
    ? SortFlashcardWrapper
    : DefaultFlashcardWrapper;

  const Wrapper = authed ? CreateSortFlashcardsData : React.Fragment;

  if (isDirty) return <LoadingFlashcard h={h} />;
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
              message: "Create an account for free to customize and star terms",
            });
            return;
          }

          // if (!starredTerms.includes(term.id)) {
          //     if (entityType === "set") {
          //         setStarMutation.mutate({
          //             termId: term.id,
          //             containerId: container.id,
          //         });
          //     } else {
          //         folderStarMutation.mutate({
          //             termId: term.id,
          //             studySetId: term.studySetId,
          //         });
          //     }

          //     starTerm(term.id);
          // } else {
          //     unstarMutation.mutate({
          //         termId: term.id,
          //     });
          //     unstarTerm(term.id);
          // }
        },
      }}
    >
      <Wrapper>
        <div
          style={{ minHeight: h, zIndex: 100 }}
          className="relative h-full w-full"
        >
          <EditTermModal
            term={editTerm}
            isOpen={editModalOpen}
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
