/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { ButtonKet } from "@/components/ui/button";
import { IconMaximize, IconMaximizeOff } from "@tabler/icons-react";
import { useState } from "react";

export function PlayerHeader() {
    const [isFullScreen, setIsFullScreen] = useState(false)

    const goFullscreen = () => {
        setIsFullScreen(true)
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
        setIsFullScreen(false)
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if ((document as any).webkitExitFullscreen) {
            (document as any).webkitExitFullscreen();
        } else if ((document as any).msExitFullscreen) {
            (document as any).msExitFullscreen();
        }
    };

    return (
        <div className="text-3xl absolute top-1 left-[50%] translate-x-[-50%] z-[100] w-[55vw] flex justify-around items-center bg-primary pt-3 pb-5 text-white rounded-xl my-5 shadow-inset-gray-shadow">
            <div className="font-extrabold">
                Coolket
            </div>
            <div className="text-xl md:text-2xl font-medium">
                Join a game
            </div>
            <div className="flex items-center space-x-2 animation-hover cursor-pointer">
                <ButtonKet
                    className="bg-transparent text-white py-4"
                    heightShadow="0"
                    onClick={isFullScreen ? exitFullscreen : goFullscreen}
                >
                    {
                        isFullScreen ? (
                            <IconMaximizeOff style={{ width: "1.4rem", height: "1.4rem" }} />
                        ) : (
                            <IconMaximize style={{ width: "1.4rem", height: "1.4rem" }} />
                        )
                    }
                </ButtonKet>
            </div>
        </div>
    )
}