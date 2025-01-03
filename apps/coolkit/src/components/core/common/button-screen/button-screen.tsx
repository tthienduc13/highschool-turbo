/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { ButtonKet } from "@/components/ui/button"
import { IconMaximize, IconMaximizeOff } from "@tabler/icons-react";
import { useState } from "react";

interface ButtonScreenProps {
    className?: string;
    sizeIcon?: number;
    heightShadow?: string;
}

export const ButtonScreen = ({ className, sizeIcon, heightShadow }: ButtonScreenProps) => {
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
        <ButtonKet
            className={`bg-white bg-opacity-70 text-black py-4 hover:bg-slate-50 ${className}`}
            heightShadow={heightShadow}
            onClick={isFullScreen ? exitFullscreen : goFullscreen}
        >
            {
                isFullScreen ? (
                    <IconMaximizeOff style={{ width: `${sizeIcon ?? '1.4rem'}`, height: `${sizeIcon ?? '1.4rem'}` }} />
                ) : (
                    <IconMaximize style={{ width: `${sizeIcon ?? '1.4rem'}`, height: `${sizeIcon ?? '1.4rem'}` }} />
                )
            }
        </ButtonKet>
    )
}