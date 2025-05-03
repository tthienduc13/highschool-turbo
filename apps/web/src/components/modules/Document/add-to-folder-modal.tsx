"use client";

import { useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Modal } from "@highschool/components/modal";
import {
  useAddTofolderMutation,
  useRemoveDocumentMutation,
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
} from "@tabler/icons-react";

import { menuEventChannel } from "@/events/menu";
import { useMe } from "@/hooks/use-me";

export interface AddToFolderModalProps {
  isOpen: boolean;
  onClose: () => void;
  documentId: string;
}

export const AddToFolderModal = ({
  isOpen,
  onClose,
  documentId,
}: AddToFolderModalProps) => {
  const me = useMe();
  const { data, isLoading, refetch } = useUserFoldersQuery({
    pageNumber: 1,
    userName: me?.username!,
    pageSize: 5,
    documentId: documentId,
  });

  useEffect(() => {
    const onFolderCreated = (setId: string) => {
      if (setId !== documentId) return;
      void (async () => {
        await refetch();
      })();
    };

    menuEventChannel.on("folderWithDocumentCreated", onFolderCreated);

    return () => {
      menuEventChannel.off("folderWithDocumentCreated", onFolderCreated);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Modal
      buttonLabel="Xong"
      isOpen={isOpen}
      title="Thêm vào thư mục"
      onClose={onClose}
      onConfirm={onClose}
    >
      <div className="flex flex-col gap-3 pb-6">
        {isLoading
          ? Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-[60px] w-full rounded-lg" />
            ))
          : //   <Button
            //     className="h-14 w-full"
            //     variant="outline"
            //     onClick={() => {
            //       menuEventChannel.emit("createFolder", documentId);
            //     }}
            //   >
            //     <IconPlus className="!size-[18px\" />
            //     Thêm vào thư mục mới
            //   </Button>
            ""}
        {data?.data?.map((folder) => (
          <FolderCard
            key={folder.id}
            documentId={documentId}
            id={folder.id}
            includes={folder.isDocumentInclude}
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
  documentId: string;
}

const FolderCard = ({
  id: folderId,
  title,
  includes: _includes,
  documentId,
}: FolderCardProps) => {
  const user = useSession()!.data!.user!;
  const [includes, setIncludes] = useState(_includes);
  const queryClient = useQueryClient();

  const removeDocument = useRemoveDocumentMutation();
  const addToFolder = useAddTofolderMutation();

  const isLoading = removeDocument.isPending || addToFolder.isPending;

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
                await addToFolder.mutateAsync(
                  {
                    folderId,
                    documentIds: [documentId],
                  },
                  {
                    onSuccess: () => {
                      queryClient.invalidateQueries({
                        queryKey: ["user-folders"],
                      });
                    },
                  },
                );
              } else {
                await removeDocument.mutateAsync(
                  {
                    folderId,
                    documentId: documentId,
                  },
                  {
                    onSuccess: () => {
                      queryClient.invalidateQueries({
                        queryKey: ["user-folders"],
                      });
                    },
                  },
                );
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
