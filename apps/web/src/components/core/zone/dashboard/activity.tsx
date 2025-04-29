"use client";

import { AreaChart, Flex, Metric, Tab, TabGroup, TabList } from "@tremor/react";
import { motion } from "framer-motion";
import React from "react";
import {
  IconActivityHeartbeat,
  IconLoader2,
  IconPointFilled,
} from "@tabler/icons-react";
import { Skeleton } from "@highschool/ui/components/ui/skeleton";

import { useZone } from "@/hooks/use-zone";

const PERIODS = ["12h", "24h", "5d", "14d", "30d"] as const;

const placeholderData = [
  {
    time: "12:00",
    Students: 0,
    Teachers: 0,
  },
  {
    time: "13:00",
    Students: 10,
    Teachers: 12,
  },
  {
    time: "14:00",
    Students: 10,
    Teachers: 6,
  },
  {
    time: "15:00",
    Students: 4,
    Teachers: 6,
  },
  {
    time: "16:00",
    Students: 7,
    Teachers: 7,
  },
  {
    time: "17:00",
    Students: 10,
    Teachers: 0,
  },
];

const ZoneActivityRaw = () => {
  const [isLoading, setIsLoading] = React.useState(true);

  const [activeUsers, setActiveUsers] = React.useState<number>(0);
  const [periodIndex, setPeriodIndex] = React.useState<number>(0);
  const [initialized, setInitialized] = React.useState(false);
  //   const [chartData, setChartData] = React.useState<
  //     ReturnType<typeof formatActivityData>
  //   >([]);

  const { data: zoneData } = useZone();
  //   const { data, isLoading } = api.organizations.getActivity.useQuery(
  //     { id, period: PERIODS[periodIndex]! },
  //     {
  //       enabled: !!id && !!session.data?.user,
  //       refetchInterval: 60 * 1000,
  //       trpc: {
  //         context: {
  //           skipBatch: true,
  //         },
  //       },
  //     },
  //   );

  //   React.useEffect(() => {
  //     if (!initialized || !data) return;
  //     setActiveUsers(data?.total || 0);
  //     // eslint-disable-next-line react-hooks/exhaustive-deps
  //   }, [initialized, data]);

  //   const formatActivityData = (
  //     activity: NonNullable<NonNullable<typeof data>["activity"]>,
  //   ) => {
  //     const data = activity.map((item) => {
  //       const period = PERIODS[periodIndex]!;
  //       const options: Intl.DateTimeFormatOptions =
  //         period == "12h"
  //           ? {
  //               hour: "numeric",
  //               minute: "2-digit",
  //             }
  //           : period == "24h"
  //             ? {
  //                 weekday: "short",
  //                 hour: "numeric",
  //                 minute: "2-digit",
  //               }
  //             : period == "5d"
  //               ? {
  //                   weekday: "short",
  //                   hour: "numeric",
  //                   minute: "2-digit",
  //                 }
  //               : {
  //                   month: "short",
  //                   day: "numeric",
  //                   hour: "numeric",
  //                   minute: "2-digit",
  //                 };

  //       const time = new Date(item.time).toLocaleTimeString(["en"], options);

  //       return {
  //         time,
  //         Students: item.activeStudents,
  //         Teachers: item.activeTeachers,
  //       };
  //     });

  //     return data;
  //   };

  //   React.useEffect(() => {
  //     if (isLoading || !data?.activity || !orgData) return;
  //     setChartData(formatActivityData(data.activity));
  //     setInitialized(true);
  //     // eslint-disable-next-line react-hooks/exhaustive-deps
  //   }, [data, orgData]);

  React.useEffect(() => {
    setInitialized(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="bg-gray-50">
      <Flex
        className="w-full flex-col items-start sm:flex-row sm:items-center"
        justifyContent="between"
      >
        <div className="space-y-1">
          <Flex alignItems="center" className="h-5">
            {initialized ? (
              <p className="text-sm text-gray-500">Số người hoạt động</p>
            ) : (
              <Skeleton className="h-3 w-[70px]" />
            )}
          </Flex>
          {initialized ? (
            <div className="ml-[-6px] flex flex-row items-center gap-1">
              <div className="relative text-green-500">
                {initialized && (
                  <div className="absolute left-0 top-0 size-full animate-pulse rounded-full bg-green-400 opacity-30" />
                )}
                <IconPointFilled />
              </div>
              <Metric className="font-display">{activeUsers}</Metric>
            </div>
          ) : (
            <Skeleton className="h-9 w-[80px] rounded-md" />
          )}
        </div>
        <div className="flex w-full justify-end sm:w-max">
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
                    : {}
                }
                initial={{
                  opacity: 0,
                }}
              >
                <IconLoader2
                  className="animate-spin text-blue-300"
                  color="blue.300"
                  //   size="sm"
                />
              </motion.div>
              {/* <Skeleton isLoaded={initialized} rounded="lg"> */}
              <TabList color="gray" variant="solid">
                {PERIODS.map((period, index) => (
                  <Tab key={index}>{period}</Tab>
                ))}
              </TabList>
              {/* </Skeleton> */}
            </div>
          </TabGroup>
        </div>
      </Flex>

      <div className="relative mt-8 size-full overflow-hidden rounded-xl">
        <AreaChart
          allowDecimals={false}
          categories={["Students", "Teachers"]}
          className="-ml-4 h-[436px] w-[calc(100%+16px)]"
          colors={["blue", "orange"]}
          //   data={chartData.length > 1 ? chartData : placeholderData}
          data={placeholderData}
          index="time"
          showAnimation={true}
          showLegend={false}
        />
        {/* {initialized && chartData.length <= 1 && ( */}

        {/* {initialized && ( */}
        <div className="absolute left-0 top-0  flex size-full items-center justify-center rounded-xl border border-gray-200 p-10 text-center backdrop-blur-lg dark:border-gray-800/50  dark:bg-gray-900 ">
          <div className="flex flex-col items-center justify-center">
            <div className="flex flex-row items-center gap-2">
              <IconActivityHeartbeat />
              <h2 className="text-lg font-semibold">
                Chưa có hoạt động nào được ghi nhận
              </h2>
            </div>
            <p>
              Zone của bạn chưa đủ hoạt động để hiển thị
              <br />
              Hãy kiểm tra lại sau.
            </p>
          </div>
        </div>
        {/* )} */}
      </div>
    </div>
  );
};

export const ZoneActivity = React.memo(ZoneActivityRaw);
