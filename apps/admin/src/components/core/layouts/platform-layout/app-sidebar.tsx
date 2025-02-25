"use client";

import type * as React from "react";

import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../../common/sidebar";

import { NavUser } from "./nav-user";
import { NavMain } from "./nav-main";

import { UserRole } from "@/domain/enums/user";
import { navAdmin, navModerator } from "@/domain/constants/sidebar";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data } = useSession();

  const nav =
    data?.user.roleName === UserRole[UserRole.Admin] ? navAdmin : navModerator;

  return (
    <Sidebar
      //className="top-[--header-height] !h-[calc(100svh-var(--header-height))]"
      collapsible="icon"
      {...props}
    >
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild size="lg">
              <Link href="#">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg border-gray-100 text-sidebar-primary-foreground">
                  <Image alt="Logo" height={32} src={"/logo.svg"} width={32} />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">Highschool</span>
                  <span className="truncate text-xs">Enterprise</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={nav.navMain} />
        {/* <NavSecondary className="mt-auto" items={nav.navSecondary} /> */}
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
