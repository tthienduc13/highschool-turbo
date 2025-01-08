"use client";

import { signOut, useSession } from "next-auth/react";

import { useState } from "react";

import { Avatar, AvatarImage } from "@highschool/ui/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@highschool/ui/components/ui/dropdown-menu";

import {
  IconChevronDown,
  IconLogout2,
  IconSettings,
} from "@tabler/icons-react";

export const UserMenu = () => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const { data: session } = useSession();
  return (
    <DropdownMenu open={menuOpen} onOpenChange={setMenuOpen}>
      <DropdownMenuTrigger>
        <div className="flex flex-row items-center gap-2">
          <Avatar className="rounded-md border-2 border-[#1E1E2F] object-cover">
            <AvatarImage
              className="object-cover"
              src={session?.user.image ?? "/logo.svg"}
              alt={session?.user.fullname ?? "Người dùng Highschool"}
            ></AvatarImage>
          </Avatar>
          <IconChevronDown
            className={`transition-transform duration-200 ${
              menuOpen ? "rotate-180" : "rotate-0"
            }`}
          />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-48 gap-2 border-2 border-[#1E1E2F] p-0 shadow-md"
        side="bottom"
        sideOffset={10}
      >
        <DropdownMenuItem className="cursor-pointer rounded-none font-normal">
          <Avatar className="rounded-md object-cover">
            <AvatarImage
              className="object-cover"
              src={session?.user.image ?? "/logo.svg"}
              alt={session?.user.fullname ?? "Người dùng Highschool"}
            ></AvatarImage>
          </Avatar>
          {session?.user.fullname ?? session?.user.username}
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer rounded-none font-normal">
          <IconSettings size={20} className="!size-5" />
          Cài đặt
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={async () => {
            await signOut();
          }}
          className="cursor-pointer rounded-none font-normal"
        >
          <IconLogout2 size={20} className="!size-5" />
          Đăng xuất
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
