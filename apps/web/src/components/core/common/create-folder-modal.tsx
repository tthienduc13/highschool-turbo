"use client";

import { useState } from "react";
import { Modal } from "./modal";
import { useSession } from "next-auth/react";
import { Input } from "@highschool/ui/components/ui/input";

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
    const [title, setTitle] = useState("");

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Tạo thư mục"
            buttonLabel="Tạo ngay"
            // loading={}
        >
            <Input
                placeholder="Tiêu đề"
                onChange={(e) => setTitle(e.target.value)}
                className="w-full border-0 border-b-4 border-b-transparent h-12 pt-2 bg-gray-100 dark:bg-gray-700 focus-within:border-b-4 focus-visible:border-b-blue-500 dark:focus-visible:border-blue-300 focus-visible:ring-0 shadow-none !text-lg font-bold"
            />
        </Modal>
    );
};
