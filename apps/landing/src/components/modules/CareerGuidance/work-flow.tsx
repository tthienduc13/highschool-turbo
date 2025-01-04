"use client";

import { AnimatePresence, motion } from "framer-motion";

import React, { useEffect, useId, useRef, useState } from "react";

import Image from "next/image";

import { env } from "@highschool/env";

import { useOutsideClick } from "@/hooks/use-outside-click";

export const WorkFlow = () => {
  const [active, setActive] = useState<(typeof cards)[number] | boolean | null>(
    null,
  );
  const id = useId();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActive(false);
      }
    }

    if (active && typeof active === "object") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  useOutsideClick(ref, () => setActive(null));
  return (
    <div
      id="workflow"
      className="mt-[60px] grid grid-cols-1 gap-12 px-4 py-[64px] pb-[80px] lg:mt-[100px] lg:px-10 xl:px-[60px]"
    >
      <div className="flex flex-col gap-4 text-center">
        <h2
          data-aos="fade-up"
          className="text-3xl font-bold md:text-4xl lg:text-[42px]"
        >
          Cách hoạt động
        </h2>
        <p
          data-aos="fade-up"
          className="text-muted-foreground text-2xl font-medium md:text-3xl"
        >
          Trải qua các bước, HighschoolVN sẽ giúp bạn hiểu hơn về mình
        </p>
      </div>
      <AnimatePresence>
        {active && typeof active === "object" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-10 h-full w-full bg-black/20"
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {active && typeof active === "object" ? (
          <div className="fixed inset-0 z-[100] grid place-items-center">
            <motion.button
              key={`button-${active.title}-${id}`}
              layout
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
                transition: {
                  duration: 0.05,
                },
              }}
              className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-white lg:hidden"
              onClick={() => setActive(null)}
            >
              <CloseIcon />
            </motion.button>
            <motion.div
              layoutId={`card-${active.title}-${id}`}
              ref={ref}
              className="flex h-full w-full max-w-[500px] flex-col overflow-hidden bg-white sm:rounded-3xl md:h-fit md:max-h-[90%] dark:bg-neutral-900"
            >
              <motion.div layoutId={`image-${active.title}-${id}`}>
                <Image
                  priority
                  width={200}
                  height={200}
                  src={active.src}
                  alt={active.title}
                  className="h-80 w-full object-cover object-top sm:rounded-tl-lg sm:rounded-tr-lg lg:h-80"
                />
              </motion.div>

              <div>
                <div className="flex items-start justify-between p-4">
                  <div className="">
                    <motion.h3
                      layoutId={`title-${active.title}-${id}`}
                      className="text-base font-medium text-neutral-700 dark:text-neutral-200"
                    >
                      {active.title}
                    </motion.h3>
                    <motion.p
                      layoutId={`description-${active.description}-${id}`}
                      className="text-base text-neutral-600 dark:text-neutral-400"
                    >
                      {active.description}
                    </motion.p>
                  </div>
                  <motion.a
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    href={active.ctaLink}
                    target="_blank"
                    className="rounded-full bg-green-500 px-4 py-3 text-sm font-bold text-white"
                  >
                    {active.ctaText}
                  </motion.a>
                </div>
                <div className="relative px-4 pt-4">
                  <motion.div
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex h-40 flex-col items-start gap-4 overflow-auto pb-10 text-xs text-neutral-600 [-ms-overflow-style:none] [-webkit-overflow-scrolling:touch] [mask:linear-gradient(to_bottom,white,white,transparent)] [scrollbar-width:none] md:h-fit md:text-sm lg:text-base dark:text-neutral-400"
                  >
                    {typeof active.content === "function"
                      ? active.content()
                      : active.content}
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>
      <ul className="mx-auto grid w-full grid-cols-1 items-start gap-20 md:grid-cols-3 md:gap-4">
        {cards.map((card, index) => (
          <motion.div
            data-aos="zoom-in"
            layoutId={`card-${card.title}-${id}`}
            key={card.title}
            onClick={() => setActive(card)}
            style={{
              backgroundColor: card.backgroundColor,
            }}
            className="relative flex cursor-pointer flex-col rounded-xl p-4 dark:hover:bg-neutral-800"
          >
            <div
              style={{ color: card.backgroundColor, filter: "brightness(0.8)" }}
              className="absolute -top-4 left-5 text-4xl text-[80px] font-bold md:-top-5 md:left-10"
            >
              0{index + 1}
            </div>
            <div className="flex w-full flex-col gap-4">
              <motion.div layoutId={`image-${card.title}-${id}`}>
                <div className="h-60 w-full p-5">
                  <div className="flex flex-col gap-2 text-center">
                    <h3 className="text-theme_color text-sm font-semibold lg:text-xl">
                      {card.description}
                    </h3>
                    <h3 className="text-theme_color text-4xl font-bold">
                      {card.title}
                    </h3>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        ))}
      </ul>
    </div>
  );
};

