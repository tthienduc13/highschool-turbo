"use client";

import { Modal } from "@highschool/components";
import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";

import { ShortcutListSection } from "../../common/shorcut-list-section";

import { Shortcut } from "@/types/shortcut";
import { useHollandTestContext } from "@/stores/use-holland-test-store";

interface HollandModalProps {
  isOpen: boolean;
  onClose: () => void;
  showInstruction: () => void;
}

const SHORTCUT_LIST: Shortcut[] = [
  { label: "Câu trước", shortcut: <IconArrowLeft /> },
  { label: "Câu tiếp theo", shortcut: <IconArrowRight /> },
  { label: "Chọn câu 1", shortcut: "1" },
  { label: "Chọn câu 2", shortcut: "2" },
  { label: "Chọn câu 3", shortcut: "3" },
  { label: "Chọn câu 4", shortcut: "4" },
  { label: "Chọn câu 5", shortcut: "5" },
  { label: "Chọn câu 6", shortcut: "6" },
];

export const HollandModal = ({
  showInstruction,
  isOpen,
  onClose,
}: HollandModalProps) => {
  const reset = useHollandTestContext((s) => s.reset);

  return (
    <Modal
      withoutCancel
      buttonLabel="Làm lại"
      isOpen={isOpen}
      title="Tuỳ chọn"
      onClose={onClose}
      onConfirm={() => {
        reset();
        onClose();
      }}
    >
      <div className="flex w-full flex-col gap-6 pb-6">
        <div className="flex flex-row items-center justify-between">
          <p className="text-lg font-semibold">Hướng dẫn</p>
          <button
            className="group flex flex-row items-center gap-1 hover:opacity-80"
            onClick={showInstruction}
          >
            <p className="text-sm font-semibold">Tới hướng dẫn</p>
            <div className=" transition-all duration-200 ease-in-out group-hover:-rotate-45">
              <IconArrowRight size={16} />
            </div>
          </button>
        </div>
        <ShortcutListSection shortcutList={SHORTCUT_LIST} />
      </div>
    </Modal>
  );
};
