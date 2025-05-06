"use client";

import React, { useState, useEffect } from "react";
import {
  AreaChart,
  Flex,
  Metric,
  Tab,
  TabGroup,
  TabList,
  Card,
  Title,
  Subtitle,
  Legend,
} from "@tremor/react";
import { motion } from "framer-motion";
import {
  IconChartBar,
  IconLoader2,
  IconPointFilled,
} from "@tabler/icons-react";
import { ZoneDashboard } from "@highschool/interfaces";

interface ActivityProps {
  zoneDashboardsData: ZoneDashboard[];
}

interface ChartDataPoint {
  time: string;
  [key: string]: string | number;
}

const timePoints = [
  "T1",
  "T2",
  "T3",
  "T4",
  "T5",
  "T6",
  "T7",
  "T8",
  "T9",
  "T10",
];

const customColors = {
  "8+": "green",
  "6.5-8": "emerald",
  "5-6.5": "blue",
  "3-5": "amber",
  "0-3": "rose",
} as const;

export const ZoneActivity = ({ zoneDashboardsData }: ActivityProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [periodIndex, setPeriodIndex] = useState(0);
  const [initialized, setInitialized] = useState(false);
  const [viewType, setViewType] = useState("area");

  const PERIODS = ["Hôm nay", "Tuần này", "Tháng này", "Quý này", "Năm nay"];

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      setInitialized(true);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const chartData: ChartDataPoint[] = timePoints.map((time, index) => {
    const entry: ChartDataPoint = { time };

    zoneDashboardsData.forEach((item) => {
      const baseValue = item.count;
      const trend = Math.min(index * 0.5, 5);

      entry[item.range] = Math.max(
        0,
        baseValue + Math.floor(trend + Math.random() * 2),
      );
    });

    return entry;
  });

  const totalCount = zoneDashboardsData.reduce(
    (sum, item) => sum + item.count,
    0,
  );

  const donutChartData = zoneDashboardsData.filter((item) => item.count > 0);

  return (
    <Card className="rounded-lg bg-white p-4">
      <Flex
        className="w-full flex-col items-start sm:flex-row sm:items-center"
        justifyContent="between"
      >
        <div className="space-y-1">
          <Flex alignItems="center" className="h-5">
            {initialized ? (
              <p className="text-sm text-gray-500">Tổng số điểm đánh giá</p>
            ) : (
              <div className="h-3 w-[120px] animate-pulse rounded bg-gray-200" />
            )}
          </Flex>
          {initialized ? (
            <div className="flex flex-row items-center gap-1">
              <div className="relative text-green-500">
                {initialized && (
                  <div className="absolute left-0 top-0 size-full animate-pulse rounded-full bg-green-400 opacity-30" />
                )}
                <IconPointFilled />
              </div>
              <Metric className="font-display">{totalCount}</Metric>
            </div>
          ) : (
            <div className="h-9 w-[80px] animate-pulse rounded-md bg-gray-200" />
          )}
        </div>

        <div className="mt-4 flex w-full justify-end sm:mt-0 sm:w-max">
          <TabGroup
            className="w-max"
            index={periodIndex}
            onIndexChange={setPeriodIndex}
          >
            <div className="flex flex-row items-center gap-3">
              <motion.div
                animate={
                  isLoading && initialized
                    ? {
                        opacity: 1,
                      }
                    : { opacity: 0 }
                }
                initial={{
                  opacity: 0,
                }}
              >
                <IconLoader2 className="animate-spin text-blue-300" size={20} />
              </motion.div>
              <TabList color="gray" variant="solid">
                {PERIODS.map((period, index) => (
                  <Tab key={index}>{period}</Tab>
                ))}
              </TabList>
            </div>
          </TabGroup>
        </div>
      </Flex>

      {/* <div className="mt-4 flex justify-end">
        <TabGroup
          index={viewType === "bar" ? 0 : 1}
          onIndexChange={(index) => setViewType(index === 0 ? "bar" : "donut")}
        >
          <TabList color="blue" variant="solid">
            <Tab>Biểu đồ cột</Tab>
            <Tab>Biểu đồ tròn</Tab>
          </TabList>
        </TabGroup>
      </div> */}

      <div className="relative mt-8 min-h-[400px] w-full overflow-hidden rounded-xl">
        {viewType === "area" && (
          <AreaChart
            autoMinValue={true}
            categories={zoneDashboardsData.map((item) => item.range)}
            className="h-[400px] w-full"
            colors={["green", "emerald", "blue", "amber", "rose"]}
            curveType="monotone"
            data={chartData}
            index="time"
            showAnimation={true}
            showGridLines={true}
            showLegend={false}
            showXAxis={true}
            showYAxis={true}
            valueFormatter={(value) => `${value}`}
            yAxisWidth={30}
          />
        )}

        {isLoading && (
          <div className="absolute left-0 top-0 flex size-full items-center justify-center rounded-xl border border-gray-200 p-10 text-center backdrop-blur-lg">
            <div className="flex flex-col items-center justify-center">
              <IconLoader2
                className="mb-3 animate-spin text-blue-500"
                size={30}
              />
              <h2 className="text-lg font-semibold">Đang tải dữ liệu...</h2>
            </div>
          </div>
        )}

        {initialized && !isLoading && totalCount === 0 && (
          <div className="absolute left-0 top-0 flex size-full items-center justify-center rounded-xl border border-gray-200 p-10 text-center backdrop-blur-lg">
            <div className="flex flex-col items-center justify-center">
              <IconChartBar className="mb-3 text-gray-400" size={30} />
              <h2 className="text-lg font-semibold">
                Chưa có dữ liệu nào được ghi nhận
              </h2>
              <p>
                Zone của bạn chưa có dữ liệu để hiển thị
                <br />
                Hãy kiểm tra lại sau.
              </p>
            </div>
          </div>
        )}
      </div>

      {viewType === "bar" && (
        <div className="mt-8">
          <Title>Chi tiết phân bố điểm</Title>
          <Subtitle>Phân bố theo các phạm vi</Subtitle>
          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
            {zoneDashboardsData.map((item) => (
              <Card
                key={item.range}
                decoration="top"
                decorationColor={
                  customColors[item.range as keyof typeof customColors] ||
                  "gray"
                }
              >
                <Flex alignItems="center" justifyContent="between">
                  <div>
                    <p className="text-sm text-gray-500">Phạm vi</p>
                    <p className="font-medium">{item.range}</p>
                  </div>
                  <div>
                    <Metric>{item.count}</Metric>
                  </div>
                </Flex>
              </Card>
            ))}
          </div>
        </div>
      )}

      {viewType === "donut" && (
        <div className="mt-8 flex min-h-[400px] flex-col items-center justify-center">
          <div className="w-full max-w-2xl">
            <Legend
              categories={donutChartData.map((item) => item.range)}
              colors={donutChartData.map(
                (item) =>
                  customColors[item.range as keyof typeof customColors] ||
                  "gray",
              )}
            />
          </div>
        </div>
      )}
    </Card>
  );
};
