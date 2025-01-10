/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";

import { IconMaximize, IconMaximizeOff } from "@tabler/icons-react";

import { ButtonKet } from "@/components/ui/button";

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

export function PlayerHeader() {
  const [isFullScreen, setIsFullScreen] = useState(false);

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

  return (
    <div className="bg-primary shadow-inset-gray-shadow absolute left-[50%] top-1 z-[100] my-5 flex w-[55vw] translate-x-[-50%] items-center justify-around rounded-xl pb-5 pt-3 text-3xl text-white">
      <div className="font-extrabold">Coolket</div>
      <div className="text-xl font-medium md:text-2xl">Join a game</div>
      <div className="animation-hover flex cursor-pointer items-center space-x-2">
        <ButtonKet
          className="bg-transparent py-4 text-white"
          heightShadow="0"
          onClick={isFullScreen ? exitFullscreen : goFullscreen}
        >
          {isFullScreen ? (
            <IconMaximizeOff style={{ width: "1.4rem", height: "1.4rem" }} />
          ) : (
            <IconMaximize style={{ width: "1.4rem", height: "1.4rem" }} />
          )}
        </ButtonKet>
      </div>
    </div>
  );
}
