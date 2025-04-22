"use client";

import { useUserBriefQuery } from "@highschool/react-query/queries";
import { Button } from "@highschool/ui/components/ui/button";
import { Card, CardContent } from "@highschool/ui/components/ui/card";
import { IconHistory, IconRouteAltRight } from "@tabler/icons-react";

export const CareerGuidanceSummary = () => {
  const { data, isLoading } = useUserBriefQuery();

  if (!data || isLoading) {
    return;
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-row items-center gap-2">
          <IconRouteAltRight size={24} />
          <h2 className="text-3xl font-semibold">Hướng nghiệp </h2>
        </div>
        <Button variant={"outline"}>
          <IconHistory className="!size-5" />
          Xem lịch sử
        </Button>
      </div>
      <div className="flex flex-col items-center justify-center gap-4">
        <div className="grid w-full grid-cols-1 items-stretch gap-4 md:grid-cols-2">
          <Card className="w-full border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
            <CardContent className="flex flex-col gap-4 p-5">
              <div className="flex flex-row items-center justify-between">
                <h3 className="highlight highlight-[#C9F77A] highlight-variant-5 w-fit text-lg font-medium">
                  Kiểm tra tính cách (MBTI)
                </h3>
                <div className="bg-primary/40 flex h-8 items-center justify-center rounded-md px-3 text-base font-bold">
                  {data?.data?.mbtiResponse.mbtiType}
                </div>
              </div>
              <div className="flex flex-col gap-1 pl-4">
                {data?.data?.mbtiResponse.mbtiSummary.map((item, index) => (
                  <p key={index} className="list-item text-gray-700">
                    {item}
                  </p>
                ))}
              </div>
            </CardContent>
          </Card>
          <Card className="w-full border-gray-200 dark:border-gray-700 dark:bg-gray-800">
            <CardContent className="flex flex-col gap-4 p-5">
              <div className="flex flex-row items-center justify-between">
                <h3 className="highlight highlight-[#C9F77A] highlight-variant-5 w-fit text-lg font-medium">
                  Định hướng nghề nghiệp (Holland)
                </h3>
                <div className="bg-primary/40 flex h-8 items-center justify-center rounded-md px-3 text-base font-bold">
                  {data?.data?.hollandResponse.hollandType}
                </div>
              </div>
              <div className="flex flex-col gap-1 pl-4">
                {data?.data?.hollandResponse.hollandSummary.map(
                  (item, index) => (
                    <p key={index} className="list-item text-gray-700">
                      {item}
                    </p>
                  ),
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
