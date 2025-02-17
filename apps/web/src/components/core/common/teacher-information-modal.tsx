"use client";

import { useEffect, useState } from "react";
import { Modal } from "@highschool/components/modal";

import { menuEventChannel } from "@/events/menu";

export const TeacherInformationModal = () => {
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    const handler = () => {
      setOpen(true);
    };

    menuEventChannel.on("openTeacherInformationModal", handler);

    return () => {
      menuEventChannel.off("openTeacherInformationModal", handler);
    };
  }, []);

  return <Modal withoutFooter isOpen={open} onClose={() => setOpen(false)} />;
};
