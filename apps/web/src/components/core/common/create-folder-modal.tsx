"use client";

import { useEffect, useState } from "react";
import { Modal } from "./modal";
import { Input } from "@highschool/ui/components/ui/input";
import { useCreateFolderMutation } from "@highschool/react-query/queries";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useMe } from "@/hooks/use-me";
import { menuEventChannel } from "@/events/menu";

interface CreateFolderModalProps {
    isOpen: boolean;
    onClose: () => void;
    childSetId?: string;
}

export const CreateFolderModal = ({
    isOpen,
    onClose,
    childSetId,
}: CreateFolderModalProps) => {
    const me = useMe();
    const router = useRouter();
    const [title, setTitle] = useState("");
    const createFolder = useCreateFolderMutation();

    const isDisabled = title.length === 0 || createFolder.isPending;

    useEffect(() => {
        if (createFolder.isSuccess && createFolder.data) {
            if (!childSetId) {
                onClose();
                router.push(
                    `/profile/${me?.username}/folder/${createFolder.data.data}`
                );
                toast.success(createFolder.data.message);
            } else {
                menuEventChannel.emit("folderWithSetCreated", childSetId);
                onClose();
            }
        }
    }, [createFolder.isSuccess, createFolder.data]);

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Tạo thư mục"
            buttonLabel="Tạo ngay"
            isPending={createFolder.isPending}
            isDisabled={isDisabled}
            onConfirm={async () => {
                await createFolder.mutateAsync({
                    folderName: title,
                    flashcardIds: childSetId ? [childSetId] : [],
                });
            }}
        >
            <Input
                value={title}
                placeholder="Tiêu đề"
                onChange={(e) => setTitle(e.target.value)}
                className="w-full border-0 border-b-4 border-b-transparent h-12 pt-2 bg-gray-100 dark:bg-gray-700 focus-within:border-b-4 focus-visible:border-b-blue-500 dark:focus-visible:border-blue-300 focus-visible:ring-0 shadow-none !text-lg font-bold border-b-blue-300"
            />
        </Modal>
    );
};
