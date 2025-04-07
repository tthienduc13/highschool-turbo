"use client";

import { Skeleton } from "@highschool/ui/components/ui/skeleton";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@highschool/ui/components/ui/button";
import { IconArrowLeft } from "@tabler/icons-react";
import { useLessonDetailQuery } from "@highschool/react-query/queries";

import { Tabs } from "./tabs";
import { LessonTheory } from "./lesson-theory";

export type Tab = "detail" | "theory" | "flashcard" | "quiz";

function LessonDetailModule() {
  const router = useRouter();
  const { lessonId } = useParams();

  const [tab, setTab] = useState<Tab>("detail");

  const handleBack = () => {
    router.back();
  };

  const { data: lessonData, isLoading } = useLessonDetailQuery({
    lessonId: lessonId as string,
  });

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="flex size-full flex-col gap-y-5">
          <div className="flex flex-row items-center justify-between">
            <div className="flex flex-row items-center gap-2 py-4">
              <div className="flex flex-row items-center gap-2">
                <Skeleton className="h-8 w-[400px]" />
              </div>
            </div>
            <Skeleton className="h-8 w-[100px]" />
          </div>
          <Tabs isLoading={isLoading} tab={tab} onTabChange={setTab} />
          <div className="w-full">
            <div className="grid grid-cols-3 gap-4">
              <Skeleton className="col-span-2 h-[400px] w-full" />
              <Skeleton className="h-[400px] w-full" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex size-full flex-col gap-y-5">
        <div className="flex flex-row items-center justify-between">
          <div className="flex flex-row items-center gap-2 py-4">
            <Button size={"icon"} variant={"ghost"} onClick={handleBack}>
              <IconArrowLeft />
            </Button>
            <div className="flex flex-row items-center gap-2">
              <h2 className="text-2xl font-bold">{lessonData?.lessonName}</h2>
            </div>
          </div>
        </div>
        <Tabs isLoading={isLoading} tab={tab} onTabChange={setTab} />
        <div className="w-full">
          {/* {tab === "detail" && (
                        <LessonDetail
                            isLoading={isLoading}
                            lessonDetail={lessonData!}
                        />
                    )} */}
          {tab === "theory" && <LessonTheory lessonId={lessonId as string} />}
          {/* {tab === "quiz" && <Quiz />} */}
        </div>
      </div>
    </div>
  );
}

export default LessonDetailModule;
