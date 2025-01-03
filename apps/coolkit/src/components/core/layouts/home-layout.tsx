import AppHeader from "../main/app-header";

export default function HomeLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="h-screen w-screen">
            <div className="w-full">
                <AppHeader />
            </div>
            <div className="z-50 w-full px-5 md:px-0">{children}</div>
        </div>
    );
}
