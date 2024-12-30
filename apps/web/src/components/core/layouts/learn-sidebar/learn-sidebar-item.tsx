import { useParams, usePathname, useRouter } from "next/navigation";

import { Lesson } from "@highschool/interfaces";
import { cn } from "@highschool/ui/lib/utils";

import { IconBook, IconCircleCheck, TablerIcon } from "@tabler/icons-react";

interface LearnSidebarItemProps {
  lesson: Lesson;
}

export const LearnSidebarItem = ({ lesson }: LearnSidebarItemProps) => {
  const { slug, chapterId } = useParams();
  const pathName = usePathname();
  const router = useRouter();
  const Icon: TablerIcon = lesson.isDone ? IconCircleCheck : IconBook;
  const isActive = pathName.includes(lesson.id);
  return (
    <button
      onClick={() =>
        router.push(`/courses/${slug}/chapters/${chapterId}/${lesson.id}`)
      }
      className={cn(
        "flex w-full cursor-pointer items-center gap-2 pl-6 text-sm font-medium text-gray-700 transition-all hover:bg-gray-200/30 hover:text-gray-800 dark:text-gray-200 dark:hover:text-gray-300",
        lesson.isDone && "text-emerald-700 hover:text-emerald-700",
        isActive && "bg-gray-200/30 text-gray-800 dark:text-gray-200",
        lesson.isDone && isActive && "bg-emerald-200/20",
      )}
    >
      <div className="flex items-center gap-2 py-4">
        <Icon size={22} />
        {lesson.lessonName}
      </div>
    </button>
  );
};
