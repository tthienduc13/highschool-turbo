"use client";

import { useRef, useState } from "react";

import Image from "next/image";
import Link from "next/link";

import { env } from "@highschool/env";
import { useMediaQuery } from "@highschool/hooks";
import { Button } from "@highschool/ui/components/ui/button";

import {
  IconArrowRight,
  IconChevronDown,
  IconSchool,
} from "@tabler/icons-react";

import AvatarCircles from "@/components/ui/avatar-circles";
import { FlipWords } from "@/components/ui/flip-words";

const avatarUrls = [
  "https://avatars.githubusercontent.com/u/16860528",
  "https://avatars.githubusercontent.com/u/20110627",
  "https://avatars.githubusercontent.com/u/106103625",
  "https://avatars.githubusercontent.com/u/59228569",
  "https://avatars.githubusercontent.com/u/16860528",
  "https://avatars.githubusercontent.com/u/20110627",
  "https://avatars.githubusercontent.com/u/106103625",
  "https://avatars.githubusercontent.com/u/59228569",
];

export const Banner = () => {
  const words = ["học tập", "hướng nghiệp"];
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const svgRef1 = useRef<SVGSVGElement>(null);
  const svgRef2 = useRef<SVGSVGElement>(null);
  const svgRef3 = useRef<SVGSVGElement>(null);
  const [isMouseEntered, setIsMouseEntered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current || !isMouseEntered) return;
    const { left, top, width, height } =
      containerRef.current.getBoundingClientRect();

    const x = (e.clientX - left - width / 2) / (height / 2);
    const y = (e.clientY - top - height / 2) / (height / 2);

    const rotateX = y * 30;
    const rotateY = -x * 30;

    containerRef.current.style.transform = `rotateY(${rotateY}deg) rotateX(${rotateX}deg)`;
    if (imageRef.current) {
      imageRef.current.style.transform = `translateZ(30px) rotateY(${-rotateY}deg) rotateX(${-rotateX}deg)`;
    }
    if (svgRef1.current) {
      svgRef1.current.style.transform = `translateZ(15px) rotateY(${rotateY}deg) rotateX(${rotateX}deg)`;
    }
    if (svgRef2.current) {
      svgRef2.current.style.transform = `translateZ(15px) rotateY(${rotateY}deg) rotateX(${rotateX}deg)`;
    }
    if (svgRef3.current) {
      svgRef3.current.style.transform = `translateZ(15px) rotateY(${rotateY}deg) rotateX(${rotateX}deg)`;
    }
  };

  const handleMouseEnter = () => {
    setIsMouseEntered(true);
  };

  const handleMouseLeave = () => {
    setIsMouseEntered(false);
    if (containerRef.current) {
      containerRef.current.style.transform = `rotateY(0deg) rotateX(0deg)`;
    }
    if (imageRef.current) {
      imageRef.current.style.transform = `translateZ(0) rotateY(0deg) rotateX(0deg)`;
    }
    if (svgRef1.current) {
      svgRef1.current.style.transform = `translateZ(0) rotateY(0deg) rotateX(0deg)`;
    }
    if (svgRef2.current) {
      svgRef2.current.style.transform = `translateZ(0) rotateY(0deg) rotateX(0deg)`;
    }
    if (svgRef3.current) {
      svgRef3.current.style.transform = `translateZ(0) rotateY(0deg) rotateX(0deg)`;
    }
  };
  return (
    <div className="relative h-full w-full">
      <div className="absolute top-[190px] -z-10 h-full w-[400%] max-w-[2200px] opacity-10 blur-[30px] lg:top-[260px] lg:w-[150%]">
        <div className="relative h-full w-full rotate-12">
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-0 pb-[31.25%]" />
          <div className="bg-custom-gradient absolute bottom-0 left-0 right-0 top-0 flex h-full w-full items-center justify-center overflow-hidden"></div>
        </div>
      </div>
      <div className="mx-auto flex w-full max-w-[1440px] flex-col justify-center gap-6 px-4 py-6 md:items-center lg:px-10">
        <h1 className="text-left text-3xl font-bold md:text-center md:text-4xl lg:text-[42px] xl:text-5xl">
          Nền tảng <FlipWords words={words} />
          <br />
          cho học sinh trung học phổ thông
        </h1>
        <div className="flex w-full flex-col md:flex-row lg:mt-10 lg:max-w-7xl lg:px-10 xl:px-20">
          <div className="flex max-w-[400px] flex-col justify-center gap-4 md:gap-6 lg:gap-8">
            <div className="flex flex-col gap-4">
              <Button
                variant={"outline"}
                className="bg-primary/10 hover:bg-primary/10 text-primary hover:text-primary w-fit rounded-xl border-none text-sm"
              >
                <IconSchool size={18} className="mr-2" /> Học tập nhưng thú vị
                hơn
              </Button>
              <h2 className="text-lg font-semibold lg:text-2xl xl:text-3xl">
                HighSchool cung cấp một nền tảng học tập toàn diện, giúp học
                sinh trung học tiếp cận các tài liệu học tập, theo dõi tiến độ.
              </h2>
            </div>
            <div className="flex items-center gap-2">
              <Link href={`${env.NEXT_PUBLIC_APP_URL}/sign-in`}>
                <Button
                  variant={"default"}
                  className="flex w-fit uppercase md:hidden"
                >
                  Đăng kí ngay{" "}
                  <IconArrowRight size={18} className="mb-1 ml-2" />
                </Button>
              </Link>
              <Link href={`${env.NEXT_PUBLIC_APP_URL}/sign-in`}>
                <Button
                  variant={"default"}
                  size={"lg"}
                  className="hidden w-fit uppercase md:flex"
                >
                  Đăng kí ngay{" "}
                  <IconArrowRight size={18} className="mb-1 ml-2" />
                </Button>
              </Link>
              <Link href={"#features"}>
                <Button
                  variant={"outline"}
                  className="flex w-fit uppercase md:hidden"
                >
                  Tìm hiểu thêm <IconChevronDown size={18} className="ml-2" />
                </Button>
              </Link>
              <Link href={"#features"}>
                <Button
                  variant={"outline"}
                  size={"lg"}
                  className="hidden w-fit uppercase md:flex"
                >
                  Tìm hiểu thêm <IconChevronDown size={18} className="ml-2" />
                </Button>
              </Link>
            </div>
            <div className="mt-5 flex flex-col gap-1">
              <AvatarCircles numPeople={99} avatarUrls={avatarUrls} />
              <p className="text-muted-foreground text-xs">
                Tham gia cộng đồng với hơn 10k+ học sinh toàn quốc
              </p>
            </div>
          </div>
          {isDesktop ? (
            <div
              style={{
                perspective: "1000px",
              }}
              className="hidden flex-1 items-center justify-end lg:flex"
            >
              <div
                ref={containerRef}
                onMouseEnter={handleMouseEnter}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className="duration-8000 ease-custom-bezier h-[300px] w-[560px] transition-all"
                style={{
                  transformStyle: "preserve-3d",
                }}
              >
                <div className="relative h-[220px] w-[370px] lg:h-[300px] lg:w-[450px]">
                  <div className="absolute left-0 top-0">
                    <svg
                      ref={svgRef1}
                      viewBox="0 0 297 297"
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-[170px] w-[170] transition-transform duration-200 ease-linear"
                    >
                      <circle
                        opacity="0.8"
                        cx="148.315"
                        cy="148.522"
                        r="147.986"
                        transform="rotate(7.6256 148.315 148.522)"
                        fill="url(#paint0_linear_824_894)"
                      ></circle>
                      <defs>
                        <linearGradient
                          id="paint0_linear_824_894"
                          x1="0.328903"
                          y1="0.535995"
                          x2="175.667"
                          y2="181.872"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop stopColor="#FE9A8B"></stop>
                          <stop offset="1" stopColor="#F9748F"></stop>
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>
                  <div
                    className="absolute bottom-0 right-20"
                    style={{ zIndex: 1000 }}
                  >
                    <svg
                      ref={svgRef2}
                      viewBox="0 0 150 147"
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-[100px] w-[100px]"
                    >
                      <path
                        d="M39.8164 10.29C43.2117 0.0616442 56.4064 -2.65562 63.5668 5.39899L145.847 97.9551C153.008 106.01 148.764 118.795 138.208 120.969L16.9117 145.948C6.35604 148.122 -2.59448 138.054 0.800817 127.825L39.8164 10.29Z"
                        fill="url(#paint0_linear_824_896)"
                      ></path>
                      <defs>
                        <linearGradient
                          id="paint0_linear_824_896"
                          x1="-49.9991"
                          y1="7.34546"
                          x2="185.05"
                          y2="162.117"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop stopColor="#F6D365"></stop>
                          <stop offset="1" stopColor="#FDA085"></stop>
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>
                  <div className="absolute right-0 top-10">
                    <svg
                      ref={svgRef3}
                      viewBox="0 0 221 230"
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-[100px] w-full"
                    >
                      <path
                        d="M128.424 1.69041C136.301 -0.697951 144.82 2.25754 149.526 9.01114L216.74 105.478C221.446 112.232 221.268 121.247 216.299 127.81L145.324 221.545C140.355 228.107 131.725 230.723 123.949 228.026L12.8689 189.49C5.09224 186.792 -0.0627493 179.393 0.0999652 171.164L2.42415 53.6124C2.58686 45.3827 8.03028 38.1937 15.9075 35.8054L128.424 1.69041Z"
                        fill="url(#paint0_linear_824_893)"
                      ></path>
                      <defs>
                        <linearGradient
                          id="paint0_linear_824_893"
                          x1="19.8743"
                          y1="-43.5617"
                          x2="178.994"
                          y2="271.787"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop stopColor="#4DED8D"></stop>
                          <stop offset="1" stopColor="#1C6546"></stop>
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>
                  <Image
                    ref={imageRef}
                    fill
                    quality={100}
                    className="h-full transform object-cover transition duration-200 ease-linear"
                    alt="whale"
                    src="/images/whale.png"
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="flex w-full items-center justify-end lg:hidden">
              <div className="relative flex h-[280px] w-[400px] items-center justify-center">
                <div className="absolute left-10 top-10">
                  <svg
                    viewBox="0 0 297 297"
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-[100px] w-[100px] transition-transform duration-200 ease-linear"
                  >
                    <circle
                      opacity="0.8"
                      cx="148.315"
                      cy="148.522"
                      r="147.986"
                      transform="rotate(7.6256 148.315 148.522)"
                      fill="url(#paint0_linear_824_894)"
                    ></circle>
                    <defs>
                      <linearGradient
                        id="paint0_linear_824_894"
                        x1="0.328903"
                        y1="0.535995"
                        x2="175.667"
                        y2="181.872"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#FE9A8B"></stop>
                        <stop offset="1" stopColor="#F9748F"></stop>
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
                <div
                  className="absolute bottom-10 right-20"
                  style={{ zIndex: 1000 }}
                >
                  <svg
                    viewBox="0 0 150 147"
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-[70px] w-[70px]"
                  >
                    <path
                      d="M39.8164 10.29C43.2117 0.0616442 56.4064 -2.65562 63.5668 5.39899L145.847 97.9551C153.008 106.01 148.764 118.795 138.208 120.969L16.9117 145.948C6.35604 148.122 -2.59448 138.054 0.800817 127.825L39.8164 10.29Z"
                      fill="url(#paint0_linear_824_896)"
                    ></path>
                    <defs>
                      <linearGradient
                        id="paint0_linear_824_896"
                        x1="-49.9991"
                        y1="7.34546"
                        x2="185.05"
                        y2="162.117"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#F6D365"></stop>
                        <stop offset="1" stopColor="#FDA085"></stop>
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
                <div className="absolute right-10 top-10">
                  <svg
                    viewBox="0 0 221 230"
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-[70px] w-full"
                  >
                    <path
                      d="M128.424 1.69041C136.301 -0.697951 144.82 2.25754 149.526 9.01114L216.74 105.478C221.446 112.232 221.268 121.247 216.299 127.81L145.324 221.545C140.355 228.107 131.725 230.723 123.949 228.026L12.8689 189.49C5.09224 186.792 -0.0627493 179.393 0.0999652 171.164L2.42415 53.6124C2.58686 45.3827 8.03028 38.1937 15.9075 35.8054L128.424 1.69041Z"
                      fill="url(#paint0_linear_824_893)"
                    ></path>
                    <defs>
                      <linearGradient
                        id="paint0_linear_824_893"
                        x1="19.8743"
                        y1="-43.5617"
                        x2="178.994"
                        y2="271.787"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#4DED8D"></stop>
                        <stop offset="1" stopColor="#1C6546"></stop>
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
                <div className="relative h-[190px] w-[290px]">
                  <Image
                    ref={imageRef}
                    className="object-cover"
                    quality={100}
                    fill
                    alt="whale"
                    src="/images/whale.png"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
