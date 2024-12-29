import { Suspense } from "react";

import type { Metadata } from "next";

import { env } from "@highschool/env";
import "@highschool/ui/globals.css";
import { cn } from "@highschool/ui/lib/utils";

import { sofiaFontVN } from "@/lib/fonts";

import Loading from "./loading";

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_LANDING_URL),
  title: {
    default: "Highschool - Nền tảng học tập toàn diện cho học sinh trung học",
    template: "%s | Highschool ",
  },
  description:
    "HighSchool cung cấp một nền tảng học tập toàn diện, giúp học sinh trung học tiếp cận các tài liệu học tập, theo dõi tiến độ và tham gia vào cộng đồng học tập sôi động. Với các tính năng tiên tiến như quản lý kiến thức, lộ trình học tập, và hệ thống trợ giúp thông minh, đây sẽ là người bạn đồng hành đáng tin cậy trên con đường học tập của bạn.",
  openGraph: {
    images: [
      {
        width: 1200,
        height: 630,
        url: "/images/opengraph-image.png",
      },
    ],
    title: " Highschool - Nền tảng học tập toàn diện cho học sinh trung học",
    description:
      "HighSchoolVN cung cấp một nền tảng học tập toàn diện, giúp học sinh trung học tiếp cận các tài liệu học tập, theo dõi tiến độ và tham gia vào cộng đồng học tập sôi động. Với các tính năng tiên tiến như quản lý kiến thức, lộ trình học tập, và hệ thống trợ giúp thông minh, đây sẽ là người bạn đồng hành đáng tin cậy trên con đường học tập của bạn.",
    type: "website",
    url: env.NEXT_PUBLIC_LANDING_URL,
    locale: "vi_VN",
    siteName: "Highschool",
  },
  icons: {
    icon: "/logo/logo.svg",
  },
  //   twitter: {
  //     card: 'summary_large_image',
  //     site: '@GoatEdu',
  //     title: ' GoatEdu - No.1 Learning Platform Built For Generations',
  //     description:
  //       'Welcome to GoatEdu, the leading educational platform for students worldwide. Explore our expert guidance and resources to achieve academic excellence.',
  //     images: 'https://www.goatedu.tech/images/screenshot.jpeg'
  //   },
  keywords: [
    "highschool",
    "HighschoolVn",
    "highschoolvn",
    "học tập",
    "nền tảng học tập",
    "HighschoolVN",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen w-screen overflow-x-hidden font-sans",
          sofiaFontVN.variable,
        )}
      >
        <Suspense fallback={<Loading />}>{children}</Suspense>
      </body>
    </html>
  );
}
