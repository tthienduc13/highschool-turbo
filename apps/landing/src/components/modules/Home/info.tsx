"use client";

import Image from "next/image";
import { Card, CardContent } from "@highschool/ui/components/ui/card";

import { TextAnimate } from "@/components/core/common/text-animation";

export const Info = () => {
  return (
    <div className="relative mt-[60px] md:mt-[200px]">
      <div
        className="relative flex w-full items-center justify-center bg-[#03061e]"
        style={{
          position: "relative",
        }}
      >
        <div className="relative z-10 mt-[70px] max-w-4xl px-4 py-[50px] text-center text-white">
          <TextAnimate
            animation="slideUp"
            by="word"
            className="text-4xl font-bold lg:text-6xl"
          >
            Học tập thông minh, phát triển tương lai
          </TextAnimate>
          <TextAnimate
            animation="blurIn"
            by="word"
            className="mt-7 text-lg"
            duration={0.1}
          >
            Highschool đồng hành cùng bạn trong hành trình học tập hiệu quả hơn
            với các phương pháp tối ưu và lộ trình học tập được cá nhân hóa.
          </TextAnimate>
          <div
            className="relative mx-auto my-5 flex w-full max-w-[300px] items-center justify-center md:my-10 md:max-w-2xl lg:max-w-3xl"
            data-aos="fade-up"
          >
            <Card className="absolute left-10 top-[20px] w-full max-w-[260px] -translate-x-1/3 -rotate-[7deg] scale-90 overflow-hidden rounded-3xl shadow-md transition-all duration-200 ease-in-out hover:scale-100 md:max-w-[300px] lg:max-w-[340px]">
              <CardContent className="relative size-full p-0">
                <div className="bg-custom-gradient absolute -z-10 size-full opacity-5" />
                <div className="flex size-full flex-col gap-4 p-5">
                  <div className="flex flex-row items-start justify-between">
                    <div className="relative size-[80px] overflow-hidden rounded-2xl md:size-[120px]">
                      <Image
                        priority
                        alt="logo"
                        className="object-contain"
                        height={150}
                        src={
                          "https://res.cloudinary.com/dhdyel6be/image/upload/v1739368433/HighSchool/avatars/contributor/tpwe4nqfhkdqbb9i6f6c.jpg"
                        }
                        width={120}
                      />
                    </div>
                    <div className="rounded-md border bg-white px-2 py-1 text-sm font-medium">
                      Lớp 10
                    </div>
                  </div>
                  <p className="text-lg font-semibold">Nguyễn Xuân Thành</p>
                  <p>
                    Học sinh có thể học mọi lúc, mọi nơi với các bài giảng trực
                    tuyến và hệ thống ghi chú thông minh
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="relative z-10 w-full max-w-[260px] scale-90 overflow-hidden rounded-3xl shadow-md transition-all duration-200 ease-in-out hover:scale-100 md:max-w-[300px] lg:max-w-[340px]">
              <CardContent className="relative size-full p-0">
                <div className="bg-custom-gradient absolute size-full opacity-5" />
                <div className="flex size-full flex-col gap-4 p-5">
                  <div className="flex flex-row items-start justify-between">
                    <div className="relative size-[80px] overflow-hidden rounded-2xl md:size-[120px]">
                      <Image
                        priority
                        alt="logo"
                        className="object-contain"
                        height={120}
                        src={
                          "https://res.cloudinary.com/dhdyel6be/image/upload/v1739367764/HighSchool/avatars/contributor/jqbxxbxxdly8lwmhosel.jpg"
                        }
                        width={120}
                      />
                    </div>
                    <div className="rounded-md border bg-white px-2 py-1 text-sm font-medium">
                      Lớp 11
                    </div>
                  </div>
                  <p className="text-lg font-semibold">Nguyễn Lê Thiện Đức</p>
                  <p>
                    Nền tảng cung cấp nhiều bài giảng chất lượng, bài tập thực
                    hành và đề thi thử, hỗ trợ học sinh ôn tập hiệu quả.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="absolute right-10 top-[20px] z-20 w-full max-w-[260px] translate-x-1/3 rotate-[7deg] scale-90 overflow-hidden rounded-3xl shadow-md transition-all duration-200 ease-in-out hover:scale-100 md:max-w-[300px] lg:max-w-[340px]">
              <CardContent className="relative size-full p-0">
                <div className="bg-custom-gradient absolute -z-10 size-full opacity-5" />
                <div className="flex size-full flex-col gap-4 p-5">
                  <div className="flex flex-row items-start justify-between">
                    <div className="relative size-[80px] overflow-hidden rounded-2xl md:size-[120px]">
                      <Image
                        priority
                        alt="logo"
                        className="object-contain"
                        height={120}
                        src={
                          "https://res.cloudinary.com/dhdyel6be/image/upload/v1739368326/HighSchool/avatars/contributor/bske0fcoptwgaeac9mbp.jpg"
                        }
                        width={120}
                      />
                    </div>
                    <div className="rounded-md border bg-white px-2 py-1 text-sm font-medium">
                      Lớp 12
                    </div>
                  </div>
                  <p className="text-lg font-semibold">Tống Trần Lê Huy</p>
                  <p>
                    HighSchool có thiết kế thân thiện, giúp học sinh dễ dàng tìm
                    kiếm tài liệu và theo dõi tiến độ học tập.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="flex flex-col items-center gap-5">
            <TextAnimate
              animation="blurInUp"
              by="character"
              className="mt-10 text-3xl font-bold md:text-4xl"
            >
              Được tạo bởi
            </TextAnimate>
            <div
              className="relative mt-5 h-[100px] w-[200px]"
              data-aos="zoom-in"
              data-aos-duration="1000"
            >
              <Image
                fill
                priority
                alt="fpt logo"
                className="object-contain"
                src="/logo-with-text.svg"
                style={{ transform: "scale(2)" }}
              />
            </div>
          </div>
        </div>

        <div
          className="absolute left-0 top-[calc(-5vw+2px)] z-0 h-[5vw] w-full"
          style={{
            WebkitMaskImage: "url('/curve.svg')",
            WebkitMaskRepeat: "no-repeat",
            WebkitMaskPosition: "bottom",
            WebkitMaskSize: "100% 10vw",
            maskImage: "url('/curve.svg')",
            maskRepeat: "no-repeat",
            maskPosition: "bottom",
            maskSize: "auto 100%",
            backgroundColor: "#03061e",
          }}
        />
        <div
          className="absolute bottom-[calc(-5vw+2px)] left-0 z-0 h-[5vw] w-full"
          style={{
            WebkitMaskImage: "url('/bottom-curve.svg')",
            WebkitMaskRepeat: "no-repeat",
            WebkitMaskPosition: "bottom",
            WebkitMaskSize: "100% 10vw",
            maskImage: "url('/bottom-curve.svg')",
            maskRepeat: "no-repeat",
            maskPosition: "bottom",
            maskSize: "auto 100%",
            backgroundColor: "#03061e",
          }}
        />
      </div>
    </div>
  );
};
