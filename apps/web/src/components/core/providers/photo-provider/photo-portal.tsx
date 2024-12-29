"use client";

import { createPortal } from "react-dom";

import React from "react";

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
      className={`fixed left-0 top-0 z-[2000] h-full w-full touch-none overflow-hidden ${className || ""} pointer-events-${pointerEvents}`}
      {...props}
    >
      {children}
    </div>,
    container || document.body,
  );
};
