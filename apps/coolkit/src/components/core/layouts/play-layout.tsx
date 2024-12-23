import SnowEffect from "@/components/animation/snow/snow-effect";

function PlayLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="h-screen w-screen overflow-x-hidden">
            <div className="z-50 w-full px-5 md:px-0">
                <div
                    style={{
                        height: '100vh',
                        width: 'screen',
                        background: 'linear-gradient(to bottom, #2980b9, #6dd5fa, #f2f2f2)',
                    }}
                    className="relative"
                >
                    <SnowEffect />
                    {children}
                </div>
            </div>
        </div>
    );
}

export default PlayLayout;
