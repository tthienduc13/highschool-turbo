import { FlashcardContent } from "@highschool/interfaces";
import { Modal } from "../common/modal";

export interface EditTermModalProps {
    term: FlashcardContent | null;
    isOpen: boolean;
    onClose: () => void;
    onDefinition: boolean;
}

export const EditTermModal = ({
    term,
    isOpen,
    onClose,
    onDefinition,
}: EditTermModalProps) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Chỉnh sửa thẻ">
            <div></div>
        </Modal>
    );
};
