"use client";

import { IconUsers } from "@tabler/icons-react";
import { CategoryBar, Flex, Icon, Legend, Metric, Text } from "@tremor/react";
import React from "react";
import { useAllMembersQuery } from "@highschool/react-query/queries";
import { MemberList } from "@highschool/interfaces";
import { Skeleton } from "@highschool/ui/components/ui/skeleton";

import { CustomCard } from "./card";

import { useZone } from "@/hooks/use-zone";

const OrganizationUsersRaw = () => {
  const { data: zoneData } = useZone();

  const { data: memberData, isLoading: memberLoading } = useAllMembersQuery(
    zoneData?.id!,
  );
  const consolidate = (input: MemberList) => {
    let students = 0;
    let teachers = 0;

    input?.members?.forEach((r) => {
      if (r.role.toLowerCase() === "student") {
        students += 1;
      } else {
        teachers += 1;
      }
    });

    return { students, teachers };
  };

  const { students, teachers } = consolidate(memberData! || []);

  if (memberLoading) {
    return <Skeleton className="h-[170px] w-full" />;
  }

  return (
    <CustomCard>
      <Flex className="space-x-4" justifyContent="start">
        <Icon color="blue" icon={IconUsers} size="md" variant="light" />
        <div>
          <Text className="">Tổng người dùng</Text>
          <Metric className="font-display">
            {(students + teachers).toLocaleString()}
          </Metric>
        </div>
      </Flex>
      <div className="mt-4 h-9">
        <div className="space-y-2">
          <Flex className="items-center gap-2">
            <Text>{students} học sinh</Text>
            <Text>{teachers} mentor</Text>
          </Flex>
          <CategoryBar
            colors={["blue", "orange"]}
            showLabels={false}
            values={[
              (students / (students + teachers)) * 100,
              (teachers / (students + teachers)) * 100,
            ]}
          />
        </div>
      </div>
      <Legend
        categories={["Học sinh", "Mentor"]}
        className="mt-3"
        colors={["blue", "orange"]}
      />
    </CustomCard>
  );
};

export const OrganizationUsers = React.memo(OrganizationUsersRaw);
