"use client";

import { UsernameLink } from "@/components/core/common/username-link";
import { useMe } from "@/hooks/use-me";
import { Avatar, AvatarImage } from "@highschool/ui/components/ui/avatar";
import {
    IconCards,
    IconEditCircle,
    IconFileTypePdf,
    IconTrash,
} from "@tabler/icons-react";
import { Separator } from "@highschool/ui/components/ui/separator";
import { Button } from "@highschool/ui/components/ui/button";
import { useEffect, useState } from "react";
import { EditFolderModal } from "./edit-folder-modal";
import { useFolder } from "@/hooks/use-folder";
import { ConfirmModal } from "@/components/core/common/confirm-modal";
import { useDeleteFolderMutation } from "@highschool/react-query/queries";
import { useRouter } from "next/navigation";
import { Skeleton } from "@highschool/ui/components/ui/skeleton";

export const FolderHeading = () => {
    const me = useMe();
    const folder = useFolder();
    const router = useRouter();
    const [editOpen, setEditOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);

    const deleteFolderMutation = useDeleteFolderMutation();

    useEffect(() => {
        if (deleteFolderMutation.isSuccess) {
            router.push(`/`);
        }
    }, [deleteFolderMutation.isSuccess]);
    return (
        <>
            <EditFolderModal
                folderTitle={folder.folderUser.name}
                isOpen={editOpen}
                onClose={() => setEditOpen(false)}
            />
            <ConfirmModal
                isOpen={deleteOpen}
                onClose={() => setDeleteOpen(false)}
                heading="Xoá thư mục này?"
                body={
                    <p className="text-muted-foreground">
                        Bạn có chắc chắn muốn xoá thư mục này? Hành động này
                        không thể hoàn tác.
                    </p>
                }
                actionText="Xoá thư mục"
                isLoading={deleteFolderMutation.isPending}
                onConfirm={() => {
                    deleteFolderMutation.mutate({
                        folderId: folder.folderUser.id,
                    });
                }}
                destructive
            />
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 md:gap-4">
                <div className="flex flex-col gap-3">
                    <h1 className="md:text-5xl font-bold text-3xl">
                        {folder.folderUser.name}
                    </h1>
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex flex-row gap-2 items-center">
                            <Avatar className="size-5">
                                <AvatarImage
                                    src={me?.image ?? ""}
                                    alt={me?.fullname ?? me?.username}
                                />
                            </Avatar>
                            <UsernameLink
                                displayName={me?.fullname ?? me?.username!}
                                username={me?.username!}
                            />
                        </div>
                        <div className="flex flex-row gap-4 items-center">
                            <div className="flex flex-row gap-2 items-center">
                                <IconCards
                                    size={18}
                                    className="text-muted-foreground"
                                />
                                <p className="text-muted-foreground">
                                    {folder.folderUser.countFlashCard} thẻ ghi
                                    nhớ
                                </p>
                            </div>
                            <Separator
                                orientation="vertical"
                                className="h-full w-[0.5px]"
                            />
                            <div className="flex flex-row gap-2 items-center">
                                <IconFileTypePdf
                                    size={18}
                                    className="text-muted-foreground"
                                />
                                <p className="text-muted-foreground">
                                    {folder.folderUser.countDocument} tài liệu
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="border rounded-lg overflow-hidden flex flex-row">
                    <Button
                        size={"icon"}
                        variant={"ghost"}
                        className="rounded-none "
                        onClick={() => setEditOpen(true)}
                    >
                        <IconEditCircle />
                    </Button>
                    <Button
                        size={"icon"}
                        variant={"ghost"}
                        className="rounded-none"
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
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 md:gap-4">
            <div className="flex flex-col gap-3">
                <Skeleton className="md:h-12 h-[30px] w-64 rounded-lg" />
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex flex-row gap-2 items-center">
                        <Skeleton className="size-5 rounded-full" />
                        <Skeleton className="h-4 w-20" />
                    </div>
                    <div className="flex flex-row gap-4 items-center">
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
