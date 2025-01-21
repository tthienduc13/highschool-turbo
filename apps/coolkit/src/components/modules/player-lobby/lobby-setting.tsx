/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { motion } from "motion/react";

import { useEffect, useRef, useState } from "react";

import {
  IconHanger2Filled,
  IconMaximize,
  IconMaximizeOff,
  IconVolume,
  IconVolumeOff,
} from "@tabler/icons-react";

import { ButtonKet } from "@/components/ui/button";

import { AvatarWardrobe } from "./avatar-wardrobe";

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
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoadingAvatar, setIsLoadingAvatar] = useState(true);

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
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="absolute right-8 top-10 flex flex-col gap-2"
    >
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
        onClick={() => setIsOpen(true)}
        isDisabled={isLoadingAvatar}
      >
        <IconHanger2Filled style={{ width: "1.4rem", height: "1.4rem" }} />
      </ButtonKet>

      <AvatarWardrobe
        isOpen={isOpen}
        setOpen={setIsOpen}
        setIsLoadingAvatar={setIsLoadingAvatar}
      />
    </motion.div>
  );
};
