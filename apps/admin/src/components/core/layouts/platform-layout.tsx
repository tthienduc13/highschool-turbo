"use client";

import { SidebarProvider } from "../common/sidebar";
import { AppMain } from "./platform-layout/app-main";
import { AppSidebar } from "./platform-layout/app-sidebar";

function PlatformLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="flex h-screen w-screen flex-row bg-gray-100">
        {/* <div className="h-full p-3">
          <div className="h-full w-fit rounded-lg border border-gray-50 bg-white p-3 shadow dark:border-gray-800">
            <div className="flex flex-col">
              <Button
                size={"icon"}
                variant={"ghost"}
                className="bg-secondary h-8 w-8 rounded-sm"
              >
                <IconTableFilled className="!size-5" />
              </Button>
            </div>
          </div>
        </div>
        <div className="flex-1 py-3 pl-1 pr-3">
          <div className="box-border h-full rounded-lg border border-gray-50 bg-white shadow dark:border-gray-800">
            <div className="flex flex-row items-center justify-between border-b p-4">
              <div className="flex flex-row items-center gap-4">
                <Button
                  variant={"outline"}
                  size={"icon"}
                  className="h-8 w-8 rounded border-gray-100 dark:border-gray-700"
                >
                  <IconLayoutSidebar className="!size-6" />
                </Button>
                <h1 className="text-lg font-medium">My Dashboard</h1>
              </div>
            </div>
          </div>
        </div> */}
        <SidebarProvider>
          {/* <div className="p-3 pr-0">
            <div className="h-full w-fit rounded-lg border border-gray-50 bg-white px-4 py-3 shadow dark:border-gray-800">
              <div className="flex flex-col">
                <Button
                  size={"icon"}
                  variant={"ghost"}
                  className="bg-secondary h-8 w-8 rounded-sm"
                >
                  <IconTableFilled className="!size-5" />
                </Button>
              </div>
            </div>
          </div> */}
          <AppSidebar />
          <AppMain />
        </SidebarProvider>
      </div>
    </>
  );
}

export default PlatformLayout;
