"use client";

import { BarList, Flex, Icon, Metric, Text } from "@tremor/react";
import React from "react";
import { IconRefreshDot } from "@tabler/icons-react";

import { CustomCard } from "./card";

const ZoneResourceRaw = () => {
  //   const { data } = api.organizations.getClassStatistics.useQuery(
  //     { id },
  //     {
  //       enabled: !!id && !!session.data?.user,
  //     },
  //   );

  const consolidate = () =>
    // input: RouterOutputs["organizations"]["getClassStatistics"],
    {
      let total = 0;

      // const consolidated = input.map((r) => ({
      //   name: r.category || "Other",
      //   value: r.count,
      // }));

      const consolidatedMap = new Map<string, number>();

      // consolidated.forEach((r) => {
      //   if (consolidatedMap.has(r.name)) {
      //     consolidatedMap.set(r.name, consolidatedMap.get(r.name)! + r.value);
      //   } else {
      //     consolidatedMap.set(r.name, r.value);
      //   }
      //   total += r.value;
      // });

      const consolidatedArray = Array.from(
        consolidatedMap,
        ([name, value]) => ({
          name,
          value,
        }),
      );

      return { consolidated: consolidatedArray, total };
    };

  const { consolidated, total } = consolidate();

  return (
    // <Skeleton isLoaded={!!data} rounded="xl">
    <CustomCard>
      <Flex className="w-max space-x-4" justifyContent="start">
        <Icon color="blue" icon={IconRefreshDot} size="md" variant="light" />
        <div>
          <Text>Tài nguyên </Text>
          <Metric className="font-display">{total}</Metric>
        </div>
      </Flex>
      {!consolidated.length && (
        <div className="mt-4 flex flex-col gap-3">
          <h2 className="text-lg font-bold">Không có tài nguyên</h2>
          <Text>Hãy bắt đầu tạo tài nguyên cho zone của bạn</Text>
        </div>
      )}
      <BarList className="mt-4" data={consolidated} />
    </CustomCard>
    // </Skeleton>
  );
};

export const ZoneResource = React.memo(ZoneResourceRaw);
