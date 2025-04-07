"use client";

import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import { Toaster } from "@highschool/ui/components/ui/sonner";
import {
  SidebarInset,
  SidebarProvider,
} from "@highschool/ui/components/ui/sidebar";

import { Header } from "./header";
import { AppSidebar } from "./sidebar";
import { Footer } from "./footer";

import GlobalShortcutLayer from "@/components/core/common/global-shortcut-layer";
import TopLoadingBar from "@/components/core/common/top-loading-bar";
import { useAppStore } from "@/stores/use-app-store";

const DynamicComponents = {
  SignupModal: dynamic(
    () =>
      import("@/components/core/common/sign-up-modal").then(
        (mod) => mod.SignUpModal,
      ),
    { ssr: false },
  ),
  ConfettiLayer: dynamic(
    () =>
      import("@/components/core/common/confetti-layer").then(
        (mod) => mod.ConfettiLayer,
      ),
    { ssr: false },
  ),
  CareerGuidanceModal: dynamic(
    () =>
      import("@/components/core/common/career-guidance-modal").then(
        (mod) => mod.CareerGuidanceModal,
      ),
    { ssr: false },
  ),
  AccountInformationModal: dynamic(
    () =>
      import("@/components/core/common/account-information-modal").then(
        (mod) => mod.AccountInformationModal,
      ),
    { ssr: false },
  ),
  TeacherInformationModal: dynamic(
    () =>
      import("@/components/core/common/teacher-information-modal").then(
        (mod) => mod.TeacherInformationModal,
      ),
    { ssr: false },
  ),
  ReportModal: dynamic(
    () =>
      import("@/components/core/common/report-modal").then(
        (mod) => mod.ReportModal,
      ),
    { ssr: false },
  ),
  NetworkStatusNotifier: dynamic(
    () =>
      import("@/components/core/common/network-notifier").then(
        (mod) => mod.NetworkStatusNotifier,
      ),
    { ssr: false },
  ),
};

function PlatformLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathName = usePathname();
  const { isOpenSidebar, isOpenMobileSidebar } = useAppStore();

  const shouldHideHeader = () => {
    const hideHeaders = ["/roadmap"];

    return hideHeaders.includes(pathName);
  };

  const shouldHideSidebar = () => {
    if (pathName.endsWith("/flashcards")) return true;

    if (pathName.includes("/chapters/")) return true;

    return false;
  };

  const shouldHideFooter = () => {
    if (pathName.endsWith("/flashcards")) return true;

    if (pathName.includes("/chapters/")) return true;

    return false;
  };

  const isHideHeader = shouldHideHeader();
  const hideSidebar = shouldHideSidebar();
  const hideFooter = shouldHideFooter();

  return (
    <>
      <div className="min-h-screen w-screen">
        {!isHideHeader && (
          <div className="sticky top-0 z-50">
            <Header />
            <TopLoadingBar />
          </div>
        )}
        <SidebarProvider
          className="top-[88px] flex flex-col bg-transparent "
          defaultOpen={false}
          open={isOpenSidebar}
          openMobile={isOpenMobileSidebar}
          onOpenChange={(open) => useAppStore.setState({ isOpenSidebar: open })}
          onOpenMobileChange={(open) =>
            useAppStore.setState({ isOpenMobileSidebar: open })
          }
        >
          {!hideFooter ? (
            <>
              <div
                className="flex flex-row"
                style={{
                  minHeight: "calc(100vh - 88px )",
                  marginTop: "20px",
                  paddingBottom: "112px",
                }}
              >
                {!hideSidebar && <AppSidebar />}
                <SidebarInset className="relative flex-1 bg-transparent">
                  {children}
                </SidebarInset>
              </div>
              <Footer />
            </>
          ) : (
            <div className="flex h-[calc(100vh-88px)] flex-row">
              {!hideSidebar && <AppSidebar />}
              <SidebarInset className="relative flex-1 bg-transparent">
                {children}
              </SidebarInset>
            </div>
          )}
        </SidebarProvider>
        <Toaster richColors position="top-center" />
        {/* Render các dynamic components từ object */}
        <DynamicComponents.NetworkStatusNotifier />
        <DynamicComponents.SignupModal />
        <DynamicComponents.ConfettiLayer />
        <DynamicComponents.CareerGuidanceModal />
        <DynamicComponents.AccountInformationModal />
        <DynamicComponents.TeacherInformationModal />
        <DynamicComponents.ReportModal />
        <GlobalShortcutLayer />
      </div>
    </>
  );
}

export default PlatformLayout;
