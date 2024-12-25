"use client";

import { Skeleton } from "@highschool/ui/components/ui/skeleton";
import { Modal } from "../common/modal";
import {
    useAddTofolderMutation,
    useRemoveFlashcardMutation,
    useUserFoldersQuery,
} from "@highschool/react-query/queries";
import { Button } from "@highschool/ui/components/ui/button";
import { menuEventChannel } from "@/events/menu";
import {
    IconFolder,
    IconFolderPlus,
    IconLoader2,
    IconMinus,
    IconPlus,
} from "@tabler/icons-react";
import { useSet } from "@/hooks/use-set";
import { Card, CardContent } from "@highschool/ui/components/ui/card";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

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
            title="Thêm vào thư mục"
            isOpen={isOpen}
            onClose={onClose}
            buttonLabel="Xong"
        >
            <div className="flex flex-col gap-3">
                {isLoading ? (
                    Array.from({ length: 5 }).map((_, i) => (
                        <Skeleton
                            key={i}
                            className="w-full h-[60px] rounded-lg"
                        />
                    ))
                ) : (
                    <Button
                        className="w-full h-14"
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
                        id={folder.id}
                        key={folder.id}
                        title={folder.name}
                        includes={folder.isFlashcardInclude}
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
        <Card className="px-4 py-3 rounded-lg border-2 shadow-sm border-gray-100 transition-all ease-in-out duration-200 focus-visible:border-blue-500 dark:border-gray-700 group dark:focus-visible:border-blue-500">
            <CardContent className="p-0">
                <div className="flex flex-row items-center justify-between gap-4">
                    <div className="flex flex-row gap-4 items-center overflow-hidden">
                        <IconFolder size={18} />
                        <Link
                            href={`/profile/${user.username}/folder/${folderId}`}
                            className="transition-all duration-200 ease-in-out hover:text-primary"
                        >
                            <div className="overflow-hidden text-lg whitespace-nowrap line-clamp-1">
                                {title}
                            </div>
                        </Link>
                    </div>
                    <Button
                        size={"icon"}
                        aria-label="add"
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
                            <IconLoader2 className="animate-spin !size-6" />
                        ) : includes ? (
                            <IconMinus className=" !size-6" />
                        ) : (
                            <IconFolderPlus className=" !size-6" />
                        )}
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
};
