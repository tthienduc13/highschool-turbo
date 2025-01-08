"use client";

import { Modal } from "@highschool/components/modal";
import { StudySetVisibility } from "@highschool/interfaces";

export interface VisibilityModalProps {
  isOpen: boolean;
  onClose: () => void;
  visibility: StudySetVisibility;
  noPrivate?: boolean;
  onChangeVisibility: (visibility: StudySetVisibility) => void;
}

export const VisibilityModal = ({
  isOpen,
  onClose,
  onChangeVisibility,
}: VisibilityModalProps) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Thay đổi trạng thái"
      withoutFooter
    >
      {/* TODO: change visibility modal */}
    </Modal>
  );
};
