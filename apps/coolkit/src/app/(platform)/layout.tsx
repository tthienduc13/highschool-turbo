"use client";

import { motion } from "framer-motion";

import { useEffect, useState } from "react";

import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";

import { AnimatedXCircle } from "@highschool/components/animated-icons";

import { IconXboxX } from "@tabler/icons-react";

import { AdminHeader } from "@/components/core/commons/admin-layout/header";
import { menuEventChannel } from "@/events/menu";

const CreateQuizOverlay = dynamic(
  () =>
    import("@/components/core/commons/create-quiz-overlay").then(
      (o) => o.CreateQuizOverlay,
    ),
  { ssr: false },
);

export default function PlatformLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [openOverlay, setOpenOverlay] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const pathName = usePathname();
  const excludeHeader = ["/host", "/play"];
  const isExcludeHeader = excludeHeader.some((e) => pathName.includes(e));
  useEffect(() => {
    const handler = () => {
      setOpenOverlay(true);
    };
    menuEventChannel.on("openCreateQuiz", handler);
    return () => {
      menuEventChannel.off("openCreateQuiz", handler);
    };
  }, []);

  useEffect(() => {
    const handler = (args: { message?: string }) => {
      setError(args.message || "Đã có lỗi xảy ra, vui lòng thử lại");
      setTimeout(() => {
        setError("");
      }, 5000);
    };

    menuEventChannel.on("openError", handler);
    return () => {
      menuEventChannel.off("openError", handler);
    };
  }, []);
  return (
    <>
      <CreateQuizOverlay
        isOpen={openOverlay}
        onClose={() => setOpenOverlay(false)}
      />
      <motion.div
        initial={{
          opacity: 0,
          transform: "translateY(100%)",
        }}
        animate={
          error
            ? {
                opacity: 1,
                transform: "translateY(0)",
              }
            : undefined
        }
        className="absolute bottom-0 left-0 z-50 flex h-14 w-full items-center justify-center border-t-[6px] border-t-red-600 bg-red-500 text-xl font-semibold text-white"
      >
        <div className="flex items-center gap-2">
          <AnimatedXCircle />
          {error}
        </div>
      </motion.div>
      {!isExcludeHeader && <AdminHeader />}
      {children}
    </>
  );
}
