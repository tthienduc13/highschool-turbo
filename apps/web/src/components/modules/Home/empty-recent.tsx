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
    <div className="flex w-full items-center justify-center overflow-hidden rounded-3xl border-2 border-gray-200 bg-white px-6 py-10 dark:border-gray-800/50 dark:bg-gray-800 md:p-12">
      <div className="relative flex flex-col items-center justify-center gap-10 text-center">
        <div
          aria-hidden="true"
          className="absolute left-0 top-0 z-[5] h-[500px] w-full rounded-full bg-gradient-radial from-blue-300 via-transparent to-transparent opacity-50 blur-2xl"
        />
        <div className="relative z-10 flex flex-row gap-[-12px]">
          <motion.div {...studySet} className="opacity-50">
            <IconCards opacity="0.8" size={40} strokeWidth="2px" />
          </motion.div>
          <motion.div {...logo} className="p-3">
            <div
              className="relative opacity-80"
              style={{ height: `${100}px`, width: "100px" }}
            >
              <Image
                priority
                alt="logo"
                className="object-contain"
                height={100}
                src={"/logo.svg"}
                width={100}
              />
            </div>
          </motion.div>
          <motion.div {...folder} className="opacity-50">
            <IconFolder opacity="0.9" size={40} strokeWidth="2px" />
          </motion.div>
          <div className="bg-gradient-to-b absolute left-0 top-10 -z-10 size-full rounded-full from-gray-500 to-transparent" />
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
            className="h-12 rounded-xl !text-base shadow-lg"
            size="lg"
            onClick={() => router.push("/study-set/create")}
          >
            <IconPlus className="!size-6" /> Tạo bộ thẻ mới
          </Button>
          {isTeacher ? (
            <Button
              className="h-12 rounded-xl !text-base shadow-lg"
              size="lg"
              onClick={() => router.push("/courses")}
            >
              <IconFileTypePdf className="!size-6" />
              Tạo tài liệu
            </Button>
          ) : (
            <Button
              className="h-12 rounded-xl !text-base shadow-lg"
              size="lg"
              onClick={() => router.push("/courses")}
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
