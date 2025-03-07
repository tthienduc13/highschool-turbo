"use client";

import { useState } from "react";
import { LessonDetail } from "@highschool/interfaces";
import { Button } from "@highschool/ui/components/ui/button";
import { IconHeart, IconLoader2, IconNote } from "@tabler/icons-react";

interface VideoPlayerProps {
  lesson: LessonDetail;
}

export const VideoPlayer = ({ lesson }: VideoPlayerProps) => {
  const [isReady, setIsReady] = useState(false);

  if (!lesson.videoUrl) {
    return;
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="relative aspect-video overflow-hidden rounded-xl">
        {!isReady && (
          <div className="absolute inset-0 flex size-full items-center justify-center bg-slate-800">
            <IconLoader2 className="animate-spin text-secondary" size={32} />
          </div>
        )}
        <video
          autoPlay
          controls
          muted
          className="size-full"
          title={lesson.lessonName}
          onCanPlay={() => setIsReady(true)}
          //   onEnded={() => console.log("Video ended")}
        >
          <source src={lesson.videoUrl} />
        </video>
      </div>
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-xl font-semibold md:text-2xl">
          {lesson.lessonName}
        </h2>
        <div className="flex flex-row items-center gap-2">
          <Button variant={"outline"}>
            <IconHeart />
            Yêu thích
          </Button>
          <Button variant={"outline"}>
            <IconNote />
            Thêm ghi chú tại 00:00
          </Button>
        </div>
      </div>
    </div>
  );
};
