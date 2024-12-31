"use client";

import { useParams, useRouter } from "next/navigation";

import {
  useCourseBySlugQuery,
  useLessonDetailQuery,
  useMarkLessonDoneMutation,
} from "@highschool/react-query/queries";

import { VideoPlayer } from "@/components/core/common/video-player";
import { Container } from "@/components/core/layouts/container";
import { TheoryList } from "./theory-list";
import { Breadcrumbs } from "@/components/core/common/breadcumbs";
import { Skeleton } from "@highschool/ui/components/ui/skeleton";
import { useState } from "react";
import { IconCircleCheck, IconLoader2 } from "@tabler/icons-react";
import { Button } from "@highschool/ui/components/ui/button";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Loading } from "@/components/core/common/loading";
import { Quiz } from "./quiz";

function LessonLearnModule() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const params = useParams();
  const { data: lessonData, isLoading: lessonLoading } = useLessonDetailQuery({
    lessonId: params.lessonId as string,
  });

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

  if (lessonLoading) {
    return <Loading />;
  }

  if (showQuiz) {
    return <Quiz setShowQuiz={setShowQuiz} />;
  }

  return (
    <Container maxWidth="7xl" className="flex w-full flex-col gap-8 pt-8 pb-10">
      {isLoading ? (
        <Skeleton className="h-5 w-[100px]" />
      ) : (
        <Breadcrumbs items={breadcrumbItems} />
      )}
      <VideoPlayer lesson={lessonData!} />
      <TheoryList theories={lessonData?.theories!} />
      <div className="flex flex-row justify-end mt-8">
        <div className="flex flex-row items-center gap-2">
          <Button
            disabled={markDone.isPending}
            size={"lg"}
            variant={"outline"}
            onClick={() => setShowQuiz(true)}
          >
            Làm bài kiểm tra
          </Button>
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
            className="px-4 py-2 flex items-center gap-2 hover:opacity-80 justify-center text-sm text-white rounded-md  bg-green-600"
          >
            {markDone.isPending ? (
              <IconLoader2 className="animate-spin" />
            ) : (
              <>
                Đánh dấu hoàn thành <IconCircleCheck size={18} />
              </>
            )}
          </button>
        </div>
      </div>
    </Container>
  );
}

export default LessonLearnModule;
