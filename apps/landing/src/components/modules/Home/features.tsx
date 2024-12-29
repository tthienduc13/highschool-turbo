"use client";

import { motion, useScroll, useTransform } from "framer-motion";

import { useRef } from "react";

import Link from "next/link";

import { cn } from "@highschool/ui/lib/utils";

import { IconArrowRight } from "@tabler/icons-react";

import { VideoPlayer } from "@/components/ui/video-player";

interface FeatureItemProps {
  title: string;
  description1: string;
  description2: string;
  externalLink: string;
  backgroundColor: string;
  className?: string;
  videoUrl?: string;
  thumbailUrl?: string;
}

export const Features = () => {
  const featuresItems: FeatureItemProps[] = [
    {
      title: "Flash Card & Quiz",
      description1:
        "Tăng hiệu suất học thông qua Flash card & quiz. Giúp ghi nhớ kiến thức nhanh chóng và hiệu quả hơn.",
      description2:
        " Tự tạo bộ flashcard của riêng bạn hoặc khám phá kho flashcard khổng lồ từ cộng đồng.",
      externalLink: "https://app.highschool.vn",
      backgroundColor: "#84D2F6",
      videoUrl:
        "https://res.cloudinary.com/dyu2kc3bl/video/upload/v1735375360/dsumjckqfox4tcloiwxq.mp4",
      thumbailUrl: "/images/screenshots/flashcard-screenshot.png",
    },
    {
      title: "AI Recommend",
      description1:
        "Cá nhân hóa trải nghiệm học tập để bạn luôn cảm thấy hứng thú với tiến độ của mình.",
      description2:
        " Đề xuất các tài liệu và lộ trình học phù hợp với từng học sinh, giúp tối ưu hóa quá trình học tập.",
      externalLink: "https://app.highschool.vn",
      backgroundColor: "#fed48b",
      className: "-skew-y-6 skew-x-6",
    },
    {
      title: "Knownledge Map",
      description1:
        "Cung cấp một kế hoạch học tập rõ ràng và chi tiết, giúp dễ dàng theo dõi tiến độ và đạt được mục tiêu học tập.",
      description2:
        "Theo dõi tiến độ học tập và điều chỉnh kế hoạch khi cần thiết.",
      externalLink: "https://app.highschool.vn",
      backgroundColor: "#fe9b8b",
    },
    {
      title: "Note To Book",
      description1:
        "Cung cấp một bảng trắng để học sinh có thể kéo và tổ chức các tài liệu học tập từ trang web.",
      description2:
        "Tạo ra môi trường học tập cá nhân hóa phù hợp với phong cách riêng của bạn.",
      externalLink: "",
      backgroundColor: "#8beefe",
    },
  ];

  const SvgCurve = ({ flipped = false }: { flipped: boolean }) => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
      target: ref,
      offset: ["start end", "center center"],
    });

    const pathLength = useTransform(scrollYProgress, [0, 1], [1, 0]);

    return (
      <div
        className="mx-auto h-20 w-full max-w-[690px] md:h-[150px] lg:h-[300px]"
        ref={ref}
      >
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 690 408"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ transform: flipped ? "scaleX(-1)" : "none" }}
        >
          <defs>
            <linearGradient
              id="line1-gradient"
              x1="0%"
              y1="0%"
              x2="0%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#ffffff"></stop>
              <stop offset="100%" stopColor="#fff3fc"></stop>
            </linearGradient>
          </defs>
          <path
            d="M0,0 Q50,200 345,204 T690,408"
            stroke="#C0D1EB"
            strokeWidth="5"
            strokeLinejoin="round"
            strokeLinecap="round"
            strokeDasharray="20 20"
            className="stroke-none lg:stroke-[#C0D1EB]"
          ></path>
          <motion.path
            d="M690,408Q640,208 345,204Q50,200 0,0"
            stroke="white"
            strokeWidth="5"
            strokeLinejoin="round"
            strokeLinecap="round"
            fill="none"
            className="stroke-none lg:stroke-white"
            initial={{ pathLength: 1 }}
            style={{ pathLength }}
          ></motion.path>
        </svg>
      </div>
    );
  };

  return (
    <div
      id="features"
      className="mx-auto mt-[60px] flex w-full max-w-[560px] flex-col p-4 md:mt-[100px] md:px-10 lg:w-full lg:max-w-7xl lg:px-14"
    >
      {featuresItems.map((item, index) => {
        const isEven = index % 2 === 0;
        return (
          <div key={index}>
            <div
              className={cn(
                "flex w-full gap-8 lg:items-center lg:justify-between lg:gap-16",
                isEven
                  ? "flex-col-reverse lg:flex-row"
                  : "flex-col-reverse lg:flex-row-reverse",
              )}
            >
              <div
                data-aos="zoom-in"
                className={cn(
                  item.className,
                  "h-[300px] w-full max-w-[550px] transform rounded-xl p-10 transition-all duration-200 hover:scale-110 lg:h-[400px]",
                )}
                style={{
                  backgroundColor: item.backgroundColor,
                }}
              >
                <div className="relative h-full w-full">
                  {item.videoUrl && item.thumbailUrl && (
                    <VideoPlayer
                      thumbnailUrl={item.thumbailUrl}
                      videoUrl={item.videoUrl}
                    />
                  )}
                </div>
              </div>
              <div className="max-w-[550px]">
                <h2 className="mb-5 text-3xl font-semibold">{item.title}</h2>
                <div className="mb-4 flex flex-col gap-3">
                  <p className="text-xl">{item.description1}</p>
                  <p className="text-xl">{item.description2}</p>
                </div>
                <Link
                  href={item.externalLink || "/"}
                  className="flex items-center gap-1 text-xl font-medium underline"
                >
                  Xem thêm <IconArrowRight className="h-5 w-5" />
                </Link>
              </div>
            </div>
            {index < featuresItems.length - 1 && (
              <SvgCurve flipped={index % 2 !== 0} />
            )}
          </div>
        );
      })}
    </div>
  );
};
