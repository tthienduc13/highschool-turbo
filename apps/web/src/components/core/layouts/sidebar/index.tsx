import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarSeparator,
} from "@highschool/ui/components/ui/sidebar";
import {
  IconBook2,
  IconCards,
  IconFolder,
  IconLayoutDashboard,
} from "@tabler/icons-react";
import { usePathname } from "next/navigation";

import { NavMain } from "./nav-main";
import { NavUser } from "./nav-user";

import { useMe } from "@/hooks/use-me";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathName = usePathname();
  const me = useMe();
  const data = {
    navMain: [
      {
        title: "Hồ sơ cá nhân",
        url: "/dashboard",
        icon: IconLayoutDashboard,
        isActive: pathName === "/dashboard",
      },
      {
        title: "Các môn học",
        url: "/courses",
        icon: IconBook2,
        isActive: pathName === "/courses",
      },
      {
        title: "Thẻ ghi nhớ của tôi",
        url: `/profile/${me?.username}?type=Flashcard`,
        icon: IconCards,
      },

      {
        title: "Thư mục của tôi",
        url: `/profile/${me?.username}?type=Folder`,
        icon: IconFolder,
      },
    ],
    //   navSecondary: [
    //     {
    //       title: "Calendar",
    //       url: "#",
    //       icon: Calendar,
    //     },
    //     {
    //       title: "Settings",
    //       url: "#",
    //       icon: Settings2,
    //     },
    //     {
    //       title: "Templates",
    //       url: "#",
    //       icon: Blocks,
    //     },
    //     {
    //       title: "Trash",
    //       url: "#",
    //       icon: Trash2,
    //     },
    //     {
    //       title: "Help",
    //       url: "#",
    //       icon: MessageCircleQuestion,
    //     },
    //   ],
  };

  return (
    <Sidebar
      className="!h-[calc(100vh - 88px)] top-[88px] border-none !bg-black"
      collapsible="icon"
      {...props}
    >
      <SidebarHeader className="!bg-gray-50 dark:!bg-gray-900">
        <NavUser />
      </SidebarHeader>
      <SidebarSeparator />
      <SidebarContent className="flex-1 !bg-gray-50 dark:!bg-gray-900">
        <NavMain items={data.navMain} />
        <SidebarSeparator />
        {/* <NavFavorites favorites={data.favorites} />
        <NavWorkspaces workspaces={data.workspaces} />
        <NavSecondary className="mt-auto" items={data.navSecondary} /> */}
      </SidebarContent>

      {/* <SidebarRail /> */}
    </Sidebar>
  );
}
