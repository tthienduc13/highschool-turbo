"use client";

import { toast } from "sonner";

import { useState } from "react";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

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
  IconDice6,
  IconFileTypePdf,
  IconFolder,
  IconHome,
  IconSparkles,
  TablerIcon,
} from "@tabler/icons-react";

import { Logo } from "@/components/core/common/logo";
import { TeacherOnly } from "@/components/core/common/teacher-only";
import { AnimatedBackground } from "@/components/ui/animated-hover-tab";
import { useIsTeacher } from "@/hooks/use-role";

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
  const isTeacher = useIsTeacher();

  const currentPathName = usePathname();

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

  const STUDENT_TABS = [
    { name: "Trang chủ", href: "/" },
    { name: "Môn học", href: "/courses" },
    { name: "Lộ trình học", href: "/roadmap" },
  ];

  const TEACHER_TAB = [{ name: "Trang chủ", href: "/" }];

  return (
    <div className="flex flex-row items-center gap-4">
      <Logo />
      <div className="hidden flex-row items-center gap-4 md:flex">
        <div className="flex flex-row gap-2">
          {isTeacher ? (
            <AnimatedBackground
              defaultValue={STUDENT_TABS[0].href}
              className="rounded-md bg-blue-500/20 dark:bg-blue-500/80"
              transition={{
                type: "spring",
                bounce: 0.2,
                duration: 0.3,
              }}
              enableHover
            >
              {TEACHER_TAB.map((tab, index) => (
                <button
                  key={index}
                  onClick={() => router.push(tab.href)}
                  data-id={tab}
                  type="button"
                  className={cn(
                    "relative flex cursor-pointer items-center justify-center whitespace-nowrap rounded-md px-4 py-2 !text-base font-medium transition-colors duration-300 hover:bg-transparent hover:text-blue-700 dark:hover:text-blue-200",
                    currentPathName === tab.href &&
                      "text-blue-700 dark:text-blue-200",
                  )}
                >
                  {tab.name}
                  {currentPathName === tab.href && (
                    <div className="absolute bottom-2 left-1/2 h-[3px] w-[calc(100%-30px)] -translate-x-1/2 bg-blue-500" />
                  )}
                </button>
              ))}
            </AnimatedBackground>
          ) : (
            <AnimatedBackground
              defaultValue={STUDENT_TABS[0].href}
              className="rounded-md bg-blue-500/20 dark:bg-blue-500/80"
              transition={{
                type: "spring",
                bounce: 0.2,
                duration: 0.3,
              }}
              enableHover
            >
              {STUDENT_TABS.map((tab, index) => (
                <button
                  key={index}
                  onClick={() => router.push(tab.href)}
                  data-id={tab}
                  type="button"
                  className={cn(
                    "relative flex cursor-pointer items-center justify-center whitespace-nowrap rounded-md px-4 py-2 !text-base font-medium transition-colors duration-300 hover:bg-transparent hover:text-blue-700 dark:hover:text-blue-200",
                    currentPathName === tab.href &&
                      "text-blue-700 dark:text-blue-200",
                  )}
                >
                  {tab.name}
                  {currentPathName === tab.href && (
                    <div className="absolute bottom-2 left-1/2 h-[3px] w-[calc(100%-30px)] -translate-x-1/2 bg-blue-500" />
                  )}
                </button>
              ))}
            </AnimatedBackground>
          )}
        </div>
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
