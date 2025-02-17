"use client";

import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import { Toaster } from "@highschool/ui/components/ui/sonner";

import { Header } from "./header";

import GlobalShortcutLayer from "@/components/core/common/global-shorcut-layer";
import TopLoadingBar from "@/components/core/common/top-loading-bar";

const SignupModal = dynamic(
  () =>
    import("@/components/core/common/sign-up-modal").then(
      (mod) => mod.SignUpModal,
    ),
  {
    ssr: false,
  },
);

const ConfettiLayer = dynamic(
  () =>
    import("@/components/core/common/confetti-layer").then(
      (mod) => mod.ConfettiLayer,
    ),
  { ssr: false },
);

const CareerGuidanceModal = dynamic(
  () =>
    import("@/components/core/common/career-guidance-modal").then(
      (mod) => mod.CareerGuidanceModal,
    ),
  { ssr: false },
);

const AccountInformationModal = dynamic(
  () =>
    import("@/components/core/common/account-information-modal").then(
      (mod) => mod.AccountInformationModal,
    ),
  { ssr: false },
);

const TeacherInformationModal = dynamic(
  () =>
    import("@/components/core/common/teacher-information-modal").then(
      (mod) => mod.TeacherInformationModal,
    ),
  { ssr: false },
);
const ReportModal = dynamic(
  () =>
    import("@/components/core/common/report-modal").then(
      (mod) => mod.ReportModal,
    ),
  { ssr: false },
);

const NetworkStatusNotifier = dynamic(
  () =>
    import("@/components/core/common/network-notifier").then(
      (mod) => mod.NetworkStatusNotifier,
    ),
  { ssr: false },
);

function PlatformLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathName = usePathname();
  const hideHeaders = ["/roadmap"];

  const isHideHeader = hideHeaders.includes(pathName);

  return (
    <>
      <div className="min-h-screen w-screen">
        {!isHideHeader && (
          <div className="sticky top-0 z-50">
            <Header />
            <TopLoadingBar />
          </div>
        )}
        {children}
        <Toaster richColors position="top-center" />
        <NetworkStatusNotifier />
        <SignupModal />
        <ConfettiLayer />
        <CareerGuidanceModal />
        <GlobalShortcutLayer />
        <AccountInformationModal />
        <TeacherInformationModal />
        <ReportModal />
      </div>
    </>
  );
}

export default PlatformLayout;
