"use client";

import React from "react";
import { cn } from "@highschool/ui/lib/utils";

interface AvatarCirclesProps {
  className?: string;
  numPeople?: number;
  avatarUrls: string[];
}

const AvatarCircles = ({
  numPeople,
  className,
  avatarUrls,
}: AvatarCirclesProps) => {
  return (
    <div className={cn("z-10 flex -space-x-4 rtl:space-x-reverse", className)}>
      {avatarUrls.map((url, index) => (
        <img
          key={index}
          alt={`Avatar ${index + 1}`}
          className="size-10 rounded-full border-2 border-white lg:size-12 dark:border-gray-800"
          height={40}
          src={url}
          width={40}
        />
      ))}
      <div className="flex size-10 items-center justify-center rounded-full border-2 border-white bg-black text-center text-xs font-medium text-white hover:bg-gray-600 dark:border-gray-800 dark:bg-white dark:text-black">
        +{numPeople}
      </div>
    </div>
  );
};

export default AvatarCircles;
