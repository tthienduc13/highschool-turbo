import PlatformLayout from "@/components/core/layouts/platform-layout";

export default async function RootPlatformLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <PlatformLayout>{children}</PlatformLayout>;
}
