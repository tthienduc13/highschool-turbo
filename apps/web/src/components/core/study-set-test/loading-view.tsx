"use client";

import React from "react";

import { getRandom } from "@highschool/lib/array";
import { GRADING_MESSAGES } from "@highschool/lib/constants";

const LoadingViewRaw = () => {
  const [remark] = React.useState(getRandom(GRADING_MESSAGES));

  return (
    <div className="fixed top-20 flex h-[calc(100vh-160px)] w-full items-center justify-center">
      <div className="relative flex h-[300px] items-center justify-center">
        <div
          className="animate-fade-scale-in pointer-events-none absolute z-[-1] h-[400px] scale-0"
          style={{
            animationDuration: "2s",
            animationFillMode: "forwards",
          }}
        >
          <div className="animate-rotate-blobs absolute h-[400px]">
            <div className="animate-orange-blob absolute left-[-100px] h-[400px] w-[400px] rounded-full bg-orange-300 opacity-50 blur-[80px] dark:bg-orange-400" />
            <div className="animate-blue-blob bg-blue dark:bg-blue absolute right-[-100px] h-[400px] w-[400px] rounded-full opacity-50 blur-[80px]" />
          </div>
        </div>
        <div className="flex flex-col items-center space-y-4">
          <div
            className="animate-slide-fade-in opacity-0"
            style={{ animationDelay: "0ms" }}
          >
            {/* <Progress value={20} className='h-1 w-48 rounded-full bg-gray-50 dark:bg-gray-900' /> */}
          </div>
          <h2
            className="animate-slide-fade-in text-center text-4xl font-bold opacity-0"
            style={{ animationDelay: "100ms" }}
          >
            Đang chấm điểm bài làm...
          </h2>
          <p
            className="animate-slide-fade-in text-center font-medium text-gray-700 opacity-0 dark:text-gray-300"
            style={{ animationDelay: "300ms" }}
          >
            {remark}
          </p>
        </div>
      </div>
    </div>
  );
};

export const LoadingView = React.memo(LoadingViewRaw);
