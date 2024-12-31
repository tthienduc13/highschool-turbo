import { Button } from "@highschool/ui/components/ui/button";
import { Wrapper } from "./wrapper";
import { menuEventChannel } from "@/events/menu";
import { IconDeviceGamepad2, IconMap } from "@tabler/icons-react";

export const Activities = () => {
  return (
    <Wrapper title="Hoạt động">
      <div className="grid grid-cols-1 items-stretch gap-4 md:grid-cols-2">
        <div className="rounded-lg group border-2 border-gray-200 cursor-pointer bg-white flex flex-row  shadow-md dark:border-gray-700 dark:bg-gray-800 overflow-hidden">
          <div className="w-[120px]  h-full flex items-center justify-center relative">
            <IconMap
              className="group-hover:scale-110 group-hover:rotate-4 transition-all duration-100"
              size={50}
            />
            <div
              className="bg-gradient-radial via-transpare absolute left-0 top-0 z-[5] h-[500px] w-full rounded-full from-blue-300 to-transparent opacity-30 blur-2xl"
              aria-hidden="true"
            />
          </div>
          <div className="flex flex-col flex-1  p-4 h-full">
            <h2 className="text-lg font-semibold">Hướng nghiệp</h2>
            <p className="text-muted-foreground text-sm text-justify flex-1">
              Hoạt động hướng nghiệp bao gồm 2 bài kiểm tra MBTI và Holland,
              Highschool sẽ giúp bạn tìm ra được nghề nghiệp phù hợp với bạn
            </p>
            <div className="flex flex-row justify-end mt-2">
              <Button
                onClick={() => menuEventChannel.emit("openCareerGuidanceModal")}
                size="sm"
              >
                Thử ngay
              </Button>
            </div>
          </div>
        </div>
        <div className="rounded-lg group border-2 border-gray-200 cursor-pointer bg-white flex flex-row  shadow-md dark:border-gray-700 dark:bg-gray-800 overflow-hidden">
          <div className="w-[120px]  h-full flex items-center justify-center relative">
            <IconDeviceGamepad2
              className="group-hover:scale-110 group-hover:rotate-4 transition-all duration-200"
              size={50}
            />
            <div
              className="bg-gradient-radial via-transpare absolute left-0 top-0 z-[5] h-[500px] w-full rounded-full from-blue-300 to-transparent opacity-30 blur-2xl"
              aria-hidden="true"
            />
          </div>
          <div className="flex flex-col flex-1  p-4 h-full">
            <h2 className="text-lg font-semibold">Trò chơi</h2>
            <p className="text-muted-foreground text-sm text-justify flex-1">
              Bao gồm các trò chơi giải đố hằng ngày, hằng tuần, hằng tháng giúp
              bạn rèn luyện trí tuệ và có thể nhận được nhiều phần quà trị giá
            </p>
            <div className="flex flex-row justify-end mt-2">
              <Button size="sm">Thử ngay</Button>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};
