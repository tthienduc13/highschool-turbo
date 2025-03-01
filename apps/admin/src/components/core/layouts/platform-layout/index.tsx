"use client";

import { SidebarInset, SidebarProvider } from "../../common/sidebar";

import { AppSidebar } from "./app-sidebar";
import { SiteHeader } from "./site-header";

function PlatformLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="[--header-height:calc(theme(spacing.14))]">
      <SidebarProvider className="flex flex-col">
        <div className="flex flex-1">
          <AppSidebar />
          <SidebarInset>
            <SiteHeader />
            <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
              {children}
            </div>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </div>
  );
}

export default PlatformLayout;
