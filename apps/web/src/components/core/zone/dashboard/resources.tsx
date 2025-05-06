"use client";

import { Flex, Icon, Metric, Text } from "@tremor/react";
import React from "react";
import { IconRefreshDot } from "@tabler/icons-react";

import { CustomCard } from "./card";

interface ZoneResourceProps {
  total: number;
}

const ZoneResourceRaw = ({ total }: ZoneResourceProps) => {
  return (
    <CustomCard>
      <Flex className="w-max space-x-4" justifyContent="start">
        <Icon color="blue" icon={IconRefreshDot} size="md" variant="light" />
        <div>
          <Text>Tài nguyên </Text>
          <Metric className="font-display">{total}</Metric>
        </div>
      </Flex>
      {total === 0 && (
        <div className="mt-4 flex flex-col gap-3">
          <h2 className="text-lg font-bold">Không có tài nguyên</h2>
          <Text>Hãy bắt đầu tạo tài nguyên cho zone của bạn</Text>
        </div>
      )}
    </CustomCard>
  );
};

export const ZoneResource = React.memo(ZoneResourceRaw);
