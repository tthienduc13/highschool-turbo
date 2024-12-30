"use client";

import dynamic from "next/dynamic";

import { Toaster } from "@highschool/ui/components/ui/sonner";

import GlobalShortcutLayer from "@/components/core/common/global-shorcut-layer";
import TopLoadingBar from "@/components/core/common/top-loading-bar";

import { Header } from "./header";

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

function PlatformLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <TopLoadingBar />
      <div className="min-h-screen w-screen">
        <Header />
        {children}
        <Toaster richColors position="top-center" />
        <SignupModal />
        <ConfettiLayer />
        <CareerGuidanceModal />
        <GlobalShortcutLayer />
      </div>
    </>
  );
}

export default PlatformLayout;
