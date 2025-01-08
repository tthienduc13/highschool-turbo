import { AdminHeader } from "../commons/admin-layout/header";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="flex w-screen flex-col">{children}</div>;
}
