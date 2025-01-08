"use client";

import { AnimatePresence, motion } from "motion/react";
import { useSelector } from "react-redux";

import { IconBookFilled, IconClock, IconUsersGroup } from "@tabler/icons-react";

import { Room } from "@/app/api/game/type";

import { selectPlayerCount } from "../../../../store/slice/players-slice";

interface LobbyHeaderProps {
  room: Room;
}

export function LobbyHeader({ room }: LobbyHeaderProps) {
  const playerCount = useSelector(selectPlayerCount);

  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="bg-primary shadow-inset-gray-shadow relative my-5 flex w-[55vw] items-center justify-around rounded-xl pb-5 pt-3 text-white"
    >
      <div className="relative h-24 w-24 rounded-lg p-2">
        <div className="absolute -top-2 h-[7rem] w-[7rem]">
          <AnimatePresence>
            <motion.img
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              alt="thumbnail"
              src={room?.thumbnail}
              className="h-full object-cover"
            />
          </AnimatePresence>
        </div>
      </div>
      <div className="w-[40%] text-xl font-medium md:text-2xl">
        {room?.name}
      </div>
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="flex flex-col gap-1"
        >
          <div className="flex items-center gap-2">
            <IconBookFilled style={{ width: "1.5rem", height: "1.5rem" }} />
            <span className="text-2xl font-bold">
              {room?.totalQuestion} Câu hỏi
            </span>
          </div>
          <div className="flex items-center gap-2">
            <IconClock style={{ width: "1.5rem", height: "1.5rem" }} />
            <span className="text-2xl font-bold">1h</span>
          </div>
          <div className="flex items-center gap-2">
            <IconUsersGroup style={{ width: "1.5rem", height: "1.5rem" }} />
            <span className="text-2xl font-bold">{playerCount}</span>
          </div>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}
