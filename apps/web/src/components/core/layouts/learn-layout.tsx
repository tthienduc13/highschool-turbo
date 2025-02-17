"use client";

import { useLessonsQuery } from "@highschool/react-query/queries";

import { Loading } from "../common/loading";

import { LearnSidebar } from "./learn-sidebar";

function LearnLayout({
  children,
  chapterId,
}: Readonly<{
  children: React.ReactNode;
  chapterId: string;
}>) {
  const { data, isLoading } = useLessonsQuery({
    chapterId: chapterId,
    pageNumber: 1,
    pageSize: 10,
  });

  if (isLoading) {
    return <Loading />;
  }

  if (!data) {
    return;
  }

  return (
    <div className="h-[calc(100vh-80px)] w-full border-t border-gray-200 dark:border-gray-700">
      <div className="fixed inset-y-0 left-0 top-20 z-50 hidden h-full w-80 flex-col md:flex">
        <LearnSidebar lessons={data?.data} />
      </div>
      <main className="h-[calc(100vh-80px)] overflow-y-scroll md:pl-80">
        {children}
      </main>
    </div>
  );
}

export default LearnLayout;
