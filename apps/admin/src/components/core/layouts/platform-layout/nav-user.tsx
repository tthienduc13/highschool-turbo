"use client";
import { useSession } from "next-auth/react";
import { IconChevronUp } from "@tabler/icons-react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@highschool/ui/components/ui/avatar";

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "../../common/sidebar";

export function NavUser() {
  const { isMobile } = useSidebar();
  const { data } = useSession();

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton
          className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
          size="lg"
        >
          <Avatar className="size-8 rounded-lg">
            <AvatarImage
              alt={data?.user.fullname ?? "Người dùng Highschool"}
              src={data?.user.image}
            />
            <AvatarFallback className="rounded-lg">HS</AvatarFallback>
          </Avatar>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-semibold">
              {data?.user.fullname ?? data?.user.username}
            </span>
            <span className="truncate text-xs">{data?.user.email}</span>
          </div>
          <IconChevronUp className="ml-auto size-4" />
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
