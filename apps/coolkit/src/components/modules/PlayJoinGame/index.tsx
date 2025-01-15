"use client";

import { motion } from "framer-motion";

import { useState } from "react";

import { useRouter } from "next/navigation";

import { useCheckRoomMutation } from "@highschool/react-query/queries";
import { Input } from "@highschool/ui/components/ui/input";

import { IconArrowRight } from "@tabler/icons-react";

import { LoadingOverlay } from "@/components/core/commons/loading-overlay";

function PlayJoinModule() {
  const router = useRouter();
  const [roomId, setRoomId] = useState<string>("");
  const [error, setError] = useState<string>("");

  const apiCheckRoom = useCheckRoomMutation();

  const handleJoinRoom = async () => {
    setError("");
    if (roomId.length < 6) {
      setError("Hãy nhập mã phòng");
      return;
    }
    await apiCheckRoom.mutateAsync(roomId, {
      onSuccess: (data) => {
        if (data.status === 200) {
          router.push(`/play/register?id=${roomId}`);
        }
      },
      onError: () => {
        setError("Chúng tôi không tìm thấy phòng. Hãy thử mã phòng khác");
      },
    });
  };

  const handleOnEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleJoinRoom();
    }
  };
  return (
    <>
      {apiCheckRoom.isPending && <LoadingOverlay />}
      <div className="relative flex h-screen w-screen items-center justify-center overflow-hidden bg-indigo-700">
        <motion.div
          initial={{
            opacity: 0,
            scale: 0,
          }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          className="flex flex-col items-center gap-2"
        >
          <h1 className="text-5xl font-black text-white">CoolKet</h1>
          <div className="flex flex-row items-center gap-3">
            <Input
              onKeyDown={handleOnEnter}
              value={roomId}
              maxLength={6}
              placeholder="Mã phòng"
              onChange={(e) => {
                const numericValue = e.target.value.replace(/\D/g, "");
                if (numericValue.length <= 6) {
                  setRoomId(numericValue);
                }
              }}
              className="h-16 w-72 border-0 border-b-[6px] border-b-gray-300 bg-gray-100 px-4 pb-2 pt-4 !text-4xl font-bold text-gray-800 shadow-none focus-within:border-b-[6px] focus-visible:border-b-blue-500 focus-visible:ring-0 dark:bg-gray-700 dark:focus-visible:border-blue-300"
            />
            <button
              onClick={handleJoinRoom}
              disabled={apiCheckRoom.isPending || roomId.length < 6}
              className="flex h-16 w-16 items-center justify-center rounded-md border-b-[6px] border-b-gray-300 bg-gray-100 text-gray-800 transition-all duration-200 hover:scale-95 hover:border-b-blue-500 disabled:scale-100 disabled:cursor-not-allowed disabled:opacity-80"
            >
              <IconArrowRight strokeWidth={"4px"} size={24} />
            </button>
          </div>
        </motion.div>
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
          className="absolute bottom-0 left-0 flex h-14 w-full items-center justify-center border-t-[6px] border-t-red-600 bg-red-500 text-center text-xl font-semibold text-white"
        >
          {error}
        </motion.div>
      </div>
    </>
  );
}

export default PlayJoinModule;
