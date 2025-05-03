"use client";

import { useState } from "react";
import {
  useAddTofolderMutation,
  useOwnFlashcardQuery,
  useRemoveFlashcardMutation,
} from "@highschool/react-query/queries";
import { Button } from "@highschool/ui/components/ui/button";
import { IconCards, IconPlus } from "@tabler/icons-react";

import { AddToFolderModal } from "./add-to-folder-modal";

import { GenericCard } from "@/components/core/common/generic-card";
import { StudySetCard } from "@/components/core/common/study-set-card";
import { useFolder } from "@/hooks/use-folder";
import { useMe } from "@/hooks/use-me";

export const FlashcardList = () => {
  const folder = useFolder();
  const me = useMe();

  const [addSetsModalOpen, setAddSetsModalOpen] = useState(false);

  const { data, isLoading } = useOwnFlashcardQuery({
    pageNumber: 1,
    pageSize: 100,
  });

  const removeFlashcard = useRemoveFlashcardMutation();
  const addToFolder = useAddTofolderMutation();

  return (
    <>
      <AddToFolderModal
        actionLabel="Thêm thẻ ghi nhớ"
        entities={
          data?.data.filter(
            (x) =>
              !folder.flashcards.some((flashcard) => flashcard.id === x.id),
          ) ?? []
        }
        isAddLoading={addToFolder.isPending}
        isEntitiesLoading={isLoading}
        isOpen={addSetsModalOpen}
        onAdd={async (ids: string[]) => {
          await addToFolder.mutateAsync(
            {
              folderId: folder.folderUser.id,
              flashcardIds: ids,
            },
            {
              onSuccess: () => {
                setAddSetsModalOpen(false);
              },
            },
          );
        }}
        onClose={() => setAddSetsModalOpen(false)}
      />
      <div className="flex flex-col gap-6">
        <div className="flex flex-row items-center gap-2">
          <IconCards size={24} />
          <h2 className="whitespace-nowrap text-2xl font-bold">
            Thẻ ghi nhớ ({folder.flashcards.length ?? 0})
          </h2>
        </div>
        <div className="grid w-full grid-cols-[repeat(auto-fill,minmax(256px,1fr))] gap-4">
          {folder.flashcards.map((flashcard) => (
            <StudySetCard
              key={flashcard.id}
              draft={!flashcard.created}
              numTerms={flashcard.numberOfFlashcardContent}
              removable={true}
              studySet={flashcard}
              user={{
                fullname: me?.fullname!,
                image: me?.image!,
              }}
              onRemove={() => {
                removeFlashcard.mutate({
                  folderId: folder.folderUser.id,
                  flashcardId: flashcard.id,
                });
              }}
            />
          ))}
          <Button
            className="text-primary h-full min-h-[120px] text-lg"
            variant={"outline"}
            onClick={() => {
              setAddSetsModalOpen(true);
            }}
          >
            <IconPlus className="!size-6" />
            Thêm mới
          </Button>
        </div>
      </div>
    </>
  );
};

export const FlashcardListSkeleton = () => {
  return (
    <div className="grid w-full grid-cols-[repeat(auto-fill,minmax(256px,1fr))] gap-4">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i}>
          <GenericCard.Skeleton />
        </div>
      ))}
    </div>
  );
};
