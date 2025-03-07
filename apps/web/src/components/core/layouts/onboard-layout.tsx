function OnboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative flex h-screen w-screen items-center justify-center overflow-hidden px-5 md:px-0">
      <div className="absolute top-0 -z-10 h-full w-[400%] max-w-[2200px] opacity-5 blur-[30px] lg:w-[150%]">
        <div className="relative size-full">
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-0 pb-[31.25%]" />
          <div className="absolute inset-0 flex size-full items-center justify-center overflow-hidden bg-custom-gradient" />
        </div>
      </div>
      {children}
    </div>
  );
}

export default OnboardLayout;
