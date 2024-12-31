"use client";

import { useEffect, useState } from "react";

import { menuEventChannel } from "@/events/menu";
import { Modal } from "./modal";
import { SelectCity } from "@/components/modules/Home/finish-profile/select-city";
import { SelectSchool } from "@/components/modules/Home/finish-profile/select-school";
import { SelectExamType } from "@/components/modules/Home/finish-profile/select-exam-type";
import { SelectSubject } from "@/components/modules/Home/finish-profile/select-subject";
import { useAccountInformationStore } from "@/stores/use-profile-information-store";
import { SelectClass } from "@/components/modules/Home/finish-profile/select-class";

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
    <Modal isOpen={open} onClose={() => setOpen(false)} withoutFooter>
      <Components />
    </Modal>
  );
};
