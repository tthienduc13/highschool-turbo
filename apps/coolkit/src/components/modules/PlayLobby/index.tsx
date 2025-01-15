"use client";

import { motion } from "framer-motion";

import Image from "next/image";

function PlayLobbyModule() {
  return (
    <div className="relative flex h-screen w-screen items-center justify-center overflow-hidden bg-indigo-700">
      <motion.div
        initial={{
          opacity: 0,
          scale: 0,
        }}
        animate={{
          opacity: 1,
          scale: 1,
        }}
        className="mx-auto flex h-[calc(100vh-120px)] w-full max-w-7xl flex-row items-center gap-5"
      >
        <div className="h-full flex-1"></div>
        <div className="relative flex h-full max-h-[250px] w-full max-w-[250px] flex-col gap-5">
          <Image
            src={
              "https://res.cloudinary.com/dhdyel6be/image/upload/v1736070819/HighSchool/backgrounds/game/Tropical.png"
            }
            alt="background"
            fill
            className="rounded-lg"
          />
          <div className="absolute left-[5%] top-[15px] w-[90%] text-center">
            <div
              style={{ textShadow: "0px 3px 3px rgba(0, 0, 0, .2)" }}
              className="text-4xl font-bold text-white"
            >
              Cá sấu
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default PlayLobbyModule;
