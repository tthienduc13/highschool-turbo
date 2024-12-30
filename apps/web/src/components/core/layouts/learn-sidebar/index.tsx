import { Lesson } from "@highschool/interfaces";

import { LearnSidebarItem } from "./learn-sidebar-item";

interface LearnSidebarProps {
  lessons: Lesson[];
}

export const LearnSidebar = ({ lessons }: LearnSidebarProps) => {
  return (
    <div className="flex h-full flex-col overflow-y-auto border-r border-gray-200 shadow-sm dark:border-gray-700">
      <div className="flex flex-col border-b border-gray-200 p-8 dark:border-gray-700">
        <h1 className="text-center font-semibold">Hãy tận hưởng nhé 🚀</h1>
      </div>
      <div className="flex w-full flex-col">
        {lessons.map((lesson) => (
          <LearnSidebarItem key={lesson.id} lesson={lesson} />
        ))}
      </div>
    </div>
  );
};
