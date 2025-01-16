"use client";

import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { useState } from "react";

import { useParams, useRouter } from "next/navigation";

import { Lesson, Pagination } from "@highschool/interfaces";
import {
  useCourseBySlugQuery,
  useLessonDetailQuery,
  useMarkLessonDoneMutation,
} from "@highschool/react-query/queries";
import { Button } from "@highschool/ui/components/ui/button";
import { Skeleton } from "@highschool/ui/components/ui/skeleton";

import { IconCircleCheck, IconCircleX, IconLoader2 } from "@tabler/icons-react";

import { Breadcrumbs } from "@/components/core/common/breadcumbs";
import { Loading } from "@/components/core/common/loading";
import { VideoPlayer } from "@/components/core/common/video-player";
import { Container } from "@/components/core/layouts/container";

import { Quiz } from "./quiz";
import { TheoryList } from "./theory-list";

function LessonLearnModule() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const params = useParams();
  const { data: lessonData, isLoading: lessonLoading } = useLessonDetailQuery({
    lessonId: params.lessonId as string,
  });
  const lessonsData: Pagination<Lesson[]> | undefined =
    queryClient.getQueryData(["lesson-list", params.chapterId]);

  const [showQuiz, setShowQuiz] = useState<boolean>(false);
  const { data: courseDetail, isLoading: courseLoading } = useCourseBySlugQuery(
    {
      slug: params.slug as string,
    },
  );
  const breadcrumbItems = [
    { title: "Môn học", link: "/courses" },
    { title: courseDetail?.subjectName!, link: `/courses/${params.slug}` },
    { title: lessonData?.lessonName!, link: "" },
  ];

  const isLoading = lessonLoading || courseLoading;

  const markDone = useMarkLessonDoneMutation();

  const matchedLesson = lessonsData?.data.find(
    (lesson) => lesson.id === params.lessonId,
  );

  console.log(matchedLesson);

  if (lessonLoading) {
    return <Loading />;
  }

  if (showQuiz) {
    return <Quiz setShowQuiz={setShowQuiz} />;
  }

  return (
    <Container maxWidth="7xl" className="flex w-full flex-col gap-8 pb-10 pt-8">
      {isLoading ? (
        <Skeleton className="h-5 w-[100px]" />
      ) : (
        <Breadcrumbs items={breadcrumbItems} />
      )}
      <VideoPlayer lesson={lessonData!} />
      <TheoryList theories={lessonData?.theories!} />
      <div className="mt-8 flex flex-row justify-end">
        <div className="flex flex-row items-center gap-2">
          <Button
            disabled={markDone.isPending}
            size={"lg"}
            variant={"outline"}
            onClick={() => setShowQuiz(true)}
          >
            Làm bài kiểm tra
          </Button>
          {!matchedLesson?.isDone ? (
            <button
              disabled={markDone.isPending}
              onClick={() => {
                markDone.mutate(
                  { lessonId: lessonData?.id! },
                  {
                    onSuccess: (data) => {
                      queryClient.invalidateQueries({
                        queryKey: ["lesson-list", lessonData?.chapterId],
                      });
                      toast.success(data.message);
                      if (lessonData?.nextLessonId) {
                        router.push(
                          `/courses/${params.slug}/chapters/${lessonData.chapterId}/${lessonData.nextLessonId}`,
                        );
                      } else {
                        router.push(
                          `/courses/${params.slug}/chapters/${lessonData?.nextChapterId}`,
                        );
                      }
                    },
                  },
                );
              }}
              className="flex items-center justify-center gap-2 rounded-md bg-green-600 px-4 py-2 text-sm text-white hover:opacity-80"
            >
              {markDone.isPending ? (
                <IconLoader2 className="animate-spin" />
              ) : (
                <>
                  Đánh dấu hoàn thành <IconCircleCheck size={18} />
                </>
              )}
            </button>
          ) : (
            <Button variant={"destructive"} size={"lg"}>
              Chưa hoàn thành <IconCircleX size={18} />
            </Button>
          )}
        </div>
      </div>
    </Container>
  );
}

export default LessonLearnModule;
