"use client";

import { useEffect, useState } from "react";
import { Chapter } from "@highschool/interfaces";
import { IconChevronDown, IconPencil, IconTrash } from "@tabler/icons-react";
import { cn } from "@highschool/ui/lib/utils";
import { useLessonsQuery } from "@highschool/react-query/queries";

import { ChapterDeleteModal } from "./chapter-delete-modal";
import { LessonForm } from "./lesson-form";

interface ChaptersListProps {
  items: Chapter[];
  onReorder?: (updateData: { id: string; position: number }[]) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export const ChaptersList = ({
  items,
  onEdit,
  onDelete,
}: ChaptersListProps) => {
  const [isMounted, setIsMounted] = useState(false);
  const [chapters, setChapters] = useState(items);
  const [selectedChapter, setSelectedChapter] = useState<Chapter | null>(null);
  const [selectedViewChapter, setSelectedViewChapter] =
    useState<Chapter | null>(null);
  const [openConfirmModal, setOpenConfirmModal] = useState(false);

  const { data: lessonData, isLoading: lessonLoading } = useLessonsQuery({
    chapterId: selectedViewChapter?.id!,
    pageNumber: 1,
    pageSize: 100,
  });

  const toggleChapter = (chapter: Chapter) => {
    setSelectedViewChapter((prev) =>
      prev?.id === chapter.id ? null : chapter,
    );
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    setChapters(items);
  }, [items]);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <ChapterDeleteModal
        chapterName={selectedChapter?.chapterName!}
        open={openConfirmModal}
        onClose={() => setOpenConfirmModal(false)}
        onConfirm={() => {
          onDelete(selectedChapter!.id);
          setOpenConfirmModal(false);
          setSelectedChapter(null);
        }}
      />
      <div>
        {chapters.map((chapter) => (
          <div key={chapter.id} className="mb-4 flex flex-col gap-2">
            <div
              className={` flex items-center gap-x-2 rounded-md border border-gray-200 bg-gray-200 text-sm
    text-gray-700 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-300`}
            >
              <button
                className={`dark: rounded-l-md border-r border-r-gray-200 px-2 py-3 transition hover:bg-gray-300 dark:border-r-slate-800 dark:hover:bg-slate-700 ${selectedChapter?.id === chapter.id
                    ? "bg-gray-300 dark:bg-slate-700"
                    : ""
                  }`}
                onClick={() => toggleChapter(chapter)}
              >
                <IconChevronDown
                  className={cn(
                    "size-5 transition-transform duration-300",
                    selectedViewChapter?.id === chapter.id
                      ? "rotate-180"
                      : "rotate-0",
                  )}
                />
              </button>
              {chapter.chapterName}
              <div className="ml-auto flex items-center gap-x-2 pr-2">
                <IconPencil
                  className="size-4 cursor-pointer transition hover:opacity-75"
                  onClick={() => onEdit(chapter.id)}
                />
                <IconTrash
                  className="text-destructive size-4 cursor-pointer transition hover:opacity-75"
                  onClick={() => {
                    setSelectedChapter(chapter);
                    setOpenConfirmModal(true);
                  }}
                />
              </div>
            </div>
            <div
              className={cn(
                "overflow-hidden transition-all duration-300 ease-in-out",
                selectedViewChapter?.id === chapter.id
                  ? " opacity-100"
                  : "max-h-0 hidden opacity-0",
              )}
            >
              <LessonForm
                chapterId={chapter.id}
                isActive={selectedViewChapter?.id === chapter.id}
                isLoading={lessonLoading}
                lessons={lessonData?.data ?? []}
              />
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
