import { useState } from "react";

import Image from "next/image";

import { IconPlayerPlay } from "@tabler/icons-react";

interface VideoPlayerProps {
  videoUrl: string;
  thumbnailUrl: string;
}

export const VideoPlayer = ({ videoUrl, thumbnailUrl }: VideoPlayerProps) => {
  const [showThumbnail, setShowThumbnail] = useState(true);

  return (
    <div className="relative h-full w-full">
      {showThumbnail ? (
        <div className="relative h-full w-full">
          <Image
            src={thumbnailUrl}
            alt="Video thumbnail"
            fill
            className="rounded-xl object-fill"
            priority={false}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />

          <IconPlayerPlay
            onClick={() => setShowThumbnail(false)}
            size={60}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform cursor-pointer rounded-full bg-black bg-opacity-50 p-2 text-white"
          />
        </div>
      ) : (
        <video
          autoPlay
          src={videoUrl}
          controls
          className="absolute inset-0 h-full w-full rounded-xl object-cover"
        />
      )}
    </div>
  );
};
