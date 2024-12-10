import AuthLayout from "@/components/core/layouts/auth-layout";

function RootAuthLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return <AuthLayout>{children}</AuthLayout>;
}

export default RootAuthLayout;
