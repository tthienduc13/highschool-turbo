"use client";

import { useEffect, useRef, useState } from "react";

import { IconVolume, IconVolumeOff } from "@tabler/icons-react";

import { ButtonKet } from "@/components/ui/button";

interface ButtonAudioProps {
  className?: string;
  sizeIcon?: number;
  heightShadow?: string;
}

export const ButtonAudio = ({
  className,
  sizeIcon,
  heightShadow,
}: ButtonAudioProps) => {
  const [isTurnOnMusic, setIsTurnOnMusic] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.play();
    }
  }, [audioRef]);

  const toggleMusic = () => {
    if (!audioRef.current) return;

    if (isTurnOnMusic) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }

    setIsTurnOnMusic(!isTurnOnMusic);
  };

  return (
    <>
      <audio
        src="https://res.cloudinary.com/dhdyel6be/video/upload/v1734789804/HighSchool/yhe9shyaii7j6ewk3k9s.mp4"
        ref={audioRef}
        autoPlay
        loop
      >
        Your browser does not support the video tag.
      </audio>
      <ButtonKet
        className={`bg-white bg-opacity-70 py-4 text-black hover:bg-slate-50 ${className}`}
        heightShadow={heightShadow}
        onClick={toggleMusic}
      >
        {isTurnOnMusic ? (
          <IconVolume
            style={{
              width: `${sizeIcon ?? "1.4rem"}`,
              height: `${sizeIcon ?? "1.4rem"}`,
            }}
          />
        ) : (
          <IconVolumeOff
            style={{
              width: `${sizeIcon ?? "1.4rem"}`,
              height: `${sizeIcon ?? "1.4rem"}`,
            }}
          />
        )}
      </ButtonKet>
    </>
  );
};
