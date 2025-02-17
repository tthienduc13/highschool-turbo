import type { Metadata } from "next";

import { Suspense } from "react";
import { auth } from "@highschool/react-query/auth";
import "@highschool/ui/globals.css";
import { cn } from "@highschool/ui/lib/utils";

import { Loading } from "@/components/core/common/loading";
import Scroll from "@/components/core/common/scroll";
import { AppProviders } from "@/components/core/providers/app-provider";
import { sofiaFontVN } from "@/lib/fonts";
import "@/styles/roadmap.css";

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

  return (
    <html suppressHydrationWarning lang="vi">
      <body
        className={cn(
          "w-screen bg-gray-50 font-sans dark:bg-gray-900/50",
          sofiaFontVN.variable,
        )}
      >
        <Suspense fallback={<Loading />}>
          <Scroll />
          <AppProviders session={session ?? undefined}>{children}</AppProviders>
        </Suspense>
      </body>
    </html>
  );
}
