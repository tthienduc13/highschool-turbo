"use client";

import { useState } from "react";
import { LessonDetail } from "@highschool/interfaces";
import { Button } from "@highschool/ui/components/ui/button";
import { IconHeart, IconLoader2, IconNote } from "@tabler/icons-react";

interface VideoPlayerProps {
  lesson: LessonDetail;
}

const regexPatterns = [
  /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/v\/|youtube\.com\/watch\?.*v=)([a-zA-Z0-9_-]{11})/,
  /youtube\.com\/watch\?.*v=([a-zA-Z0-9_-]{11})/,
  /youtube\.com\/shorts\/([a-zA-Z0-9_-]{11})/,
];

export const VideoPlayer = ({ lesson }: VideoPlayerProps) => {
  const [isReady, setIsReady] = useState(false);

  if (!lesson.videoUrl) {
    return;
  }

  const isYoutubeUrl = lesson.videoUrl.includes("youtube");

  const extractYoutubeId = (input: string): string | null => {
    // Handle direct video ID input
    if (/^[a-zA-Z0-9_-]{11}$/.test(input)) {
      return input;
    }

    for (const regex of regexPatterns) {
      const match = input.match(regex);

      if (match && match[1]) {
        return match[1];
      }
    }

    return null;
  };

  const videoId = extractYoutubeId(lesson.videoUrl);

  if (isYoutubeUrl && videoId) {
    return (
      <iframe
        allowFullScreen
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        className="aspect-video w-full"
        height="100%"
        src={`https://www.youtube.com/embed/${videoId}`}
        title="YouTube video player"
        width="100%"
      />
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="relative aspect-video overflow-hidden rounded-xl">
        {!isReady && (
          <div className="absolute inset-0 flex size-full items-center justify-center bg-slate-800">
            <IconLoader2 className="text-secondary animate-spin" size={32} />
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
