"use client";

import { useState } from "react";

import { LessonDetail } from "@highschool/interfaces";

import { IconLoader2 } from "@tabler/icons-react";

interface VideoPlayerProps {
  lesson: LessonDetail;
}

export const VideoPlayer = ({ lesson }: VideoPlayerProps) => {
  const [isReady, setIsReady] = useState(false);

  if (!lesson.videoUrl) {
    return;
  }

  return (
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
  );
};
