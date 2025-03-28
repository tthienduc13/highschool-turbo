"use client";

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@highschool/ui/components/ui/sidebar";
import { cn } from "@highschool/ui/lib/utils";
import { TablerIcon } from "@tabler/icons-react";
import Link from "next/link";

import { useAppStore } from "@/stores/use-app-store";

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon: TablerIcon;
    isActive?: boolean;
  }[];
}) {
  const { state } = useSidebar();
  const { closeSidebar } = useAppStore();
  const isCollapsed = state === "collapsed";

  return (
    <SidebarMenu
      className={cn(
        "px-2 pt-2 bg-transparent w-full transition-all duration-300 ease-in-out ",
        isCollapsed && "items-center",
      )}
    >
      {items.map((item) => (
        <SidebarMenuItem key={item.title}>
          <SidebarMenuButton
            asChild
            className="group-data-[collapsible=icon]:!size-10"
            isActive={item.isActive}
            size="lg"
            tooltip={isCollapsed ? item.title : undefined}
            onClick={() => closeSidebar()}
          >
            <Link
              className={cn(
                "flex items-center  group-data-[collapsible=icon]:!p-0",
                isCollapsed && "justify-center",
              )}
              href={item.url}
            >
              <item.icon className="!size-6" />
              {!isCollapsed && (
                <span className="ml-2 text-base font-medium">{item.title}</span>
              )}
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}
