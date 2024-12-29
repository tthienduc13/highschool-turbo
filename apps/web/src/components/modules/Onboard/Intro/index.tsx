"use client";

import { motion } from "framer-motion";

import Image from "next/image";

import { Button } from "@highschool/ui/components/ui/button";

import {
  PresentWrapper,
  useNextStep,
} from "@/components/core/common/onboard/present-wrapper";

const ghost = {
  transition: {
    repeat: Infinity,
    duration: 5,
    ease: "backInOut",
  },
  animate: {
    translateY: [0, -20, 0],
  },
};

function OnboardIntroModule() {
  return (
    <PresentWrapper>
      <Intro />
    </PresentWrapper>
  );
}

const Intro = () => {
  const next = useNextStep();
  return (
    <section className="flex flex-col items-center justify-center gap-6 text-center">
      <motion.div {...ghost}>
        <Image src={"/logo.svg"} alt="logo" width={96} height={96} />
      </motion.div>
      <h1 className="text-3xl font-bold md:text-5xl">
        Chào mừng đến với Highschool
      </h1>
      <div className="font-medium">
        Highschool cung cấp dịch vụ chuyên nghiệp cho tất cả học sinh trên toàn
        thế giới nói chung và học sinh tại Việt Nam nói riêng để vượt qua kỳ thi
        Trung học Phổ thông Quốc gia.
      </div>
      <Button
        className="mt-4 h-12 w-72 text-lg font-bold"
        size="lg"
        onClick={async () => {
          next();
        }}
      >
        Bắt đầu ngay
      </Button>
    </section>
  );
};

export default OnboardIntroModule;
