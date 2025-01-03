import { motion } from "motion/react";

import { IconDashboard } from "@tabler/icons-react";

export function PlayerHeader() {
  return (
    <motion.div
      initial={{ y: -50, opacity: 0, translateX: "-50%" }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="bg-primary shadow-inset-gray-shadow absolute left-[50%] top-1 z-[100] my-5 flex w-[55vw] translate-x-[-50%] items-center justify-around rounded-xl pb-5 pt-3 text-3xl text-white"
    >
      <div className="font-extrabold">Coolket</div>
      <div className="text-xl font-medium md:text-2xl">Join a game</div>
      <div className="animation-hover flex cursor-pointer items-center space-x-2">
        <IconDashboard size={32} />
        <span>Dashboard</span>
      </div>
    </motion.div>
  );
}
