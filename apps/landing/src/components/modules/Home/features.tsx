"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { env } from "@highschool/env";
import { cn } from "@highschool/ui/lib/utils";
import { IconArrowRight } from "@tabler/icons-react";

import { TextAnimate } from "@/components/core/common/text-animation";
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
  imageUrl?: string;
}

export const Features = () => {
  const featuresItems: FeatureItemProps[] = [
    {
      title: "Thẻ ghi nhớ và bộ câu hỏi",
      description1:
        "Tăng hiệu suất học thông qua thẻ ghi nhớ và bộ câu hỏi. Giúp ghi nhớ kiến thức nhanh chóng và hiệu quả hơn.",
      description2:
        " Tự tạo bộ thẻ ghi nhớ của riêng bạn hoặc khám phá kho thẻ ghi nhớ khổng lồ từ cộng đồng.",
      externalLink: env.NEXT_PUBLIC_APP_URL,
      backgroundColor: "#84D2F6",
      videoUrl:
        "https://res.cloudinary.com/dyu2kc3bl/video/upload/v1735375360/dsumjckqfox4tcloiwxq.mp4",
      thumbailUrl: "/images/screenshots/flashcard-screenshot.png",
    },
    {
      title: "Gợi ý từ AI",
      description1:
        "Cá nhân hóa trải nghiệm học tập để bạn luôn cảm thấy hứng thú với tiến độ của mình.",
      description2:
        " Đề xuất các tài liệu và lộ trình học phù hợp với từng học sinh, giúp tối ưu hóa quá trình học tập.",
      externalLink: "https://app.highschool.vn",
      backgroundColor: "#fe9b8b",

      className: "",
      imageUrl: "/images/ai-whale.png",
    },
    {
      title: "Lộ trình học",
      description1:
        "Cung cấp một kế hoạch học tập rõ ràng và chi tiết, giúp dễ dàng theo dõi tiến độ và đạt được mục tiêu học tập.",
      description2:
        "Theo dõi tiến độ học tập và điều chỉnh kế hoạch khi cần thiết.",
      externalLink: "https://app.highschool.vn",
      backgroundColor: "#8beefe",
      imageUrl: "/images/roadmap.svg",
    },
    {
      title: "Giải đố và ôn tập",
      description1:
        "Định kì theo tuần, tháng sẽ có những bài giải đố và ôn tập giúp củng cố kiến thức và rèn luyện kỹ năng.",
      description2:
        "Nhiều phần quà hấp dẫn được gửi tặng cho bạn sau khi hoàn thành",
      externalLink: "",
      backgroundColor: "#fed48b",
      imageUrl: "/images/quiz.svg",
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
        ref={ref}
        className="mx-auto h-20 w-full max-w-[690px] md:h-[150px] lg:h-[300px]"
      >
        <svg
          fill="none"
          height="100%"
          style={{ transform: flipped ? "scaleX(-1)" : "none" }}
          viewBox="0 0 690 408"
          width="100%"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient
              id="line1-gradient"
              x1="0%"
              x2="0%"
              y1="0%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="100%" stopColor="#fff3fc" />
            </linearGradient>
          </defs>
          <path
            className="stroke-none lg:stroke-[#C0D1EB]"
            d="M0,0 Q50,200 345,204 T690,408"
            stroke="#C0D1EB"
            strokeDasharray="20 20"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="5"
          />
          <motion.path
            className="stroke-none lg:stroke-white"
            d="M690,408Q640,208 345,204Q50,200 0,0"
            fill="none"
            initial={{ pathLength: 1 }}
            stroke="white"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="5"
            style={{ pathLength }}
          />
        </svg>
      </div>
    );
  };

  return (
    <div
      className="mx-auto mt-[60px] flex w-full max-w-[560px] flex-col gap-12 p-4 md:mt-[100px] md:px-10 lg:w-full lg:max-w-7xl lg:px-14"
      id="features"
    >
      <div className="mx-auto flex max-w-4xl flex-col gap-3 px-4 text-center">
        <TextAnimate
          animation="slideUp"
          by="word"
          className="bg-gradient-radial to-primary from-gray-800 bg-clip-text text-2xl font-medium text-transparent"
        >
          Highschool có gì?
        </TextAnimate>
        <TextAnimate
          animation="fadeIn"
          by="word"
          className="text-4xl font-bold md:text-5xl"
        >
          Tối ưu hoá quy trình học tập, gợi ý lộ trình, tài liệu phù hợp cho bạn
        </TextAnimate>
      </div>
      <div>
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
                  className={cn(
                    item.className,
                    "h-[300px] w-full max-w-[550px] transform rounded-xl p-10 transition-all duration-200 hover:scale-110 lg:h-[400px]",
                  )}
                  data-aos="zoom-in"
                  style={{
                    backgroundColor: item.backgroundColor,
                  }}
                >
                  <div className="relative size-full">
                    {item.videoUrl && item.thumbailUrl && (
                      <VideoPlayer
                        thumbnailUrl={item.thumbailUrl}
                        videoUrl={item.videoUrl}
                      />
                    )}
                    {item.imageUrl && (
                      <div className="relative size-full">
                        <Image
                          fill
                          alt={item.title}
                          className="rounded-xl object-fill"
                          priority={false}
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          src={item.imageUrl}
                        />
                      </div>
                    )}
                  </div>
                </div>
                <div data-aos="fade-up" data-aos-duration="1000">
                  <div className="max-w-[550px]">
                    <h2 className="mb-5 text-3xl font-semibold">
                      {item.title}
                    </h2>
                    <div className="mb-4 flex flex-col gap-3">
                      <p className="text-xl">{item.description1}</p>
                      <p className="text-xl">{item.description2}</p>
                    </div>
                    <Link
                      className="flex items-center gap-1 text-xl font-medium underline"
                      href={item.externalLink || "/"}
                    >
                      Xem thêm <IconArrowRight className="size-5" />
                    </Link>
                  </div>
                </div>
              </div>
              {index < featuresItems.length - 1 && (
                <SvgCurve flipped={index % 2 !== 0} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
