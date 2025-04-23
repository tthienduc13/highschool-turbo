import { CareerGuidanceBrief } from "@highschool/react-query/apis";
import { Button } from "@highschool/ui/components/ui/button";
import { Card, CardContent } from "@highschool/ui/components/ui/card";
import { IconArrowRight, IconMap } from "@tabler/icons-react";

import { menuEventChannel } from "@/events/menu";

interface CurrentCareerGuidanceSummaryProps {
  brief: CareerGuidanceBrief;
}

export const CurrentCareerGuidanceSummary = ({
  brief,
}: CurrentCareerGuidanceSummaryProps) => {
  if (!brief || !brief.hollandResponse || !brief.mbtiResponse) {
    return (
      <div className="group flex cursor-pointer flex-row overflow-hidden rounded-lg border-2 border-gray-200 bg-white shadow-md dark:border-gray-700 dark:bg-gray-800">
        <div className="relative flex  w-[120px] items-center justify-center">
          <IconMap
            className="transition-all duration-100 group-hover:rotate-3 group-hover:scale-110"
            size={50}
          />
          <div
            aria-hidden="true"
            className="bg-gradient-radial absolute left-0 top-0 z-[5] h-[500px] w-full rounded-full from-blue-300 via-transparent to-transparent opacity-30 blur-2xl"
          />
        </div>
        <div className="flex h-full flex-1 flex-col p-4">
          <h2 className="text-2xl font-semibold">Hướng nghiệp</h2>
          <p className="text-muted-foreground flex-1 text-justify ">
            Hoạt động hướng nghiệp bao gồm 2 bài kiểm tra MBTI và Holland,
            Highschool sẽ giúp bạn tìm ra được nghề nghiệp phù hợp với bạn
          </p>
          <div className="mt-2 flex flex-row justify-end">
            <Button
              size="lg"
              onClick={() => menuEventChannel.emit("openCareerGuidanceModal")}
            >
              Thử ngay
              <IconArrowRight />
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="grid w-full grid-cols-1 items-stretch gap-4 md:grid-cols-2">
      <Card className="w-full border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
        <CardContent className="flex flex-col gap-4 p-5">
          <div className="flex flex-row items-center justify-between">
            <h3 className="highlight highlight-[#C9F77A] highlight-variant-5 w-fit text-lg font-medium">
              Kiểm tra tính cách (MBTI)
            </h3>
            <div className="bg-primary/40 flex h-8 items-center justify-center rounded-md px-3 text-base font-bold">
              {brief?.mbtiResponse.mbtiType}
            </div>
          </div>
          <div className="flex flex-col gap-1 pl-4">
            {brief?.mbtiResponse.mbtiSummary.map((item, index) => (
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
              {brief?.hollandResponse.hollandType}
            </div>
          </div>
          <div className="flex flex-col gap-1 pl-4">
            {brief?.hollandResponse.hollandSummary.map((item, index) => (
              <p key={index} className="list-item text-gray-700">
                {item}
              </p>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
