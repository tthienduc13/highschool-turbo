import { motion } from "framer-motion";

import { IconGhost3 } from "@tabler/icons-react";

const mainGhost = {
  transition: {
    repeat: Infinity,
    duration: 5,
    ease: "backInOut",
  },
  animate: {
    translateY: [0, -20, 0],
  },
};
const leftGhost = {
  transition: {
    repeat: Infinity,
    duration: 4,
    ease: "backInOut",
    delay: 0.2,
  },
  animate: {
    translateY: [0, -20, 0],
  },
};
const rightGhost = {
  transition: {
    repeat: Infinity,
    duration: 4.5,
    ease: "backInOut",
    delay: 0.4,
  },
  animate: {
    translateY: [0, -20, 0],
  },
};

export const GhostGroup = () => {
  return (
    <div className="relative flex flex-row gap-[-12px]">
      <motion.div {...leftGhost}>
        <IconGhost3 size={30} strokeWidth="3px" opacity="0.8" />
      </motion.div>
      <motion.div {...mainGhost}>
        <IconGhost3 size={100} strokeWidth="2px" />
      </motion.div>
      <motion.div {...rightGhost}>
        <IconGhost3 size={40} strokeWidth="3px" opacity="0.9" />
      </motion.div>
      <div className="-z-1 absolute left-0 top-10 h-full w-full rounded-full bg-gradient-to-b from-gray-500 to-transparent opacity-50" />
    </div>
  );
};
