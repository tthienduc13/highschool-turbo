/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useRef, useState } from "react";

import {
  IconCopy,
  IconMaximize,
  IconMaximizeOff,
  IconVolume,
  IconVolumeOff,
} from "@tabler/icons-react";

import { ButtonKet } from "@/components/ui/button";

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

export const LobbySetting = () => {
  const [isTurnOnMusic, setIsTurnOnMusic] = useState(true);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [copied, setCopied] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.play();
    }
  }, [audioRef]);

  const goFullscreen = () => {
    setIsFullScreen(true);
    const element = document.documentElement;
    if (element.requestFullscreen) {
      element.requestFullscreen();
    } else if ((element as any).webkitRequestFullscreen) {
      (element as any).webkitRequestFullscreen();
    } else if ((element as any).msRequestFullscreen) {
      (element as any).msRequestFullscreen();
    }
  };

  const exitFullscreen = () => {
    setIsFullScreen(false);
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if ((document as any).webkitExitFullscreen) {
      (document as any).webkitExitFullscreen();
    } else if ((document as any).msExitFullscreen) {
      (document as any).msExitFullscreen();
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText("97456710").then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

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
    <div className="absolute right-8 top-10 flex flex-col gap-2">
      <audio
        src="https://res.cloudinary.com/dhdyel6be/video/upload/v1734789804/HighSchool/yhe9shyaii7j6ewk3k9s.mp4"
        ref={audioRef}
        autoPlay
        loop
      >
        Your browser does not support the video tag.
      </audio>
      <ButtonKet
        className="bg-white bg-opacity-70 py-4 text-black hover:bg-slate-50"
        onClick={isFullScreen ? exitFullscreen : goFullscreen}
      >
        {isFullScreen ? (
          <IconMaximizeOff style={{ width: "1.4rem", height: "1.4rem" }} />
        ) : (
          <IconMaximize style={{ width: "1.4rem", height: "1.4rem" }} />
        )}
      </ButtonKet>
      <ButtonKet
        className="bg-white bg-opacity-70 py-4 text-black hover:bg-slate-50"
        onClick={toggleMusic}
      >
        {isTurnOnMusic ? (
          <IconVolume style={{ width: "1.4rem", height: "1.4rem" }} />
        ) : (
          <IconVolumeOff style={{ width: "1.4rem", height: "1.4rem" }} />
        )}
      </ButtonKet>
      <ButtonKet
        className="relative bg-white bg-opacity-70 py-4 text-black hover:bg-slate-50"
        onClick={handleCopy}
      >
        <IconCopy style={{ width: "1.4rem", height: "1.4rem" }} />
        {copied && (
          <span className="absolute -right-1 -top-2 rounded-md bg-black px-2 py-1 text-xs text-white">
            Đã copy
          </span>
        )}
      </ButtonKet>
    </div>
  );
};
