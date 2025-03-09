"use client";

import { cn } from "@highschool/ui/lib/utils";
import { IconChevronDown } from "@tabler/icons-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

import { Shortcut } from "@/types/shortcut";

interface ShortcutListSectionProps {
  shortcutList: Shortcut[];
}

export const ShortcutListSection = ({
  shortcutList,
}: ShortcutListSectionProps) => {
  const [viewShortcut, setViewShortcut] = useState<boolean>(false);

  return (
    <div className="flex flex-col">
      <div className="flex cursor-pointer flex-row items-center justify-between">
        <p className="text-lg font-semibold">Phím tắt</p>
        <button
          className="flex flex-row items-center gap-1 hover:opacity-80"
          onClick={() => {
            setViewShortcut(!viewShortcut);
          }}
        >
          <p className="text-primary font-semibold">
            {viewShortcut ? "Ẩn" : "Xem"}
          </p>
          <IconChevronDown
            className={cn(
              "text-primary mb-1 transition-all ease-cubic-ease duration-150",
              viewShortcut && "rotate-180",
            )}
          />
        </button>
      </div>
      <AnimatePresence>
        {viewShortcut && (
          <motion.div
            animate={{ height: "auto", opacity: 1 }}
            className=" mt-5 overflow-hidden"
            exit={{ height: 0, opacity: 0 }}
            initial={{ height: 0, opacity: 0 }}
            transition={{ type: "spring", duration: 0.4 }}
          >
            <div className="grid grid-cols-1 gap-4 px-4 md:grid-cols-2">
              {shortcutList.map((shortcut, index) => (
                <motion.div
                  key={index}
                  animate={{ y: 0, opacity: 1 }}
                  className="flex w-full flex-row items-center justify-between"
                  initial={{ y: 20, opacity: 0 }}
                >
                  <p className="text- font-medium">{shortcut.label}</p>
                  <kbd className="bg-muted pointer-events-none size-6 select-none items-center justify-center gap-1 rounded border font-mono text-[12px] font-medium opacity-100 sm:flex [&_svg]:size-[12px] [&_svg]:shrink-0">
                    {shortcut.shortcut}
                  </kbd>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
