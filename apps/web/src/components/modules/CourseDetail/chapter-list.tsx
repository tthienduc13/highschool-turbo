import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import Image from "next/image";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
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
  IconSettings,
} from "@tabler/icons-react";

import AnimatedCircularProgressBar from "@/components/core/common/animated-progress-bar";
import { useMe } from "@/hooks/use-me";
import { CurriculumData } from "@/components/core/common/select-curriculum-modal";

interface ChapterListProps {
  courseId: string;
  setSelectOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ChapterList = ({ courseId, setSelectOpen }: ChapterListProps) => {
  const { slug } = useParams();
  const pathName = usePathname();
  const queryClient = useQueryClient();

  const me = useMe();

  const currentCurriculum = CurriculumData.find((curriculum) => {
    return curriculum.id === me?.curriculumId;
  });

  const { data, isLoading } = useChapterListQuery({
    courseSlug: slug as string,
    curriculumId: me?.curriculumId as string,
    pageNumber: 1,
    pageSize: 100,
  });

  const enrollCourse = useEnrollMutation();
  const unEnrollCourse = useUnEnrollMutation();

  const isPending = enrollCourse.isPending || unEnrollCourse.isPending;

  const handleEnroll = () => {
    enrollCourse.mutate(
      { subjectId: courseId, curriculumId: me?.curriculumId! },
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
      { subjectId: courseId, curriculumId: me?.curriculumId! },
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

  const chapters = data?.data?.items || [];
  const enrollmentProgress = data?.data?.subjectModel?.enrollmentProgress;

  if (!me?.curriculumId) {
    return (
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold md:text-2xl">
          Nội dung khoá học ({chapters.length} chương)
        </h2>
        <Button variant="outline" onClick={() => setSelectOpen(true)}>
          <IconSettings />
          Chọn chương trình
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold md:text-2xl">
          Nội dung khoá học ({chapters.length} chương)
        </h2>
        <div className="flex flex-row items-center gap-2">
          {chapters.length > 0 && (
            <Button
              disabled={isPending}
              variant={isEnroll ? "destructive" : "default"}
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
          )}
          <Button variant="outline" onClick={() => setSelectOpen(true)}>
            {me.curriculumId ? (
              <Image
                alt={currentCurriculum?.curriculumName!}
                height={18}
                src={currentCurriculum?.image!}
                width={18}
              />
            ) : (
              <IconSettings />
            )}
            {me?.curriculumId ? "Thay đổi chương trình" : "Chọn chương trình"}
          </Button>
        </div>
      </div>

      {chapters.length > 0 ? (
        <div className="grid grid-cols-[repeat(auto-fill,_minmax(256px,_1fr))] gap-4">
          {enrollmentProgress && (
            <div className="flex justify-center">
              <AnimatedCircularProgressBar
                gaugePrimaryColor="#7faeff"
                gaugeSecondaryColor="#f3f4f6"
                max={100}
                min={0}
                value={Math.round(enrollmentProgress.subjectProgressPercent)}
              />
            </div>
          )}
          {chapters.map((chapter, index) => (
            <ChapterCard
              key={chapter.id}
              chapter={chapter}
              href={`${pathName}/chapters/${chapter.id}`}
              index={index}
              isEnroll={isEnroll}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center">
          <Image
            alt="No study sets"
            height={100}
            src="/icons/empty-chapters.svg"
            width={350}
          />
          <h2 className="text-center text-lg font-medium">
            Chưa có chương nào, bạn vui lòng chờ hệ thống cập nhật
          </h2>
        </div>
      )}
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

    return isClickable ? (
      <Link passHref href={href}>
        <div
          className={cn(
            "flex flex-col gap-y-4 rounded-xl border-2 p-4 transition-all duration-300 hover:-translate-y-2 hover:shadow-lg",
            chapter.isDone
              ? "border-emerald-500 bg-emerald-500/10"
              : "border-gray-200 bg-white",
            "dark:border-gray-700 dark:bg-gray-800/50",
          )}
        >
          {children}
        </div>
      </Link>
    ) : (
      <div className="group relative cursor-not-allowed opacity-60">
        <div className="flex flex-col gap-y-4 rounded-xl border-2 p-4 dark:border-gray-700 dark:bg-gray-800/50">
          {children}
        </div>
        <div className="absolute -right-2.5 -top-3.5 rounded-full bg-gray-50 p-1 dark:bg-gray-900">
          <div className="rounded-full bg-white p-[4px] shadow-md dark:bg-gray-800/50">
            <IconLock size={20} />
          </div>
        </div>
      </div>
    );
  };

  return (
    <Wrapper>
      <div className="flex h-full flex-1 flex-col gap-2">
        <h2 className="truncate font-bold">{chapter.chapterName}</h2>
        <p className="text-muted-foreground line-clamp-2 h-10 text-sm">
          {chapter.description}
        </p>
      </div>
      <div className="flex justify-between">
        <div className="flex items-center gap-x-2">
          <IconHistory size={16} />
          <p className="text-muted-foreground text-sm">
            {new Date(chapter.createdAt).toLocaleDateString()}
          </p>
        </div>
        <div className="flex items-center gap-x-2">
          <IconBook size={16} />
          <p className="text-muted-foreground text-sm">
            {chapter.numberLesson} bài học
          </p>
        </div>
      </div>
    </Wrapper>
  );
};
