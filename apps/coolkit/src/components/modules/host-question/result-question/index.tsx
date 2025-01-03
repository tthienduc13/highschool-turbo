import { motion } from "motion/react";

import { QuestionResponse } from "@/api/ket/type";
import MinimalCountdown from "@/components/animation/clock/minimal-countdown";
import { ButtonKet } from "@/components/ui/button";
import { renderColorAnswer } from "@/utils/helper-color";

import { ChartResult } from "./chart-result";

export const ResultQuestionModule = () => {
  const question: QuestionResponse = {
    question:
      "Apa itu React?Lorem Ipsum is simply dummy text of the printing and typesetting industry. asdasdadasdasdasds",
    answers: ["Library", "Framework", "Platform", "Language"],
    correctAnswer: 0,
    order: 1,
    timeAnswer: 5,
  };

  return (
    <div className="relative z-10 flex flex-col gap-8 bg-zinc-100">
      <div className="grid h-[55vh] w-full grid-cols-[40vw_38vw_auto] items-center gap-10 p-4">
        <div className="shadow-inset-gray-shadow flex h-full items-center justify-center rounded-lg bg-white p-4 text-3xl">
          {question.question}
        </div>
        <div className="h-full">
          <ChartResult className="h-full" />
        </div>
        <div className="h-full">
          <div className="shadow-inset-gray-shadow-md flex h-[30vh] flex-col items-center justify-around rounded-lg bg-white px-4 py-2 font-extrabold">
            <MinimalCountdown
              initialSeconds={5}
              onComplete={() => console.log("Countdown complete!")}
              size={100}
            />
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
            disabled={true}
            className={`h-[17vh] w-[48vw] ${renderColorAnswer(index)} shadow-inset-gray-shadow rounded-md py-4 pb-5`}
          >
            {answer}
          </motion.button>
        ))}
      </div>
    </div>
  );
};
