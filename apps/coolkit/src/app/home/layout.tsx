import HomeLayout from "@/components/core/layouts/home-layout";


function RootHomeLayout({ children }: { children: React.ReactNode }) {
    return <HomeLayout>{children}</HomeLayout>;
}

export default RootHomeLayout;
