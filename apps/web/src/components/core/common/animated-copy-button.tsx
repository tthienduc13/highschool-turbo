"use client";

import { AnimatePresence, motion } from "framer-motion";

import React, { useState } from "react";

import { buttonVariants } from "@highschool/ui/components/ui/button";
import { cn } from "@highschool/ui/lib/utils";

import { IconCheck } from "@tabler/icons-react";

interface AnimatedCopyButtonProps {
  pathName: string;
}

export const AnimatedCopyButton = ({ pathName }: AnimatedCopyButtonProps) => {
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const hanldeCopy = () => {
    setIsCopied(true);
    navigator.clipboard.writeText(pathName);
  };
  return (
    <AnimatePresence mode="wait">
      {isCopied ? (
        <motion.button
          className={cn(buttonVariants({ size: "lg", variant: "outline" }))}
          onClick={() => setIsCopied(false)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.span
            key="action"
            className="flex flex-row items-center gap-x-1"
            initial={{ y: -50 }}
            animate={{ y: 0 }}
          >
            <IconCheck size={16} />
            Copied
          </motion.span>
        </motion.button>
      ) : (
        <motion.button
          className={cn(buttonVariants({ size: "lg", variant: "default" }))}
          onClick={hanldeCopy}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.span
            key="reaction"
            initial={{ x: 0 }}
            exit={{ x: 50, transition: { duration: 0.1 } }}
          >
            Copy
          </motion.span>
        </motion.button>
      )}
    </AnimatePresence>
  );
};
