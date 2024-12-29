"use client";

import { useSession } from "next-auth/react";

import { useState } from "react";

import { useRouter } from "next/navigation";

import { Button } from "@highschool/ui/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@highschool/ui/components/ui/dropdown-menu";
import { cn } from "@highschool/ui/lib/utils";

import {
  IconCards,
  IconChevronDown,
  IconFile,
  IconFolder,
  IconSparkles,
} from "@tabler/icons-react";

import { TeacherOnly } from "../../common/teacher-only";
import { UserMobileOption } from "./user-mobile-option";

export interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onFolderClick: () => void;
  // onClassClick: () => void;
  // onImportClick: () => void;
}

export const MobileMenu = ({
  isOpen,
  onClose,
  onFolderClick,
}: MobileMenuProps) => {
  const router = useRouter();
  const { data: session, update } = useSession();
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <>
      <div
        className={cn(
          "ease-cubic-ease absolute left-0 top-20 h-[calc(100vh-80px)] w-full bg-[rgba(247,250,252,0.75)] backdrop-blur-sm transition-opacity duration-200 dark:bg-[rgba(23,25,35,0.75)]",
          isOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0",
        )}
        onClick={onClose}
      />
      <div
        className={cn(
          "absolute inset-x-0 flex flex-col gap-8 px-6 py-6 pt-10 backdrop-blur-sm",
          isOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0",
        )}
      >
        <div className="w flex w-full flex-col items-center gap-4">
          {session?.user && (
            <Button
              size={"lg"}
              variant={"outline"}
              className="w-full"
              onClick={() => {
                onClose();
                router.push("/");
              }}
            >
              Trang chủ
            </Button>
          )}
          <DropdownMenu open={menuOpen} onOpenChange={() => setMenuOpen(false)}>
            <DropdownMenuTrigger asChild className="w-full">
              <Button
                size={"lg"}
                className="w-full"
                onClick={() => setMenuOpen(!menuOpen)}
              >
                Tạo mới
                <IconChevronDown
                  style={{
                    transition: "rotate ease-in-out 200ms",
                    rotate: menuOpen ? "180deg" : "0deg",
                  }}
                />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              side="bottom"
              sideOffset={10}
              style={{
                zIndex: 10000,
                width: "var(--radix-dropdown-menu-trigger-width)",
              }}
              className="w-full p-0"
            >
              <DropdownMenuGroup>
                <DropdownMenuItem className="px-3 py-2 text-base">
                  <IconCards size={20} className="!size-5" />
                  Bộ thẻ mới
                </DropdownMenuItem>
                <DropdownMenuItem className="px-3 py-2 text-base">
                  <IconSparkles size={20} className="!size-5" />
                  Bộ thẻ mới với AI
                </DropdownMenuItem>
                <TeacherOnly>
                  <DropdownMenuItem className="px-3 py-2 text-base">
                    <IconFile size={20} className="!size-5" />
                    Tài liệu
                  </DropdownMenuItem>
                </TeacherOnly>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="px-3 py-2 text-base"
                onClick={() => {
                  onClose();
                  onFolderClick();
                }}
              >
                <IconFolder size={20} className="!size-5" />
                Thư mục mới
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <UserMobileOption onClose={onClose} />
      </div>
    </>
  );
};
