import LearnLayout from "@/components/core/layouts/learn-layout";

export default async function RootChapterLearnLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ chapterId: string }>;
}>) {
  const { chapterId } = await params;

  return <LearnLayout chapterId={chapterId}>{children}</LearnLayout>;
}
