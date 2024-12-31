"use client";

import { signOut, useSession } from "next-auth/react";
import { useTheme } from "next-themes";

import { useState } from "react";

import { useRouter } from "next/navigation";

import { env } from "@highschool/env";
import { Avatar, AvatarImage } from "@highschool/ui/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@highschool/ui/components/ui/dropdown-menu";

import {
  IconBug,
  IconChevronDown,
  IconLifebuoy,
  IconLogout,
  IconMoon,
  IconSettings,
  IconSun,
  IconUser,
  TablerIcon,
} from "@tabler/icons-react";

type MenuItem = {
  label: string;
  icon: TablerIcon;
  action: () => void;
};

export const UserMenu = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);

  const user = session?.user;

  const menuItems: MenuItem[] = [
    {
      label: "Thông tin cá nhân",
      icon: IconUser,
      action: () => router.push(`/profile/${user?.username}`),
    },
    {
      label: "Cài đặt",
      icon: IconSettings,
      action: () => router.push(`/settings`),
    },
    {
      label: `Chế độ ${theme === "light" ? "tối" : "sáng"}`,
      icon: theme === "dark" ? IconSun : IconMoon,
      action: () => setTheme(theme === "dark" ? "light" : "dark"),
    },
  ];

  const supportItems: MenuItem[] = [
    {
      label: "Hỗ trợ",
      icon: IconLifebuoy,
      action: () => router.push(`${env.NEXT_PUBLIC_LANDING_URL}/ho-tro`),
    },
    {
      label: "Báo cáo",
      icon: IconBug,
      action: () => alert("Report"),
    },
  ];

  return (
    <div className="flex gap-2">
      <DropdownMenu open={menuOpen} onOpenChange={setMenuOpen}>
        <DropdownMenuTrigger asChild>
          <div className="flex cursor-pointer items-center gap-2 hover:opacity-95">
            <Avatar className="size-8">
              <AvatarImage
                src={user?.image ?? ""}
                alt={user?.fullname ?? "Chưa đặt tên"}
              />
            </Avatar>
            <p className="font-semibold">{user?.fullname ?? "Chưa đặt tên"}</p>
            <IconChevronDown
              className={`transition-transform duration-200 ${
                menuOpen ? "rotate-180" : "rotate-0"
              }`}
            />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="w-48 border-gray-200 dark:border-gray-700"
          side="bottom"
          sideOffset={10}
        >
          <DropdownMenuGroup>
            {menuItems.map(({ label, icon: Icon, action }, index) => (
              <DropdownMenuItem
                key={index}
                onClick={action}
                className="cursor-pointer"
              >
                <Icon size={18} className="text-base" />
                {label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            {supportItems.map(({ label, icon: Icon, action }, index) => (
              <DropdownMenuItem
                key={index}
                onClick={action}
                className="cursor-pointer"
              >
                <Icon size={18} className="text-base" />
                {label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={async () => {
              await signOut();
            }}
            className="cursor-pointer"
          >
            <IconLogout size={18} className="text-base" />
            Đăng xuất
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
