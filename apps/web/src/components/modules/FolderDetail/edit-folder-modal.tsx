"use client";

import { useState } from "react";
import { Modal } from "@highschool/components/modal";
import { useUpdateFolderMutation } from "@highschool/react-query/queries";
import { Input } from "@highschool/ui/components/ui/input";

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
      buttonLabel="Lưu"
      isDisabled={isDisabled}
      isOpen={isOpen}
      isPending={updateFolderMutation.isPending}
      title="Chỉnh sửa thư mục"
      onClose={onClose}
      onConfirm={async () => {
        await updateFolderMutation.mutateAsync({
          folderName: title,
          folderId: folder.folderUser.id,
        });
        onClose();
      }}
    >
      <Input
        className="h-12 w-full border-0 border-b-4 border-b-blue-300  bg-gray-100 pt-2 !text-lg font-bold shadow-none focus-within:border-b-4 focus-visible:border-b-blue-500 focus-visible:ring-0 dark:bg-gray-700 dark:focus-visible:border-blue-300"
        placeholder="Tiêu đề"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
    </Modal>
  );
};
