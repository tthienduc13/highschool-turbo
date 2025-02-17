"use client";

import { useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Modal } from "@highschool/components/modal";
import {
  useAddTofolderMutation,
  useRemoveFlashcardMutation,
  useUserFoldersQuery,
} from "@highschool/react-query/queries";
import { Button } from "@highschool/ui/components/ui/button";
import { Card, CardContent } from "@highschool/ui/components/ui/card";
import { Skeleton } from "@highschool/ui/components/ui/skeleton";
import {
  IconFolder,
  IconFolderPlus,
  IconLoader2,
  IconMinus,
  IconPlus,
} from "@tabler/icons-react";

import { menuEventChannel } from "@/events/menu";
import { useSet } from "@/hooks/use-set";

export interface AddToFolderModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AddToFolderModal = ({
  isOpen,
  onClose,
}: AddToFolderModalProps) => {
  const { flashcard } = useSet();
  const { data, isLoading, refetch } = useUserFoldersQuery({
    pageNumber: 1,
    pageSize: 5,
    flashcardId: flashcard.id,
  });

  useEffect(() => {
    const onFolderCreated = (setId: string) => {
      if (setId !== flashcard.id) return;
      void (async () => {
        await refetch();
      })();
    };

    menuEventChannel.on("folderWithSetCreated", onFolderCreated);

    return () => {
      menuEventChannel.off("folderWithSetCreated", onFolderCreated);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Modal
      buttonLabel="Xong"
      isOpen={isOpen}
      title="Thêm vào thư mục"
      onClose={onClose}
    >
      <div className="flex flex-col gap-3">
        {isLoading ? (
          Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-[60px] w-full rounded-lg" />
          ))
        ) : (
          <Button
            className="h-14 w-full"
            variant="outline"
            onClick={() => {
              menuEventChannel.emit("createFolder", flashcard.id);
            }}
          >
            <IconPlus className="!size-[18px\" />
            Thêm vào thư mục mới
          </Button>
        )}
        {data?.data?.map((folder) => (
          <FolderCard
            key={folder.id}
            id={folder.id}
            includes={folder.isFlashcardInclude}
            title={folder.name}
          />
        ))}
      </div>
    </Modal>
  );
};

interface FolderCardProps {
  id: string;
  title: string;
  includes: boolean;
}

const FolderCard = ({
  id: folderId,
  title,
  includes: _includes,
}: FolderCardProps) => {
  const { flashcard } = useSet();
  const user = useSession()!.data!.user!;
  const [includes, setIncludes] = useState(_includes);
  const queryClient = useQueryClient();

  const removeFlashcard = useRemoveFlashcardMutation();
  const addToFolder = useAddTofolderMutation();

  const isLoading = removeFlashcard.isPending || addToFolder.isPending;

  useEffect(() => {
    if (removeFlashcard.isSuccess || addToFolder.isSuccess) {
      queryClient.invalidateQueries({
        queryKey: ["user-folders"],
      });
    }
  }, [removeFlashcard.isSuccess, addToFolder.isSuccess]);

  return (
    <Card className="group rounded-lg border-2 border-gray-100 px-4 py-3 shadow-sm transition-all duration-200 ease-in-out focus-visible:border-blue-500 dark:border-gray-700 dark:focus-visible:border-blue-500">
      <CardContent className="p-0">
        <div className="flex flex-row items-center justify-between gap-4">
          <div className="flex flex-row items-center gap-4 overflow-hidden">
            <IconFolder size={18} />
            <Link
              className="hover:text-primary transition-all duration-200 ease-in-out"
              href={`/profile/${user.username}/folder/${folderId}`}
            >
              <div className="line-clamp-1 overflow-hidden whitespace-nowrap text-lg">
                {title}
              </div>
            </Link>
          </div>
          <Button
            aria-label="add"
            size={"icon"}
            variant={"ghost"}
            onClick={async () => {
              setIncludes(!includes);

              if (!includes) {
                await addToFolder.mutateAsync({
                  folderId,
                  flashcardIds: [flashcard.id],
                });
              } else {
                await removeFlashcard.mutateAsync({
                  folderId,
                  flashcardId: flashcard.id,
                });
              }
            }}
          >
            {isLoading ? (
              <IconLoader2 className="!size-6 animate-spin" />
            ) : includes ? (
              <IconMinus className="!size-6" />
            ) : (
              <IconFolderPlus className="!size-6" />
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
