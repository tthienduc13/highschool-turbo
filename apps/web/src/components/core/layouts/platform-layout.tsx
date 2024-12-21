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
            {children}
            <Toaster richColors />
        </div>
    );
}

export default PlatformLayout;
