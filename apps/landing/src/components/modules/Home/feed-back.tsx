import Image from "next/image";

import { Card, CardContent } from "@highschool/ui/components/ui/card";

export const FeedBack = () => {
  return (
    <div className="mx-auto flex w-full max-w-[560px] flex-col gap-12 p-4 text-center md:mt-[100px] md:px-10 lg:w-full lg:max-w-7xl lg:px-14">
      <div className="mx-auto flex max-w-4xl flex-col gap-3 px-4 text-center">
        <h2 className="bg-gradient-radial to-primary from-gray-800 bg-clip-text text-2xl font-medium text-transparent">
          Tại sao lại sử dụng Highschool?
        </h2>
        <p className="text-4xl font-bold md:text-5xl">
          Được tin tưởng bởi nhiều học sinh
        </p>
      </div>
      <div className="relative mx-auto flex w-full max-w-[300px] items-center justify-center md:max-w-2xl lg:max-w-3xl">
        <Card className="absolute left-10 top-[20px] w-full max-w-[260px] -translate-x-1/3 -rotate-[7deg] scale-90 overflow-hidden rounded-3xl shadow-md transition-all duration-200 ease-in-out hover:scale-100 md:max-w-[300px] lg:max-w-[340px]">
          <CardContent className="relative h-full w-full p-0">
            <div className="bg-custom-gradient absolute -z-10 h-full w-full opacity-5"></div>
            <div className="flex h-full w-full flex-col gap-4 p-5">
              <div className="flex flex-row items-start justify-between">
                <div className="relative h-[80px] w-[80px] overflow-hidden rounded-2xl md:h-[120px] md:w-[120px]">
                  <Image
                    src={
                      "https://res.cloudinary.com/dyu2kc3bl/image/upload/v1734500933/highschool/user-image/wyc29ngk9rue8bsa3k5q.png"
                    }
                    alt="logo"
                    height={120}
                    width={120}
                    priority
                    className="object-contain"
                  />
                </div>
                <div className="rounded-md border bg-white px-2 py-1 text-sm font-medium">
                  Lớp 10
                </div>
              </div>
              <p className="text-lg font-semibold">Nguyễn Lê Thiện Đức</p>
              <p>
                HighSchool là một nền tảng học tập trực tuyến tuyệt vời cho học
                sinh trung học.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="relative z-10 w-full max-w-[260px] scale-90 overflow-hidden rounded-3xl shadow-md transition-all duration-200 ease-in-out hover:scale-100 md:max-w-[300px] lg:max-w-[340px]">
          <CardContent className="relative h-full w-full p-0">
            <div className="bg-custom-gradient absolute h-full w-full opacity-5"></div>
            <div className="flex h-full w-full flex-col gap-4 p-5">
              <div className="flex flex-row items-start justify-between">
                <div className="relative h-[80px] w-[80px] overflow-hidden rounded-2xl md:h-[120px] md:w-[120px]">
                  <Image
                    src={
                      "https://res.cloudinary.com/dyu2kc3bl/image/upload/v1734500933/highschool/user-image/wyc29ngk9rue8bsa3k5q.png"
                    }
                    alt="logo"
                    height={120}
                    width={120}
                    priority
                    className="object-contain"
                  />
                </div>
                <div className="rounded-md border bg-white px-2 py-1 text-sm font-medium">
                  Lớp 10
                </div>
              </div>
              <p className="text-lg font-semibold">Nguyễn Lê Thiện Đức</p>
              <p>
                HighSchool là một nền tảng học tập trực tuyến tuyệt vời cho học
                sinh trung học.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="absolute right-10 top-[20px] z-20 w-full max-w-[260px] translate-x-1/3 rotate-[7deg] scale-90 overflow-hidden rounded-3xl shadow-md transition-all duration-200 ease-in-out hover:scale-100 md:max-w-[300px] lg:max-w-[340px]">
          <CardContent className="relative h-full w-full p-0">
            <div className="bg-custom-gradient absolute -z-10 h-full w-full opacity-5"></div>
            <div className="flex h-full w-full flex-col gap-4 p-5">
              <div className="flex flex-row items-start justify-between">
                <div className="relative h-[80px] w-[80px] overflow-hidden rounded-2xl md:h-[120px] md:w-[120px]">
                  <Image
                    src={
                      "https://res.cloudinary.com/dyu2kc3bl/image/upload/v1734500933/highschool/user-image/wyc29ngk9rue8bsa3k5q.png"
                    }
                    alt="logo"
                    height={120}
                    width={120}
                    priority
                    className="object-contain"
                  />
                </div>
                <div className="rounded-md border bg-white px-2 py-1 text-sm font-medium">
                  Lớp 10
                </div>
              </div>
              <p className="text-lg font-semibold">Nguyễn Lê Thiện Đức</p>
              <p>
                HighSchool là một nền tảng học tập trực tuyến tuyệt vời cho học
                sinh trung học.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
