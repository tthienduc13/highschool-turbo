"use client";

import React, { useEffect, useRef, useState } from "react";
import HeatMap from "@uiw/react-heat-map";
import { IconPerspective } from "@tabler/icons-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@highschool/ui/components/ui/tooltip";

const value = [
  { date: "2024/01/11", count: 2 },
  { date: "2024/01/12", count: 20 },
  { date: "2024/01/13", count: 10 },
  ...[...Array(17)].map((_, idx) => ({
    date: `2024/02/${idx + 10}`,
    count: idx,
    content: "",
  })),
  { date: "2024/04/11", count: 2 },
  { date: "2024/05/01", count: 5 },
  { date: "2024/05/02", count: 5 },
  { date: "2024/05/04", count: 11 },
];

export const ActivityHeatMap = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(1024);

  useEffect(() => {
    if (!containerRef.current) return;

    // Set initial width
    setContainerWidth(containerRef.current.offsetWidth);

    // Create resize observer to update width when container size changes
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setContainerWidth(entry.contentRect.width);
      }
    });

    resizeObserver.observe(containerRef.current);

    // Clean up observer on component unmount
    return () => {
      if (containerRef.current) {
        resizeObserver.unobserve(containerRef.current);
      }
    };
  }, []);

  return (
    <div ref={containerRef} className="flex w-full flex-col gap-6 ">
      <div className="flex flex-row items-center gap-2">
        <IconPerspective size={24} />
        <h2 className="text-3xl font-semibold">Tổng quan</h2>
      </div>
      <div className="w-full overflow-x-auto rounded-lg border-gray-100 bg-white p-6 shadow-lg">
        <HeatMap
          className="w-full"
          endDate={new Date("2025/01/01")}
          monthLabels={[
            "Tháng 1",
            "Tháng 2",
            "Tháng 3",
            "Tháng 4",
            "Tháng 5",
            "Tháng 6",
            "Tháng 7",
            "Tháng 8",
            "Tháng 9",
            "Tháng 10",
            "Tháng 11",
            "Tháng 12",
          ]}
          rectProps={{
            rx: 2.5,
          }}
          rectRender={(props, data) => {
            return (
              <Hint label={`${data.count ?? 0} hoạt động vào ${data.date}`}>
                <rect {...props} />
              </Hint>
            );
          }}
          rectSize={14}
          startDate={new Date("2024/01/01")}
          value={value}
          weekLabels={["", "T2", "", "T4", "", "T6", ""]}
        />
      </div>
    </div>
  );
};

export default ActivityHeatMap;

export interface HintProps {
  label?: string;
  children: React.ReactNode;
  side?: "top" | "bottom" | "left" | "right";
  align?: "start" | "center" | "end";
  sideOffset?: number;
  alignOffset?: number;
}

export const Hint = ({
  label,
  children,
  side,
  align,
  sideOffset,
  alignOffset,
}: HintProps) => {
  if (!label) {
    return children;
  }

  return (
    <TooltipProvider>
      <Tooltip delayDuration={100}>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent
          asChild
          align={align}
          alignOffset={alignOffset}
          className="bg-black text-white dark:bg-white dark:text-slate-900"
          side={side}
          sideOffset={sideOffset}
        >
          <div className="capitalize">{label}</div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
