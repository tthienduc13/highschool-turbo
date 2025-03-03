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
      className="mt-[60px] grid grid-cols-1 gap-12 px-4 py-[64px] pb-[80px] lg:mt-[100px] lg:px-10 xl:px-[60px]"
      id="workflow"
    >
      <div className="flex flex-col gap-4 text-center">
        <h2
          className="text-3xl font-bold md:text-4xl lg:text-[42px]"
          data-aos="fade-up"
        >
          Cách hoạt động
        </h2>
        <p
          className="text-muted-foreground text-2xl font-medium md:text-3xl"
          data-aos="fade-up"
        >
          Trải qua các bước, HighschoolVN sẽ giúp bạn hiểu hơn về mình
        </p>
      </div>
      <AnimatePresence>
        {active && typeof active === "object" && (
          <motion.div
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-10 size-full bg-black/20"
            exit={{ opacity: 0 }}
            initial={{ opacity: 0 }}
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {active && typeof active === "object" ? (
          <div className="fixed inset-0 z-[100] grid place-items-center">
            <motion.button
              key={`button-${active.title}-${id}`}
              layout
              animate={{
                opacity: 1,
              }}
              className="absolute right-2 top-2 flex size-6 items-center justify-center rounded-full bg-white lg:hidden"
              exit={{
                opacity: 0,
                transition: {
                  duration: 0.05,
                },
              }}
              initial={{
                opacity: 0,
              }}
              onClick={() => setActive(null)}
            >
              <CloseIcon />
            </motion.button>
            <motion.div
              ref={ref}
              className="flex size-full max-w-[500px] flex-col overflow-hidden bg-white sm:rounded-3xl md:h-fit md:max-h-[90%] dark:bg-neutral-900"
              layoutId={`card-${active.title}-${id}`}
            >
              <motion.div layoutId={`image-${active.title}-${id}`}>
                <Image
                  priority
                  alt={active.title}
                  className="h-80 w-full object-cover object-top sm:rounded-t-lg lg:h-80"
                  height={200}
                  src={active.src}
                  width={200}
                />
              </motion.div>

              <div>
                <div className="flex items-start justify-between p-4">
                  <div className="">
                    <motion.h3
                      className="text-base font-medium text-neutral-700 dark:text-neutral-200"
                      layoutId={`title-${active.title}-${id}`}
                    >
                      {active.title}
                    </motion.h3>
                    <motion.p
                      className="text-base text-neutral-600 dark:text-neutral-400"
                      layoutId={`description-${active.description}-${id}`}
                    >
                      {active.description}
                    </motion.p>
                  </div>
                  <motion.a
                    layout
                    animate={{ opacity: 1 }}
                    className="rounded-full bg-green-500 px-4 py-3 text-sm font-bold text-white"
                    exit={{ opacity: 0 }}
                    href={active.ctaLink}
                    initial={{ opacity: 0 }}
                    target="_blank"
                  >
                    {active.ctaText}
                  </motion.a>
                </div>
                <div className="relative px-4 pt-4">
                  <motion.div
                    layout
                    animate={{ opacity: 1 }}
                    className="flex h-40 flex-col items-start gap-4 overflow-auto pb-10 text-xs text-neutral-600 [-ms-overflow-style:none] [-webkit-overflow-scrolling:touch] [mask:linear-gradient(to_bottom,white,white,transparent)] [scrollbar-width:none] md:h-fit md:text-sm lg:text-base dark:text-neutral-400"
                    exit={{ opacity: 0 }}
                    initial={{ opacity: 0 }}
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
            key={card.title}
            className="relative flex cursor-pointer flex-col rounded-xl p-4 dark:hover:bg-neutral-800"
            data-aos="zoom-in"
            layoutId={`card-${card.title}-${id}`}
            style={{
              backgroundColor: card.backgroundColor,
            }}
            onClick={() => setActive(card)}
          >
            <div
              className="absolute -top-4 left-5 text-4xl  font-bold md:-top-5 md:left-10"
              style={{ color: card.backgroundColor, filter: "brightness(0.8)" }}
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
      animate={{
        opacity: 1,
      }}
      className="size-4 text-black"
      exit={{
        opacity: 0,
        transition: {
          duration: 0.05,
        },
      }}
      fill="none"
      height="24"
      initial={{
        opacity: 0,
      }}
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
      width="24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M0 0h24v24H0z" fill="none" stroke="none" />
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
