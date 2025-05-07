"use client";

import React, { useRef } from "react";
import HeatMap, { HeatMapValue } from "@uiw/react-heat-map";
import {
  IconChevronDown,
  IconTrendingUp,
  IconCheck,
} from "@tabler/icons-react";
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

type ViewType = "login" | "flashcard" | "learnedlesson";

const VIEW_TYPE_ORDER: ViewType[] = ["flashcard", "login", "learnedlesson"];

export const ActivityHeatMap = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const {
    heatmap,
    selectedViewTypes,
    setSelectedViewTypes,
    selectedYear,
    setSelectedYear,
  } = useDashboard();

  const years = [2025, 2024, 2023];

  const viewTypeLabels: Record<ViewType, string> = {
    login: "Đăng nhập vào hệ thống",
    flashcard: "Flashcards hoàn thành",
    learnedlesson: "Bài học hoàn thành",
  };

  const toggleViewType = (type: ViewType) => {
    setSelectedViewTypes((prev) => {
      if (prev.includes(type)) {
        return prev.filter((t) => t !== type);
      }
      // Add new type and sort according to VIEW_TYPE_ORDER
      const newTypes = [...prev, type];

      return VIEW_TYPE_ORDER.filter((t) => newTypes.includes(t));
    });
  };

  const generateEmptyHeatmapData = (
    startYear: number,
    endYear: number,
  ): HeatMapValue[] => {
    const startDate = new Date(`${startYear}-01-01`);
    const endDate = new Date(`${endYear}-12-31`);
    const days = [];

    for (
      let date = new Date(startDate);
      date <= endDate;
      date.setDate(date.getDate() + 1)
    ) {
      const formattedDate = date.toISOString().split("T")[0];

      days.push({
        date: formattedDate,
        count: 0,
        content: "Không có hoạt động ngày này",
      });
    }

    return days;
  };

  const startDate = `${heatmap.startYear}/01/01`;
  const endDate = `${heatmap.endYear}/01/01`;

  const heatmapData = heatmap?.data.length
    ? heatmap.data
    : [
        {
          date: "2022-01-01",
          count: 1,
        },
      ];

  if (!heatmapData.length) {
    return;
  }

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
            {VIEW_TYPE_ORDER.map((type) => (
              <DropdownMenuItem
                key={type}
                className={cn("flex items-center justify-between")}
                onClick={() => toggleViewType(type)}
              >
                <span>{viewTypeLabels[type]}</span>
                {selectedViewTypes.includes(type) && (
                  <IconCheck className="ml-2" size={16} />
                )}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="flex w-full justify-between gap-5">
        <div className="w-full max-w-4xl overflow-x-auto rounded-lg border-gray-100 bg-white p-6 shadow-lg">
          <HeatMap
            className="w-full"
            endDate={new Date(`${selectedYear + 1}/01/01`)}
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
                    data.content?.toString()
                      ? data.content.toString()
                      : data.count > 0
                        ? `${data.count} hoạt động`
                        : "Không có hoạt động"
                  }
                >
                  <rect {...props} />
                </Hint>
              );
            }}
            rectSize={14}
            startDate={new Date(`${selectedYear}/01/01`)}
            value={heatmapData}
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
                onClick={() => setSelectedYear(year)}
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
