"use client";

import {
  PresentWrapper,
  useNextStep,
} from "@/components/core/common/onboard/present-wrapper";
import { Button } from "@highschool/ui/components/ui/button";
import { motion } from "framer-motion";

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
    <section className="flex flex-col gap-6 text-center justify-center items-center">
      <motion.div {...ghost}>
        {/* <Logo width={24} height={24} /> */}
      </motion.div>
      <h1 className="text-5xl font-bold">Chào mừng đến với Highschool</h1>
      <div className="font-medium">
        Highschool cung cấp dịch vụ chuyên nghiệp cho tất cả học sinh trên toàn
        thế giới nói chung và học sinh tại Việt Nam nói riêng để vượt qua kỳ thi
        Trung học Phổ thông Quốc gia.
      </div>
      <Button
        className="mt-4 w-72  h-12 text-lg font-bold"
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
