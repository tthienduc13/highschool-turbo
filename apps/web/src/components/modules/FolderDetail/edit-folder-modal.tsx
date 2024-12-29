"use client";

import { useState } from "react";

import { useUpdateFolderMutation } from "@highschool/react-query/queries";
import { Input } from "@highschool/ui/components/ui/input";

import { Modal } from "@/components/core/common/modal";
import { useFolder } from "@/hooks/use-folder";

interface EditFolderModalProps {
  folderTitle: string;
  isOpen: boolean;
  onClose: () => void;
}

export const EditFolderModal = ({
  folderTitle,
  isOpen,
  onClose,
}: EditFolderModalProps) => {
  const [title, setTitle] = useState(folderTitle);
  const folder = useFolder();
  const updateFolderMutation = useUpdateFolderMutation();

  const isDisabled =
    title.length === 0 ||
    updateFolderMutation.isPending ||
    title.trim() === folderTitle.trim();

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Chỉnh sửa thư mục"
      buttonLabel="Lưu"
      isPending={updateFolderMutation.isPending}
      isDisabled={isDisabled}
      onConfirm={async () => {
        await updateFolderMutation.mutateAsync({
          folderName: title,
          folderId: folder.folderUser.id,
        });
        onClose();
      }}
    >
      <Input
        placeholder="Tiêu đề"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="h-12 w-full border-0 border-b-4 border-b-blue-300 border-b-transparent bg-gray-100 pt-2 !text-lg font-bold shadow-none focus-within:border-b-4 focus-visible:border-b-blue-500 focus-visible:ring-0 dark:bg-gray-700 dark:focus-visible:border-blue-300"
      />
    </Modal>
  );
};
