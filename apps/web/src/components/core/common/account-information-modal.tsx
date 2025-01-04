"use client";

import { useEffect } from "react";

import { SelectCity } from "@/components/modules/Home/finish-profile/select-city";
import { SelectClass } from "@/components/modules/Home/finish-profile/select-class";
import { SelectExamType } from "@/components/modules/Home/finish-profile/select-exam-type";
import { SelectSchool } from "@/components/modules/Home/finish-profile/select-school";
import { SelectSubject } from "@/components/modules/Home/finish-profile/select-subject";
import { menuEventChannel } from "@/events/menu";
import { useAccountInformationStore } from "@/stores/use-profile-information-store";

import { Modal } from "./modal";

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
        return <SelectCity />;
      case 1:
        return <SelectSchool />;
      case 2:
        return <SelectClass />;
      case 3:
        return <SelectExamType />;
      case 4:
        return <SelectSubject />;
      default:
        return null;
    }
  };

  return (
    <Modal withoutFooter isOpen={open} onClose={() => setOpen(false)}>
      <Components />
    </Modal>
  );
};
