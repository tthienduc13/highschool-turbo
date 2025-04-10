"use client";

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
} from "@highschool/ui/components/ui/sidebar";
import { cn } from "@highschool/ui/lib/utils";
import { useRouter } from "next/navigation";

import { useMe } from "@/hooks/use-me";

export function NavUser() {
  const me = useMe();
  const { state } = useSidebar();
  const router = useRouter();
  const isCollapsed = state === "collapsed";

  return (
    <SidebarMenu
      className={cn(
        " pt-2 bg-transparent w-full transition-all duration-300 ease-in-out ",
        isCollapsed && "items-center",
      )}
    >
      <SidebarMenuItem>
        <SidebarMenuButton
          className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
          size="lg"
          onClick={() => router.push(`/profile/${me?.username}`)}
        >
          <Avatar className="size-8 rounded-lg">
            <AvatarImage
              alt={me?.fullname ?? "Người dùng Highschool"}
              src={me?.image ?? "/logo.svg"}
            />
            <AvatarFallback className="rounded-lg">HS</AvatarFallback>
          </Avatar>
          <div className="grid flex-1 truncate text-left text-base leading-tight">
            <span className="truncate break-all font-semibold">
              {me?.fullname!}
            </span>
          </div>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
