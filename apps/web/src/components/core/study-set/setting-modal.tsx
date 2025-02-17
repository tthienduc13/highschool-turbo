import { Modal } from "@highschool/components/modal";

interface SettingModal {
  isOpen: boolean;
  onClose: () => void;
}

export const SettingModal = ({ isOpen, onClose }: SettingModal) => {
  return (
    <Modal isOpen={isOpen} title="Cài đặt" onClose={onClose}>
      <div> flascard setting modal</div>
    </Modal>
  );
};
