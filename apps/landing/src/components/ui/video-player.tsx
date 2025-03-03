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
    <div className="relative size-full">
      {showThumbnail ? (
        <div className="relative size-full">
          <Image
            fill
            alt="Video thumbnail"
            className="rounded-xl object-fill"
            priority={false}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            src={thumbnailUrl}
          />

          <IconPlayerPlay
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer rounded-full bg-black bg-opacity-50 p-2 text-white"
            size={60}
            onClick={() => setShowThumbnail(false)}
          />
        </div>
      ) : (
        <video
          autoPlay
          controls
          className="absolute inset-0 size-full rounded-xl object-cover"
          src={videoUrl}
        >
          <track kind="captions" label="English" src="" />
        </video>
      )}
    </div>
  );
};
