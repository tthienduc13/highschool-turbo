"use client";

import { useState } from "react";

import Link from "next/link";

import { GameButton } from "@highschool/ui/components/ui/game-button";

import { IconLogin2, IconPlus } from "@tabler/icons-react";

import { CreateKetModal } from "../create-ket-modal";
import { Logo } from "../logo";
import { UserMenu } from "../user-menu";

export const AdminHeader = () => {
  const [openCreate, setOpenCreate] = useState<boolean>(false);
  return (
    <>
      <CreateKetModal
        isOpen={openCreate}
        onClose={() => setOpenCreate(false)}
      />
      <div className="flex w-full items-center justify-between px-4 py-4">
        <div className="flex flex-row items-center gap-4">
          <Logo />
          <GameButton
            onClick={() => setOpenCreate(true)}
            className="flex items-center gap-2"
            withOverlay
          >
            <IconPlus className="!size-[20px]" />
            Tạo mới
          </GameButton>
        </div>
        <div className="flex w-fit flex-row items-center gap-4">
          <Link href={"/play"}>
            <GameButton className="flex items-center gap-2" withOverlay>
              <IconLogin2 size={20} />
              Nhập mã phòng
            </GameButton>
          </Link>
          <UserMenu />
        </div>
      </div>
    </>
  );
};
