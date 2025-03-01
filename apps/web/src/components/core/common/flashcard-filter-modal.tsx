import { Modal } from "@highschool/components";

interface FlashcardFilterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FlashcardFilterModal = ({
  isOpen,
  onClose,
}: FlashcardFilterModalProps) => {
  return (
    <Modal
      buttonLabel="Áp dụng"
      cancelLabel="Xoá tất cả"
      isOpen={isOpen}
      title="Bộ lọc"
      onClose={onClose}
    />
  );
};
