"use client";

import React from "react";
import { createPortal } from "react-dom";

interface PhotoPortalProps extends React.HTMLAttributes<HTMLDivElement> {
    container?: HTMLElement;
    pointerEvents?: "auto" | "none";
}

export const PhotoPortal: React.FC<PhotoPortalProps> = ({
    container,
    children,
    className,
    pointerEvents,
    ...props
}) => {
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => {
        setMounted(true);
        return () => setMounted(false);
    }, []);

    if (!mounted) return null;

    return createPortal(
        <div
            role="dialog"
            className={`fixed top-0 left-0 w-full h-full z-[2000] overflow-hidden  touch-none ${className || ""} pointer-events-${pointerEvents}`}
            {...props}
        >
            {children}
        </div>,
        container || document.body
    );
};
