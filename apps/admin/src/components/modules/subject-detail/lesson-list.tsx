import { Lesson } from "@highschool/interfaces";
import { IconPencil, IconTrash } from "@tabler/icons-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { LessonDeleteModal } from "./lesson-delete-modal";

interface ChaptersListProps {
  items: Lesson[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export const LessonList = ({ items, onEdit, onDelete }: ChaptersListProps) => {
  const [openConfirmModal, setOpenConfirmModal] = useState<boolean>(false);
  const [seletecdLesson, setSelectedLesson] = useState<Lesson | null>(null);

  const pathName = usePathname();

  const sortedLessons = items.sort((a, b) => a.displayOrder - b.displayOrder);

  return (
    <>
      <LessonDeleteModal
        lessonName={seletecdLesson?.lessonName!}
        open={openConfirmModal}
        onClose={() => setOpenConfirmModal(false)}
        onConfirm={() => {
          onDelete(seletecdLesson!.id);
          setOpenConfirmModal(false);
          setSelectedLesson(null);
        }}
      />
      <div>
        {sortedLessons.map((lesson) => (
          <div
            key={lesson.id}
            className={` mt-2 flex items-center gap-x-2 rounded-md border border-gray-100 bg-gray-100 p-2 text-sm
    text-gray-700 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-300`}
          >
            <Link href={`${pathName}/lesson/${lesson.id}`}>
              Bài {lesson.displayOrder}: {lesson.lessonName}
            </Link>
            <div className="ml-auto flex items-center gap-x-2 pr-2">
              <IconPencil
                className="size-4 cursor-pointer transition hover:opacity-75"
                onClick={() => onEdit(lesson.id)}
              />
              <IconTrash
                className="text-destructive size-4 cursor-pointer transition hover:opacity-75"
                onClick={() => {
                  setSelectedLesson(lesson);
                  setOpenConfirmModal(true);
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
