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
          animate={{ opacity: 1 }}
          className={cn(buttonVariants({ size: "lg", variant: "outline" }))}
          exit={{ opacity: 0 }}
          initial={{ opacity: 0 }}
          onClick={() => setIsCopied(false)}
        >
          <motion.span
            key="action"
            animate={{ y: 0 }}
            className="flex flex-row items-center gap-x-1"
            initial={{ y: -50 }}
          >
            <IconCheck size={16} />
            Copied
          </motion.span>
        </motion.button>
      ) : (
        <motion.button
          animate={{ opacity: 1 }}
          className={cn(buttonVariants({ size: "lg", variant: "default" }))}
          exit={{ opacity: 0 }}
          initial={{ opacity: 0 }}
          onClick={hanldeCopy}
        >
          <motion.span
            key="reaction"
            exit={{ x: 50, transition: { duration: 0.1 } }}
            initial={{ x: 0 }}
          >
            Copy
          </motion.span>
        </motion.button>
      )}
    </AnimatePresence>
  );
};
