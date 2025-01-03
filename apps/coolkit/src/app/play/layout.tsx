import PlayLayout from "@/components/core/layouts/play-layout";

function RootPlayLayout({ children }: { children: React.ReactNode }) {
  return <PlayLayout>{children}</PlayLayout>;
}

export default RootPlayLayout;
