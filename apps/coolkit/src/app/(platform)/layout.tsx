"use client";

import { useEffect, useState } from "react";

import dynamic from "next/dynamic";

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
  useEffect(() => {
    const handler = () => {
      setOpenOverlay(true);
    };

    menuEventChannel.on("openCreateQuiz", handler);
    return () => {
      menuEventChannel.off("openCreateQuiz", handler);
    };
  }, []);
  return (
    <>
      <CreateQuizOverlay
        isOpen={openOverlay}
        onClose={() => setOpenOverlay(false)}
      />

      {children}
    </>
  );
}
