import { MainLayout } from "@/components/core/common/layouts/main-layout";

export default async function RootPlatformLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <MainLayout>{children}</MainLayout>;
}
