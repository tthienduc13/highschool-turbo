import type { Metadata } from "next";
import "@highschool/ui/globals.css";
import { sofiaFontVN } from "@/lib/fonts";
import { AppProviders } from "@/components/core/providers/app-provider";
import { auth } from "@highschool/react-query/auth";
import { cn } from "@highschool/ui/lib/utils";
import { Suspense } from "react";
import { Loading } from "@/components/core/common/loading";

export const metadata: Metadata = {
    title: {
        default: "Highschool - Nền tảng học tập số 1 cho học sinh trung học",
        template: "%s | Highschool",
    },
    description:
        "Highschool cung cấp dịch vụ chuyên nghiệp cho tất cả học sinh trên toàn thế giới nói chung và học sinh tại Việt Nam nói riêng để vượt qua kỳ thi Trung học Phổ thông Quốc gia.",
};

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const session = await auth();
    console.log(session?.user.accessToken);
    return (
        <html lang="vi" suppressHydrationWarning>
            <body
                className={cn(
                    "w-screen font-sans bg-[#F7FAFC] dark:bg-[#171923]",
                    sofiaFontVN.variable
                )}
            >
                <Suspense fallback={<Loading />}>
                    <AppProviders session={session ?? undefined}>
                        {children}
                    </AppProviders>
                </Suspense>
            </body>
        </html>
    );
}
