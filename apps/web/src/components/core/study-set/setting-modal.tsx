import { Modal } from "../common/modal";

interface SettingModal {
    isOpen: boolean;
    onClose: () => void;
}

export const SettingModal = ({ isOpen, onClose }: SettingModal) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Cài đặt">
            <div> flascard setting modal</div>
        </Modal>
    );
};
