"use client";

import { Label, Pie, PieChart } from "recharts";

import * as React from "react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@highschool/ui/components/ui/card";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartData = [
  { browser: "answerA", selection: 275, fill: "var(--answer-a)" },
  { browser: "answerB", selection: 200, fill: "var(--answer-b)" },
  { browser: "answerC", selection: 287, fill: "var(--answer-c)" },
  { browser: "answerD", selection: 173, fill: "var(--answer-d)" },
];

const chartConfig = {
  answerA: {
    label: "Đáp án A",
    color: "hsl(var(--answer-a))",
  },
  answerB: {
    label: "Đáp án B",
    color: "hsl(var(--answer-b))",
  },
  answerC: {
    label: "Đáp án C",
    color: "hsl(var(--answer-c))",
  },
  answerD: {
    label: "Đáp án D",
    color: "hsl(var(--answer-d))",
  },
} satisfies ChartConfig;

interface ChartResultProps {
  readonly className?: string;
}

export function ChartResult({ className }: ChartResultProps) {
  const totalVisitors = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.selection, 0);
  }, []);

  return (
    <Card className={`flex flex-col ${className} shadow-inset-gray-shadow`}>
      <CardHeader className="items-center pb-0 text-3xl">
        <CardTitle>Kết quả</CardTitle>
      </CardHeader>
      <CardContent className="relative flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[45vh]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="selection"
              nameKey="browser"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalVisitors.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          lựa chọn
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
        <span className="shadow-inset-gray-shadow absolute left-6 top-14 rounded-lg bg-[--answer-a] px-6 pb-5 pt-4 text-xl font-extrabold text-white">
          {chartData.at(0)?.selection}
        </span>
        <span className="shadow-inset-gray-shadow absolute right-6 top-14 rounded-lg bg-[--answer-b] px-6 pb-5 pt-4 text-xl font-extrabold text-white">
          {chartData.at(1)?.selection}
        </span>
        <span className="shadow-inset-gray-shadow absolute bottom-14 left-6 rounded-lg bg-[--answer-c] px-6 pb-5 pt-4 text-xl font-extrabold text-white">
          {chartData.at(2)?.selection}
        </span>
        <span className="shadow-inset-gray-shadow absolute bottom-14 right-6 rounded-lg bg-[--answer-d] px-6 pb-5 pt-4 text-xl font-extrabold text-white">
          {chartData.at(3)?.selection}
        </span>
      </CardContent>
    </Card>
  );
}
