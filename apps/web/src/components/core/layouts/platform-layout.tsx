"use client";
import dynamic from "next/dynamic";
import { Header } from "./header";
import { Toaster } from "@highschool/ui/components/ui/sonner";

const SignupModal = dynamic(
    () =>
        import("@/components/core/common/sign-up-modal").then(
            (mod) => mod.SignUpModal
        ),
    {
        ssr: false,
    }
);

function PlatformLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="w-screen overflow-hidden min-h-screen ">
            <Header />
            <div className=" p-4 ">{children}</div>
            <Toaster richColors />
            <SignupModal />
        </div>
    );
}

export default PlatformLayout;
