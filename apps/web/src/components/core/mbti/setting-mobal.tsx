"use client";

import { Modal } from "@highschool/components";
import { cn } from "@highschool/ui/lib/utils";
import { IconChevronDown } from "@tabler/icons-react";
import { useState } from "react";

interface MBTISettingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MBTISettingModal = ({
  isOpen,
  onClose,
}: MBTISettingModalProps) => {
  const [viewShortcut, setViewShortcut] = useState<boolean>(false);

  return (
    <Modal withoutFooter isOpen={isOpen} title="Cài đặt" onClose={onClose}>
      <div className="flex cursor-pointer flex-row items-center justify-between">
        <p className="text-lg font-bold">Phím tắt</p>
        <button
          className="flex flex-row items-center gap-1 hover:opacity-80"
          onClick={() => {
            setViewShortcut(!viewShortcut);
          }}
        >
          <p className="text-primary  font-semibold">
            {viewShortcut ? "Ẩn" : "Xem"}
          </p>
          <IconChevronDown
            className={cn(
              "text-primary mb-1 transition-all ease-cubic-ease duration-150",
              viewShortcut && "rotate-180",
            )}
          />
        </button>
      </div>
    </Modal>
  );
};
