"use client";

import { motion } from "framer-motion";

import { useState } from "react";

import Link from "next/link";

import { useCheckRoomMutation } from "@highschool/react-query/queries";
import { Input } from "@highschool/ui/components/ui/input";

import { IconArrowRight, IconLoader2 } from "@tabler/icons-react";

function JoinModule() {
  const [roomId, setRoomId] = useState<string>("");
  const [error, setError] = useState<string>("");

  const apiCheckRoom = useCheckRoomMutation();
  const handleJoinRoom = async () => {
    setError("");
    await apiCheckRoom.mutateAsync(roomId, {
      onSuccess: (data) => {
        console.log(data);
      },
      onError: () => {
        setError("Chúng tôi không tìm thấy phòng. Hãy thử mã phòng khác");
      },
    });
    setError("Không tìm thấy phòng");
  };
  return (
    <div
      className="relative h-screen w-screen bg-opacity-30"
      style={{
        backgroundColor: "rgb(30, 87, 153)",
        backgroundImage:
          "linear-gradient(180deg, rgb(30, 87, 153) 0%, rgb(125, 185, 232) 50%, rgb(255, 255, 255) 100%)",
      }}
    >
      <div className="flex h-16 w-full items-center border-b-8 border-b-orange-700 bg-orange-600">
        <div className="mx-auto flex w-full max-w-7xl flex-row items-center justify-between px-4">
          <h1 className="w-[130px] text-4xl font-bold text-white">CoolKet</h1>
          <div className="flex-1 text-center text-3xl font-bold text-white">
            Tham gia trò chơi
          </div>
          <Link href="/dashboard">
            <h1 className="text-2xl font-medium text-white underline">
              Tổng hợp
            </h1>
          </Link>
        </div>
      </div>
      <div className="flex h-[calc(100vh-64px)] w-full items-center justify-center">
        <div className="flex flex-col gap-2">
          {/* <h1 className="w-[130px] text-4xl font-bold text-white">CoolKet</h1> */}
          <div className="flex flex-row items-center gap-3">
            <Input
              value={roomId}
              maxLength={6}
              placeholder="Mã phòng"
              onChange={(e) => {
                const numericValue = e.target.value.replace(/\D/g, "");
                if (numericValue.length <= 6) {
                  setRoomId(numericValue);
                }
              }}
              className="h-16 w-56 border-0 border-b-[6px] border-b-gray-300 bg-gray-100 pb-2 pt-4 !text-4xl font-bold text-gray-800 shadow-none focus-within:border-b-[6px] focus-visible:border-b-blue-500 focus-visible:ring-0 dark:bg-gray-700 dark:focus-visible:border-blue-300"
            />
            <button
              onClick={handleJoinRoom}
              disabled={apiCheckRoom.isPending}
              className="flex h-16 w-16 items-center justify-center rounded-md border-b-[6px] border-b-gray-300 bg-gray-100 text-gray-800 transition-all duration-200 hover:scale-95 hover:border-b-blue-500"
            >
              {!apiCheckRoom.isPending ? (
                <IconLoader2
                  strokeWidth={"4px"}
                  size={28}
                  className="animate-loading text-primary"
                />
              ) : (
                <IconArrowRight strokeWidth={"4px"} size={24} />
              )}
            </button>
          </div>
        </div>
      </div>
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
  );
}

export default JoinModule;
