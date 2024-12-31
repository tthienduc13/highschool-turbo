"use client";

import React from "react";

import { Progress } from "@highschool/ui/components/ui/progress";

const LoadingViewRaw = () => {
  return (
    <div className="fixed left-0 top-20 flex h-[calc(100vh-160px)] w-full items-center justify-center">
      <div className="relative flex h-[300px] items-center justify-center">
        <div
          className="animate-fade-scale-in pointer-events-none absolute z-[-1] h-[400px] scale-0"
          style={{
            animationDuration: "2s",
            animationFillMode: "forwards",
          }}
        >
          <div className="animate-rotate-blobs absolute h-[400px]">
            <div className="animate-orange-blob absolute left-[-100px] h-[400px] w-[400px] rounded-full bg-orange-300 opacity-80 blur-[80px] dark:bg-orange-400" />
            <div className="animate-blue-blob absolute right-[-100px] h-[400px] w-[400px] rounded-full bg-blue-500 opacity-80 blur-[80px] dark:bg-blue-500" />
          </div>
        </div>
        <div className="flex flex-col items-center space-y-4">
          <div
            className="animate-slide-fade-in opacity-0"
            style={{ animationDelay: "0ms" }}
          >
            <Progress
              indeterminate
              indicatorColor="bg-blue-500"
              value={20}
              className="h-1 w-48 rounded-full bg-gray-50 dark:bg-gray-900"
            />
          </div>
          <h2
            className="animate-slide-fade-in text-center text-4xl font-bold"
            style={{ animationDelay: "100ms" }}
          >
            Hệ thống đang lấy kết quả
          </h2>
          <p
            className="animate-slide-fade-in text-center font-medium text-gray-700 dark:text-gray-300"
            style={{ animationDelay: "300ms" }}
          >
            Hiểu mình - Hiểu nghề - Chọn nghề
          </p>
        </div>
      </div>
    </div>
  );
};

export const LoadingView = React.memo(LoadingViewRaw);
