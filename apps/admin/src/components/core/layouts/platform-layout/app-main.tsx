import { Button } from "@highschool/ui/components/ui/button";

import { IconLayoutSidebar, IconLayoutSidebarRight } from "@tabler/icons-react";

import { SidebarInset, useSidebar } from "../../common/sidebar";

export const AppMain = () => {
  const { toggleSidebar, open } = useSidebar();
  return (
    <SidebarInset className="bg-gray-100 p-3 dark:bg-gray-700">
      <div className="flex-1">
        <div className="box-border h-full rounded-sm border border-gray-50 bg-white shadow dark:border-gray-800">
          <div className="flex flex-row items-center justify-between border-b p-4">
            <div className="flex flex-row items-center gap-4">
              <Button
                onClick={toggleSidebar}
                data-sidebar="trigger"
                variant={"outline"}
                size={"icon"}
                className="h-8 w-8 rounded border-gray-100 dark:border-gray-700"
              >
                {open ? (
                  <IconLayoutSidebarRight className="!size-6" />
                ) : (
                  <IconLayoutSidebar className="!size-6" />
                )}
              </Button>
              <h1 className="text-lg font-medium">My Dashboard</h1>
            </div>
          </div>
        </div>
      </div>
    </SidebarInset>
  );
};
