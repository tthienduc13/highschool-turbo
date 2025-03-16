"use client";

import { useEffect, useState } from "react";

interface CircularTermMasteryProps {
  known: number;
  stillLearning: number;
}

export function CircularTermMastery({
  known,
  stillLearning,
}: CircularTermMasteryProps) {
  const [perc, setPerc] = useState(0);
  const total = known + stillLearning;
  const percentage = Math.round((known / total) * 100);

  useEffect(() => {
    const timer = setTimeout(() => {
      setPerc(percentage);
    }, 300);

    return () => clearTimeout(timer);
  }, [percentage]);

  // Calculate the circle properties
  const size = 100;
  const strokeWidth = 4;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - (perc / 100) * circumference;

  return (
    <div className="flex flex-row items-center gap-6">
      {/* Circular Progress */}
      <div className="relative size-[100px]">
        {/* Track Circle (orange) */}
        <svg className="size-full -rotate-90">
          <circle
            className="text-orange-300"
            cx={size / 2}
            cy={size / 2}
            fill="transparent"
            r={radius}
            stroke="currentColor"
            strokeWidth={strokeWidth}
          />
          <circle
            className="ease-in-out text-blue-500 transition-all duration-500"
            cx={size / 2}
            cy={size / 2}
            fill="transparent"
            r={radius}
            stroke="currentColor"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            strokeWidth={strokeWidth}
          />
        </svg>
        {/* Percentage Label */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xl font-bold">{`${perc}%`}</span>
        </div>
      </div>

      {/* Stats */}
      <div className="flex flex-row gap-4">
        <div className="flex flex-col gap-2">
          {/* Known Count */}
          <div className="flex h-6 items-center justify-center rounded-full border-[1.5px] border-blue-300 px-2 text-blue-300 shadow-sm">
            <span className="text-sm font-bold">{known}</span>
          </div>
          {/* Still Learning Count */}
          <div className="flex h-6 items-center justify-center rounded-full border-[1.5px] border-orange-300 px-2 text-orange-300 shadow-sm">
            <span className="text-sm font-bold">{stillLearning}</span>
          </div>
        </div>
        <div className="flex flex-col font-bold text-gray-800 dark:text-gray-50">
          <span>Know</span>
          <span>Still learning</span>
        </div>
      </div>
    </div>
  );
}
