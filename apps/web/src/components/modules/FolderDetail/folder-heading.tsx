"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useDeleteFolderMutation } from "@highschool/react-query/queries";
import { Avatar, AvatarImage } from "@highschool/ui/components/ui/avatar";
import { Button } from "@highschool/ui/components/ui/button";
import { Separator } from "@highschool/ui/components/ui/separator";
import { Skeleton } from "@highschool/ui/components/ui/skeleton";
import {
  IconCards,
  IconEditCircle,
  IconFileTypePdf,
  IconTrash,
} from "@tabler/icons-react";

import { NavTab } from "../UserProfile/inner-profile";

import { EditFolderModal } from "./edit-folder-modal";

import { ConfirmModal } from "@/components/core/common/confirm-modal";
import { UsernameLink } from "@/components/core/common/username-link";
import { useFolder } from "@/hooks/use-folder";

export const FolderHeading = () => {
  const folder = useFolder();
  const router = useRouter();
  const params = useParams();
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const deleteFolderMutation = useDeleteFolderMutation();

  return (
    <>
      <EditFolderModal
        folderTitle={folder.folderUser.name}
        isOpen={editOpen}
        onClose={() => setEditOpen(false)}
      />
      <ConfirmModal
        destructive
        actionText="Xoá thư mục"
        body={
          <p className="text-muted-foreground">
            Bạn có chắc chắn muốn xoá thư mục này? Hành động này không thể hoàn
            tác.
          </p>
        }
        heading="Xoá thư mục này?"
        isLoading={deleteFolderMutation.isPending}
        isOpen={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        onConfirm={() => {
          deleteFolderMutation.mutate(
            {
              folderId: folder.folderUser.id,
            },
            {
              onSuccess: () => {
                router.push(
                  `/profile/${params.username as String}?type=${NavTab.Folder}`,
                );
              },
            },
          );
        }}
      />
      <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end md:gap-4">
        <div className="flex flex-col gap-3">
          <h1 className="text-3xl font-bold md:text-5xl">
            {folder.folderUser.name}
          </h1>
          <div className="flex flex-col gap-4 md:flex-row">
            <div className="flex flex-row items-center gap-2">
              <Avatar className="size-5">
                <AvatarImage
                  alt={
                    folder.folderUser.author.username ??
                    folder.folderUser.author.fullName
                  }
                  src={folder.folderUser.author.avatar}
                />
              </Avatar>
              <UsernameLink
                displayName={
                  folder.folderUser.author.username ??
                  folder.folderUser.author.fullName
                }
                username={folder.folderUser.author.username}
              />
            </div>
            <div className="flex flex-row items-center gap-4">
              <div className="flex flex-row items-center gap-2">
                <IconCards className="text-muted-foreground" size={18} />
                <p className="text-muted-foreground">
                  {folder.folderUser.countFlashCard} thẻ ghi nhớ
                </p>
              </div>
              <Separator className="h-full w-[0.5px]" orientation="vertical" />
              <div className="flex flex-row items-center gap-2">
                <IconFileTypePdf className="text-muted-foreground" size={18} />
                <p className="text-muted-foreground">
                  {folder.folderUser.countDocument} tài liệu
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-row overflow-hidden rounded-lg border">
          <Button
            className="rounded-none"
            size={"icon"}
            variant={"ghost"}
            onClick={() => setEditOpen(true)}
          >
            <IconEditCircle />
          </Button>
          <Button
            className="rounded-none"
            size={"icon"}
            variant={"ghost"}
            onClick={() => setDeleteOpen(true)}
          >
            <IconTrash />
          </Button>
        </div>
      </div>
    </>
  );
};

export const FolderHeadingSkeleton = () => {
  return (
    <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end md:gap-4">
      <div className="flex flex-col gap-3">
        <Skeleton className="h-[30px] w-64 rounded-lg md:h-12" />
        <div className="flex flex-col gap-4 md:flex-row">
          <div className="flex flex-row items-center gap-2">
            <Skeleton className="size-5 rounded-full" />
            <Skeleton className="h-4 w-20" />
          </div>
          <div className="flex flex-row items-center gap-4">
            <div className="flex flex-row items-center gap-2">
              <Skeleton className="size-[18px]" />
              <Skeleton className="h-4 w-10" />
            </div>
            <div className="flex flex-row items-center gap-2">
              <Skeleton className="size-[18px]" />
              <Skeleton className="h-4 w-10" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
