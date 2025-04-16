"use client";

import React, { useRef, useState, useEffect } from "react";
import HeatMap from "@uiw/react-heat-map";
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
  const [debugData, setDebugData] = useState<any>(null);

  const years = [2025, 2024, 2023];

  const { heatmap } = useDashboard();

  const generateEmptyHeatmapData = (startYear: number, endYear: number) => {
    const startDate = new Date(`${startYear}/01/01`);
    const endDate = new Date(`${endYear}/12/31`);
    const days = [];

    for (
      let date = new Date(startDate);
      date <= endDate;
      date.setDate(date.getDate() + 1)
    ) {
      const formattedDate = date.toLocaleDateString("en-CA").replace(/-/g, "/");

      days.push({
        date: formattedDate,
        count: 0, // Đảm bảo count = 0 cho ngày không có hoạt động
        content: "Không có hoạt động ngày này",
      });
    }

    return days;
  };

  // Debug: Kiểm tra dữ liệu
  useEffect(() => {
    // Kiểm tra dữ liệu từ hook và dữ liệu trống
    if (heatmap?.data) {
      const hasNonZeroCount = heatmap.data.some((item) => item.count > 0);

      setDebugData({
        sample: heatmap.data.slice(0, 5),
        hasNonZero: hasNonZeroCount,
      });
    }
  }, [heatmap]);

  // Tạo dữ liệu test với count khác nhau để kiểm tra màu sắc
  const testData = [
    { date: "2024/01/01", count: 0, content: "Không có hoạt động" },
    { date: "2024/01/02", count: 1, content: "1 hoạt động" },
    { date: "2024/01/03", count: 2, content: "2 hoạt động" },
    { date: "2024/01/04", count: 3, content: "3 hoạt động" },
    { date: "2024/01/05", count: 4, content: "4 hoạt động" },
  ];

  const startDate = `${heatmap.startYear}/01/01`;
  const endDate = `${heatmap.endYear}/01/01`;

  const heatmapData = heatmap?.data.length
    ? heatmap.data
    : generateEmptyHeatmapData(heatmap.startYear, heatmap.endYear);

  if (!heatmapData.length) {
    return;
  }

  const hasActivities = heatmapData.some((item) => item.count > 0);

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
        <div className="w-full max-w-4xl overflow-x-auto rounded-lg border-gray-100 bg-white p-6 shadow-lg">
          <HeatMap
            className="w-full"
            endDate={new Date(endDate)}
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
              "var(--rhm-rect, #EBEDF0)", // Màu cho count = 0
              "#C6E48B", // Màu cho count thấp
              "#7BC96F", // Màu cho count trung bình thấp
              "#239A3B", // Màu cho count trung bình cao
              "#196127", // Màu cho count cao
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
            startDate={new Date(startDate)}
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
