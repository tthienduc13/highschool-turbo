import Image from "next/image";
import Link from "next/link";

import { env } from "@highschool/env";
import { Button } from "@highschool/ui/components/ui/button";

import {
  IconArrowRight,
  IconChevronDown,
  IconSparkles,
} from "@tabler/icons-react";

export const Banner = () => {
  return (
    <div className="relative h-full w-full">
      <div className="absolute top-[190px] -z-10 h-full w-[400%] max-w-[2200px] opacity-10 blur-[30px] lg:top-[260px] lg:w-[150%]">
        <div className="relative h-full w-full rotate-12">
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-0 pb-[31.25%]" />
          <div className="bg-custom-gradient absolute bottom-0 left-0 right-0 top-0 flex h-full w-full items-center justify-center overflow-hidden"></div>
        </div>
      </div>
      <div className="mx-auto flex w-full max-w-[1440px] flex-col justify-center gap-6 px-4 md:items-center lg:px-10 lg:py-10">
        <div className="flex w-full flex-col gap-10 md:flex-row lg:mt-10 lg:max-w-7xl lg:px-10 xl:px-20">
          <div className="w-full md:w-2/3">
            <div className="flex flex-col gap-6 lg:gap-8">
              <Button
                variant={"outline"}
                className="bg-primary/10 hover:bg-primary/10 text-primary hover:text-primary w-fit rounded-xl border-none text-sm"
              >
                <IconSparkles
                  size={18}
                  className="fill-yellow-500 text-yellow-500"
                />{" "}
                Chỉ có tại HighschoolVN{" "}
                <IconSparkles
                  size={18}
                  className="fill-yellow-500 text-yellow-500"
                />
              </Button>
              <div className="flex flex-col gap-5">
                <h1 className="space-x-1 text-3xl font-semibold lg:text-4xl xl:text-5xl">
                  Chỉ với 2 loại bài kiểm tra
                  <span className="text-theme_color highlight highlight-[#C9F77A] highlight-variant-5 -z-10 font-bold after:translate-y-1">
                    {""} MBTI {""}
                  </span>
                  và{" "}
                  <span className="text-theme_color highlight highlight-[#C9F77A] highlight-variant-5 font-bold after:translate-y-1">
                    Holland
                  </span>
                  , bạn sẽ có câu trả lời
                  <br />{" "}
                </h1>
                <h2 className="text-muted-foreground text-sm font-semibold lg:text-base">
                  Khám phá bản thân và bằng hai bài kiểm tra và bạn sẽ biết được
                  chính xác <br className="hidden md:block" /> mình phù hợp với
                  ngành nghề nào. Chúng tôi sẽ đưa ra chi tiết kết quả{" "}
                  <br className="hidden md:block" /> để bạn tham khảo và chọn
                  đúng con đường cho tương lai!
                </h2>
              </div>
              <div className="flex gap-2">
                <Link href={"#workflow"}>
                  <Button
                    variant={"default"}
                    className="flex w-fit uppercase md:hidden"
                  >
                    Tìm hiểu thêm <IconChevronDown size={18} className="ml-2" />
                  </Button>
                </Link>
                <Link href={"#workflow"}>
                  <Button
                    variant={"default"}
                    size={"lg"}
                    className="hidden w-fit uppercase md:flex"
                  >
                    Tìm hiểu thêm <IconChevronDown size={18} className="ml-2" />
                  </Button>
                </Link>
                <Link href={`${env.NEXT_PUBLIC_APP_URL}/career-guidance/mbti`}>
                  <Button
                    variant={"outline"}
                    className="flex w-fit uppercase md:hidden"
                  >
                    Thử ngay miễn phí
                    <IconArrowRight size={18} className="mb-1 ml-2" />
                  </Button>
                </Link>
                <Link href={`${env.NEXT_PUBLIC_APP_URL}/career-guidance/mbti`}>
                  <Button
                    variant={"outline"}
                    size={"lg"}
                    className="hidden w-fit uppercase md:flex"
                  >
                    Thử ngay miễn phí{" "}
                    <IconArrowRight size={18} className="mb-1 ml-2" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
          <div className="relative flex-1">
            <Image
              src="/images/career-guidance/career.jpg"
              alt="career"
              width={200}
              height={200}
              className="h-[300px] w-full rounded-[40px] object-cover lg:h-[400px]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
