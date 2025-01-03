"use client";

import { motion } from "motion/react";

import { ButtonAudio } from "@/components/core/common/button-screen/button-audio";
import { ButtonScreen } from "@/components/core/common/button-screen/button-screen";

export function QuestionHeader() {
  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="bg-primary shadow-inset-gray-shadow relative my-5 flex w-[55vw] items-center justify-between rounded-xl px-4 pb-5 pt-3 text-white"
    >
      <div className="flex gap-3">
        <ButtonScreen
          className="bg-transparent p-0 text-white hover:bg-transparent"
          heightShadow="0"
        />
        <ButtonAudio
          className="bg-transparent p-0 text-white hover:bg-transparent"
          heightShadow="0"
        />
        <div className="self-center">
          <span className="text-xl font-extrabold">okodkoska</span>
        </div>
      </div>
      <div className="text-xl font-extrabold">
        <span>QUESTION 2/15</span>
      </div>
    </motion.div>
  );
}
