"use client";

import { motion } from "motion/react";

import { useRouter } from "next/navigation";

import { IconArrowNarrowRight } from "@tabler/icons-react";

import { ButtonKet } from "@/components/ui/button";

import { PlayerHeader } from "./play-header";

export default function PlayerRegisterModule() {
  const router = useRouter();

  return (
    <>
      <PlayerHeader />
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="absolute left-[33%] top-[35%] text-center text-6xl font-extrabold text-white"
      >
        <div className="text-center">
          <h3 className="my-6">Nhập tên của bạn</h3>
        </div>
        <div className="flex w-full items-center justify-center space-x-2">
          <input
            className="shadow-inset-gray-shadow h-[10vh] w-[20vw] rounded-xl border-none bg-white px-4 pb-3 text-center text-4xl text-gray-600 outline-none"
            placeholder="Biệt danh..."
          />
          <ButtonKet
            backgroundColor="white"
            className="flex-none py-[1.9rem] text-black"
            heightShadow="-10px"
            onClick={() => router.push("/play/lobby")}
          >
            <IconArrowNarrowRight
              style={{ width: "2.25rem", height: "2.25rem" }}
            />
          </ButtonKet>
        </div>
      </motion.div>
    </>
  );
}
