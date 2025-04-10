"use client";

import React, { useRef, useState } from "react";
import HeatMap, { HeatMapValue } from "@uiw/react-heat-map";
import { IconChevronDown, IconTrendingUp } from "@tabler/icons-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@highschool/ui/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@highschool/ui/components/ui/dropdown-menu";
import { Button, buttonVariants } from "@highschool/ui/components/ui/button";
import { cn } from "@highschool/ui/lib/utils";

import { useDashboard } from "@/hooks/use-user-dashboard";

export const ActivityHeatMap = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedYear, setSelectedYear] = useState<number>(
    new Date().getFullYear(),
  );

  const years = [2025, 2024, 2023];

  const { heatmap } = useDashboard();

  return (
    <div ref={containerRef} className="flex w-full flex-col gap-6 ">
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-row items-center gap-2">
          <IconTrendingUp size={24} />
          <h2 className="text-3xl font-semibold">Hoạt động của bạn</h2>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <div className={cn(buttonVariants({ variant: "ghost" }))}>
              Tuỳ chọn hiển thị
              <IconChevronDown />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            alignOffset={10}
            className="flex flex-col gap-2 p-4 shadow-lg"
          >
            <DropdownMenuItem>Bài học hoàn thành</DropdownMenuItem>
            <DropdownMenuItem>Flashcards hoàn thành</DropdownMenuItem>
            <DropdownMenuItem>Đăng nhập vào hệ thông</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="flex w-full justify-between gap-5">
        <div className="w-full max-w-4xl  overflow-x-auto rounded-lg border-gray-100 bg-white p-6 shadow-lg">
          <HeatMap
            className="w-full"
            endDate={
              new Date(
                `${heatmap.endYear}/01/01` ||
                  new Date().getFullYear().toString(),
              )
            }
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
            startDate={
              new Date(
                `${heatmap.startYear}/01/01` ||
                  new Date().getFullYear().toString(),
              )
            }
            value={heatmap.data as unknown as HeatMapValue[]}
            weekLabels={["", "T2", "", "T4", "", "T6", ""]}
          />
        </div>
        <div className="flex flex-1 flex-col gap-2">
          {years.map((year) => {
            const active = year === selectedYear;

            return (
              <Button
                key={year}
                className="w-full"
                variant={active ? "secondary" : "ghost"}
              >
                {year}
              </Button>
            );
          })}
        </div>
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
