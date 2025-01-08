"use client";

import { motion } from "framer-motion";

import Image from "next/image";
import { useRouter } from "next/navigation";

import { Button } from "@highschool/ui/components/ui/button";

import {
  IconBooks,
  IconCards,
  IconFileTypePdf,
  IconFolder,
  IconPlus,
} from "@tabler/icons-react";

import { useIsTeacher } from "@/hooks/use-role";

const logo = {
  transition: {
    repeat: Infinity,
    duration: 5,
    ease: "backInOut",
  },
  animate: {
    translateY: [0, -20, 0],
  },
};
const studySet = {
  transition: {
    repeat: Infinity,
    duration: 4,
    ease: "backInOut",
    delay: 0.2,
  },
  animate: {
    translateY: [0, -20, 0],
    rotateZ: [0, -25, 0],
  },
};
const folder = {
  transition: {
    repeat: Infinity,
    duration: 4.5,
    ease: "backInOut",
    delay: 0.4,
  },
  animate: {
    translateY: [0, -20, 0],
    rotateZ: [0, 20, 0],
  },
};

export const EmptyRecent = () => {
  const router = useRouter();
  const isTeacher = useIsTeacher();
  return (
    <div className="flex w-full items-center justify-center overflow-hidden rounded-3xl border-2 border-gray-200 bg-white px-6 py-10 md:p-12 dark:border-gray-800/50 dark:bg-gray-800">
      <div className="relative flex flex-col items-center justify-center gap-10 text-center">
        <div
          className="bg-gradient-radial absolute left-0 top-0 z-[5] h-[500px] w-full rounded-full from-blue-300 via-transparent to-transparent opacity-30 blur-2xl"
          aria-hidden="true"
        />
        <div className="relative z-10 flex flex-row gap-[-12px]">
          <motion.div {...studySet} className="opacity-50">
            <IconCards size={40} strokeWidth="2px" opacity="0.8" />
          </motion.div>
          <motion.div {...logo} className="p-3">
            <div
              className="relative opacity-80"
              style={{ height: `${100}px`, width: "100px" }}
            >
              <Image
                src={"/logo.svg"}
                alt="logo"
                height={100}
                width={100}
                priority
                className="object-contain"
              />
            </div>
          </motion.div>
          <motion.div {...folder} className="opacity-50">
            <IconFolder size={40} strokeWidth="2px" opacity="0.9" />
          </motion.div>
          <div className="absolute left-0 top-10 -z-10 h-full w-full rounded-full bg-gradient-to-b from-gray-500 to-transparent opacity-50" />
        </div>
        <div className="z-10 flex flex-col gap-2 px-7">
          <h1 className="text-3xl font-bold md:text-4xl">
            Tạo bộ thẻ đầu tiên
          </h1>
          {isTeacher ? (
            <p className="text-muted-foreground">
              Bắt đầu bằng cách tạo bộ thẻ đầu tiên hoặc tạo tài liệu.
            </p>
          ) : (
            <p className="text-muted-foreground">
              Bắt đầu học bằng cách tạo bộ thẻ đầu tiên hoặc tham gia khoá học.
            </p>
          )}
        </div>
        <div className="z-10 flex flex-col gap-4">
          <Button
            onClick={() => router.push("/study-set/create")}
            size="lg"
            className="h-12 rounded-xl !text-base shadow-lg"
          >
            <IconPlus className="!size-6" /> Tạo bộ thẻ mới
          </Button>
          {isTeacher ? (
            <Button
              onClick={() => router.push("/courses")}
              size="lg"
              className="h-12 rounded-xl !text-base shadow-lg"
            >
              <IconFileTypePdf className="!size-6" />
              Tạo tài liệu
            </Button>
          ) : (
            <Button
              onClick={() => router.push("/courses")}
              size="lg"
              className="h-12 rounded-xl !text-base shadow-lg"
            >
              <IconBooks className="!size-6" />
              Xem các môn học
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
