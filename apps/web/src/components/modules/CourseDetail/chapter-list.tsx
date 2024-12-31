import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import Link from "next/link";
import { useParams, usePathname, useSearchParams } from "next/navigation";

import { Chapter } from "@highschool/interfaces";
import {
  useChapterListQuery,
  useEnrollMutation,
  useUnEnrollMutation,
} from "@highschool/react-query/queries";
import { Button } from "@highschool/ui/components/ui/button";
import { Skeleton } from "@highschool/ui/components/ui/skeleton";
import { cn } from "@highschool/ui/lib/utils";

import {
  IconBook,
  IconHistory,
  IconLoader2,
  IconLock,
} from "@tabler/icons-react";

import AnimatedCircularProgressBar from "@/components/core/common/animated-progress-bar";

interface ChapterListProps {
  courseId: string;
}

export const ChapterList = ({ courseId }: ChapterListProps) => {
  const { slug } = useParams();
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const queryClient = useQueryClient();

  const curriculumId = searchParams.get("curriculum");

  const { data, isLoading } = useChapterListQuery({
    courseSlug: slug as string,
    curriculumId: curriculumId as string,
    pageNumber: 1,
    pageSize: 100,
  });

  const enrollCourse = useEnrollMutation();
  const unEnrollCourse = useUnEnrollMutation();

  const isPending = enrollCourse.isPending || unEnrollCourse.isPending;

  const handleEnroll = () => {
    enrollCourse.mutate(
      { subjectId: courseId, curriculumId: curriculumId! },
      {
        onSuccess: (data) => {
          queryClient.invalidateQueries({ queryKey: ["chapter-list"] });
          toast.success(data.message);
        },
      },
    );
  };

  const handleUnEnroll = () => {
    unEnrollCourse.mutate(
      { subjectId: courseId, curriculumId: curriculumId! },
      {
        onSuccess: (data) => {
          queryClient.invalidateQueries({ queryKey: ["chapter-list"] });
          toast.success(data.message);
        },
      },
    );
  };
  const isEnroll = data?.data?.subjectModel?.isEnroll ?? false;
  if (isLoading) {
    return (
      <div className="grid grid-cols-[repeat(auto-fill,_minmax(256px,_1fr))] gap-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <Skeleton key={index} className="h-[120px] w-full" />
        ))}
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-row items-center justify-between">
        <h2 className="text-xl font-semibold md:text-2xl">
          Chương trong khoá học ({data?.data.items.length ?? 0})
        </h2>
        <Button
          variant={isEnroll ? "destructive" : "default"}
          disabled={isPending}
          onClick={isEnroll ? handleUnEnroll : handleEnroll}
        >
          {isPending ? (
            <IconLoader2 className="animate-spin" />
          ) : isEnroll ? (
            "Xoá khoá học"
          ) : (
            "Tham gia khoá học"
          )}
        </Button>
      </div>
      <div className="grid grid-cols-[repeat(auto-fill,_minmax(256px,_1fr))] items-stretch gap-4">
        {data?.data?.subjectModel?.enrollmentProgress && (
          <div className="flex w-full justify-center">
            <AnimatedCircularProgressBar
              min={0}
              max={100}
              value={
                data.data.subjectModel.enrollmentProgress.subjectProgressPercent
              }
              gaugePrimaryColor="#7faeff"
              gaugeSecondaryColor="#f3f4f6"
            />
          </div>
        )}
        {data?.data.items.map((chapter, index) => (
          <ChapterCard
            key={chapter.id}
            href={`${pathName}/chapters/${chapter.id}`}
            chapter={chapter}
            index={index}
            isEnroll={isEnroll}
          />
        ))}
      </div>
    </div>
  );
};

interface ChapterCardProps {
  chapter: Chapter;
  isEnroll: boolean;
  href: string;
  index: number;
}

const ChapterCard = ({ chapter, isEnroll, href, index }: ChapterCardProps) => {
  const Wrapper: React.FC<React.PropsWithChildren> = ({ children }) => {
    const isClickable = isEnroll || index < 2;

    if (isClickable) {
      return (
        <Link href={href} passHref>
          <div
            className={cn(
              "flex h-full w-full transform cursor-pointer flex-col gap-y-4 rounded-xl border-2 border-gray-200 bg-white p-4 transition-all duration-300 hover:-translate-y-2 hover:border-b-blue-500 hover:shadow-lg dark:border-gray-700 dark:bg-gray-800/50",
              chapter.isDone
                ? "border-emerald-500 bg-emerald-500/10 hover:border-b-emerald-500"
                : "",
            )}
          >
            {" "}
            {children}
          </div>
        </Link>
      );
    }
    return (
      <div className="group relative cursor-not-allowed opacity-60">
        <div
          className={cn(
            "flex h-full w-full flex-col gap-y-4 rounded-xl border-2 border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800/50",
          )}
        >
          {children}
        </div>
        <div className="absolute -right-2.5 -top-3.5 rounded-full bg-gray-50 p-1 text-blue-600 dark:bg-gray-900 dark:text-blue-200">
          <div className="rounded-full bg-white p-[4px] shadow-md dark:bg-gray-800/50">
            <IconLock size={20} />
          </div>
        </div>
      </div>
    );
  };
  return (
    <Wrapper>
      <div className="flex flex-1 flex-col gap-2">
        <h2 className="line-clamp-1 truncate font-bold">
          {chapter.chapterName}
        </h2>
        <p className="text-muted-foreground line-clamp-2 text-sm">
          {chapter.description}
        </p>
      </div>
      <div className="flex flex-row justify-between">
        <div className="flex flex-row items-center gap-x-2">
          <IconHistory size={16} />
          <p className="text-muted-foreground text-sm">
            {new Date(chapter.createdAt).toLocaleDateString()}
          </p>
        </div>
        <div className="flex flex-row items-center gap-x-2">
          <IconBook size={16} />
          <p className="text-muted-foreground text-sm">
            {chapter.numberLesson} bài học
          </p>
        </div>
      </div>
    </Wrapper>
  );
};
