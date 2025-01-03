import { motion } from "motion/react";

import Image from "next/image";

import { IconX } from "@tabler/icons-react";

import { ButtonKet } from "@/components/ui/button";

import { QuestionHeader } from "./question-header";

export const LeaderboardModule = () => {
  return (
    <div className="relative z-10 flex h-max flex-col items-center bg-zinc-100">
      <QuestionHeader />

      <div className="absolute right-10 top-0">
        <ButtonKet className="mt-10" onClick={() => console.log("clicked")}>
          Next Question
        </ButtonKet>
      </div>

      <div className="mb-10 mt-10 flex flex-col items-center gap-5">
        <PlayerResult />
        <PlayerResult />
        <PlayerResult />
        <PlayerResult />
        <PlayerResult />
        <PlayerResult />
        <PlayerResult />
      </div>
    </div>
  );
};

const PlayerResult = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className="shadow-inset-gray-shadow flex w-[40vw] flex-none items-center gap-6 rounded-lg bg-white px-4 py-2 hover:bg-slate-50"
    >
      <div className="text-2xl font-extrabold">
        1<sup>st</sup>
      </div>
      <div className="mb-2 w-[3.2rem]">
        <Image
          src={
            "https://res.cloudinary.com/dhdyel6be/image/upload/v1734691286/HighSchool/avatars/game/Duck.svg"
          }
          width={100}
          height={100}
          alt="avatar"
        />
      </div>
      <div className="mb-2 w-[27vw] overflow-hidden text-ellipsis whitespace-nowrap text-center text-black hover:line-through">
        <span className="text-2xl font-[500]">sdasdas</span>
      </div>
      <button>
        <IconX />
      </button>
    </motion.div>
  );
};
