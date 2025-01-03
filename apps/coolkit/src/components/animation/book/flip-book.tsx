"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";

import "./style.css";

interface Page {
  front: {
    content: React.ReactNode;
    backgroundColor: string;
    isExternal?: boolean;
  };
  back: {
    content: React.ReactNode;
    backgroundColor: string;
    isExternal?: boolean;
  };
}

interface FlipBookProps {
  pages: Page[];
  page?: number;
}

export function FlipBook({ pages, page }: FlipBookProps) {
  const [currentPage, setCurrentPage] = useState(page ?? 1);
  const bookRef = useRef<HTMLDivElement>(null);

  const setPagePosition = useCallback(
    (pageElement: HTMLDivElement, position: number, index: number) => {
      const transform = `translate3d(0,0,${(position < 0 ? 1 : -1) * Math.abs(index)}px) ${
        position < 0 ? "rotate3d(0,1,0,-180deg)" : ""
      }`;

      if (pageElement.style.transform !== transform) {
        pageElement.style.transform = transform;
        if (position < 0) {
          pageElement.classList.add("turned");
        } else {
          pageElement.classList.remove("turned");
        }
      }
    },
    [],
  );

  const turnPage = useCallback(
    (delta: number) => {
      setCurrentPage((prev) => {
        const newPage = prev + delta;
        if (newPage < 0 || newPage > pages.length) {
          return prev;
        }
        return newPage;
      });
    },
    [pages.length],
  );

  useEffect(() => {
    const leaves = bookRef.current?.querySelectorAll(".leaf");
    if (!leaves) return;

    leaves.forEach((page, index) => {
      setPagePosition(page as HTMLDivElement, index - currentPage, index);
    });
  }, [currentPage, setPagePosition]);

  return (
    <div className="min-h-screen overflow-hidden bg-[#264653]">
      <div ref={bookRef} className="flipbook relative h-[75vh] w-[56vw] px-12">
        {pages.map((page, index) => (
          <div key={index} className="leaf bg-transparent">
            <div
              className={`bg-game-winter page front p-4 ${page.front.isExternal ? "external" : ""}`}
            >
              {page.front.content}
            </div>
            <div
              className={`bg-game-winter page back p-4 ${page.back.isExternal ? "external" : ""}`}
            >
              {page.back.content}
            </div>
          </div>
        ))}
      </div>
      <button
        onClick={() => turnPage(-1)}
        disabled={currentPage === 0}
        className="book-nav-button prev"
        aria-label="Previous page"
      >
        <IconChevronLeft className="h-5 w-5" />
      </button>
      <button
        onClick={() => turnPage(1)}
        disabled={currentPage === pages.length}
        className="book-nav-button next"
        aria-label="Next page"
      >
        <IconChevronRight className="h-5 w-5" />
      </button>
    </div>
  );
}
