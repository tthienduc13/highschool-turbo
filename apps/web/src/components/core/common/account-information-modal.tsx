"use client";

import { useEffect } from "react";
import { Modal } from "@highschool/components/modal";

import { SelectCity } from "@/components/modules/Home/finish-profile/select-city";
import { SelectClass } from "@/components/modules/Home/finish-profile/select-class";
import { SelectDob } from "@/components/modules/Home/finish-profile/select-dob";
import { SelectExamType } from "@/components/modules/Home/finish-profile/select-exam-type";
import { SelectSchool } from "@/components/modules/Home/finish-profile/select-school";
import { SelectSubject } from "@/components/modules/Home/finish-profile/select-subject";
import { menuEventChannel } from "@/events/menu";
import { useAccountInformationStore } from "@/stores/use-profile-information-store";

export interface ICity {
  name: string | null;
  id: number | null;
}

export const AccountInformationModal = () => {
  const { currentStep, open, setOpen } = useAccountInformationStore();

  useEffect(() => {
    const handler = () => {
      setOpen(true);
    };

    menuEventChannel.on("openInformationModal", handler);

    return () => {
      menuEventChannel.off("openInformationModal", handler);
    };
  }, []);

  const Components = () => {
    switch (currentStep) {
      case 0:
        return <SelectDob />;
      case 1:
        return <SelectCity />;
      case 2:
        return <SelectSchool />;
      case 3:
        return <SelectClass />;
      case 4:
        return <SelectExamType />;
      case 5:
        return <SelectSubject />;
      default:
        return null;
    }
  };

  return (
    <Modal withoutFooter isOpen={open} onClose={() => setOpen(false)}>
      <div className="pb-6">
        <Components />
      </div>
    </Modal>
  );
};
