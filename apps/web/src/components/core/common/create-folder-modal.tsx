"use client";

import { toast } from "sonner";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Modal } from "@highschool/components/modal";
import { useCreateFolderMutation } from "@highschool/react-query/queries";
import { Input } from "@highschool/ui/components/ui/input";

import { menuEventChannel } from "@/events/menu";
import { useMe } from "@/hooks/use-me";

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
          `/profile/${me?.username}/folder/${createFolder.data.data}`,
        );
        toast.success(createFolder.data.message);
      } else {
        menuEventChannel.emit("folderWithSetCreated", childSetId);
        onClose();
      }
    }
  }, [createFolder.isSuccess, createFolder.data]);

  const handleCreateFolder = async () => {
    await createFolder.mutateAsync({
      folderName: title,
      flashcardIds: childSetId ? [childSetId] : [],
    });
  };

  const handleEnter = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!title || title === "") {
      return;
    }
    if (e.key === "Enter") {
      await handleCreateFolder();
    }
  };

  return (
    <Modal
      buttonLabel="Tạo ngay"
      isDisabled={isDisabled}
      isOpen={isOpen}
      isPending={createFolder.isPending}
      title="Tạo thư mục"
      onClose={onClose}
      onConfirm={async () => {
        await handleCreateFolder();
      }}
    >
      <div className="pb-6">
        {" "}
        <Input
          className="h-12 w-full border-0 border-b-4 border-b-blue-300  bg-gray-100 pt-2 !text-lg font-bold shadow-none focus-within:border-b-4 focus-visible:border-b-blue-500 focus-visible:ring-0 dark:bg-gray-700 dark:focus-visible:border-blue-300"
          placeholder="Tiêu đề"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onKeyDown={(e) => handleEnter(e)}
        />
      </div>
    </Modal>
  );
};
