"use client";

import React, { useRef } from "react";
import HeatMap from "@uiw/react-heat-map";
import { IconPerspective } from "@tabler/icons-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@highschool/ui/components/ui/tooltip";

import { useDashboard } from "@/hooks/use-user-dashboard";

export const ActivityHeatMap = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { heatmap } = useDashboard();

  return (
    <div ref={containerRef} className="flex w-full flex-col gap-6 ">
      <div className="flex flex-row items-center gap-2">
        <IconPerspective size={24} />
        <h2 className="text-3xl font-semibold">Tổng quan</h2>
      </div>
      <div className="heatmap-wrapper w-full overflow-x-auto rounded-lg border-gray-100 bg-white p-6 shadow-lg">
        <HeatMap
          className="w-full"
          endDate={new Date(heatmap.endDate)}
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
          panelColors={[
            "var(--rhm-rect, #EBEDF0)",
            "#C6E48B",
            "#7BC96F",
            "#239A3B",
            "#196127",
          ]}
          rectProps={{
            rx: 2.5,
          }}
          rectRender={(props, data) => {
            return (
              <Hint
                label={
                  data.content?.toString() ?? "Không có hoạt động ngày này"
                }
              >
                <rect {...props} />
              </Hint>
            );
          }}
          rectSize={14}
          startDate={new Date(heatmap.startDate)}
          value={heatmap.values}
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
