"use client";

import LoadingBar, { type LoadingBarRef } from "react-top-loading-bar";

import React, { useEffect } from "react";

import { usePathname, useSearchParams } from "next/navigation";

export const TopLoadingBar = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const barRef = React.useRef<LoadingBarRef>(null);

  useEffect(() => {
    const setRegex =
      /^\/study-set\/([a-zA-Z0-9-]+)(\/(learn|flashcards|test|match))?$/;
    const profileRegex = /^\/@([a-zA-Z0-9-_]+)$/;
    const folderRegex = /^\/@([a-zA-Z0-9-_]+)\/folders\/[^\/]*$/;

    const unified = new RegExp(
      `^(${[setRegex, profileRegex, folderRegex]
        .map((r) => r.source)
        .join("|")})$`,
    );

    if (unified.test(pathname)) {
      barRef.current?.continuousStart(20, 750);
      setTimeout(() => {
        barRef.current?.complete();
      }, 1000); // Adjust this timeout as needed
    }
  }, [pathname, searchParams]);

  return (
    <LoadingBar
      ref={barRef}
      color="#ffa54c"
      height={3}
      waitingTime={500}
      transitionTime={500}
    />
  );
};

export default TopLoadingBar;
