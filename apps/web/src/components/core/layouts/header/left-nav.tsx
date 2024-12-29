"use client";

import { toast } from "sonner";

import { useState } from "react";

import Link from "next/link";
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

import {
  IconCards,
  IconChevronDown,
  IconDice6,
  IconFileTypePdf,
  IconFolder,
  IconSparkles,
  TablerIcon,
} from "@tabler/icons-react";

import { Logo } from "@/components/core/common/logo";
import { TeacherOnly } from "@/components/core/common/teacher-only";

type MenuItem = {
  label: string;
  icon: TablerIcon;
  onClick: () => void;
  teacherOnly?: boolean;
  separator?: boolean;
};

interface LeftNavProps {
  onFolderClick: () => void;
}

export const LeftNav = ({ onFolderClick }: LeftNavProps) => {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleItemClick = (label: string) => {
    toast(label, {
      description: "Sunday, December 03, 2023 at 9:00 AM",
      action: {
        label: "Undo",
        onClick: () => console.log("Undo"),
      },
    });
  };

  const menuItems: MenuItem[] = [
    {
      label: "Bộ thẻ mới",
      icon: IconCards,
      onClick: () => router.push("/study-set/create"),
    },
    {
      label: "Bộ thẻ mới với AI",
      icon: IconSparkles,
      onClick: () => handleItemClick("Bộ thẻ mới với AI"),
    },
    {
      label: "Tài liệu",
      icon: IconFileTypePdf,
      onClick: () => handleItemClick("Tài liệu"),
      teacherOnly: true,
    },
    {
      label: "Coolket",
      icon: IconDice6,
      onClick: () => handleItemClick("Coolket"),
      teacherOnly: true,
    },
    {
      label: "Thư mục mới",
      icon: IconFolder,
      onClick: onFolderClick,
      separator: true,
    },
  ];

  return (
    <div className="flex flex-row items-center gap-4">
      <Logo />
      <div className="hidden flex-row items-center gap-2 md:flex">
        <Link href={"/"}>
          <Button variant="ghost">Trang chủ</Button>
        </Link>
        <DropdownMenu open={menuOpen} onOpenChange={setMenuOpen}>
          <DropdownMenuTrigger asChild>
            <Button size="lg">
              Tạo mới
              <IconChevronDown
                className={`transition-transform duration-200 ${
                  menuOpen ? "rotate-180" : "rotate-0"
                }`}
              />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            side="bottom"
            align="start"
            style={{ zIndex: 10000 }}
            className="w-48"
          >
            <DropdownMenuGroup>
              {menuItems.map(
                (
                  { label, icon: Icon, onClick, teacherOnly, separator },
                  index,
                ) =>
                  teacherOnly ? (
                    <TeacherOnly key={index}>
                      <DropdownMenuItem
                        className="group cursor-pointer px-3 py-2 text-base"
                        onClick={onClick}
                      >
                        <Icon
                          size={20}
                          className="transition-transform group-hover:rotate-[-20deg] group-hover:scale-125"
                        />
                        {label}
                      </DropdownMenuItem>
                      {separator && <DropdownMenuSeparator />}
                    </TeacherOnly>
                  ) : (
                    <DropdownMenuItem
                      key={index}
                      className="group cursor-pointer px-3 py-2 text-base"
                      onClick={onClick}
                    >
                      <Icon
                        size={20}
                        className="transition-transform group-hover:rotate-[-10deg] group-hover:scale-110"
                      />
                      {label}
                      {separator && <DropdownMenuSeparator />}
                    </DropdownMenuItem>
                  ),
              )}
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};
