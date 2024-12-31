"use client";

import { useState } from "react";

import { LessonDetail } from "@highschool/interfaces";

import { IconHeart, IconLoader2, IconNote } from "@tabler/icons-react";
import { Button } from "@highschool/ui/components/ui/button";

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
          <div className="absolute inset-0 flex h-full w-full items-center justify-center bg-slate-800">
            <IconLoader2 size={32} className="text-secondary animate-spin" />
          </div>
        )}
        <video
          title={lesson.lessonName}
          className="h-full w-full"
          onCanPlay={() => setIsReady(true)}
          onEnded={() => console.log("Video ended")}
          autoPlay
          muted
          controls
        >
          <source src={lesson.videoUrl} />
        </video>
      </div>
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
        <h2 className="md:text-2xl text-xl font-semibold">
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
