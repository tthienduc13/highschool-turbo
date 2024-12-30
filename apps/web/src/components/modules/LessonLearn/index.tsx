"use client";

import { useParams } from "next/navigation";

import { useLessonDetailQuery } from "@highschool/react-query/queries";

import { VideoPlayer } from "@/components/core/common/video-player";
import { Container } from "@/components/core/layouts/container";

function LessonLearnModule() {
  const params = useParams();
  const { data, isLoading } = useLessonDetailQuery({
    lessonId: params.lessonId as string,
  });

  if (isLoading) {
    return <div>Isloading</div>;
  }
  return (
    <div className="flex w-full flex-col pb-20">
      <div className="p-4">
        <VideoPlayer lesson={data!} />
      </div>
    </div>
  );
}

export default LessonLearnModule;
