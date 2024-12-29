"use client";

import { toast } from "sonner";

import { useState } from "react";

import { Button } from "@highschool/ui/components/ui/button";

import { ConfirmModal } from "@/components/core/common/confirm-modal";

import { Wrapper } from "./wrapper";

export const DangerZone = () => {
  const [openConfirm, setOpenConfirm] = useState(false);
  return (
    <>
      <ConfirmModal
        isOpen={openConfirm}
        onClose={() => setOpenConfirm(false)}
        body="Bạn có chắc chắn muốn xoá tài khoản của mình không? Hành động này không thể hoàn tác"
        onConfirm={() => {
          toast.info("Trôn việt nam, ko xoá tài khoản được đâu 🙂‍↔️ ");
          setOpenConfirm(false);
        }}
        destructive
      />
      <Wrapper
        heading="Khu vực nguy hiểm"
        description="Các hành động trong khu vực này là không thể hoàn tác"
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
