import { useParams, useRouter } from "next/navigation";

import { Lesson } from "@highschool/interfaces";
import { Button } from "@highschool/ui/components/ui/button";

import { IconArrowBack } from "@tabler/icons-react";

import { LearnSidebarItem } from "./learn-sidebar-item";

interface LearnSidebarProps {
  lessons: Lesson[];
}

export const LearnSidebar = ({ lessons }: LearnSidebarProps) => {
  const params = useParams();
  const router = useRouter();
  return (
    <div className="flex h-full flex-col overflow-y-auto border-r border-gray-200 shadow-sm dark:border-gray-700">
      <div className="flex flex-col border-b border-gray-200 p-4 dark:border-gray-700">
        <Button
          onClick={() => router.push(`/courses/${params.slug as string}`)}
          size={"icon"}
          variant={"ghost"}
        >
          <IconArrowBack className="!size-4" />
        </Button>
      </div>
      <div className="flex w-full flex-col">
        {lessons.map((lesson) => (
          <LearnSidebarItem key={lesson.id} lesson={lesson} />
        ))}
      </div>
    </div>
  );
};
