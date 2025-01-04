"use client";

import Image from "next/image";

export const Info = () => {
  return (
    <div className="relative mt-[60px] md:mt-[100px]">
      <div
        className="relative flex w-full items-center justify-center bg-[#03061e]"
        style={{
          position: "relative",
        }}
      >
        <div className="relative z-10 mt-[20px] max-w-4xl px-4 py-[50px] text-center text-white">
          <h1 className="text-4xl font-bold lg:text-6xl">
            Học tập thông minh, phát triển tương lai{" "}
          </h1>
          <p className="mt-4 text-lg">
            Highschool đồng hành cùng bạn trong hành trình học tập hiệu quả hơn
            với các phương pháp tối ưu và lộ trình học tập được cá nhân hóa.
          </p>
          <div className="flex flex-col items-center gap-5">
            <p className="mt-10 text-3xl font-bold md:text-4xl">Tài trợ bởi</p>
            <div className="relative h-[100px] w-[200px]">
              <Image
                src="/fpt-logo.png"
                alt="fpt logo"
                fill
                className="object-contain"
                priority
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
        ></div>
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
        ></div>
      </div>
    </div>
  );
};
