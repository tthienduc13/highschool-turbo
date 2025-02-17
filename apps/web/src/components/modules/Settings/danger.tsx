"use client";

import { toast } from "sonner";
import { useState } from "react";
import { Button } from "@highschool/ui/components/ui/button";

import { Wrapper } from "./wrapper";

import { ConfirmModal } from "@/components/core/common/confirm-modal";

export const DangerZone = () => {
  const [openConfirm, setOpenConfirm] = useState(false);

  return (
    <>
      <ConfirmModal
        destructive
        body="Bạn có chắc chắn muốn xoá tài khoản của mình không? Hành động này không thể hoàn tác"
        isOpen={openConfirm}
        onClose={() => setOpenConfirm(false)}
        onConfirm={() => {
          toast.info("Trôn việt nam, ko xoá tài khoản được đâu 🙂‍↔️ ");
          setOpenConfirm(false);
        }}
      />
      <Wrapper
        description="Các hành động trong khu vực này là không thể hoàn tác"
        heading="Khu vực nguy hiểm"
      >
        <Button
          size={"lg"}
          variant={"destructive"}
          onClick={() => setOpenConfirm(true)}
        >
          Xoá tài khoản
        </Button>
      </Wrapper>
    </>
  );
};
