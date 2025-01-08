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
    const profileRegex = /^\/profile\/([a-zA-Z0-9-_]+)$/;
    const folderRegex = /^\/@([a-zA-Z0-9-_]+)\/folders\/[^\/]*$/;
    const coursesRegex = /^\/courses(\/[a-zA-Z0-9-]+)?$/;
    const courseChapterRegex =
      /^\/courses\/([a-zA-Z0-9-]+)\/chapters\/([a-zA-Z0-9-]+)$/;
    const careerGuidanceRegex = /^\/career-guidance\/(mbti|holland|summary)$/;
    const searchRegex = /^\/search\?q=.*$/;

    const unified = new RegExp(
      `^(${[
        setRegex,
        profileRegex,
        folderRegex,
        coursesRegex,
        courseChapterRegex,
        careerGuidanceRegex,
        searchRegex,
      ]
        .map((r) => r.source)
        .join("|")})$`,
    );

    if (unified.test(pathname)) {
      barRef.current?.continuousStart(20, 750);
      setTimeout(() => {
        barRef.current?.complete();
      }, 1000);
    }
  }, [pathname, searchParams]);

  return (
    <LoadingBar
      ref={barRef}
      color="#ffa54c"
      height={4}
      waitingTime={500}
      transitionTime={500}
    />
  );
};

export default TopLoadingBar;
