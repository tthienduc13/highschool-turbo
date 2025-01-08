"use client";

import { motion } from "motion/react";

import { QuestionResponse } from "@/app/api/ket/type";
import MinimalCountdown from "@/components/animation/clock/minimal-countdown";
import { ButtonKet } from "@/components/ui/button";
import { renderColorAnswer } from "@/utils/helper-color";

import { QuestionHeader } from "./question-header";

export const DisplayQuestionModule = () => {
  const question: QuestionResponse = {
    question: "Apa itu React?",
    answers: ["Library", "Framework", "Platform", "Language"],
    correctAnswer: 0,
    order: 1,
    timeAnswer: 5,
  };

  return (
    <div className="relative z-10 flex flex-col items-center bg-zinc-100">
      <QuestionHeader />

      <div className="flex h-[41.5vh] items-center justify-between gap-10 p-4">
        <div className="shadow-inset-gray-shadow flex h-full w-[55vw] items-center justify-center rounded-lg bg-white text-3xl">
          {question.question}
        </div>
        <div className="flex h-full flex-col">
          <div className="shadow-inset-gray-shadow-md flex h-[30vh] flex-col items-center justify-around rounded-lg bg-white px-4 py-2 font-extrabold">
            <MinimalCountdown
              initialSeconds={120}
              onComplete={() => console.log("Countdown complete!")}
              size={100}
            />
            <span className="text-3xl">0 / 1</span>
          </div>
          <ButtonKet className="mt-2">Next</ButtonKet>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 px-4 pt-6 text-center text-2xl text-white">
        {question.answers?.map((answer, index) => (
          <motion.button
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            key={index}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            className={`h-[17vh] w-[48vw] ${renderColorAnswer(index)} shadow-inset-gray-shadow rounded-md py-4 pb-5`}
          >
            {answer}
          </motion.button>
        ))}
      </div>
    </div>
  );
};
