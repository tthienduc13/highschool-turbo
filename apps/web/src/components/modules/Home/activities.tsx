import Link from "next/link";
import { env } from "@highschool/env";
import { Button } from "@highschool/ui/components/ui/button";
import { IconDeviceGamepad2, IconMap } from "@tabler/icons-react";

import { Wrapper } from "./wrapper";

import { menuEventChannel } from "@/events/menu";

export const Activities = () => {
  return (
    <Wrapper title="Hoạt động">
      <div className="grid grid-cols-1 items-stretch gap-4 md:grid-cols-2">
        <div className="group flex cursor-pointer flex-row overflow-hidden rounded-lg border-2 border-gray-200 bg-white shadow-md dark:border-gray-700 dark:bg-gray-800">
          <div className="relative flex h-full w-[120px] items-center justify-center">
            <IconMap
              className="transition-all duration-100 group-hover:rotate-3 group-hover:scale-110"
              size={50}
            />
            <div
              aria-hidden="true"
              className="bg-gradient-radial via-transpare absolute left-0 top-0 z-[5] h-[500px] w-full rounded-full from-blue-300 to-transparent opacity-30 blur-2xl"
            />
          </div>
          <div className="flex h-full flex-1 flex-col p-4">
            <h2 className="text-lg font-semibold">Hướng nghiệp</h2>
            <p className="text-muted-foreground flex-1 text-justify text-sm">
              Hoạt động hướng nghiệp bao gồm 2 bài kiểm tra MBTI và Holland,
              Highschool sẽ giúp bạn tìm ra được nghề nghiệp phù hợp với bạn
            </p>
            <div className="mt-2 flex flex-row justify-end">
              <Button
                size="sm"
                onClick={() => menuEventChannel.emit("openCareerGuidanceModal")}
              >
                Thử ngay
              </Button>
            </div>
          </div>
        </div>
        <div className="group flex cursor-pointer flex-row overflow-hidden rounded-lg border-2 border-gray-200 bg-white shadow-md dark:border-gray-700 dark:bg-gray-800">
          <div className="relative flex h-full w-[120px] items-center justify-center">
            <IconDeviceGamepad2
              className="transition-all duration-200 group-hover:rotate-3 group-hover:scale-110"
              size={50}
            />
            <div
              aria-hidden="true"
              className="bg-gradient-radial via-transpare absolute left-0 top-0 z-[5] h-[500px] w-full rounded-full from-blue-300 to-transparent opacity-30 blur-2xl"
            />
          </div>
          <div className="flex h-full flex-1 flex-col p-4">
            <h2 className="text-lg font-semibold">Trò chơi</h2>
            <p className="text-muted-foreground flex-1 text-justify text-sm">
              Bao gồm các trò chơi giải đố hằng ngày, hằng tuần, hằng tháng giúp
              bạn rèn luyện trí tuệ và có thể nhận được nhiều phần quà trị giá
            </p>
            <div className="mt-2 flex flex-row justify-end">
              <Link href={`${env.NEXT_PUBLIC_GAME_URL}/join`}>
                <Button size="sm">Thử ngay</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};