export const CloseIcon = () => {
  return (
    <motion.svg
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      exit={{
        opacity: 0,
        transition: {
          duration: 0.05,
        },
      }}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 text-black"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M18 6l-12 12" />
      <path d="M6 6l12 12" />
    </motion.svg>
  );
};

const cards = [
  {
    title: "MBTI",
    description: "Trắc nghiệm tính cách",
    src: "/images/career-guidance/mbti.jpg",
    backgroundColor: "#D9E8FF",
    ctaText: "Làm ngay",
    ctaLink: `${env.NEXT_PUBLIC_APP_URL}/career-guidance/mbti`,
    content: () => {
      return (
        <p>
          MBTI (Myers-Briggs Type Indicator) là một bài trắc nghiệm tâm lý học
          nổi tiếng được thiết kế để giúp bạn khám phá tính cách và xu hướng
          hành vi của mình. Dựa trên các lý thuyết của Carl Jung, MBTI phân loại
          tính cách của con người thành 16 nhóm, mỗi nhóm phản ánh một cách tiếp
          cận riêng trong công việc, giao tiếp và cuộc sống.
          <br /> <br />
          Bài kiểm tra này không chỉ giúp bạn hiểu rõ hơn về bản thân mà còn hỗ
          trợ định hướng nghề nghiệp, cải thiện các mối quan hệ cá nhân và xây
          dựng kỹ năng giao tiếp hiệu quả. Hãy thử ngay để khám phá &quot;bạn là
          ai&quot; trong thế giới đa dạng của MBTI!
        </p>
      );
    },
  },
  {
    title: "Holland",
    description: "Định hướng nghề nghiệp",
    src: "/images/career-guidance/holland.jpg",
    backgroundColor: "#E5FFB8",
    ctaText: "Làm ngay",
    ctaLink: `${env.NEXT_PUBLIC_APP_URL}/career-guidance/holland`,
    content: () => {
      return (
        <p>
          Bài kiểm tra Holland (RIASEC) là công cụ định hướng nghề nghiệp dựa
          trên sở thích cá nhân và nhóm tính cách. Được phát triển bởi nhà tâm
          lý học John L. Holland, bài kiểm tra này chia con người thành 6 loại
          tính cách: Thực tế (Realistic), Nghiên cứu (Investigative), Nghệ thuật
          (Artistic), Xã hội (Social), Doanh nhân (Enterprising), và Quy tắc
          (Conventional). <br /> <br />
          Holland giúp bạn khám phá những công việc hoặc lĩnh vực nghề nghiệp
          phù hợp nhất với tính cách và sở thích của bạn, hỗ trợ bạn đưa ra
          quyết định nghề nghiệp đúng đắn và xây dựng lộ trình phát triển tương
          lai. Hãy thử ngay để hiểu rõ hơn về bản thân và tìm ra con đường sự
          nghiệp lý tưởng!
        </p>
      );
    },
  },
  {
    title: "Kết quả",
    description: "Hướng nghiệp cho bạn",
    src: "/images/career-guidance/career.jpg",
    backgroundColor: "#C9F77A",
    ctaText: "Hãy làm xong 2 bài",
    ctaLink: "#",
    content: () => {
      return (
        <p>
          Sau khi hoàn thành bài kiểm tra, bạn sẽ nhận được kết quả phân tích
          chi tiết về tính cách, sở thích và lĩnh vực nghề nghiệp phù hợp nhất
          với bạn. Dựa trên các tiêu chí khoa học từ MBTI và Holland, kết quả
          này không chỉ giúp bạn hiểu rõ hơn về bản thân mà còn đưa ra những gợi
          ý cụ thể về các ngành nghề có thể phát huy tối đa tiềm năng của bạn.{" "}
          <br /> <br />
          Đừng để những băn khoăn về hướng đi trong tương lai cản trở bạn. Hãy
          để kết quả này là bước đệm để bạn tự tin khám phá và xây dựng con
          đường sự nghiệp của riêng mình!
        </p>
      );
    },
  },
];
