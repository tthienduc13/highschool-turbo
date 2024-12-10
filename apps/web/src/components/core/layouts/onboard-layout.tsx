"use client";
import dynamic from "next/dynamic";

const GlobalShortcutLayer = dynamic(
    () => import("@/components/core/common/global-shorcut-layer"),
    { ssr: false }
);

function OnboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className=" flex h-screen w-screen relative items-center justify-center px-5  md:px-0">
            <div className="absolute top-0 -z-10 h-full w-[400%] max-w-[2200px] opacity-5 blur-[30px] lg:w-[150%]">
                <div className="relative h-full w-full">
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-0 pb-[31.25%]" />
                    <div className="absolute bottom-0 left-0 right-0 top-0 flex h-full w-full items-center justify-center overflow-hidden bg-custom-gradient"></div>
                </div>
            </div>
            {children}
            <GlobalShortcutLayer />
        </div>
    );
}

export default OnboardLayout;
