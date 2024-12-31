"use client";

import { useEffect, useState } from "react";

import { menuEventChannel } from "@/events/menu";
import { Modal } from "./modal";

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

  return (
    <Modal isOpen={open} onClose={() => setOpen(false)} withoutFooter></Modal>
  );
};
