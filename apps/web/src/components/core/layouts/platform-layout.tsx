import { Header } from "./header";
import { Toaster } from "@highschool/ui/components/ui/sonner";

function PlatformLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="w-screen overflow-hidden min-h-screen ">
            <Header />
            <div className="py-10 px-4 ">{children}</div>
            <Toaster richColors />
        </div>
    );
}

export default PlatformLayout;
