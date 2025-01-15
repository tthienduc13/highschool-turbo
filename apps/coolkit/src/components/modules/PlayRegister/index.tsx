"use client";

import { motion } from "framer-motion";

import { useEffect, useState } from "react";

import { useRouter, useSearchParams } from "next/navigation";

import { Player } from "@highschool/interfaces";
import {
  useCheckRoomMutation,
  useJoinRoomMutation,
} from "@highschool/react-query/queries";
import { Input } from "@highschool/ui/components/ui/input";

import { IconArrowRight, IconLoader2 } from "@tabler/icons-react";

import { LoadingOverlay } from "@/components/core/commons/loading-overlay";
import { usePlayerStore } from "@/stores/use-player-store";

function PlayRegisterModule() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const id = searchParams.get("id");
  const [name, setName] = useState<string>("");
  const [error, setError] = useState<string>("");

  const apiJoinRoom = useJoinRoomMutation();

  const setPlayer = usePlayerStore((s) => s.setPlayer);
  const setLobby = usePlayerStore((s) => s.setLobby);

  const handleJoinRoom = async () => {
    setError("");
    if (!name.trim().length || name.trim().length > 10) {
      setError("Tên không hợp lệ");
      return;
    }
    await apiJoinRoom.mutateAsync(
      {
        avatar:
          "https://res.cloudinary.com/dhdyel6be/image/upload/v1734691286/HighSchool/avatars/game/Moose.svg",
        displayName: name,
        roomId: id!,
      },
      {
        onSuccess: (data) => {
          if (data.status === 200) {
            const currentPlayer: Player = {
              avatar: data.data?.avatar!,
              displayName: data.data?.displayName!,
              id: data.data?.id!,
              roomId: data.data?.roomId!,
              score: data.data?.score!,
              timeAverage: data.data?.timeAverage!,
            };
            setPlayer(currentPlayer);
            setLobby(id!);
            router.push("/play/lobby");
          }
        },
        onError: () => {
          setName("");
          setError("Đã có lỗi xảy ra, vui lòng thử lại");
        },
      },
    );
  };

  const handleOnEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleJoinRoom();
    }
  };

  useEffect(() => {
    if (!id || id.length === 0) {
      router.push("/play");
    }
  }, [id]);

  return (
    <>
      {apiJoinRoom.isPending && (!id || id.length === 0) && (
        <LoadingOverlay message="Đang vào phòng..." />
      )}
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
          <div className="flex flex-col items-center gap-3">
            <h1 className="text-center text-5xl font-black text-white">
              Nickname của bạn
            </h1>
            <div className="flex flex-row items-center gap-3">
              <Input
                onKeyDown={handleOnEnter}
                value={name}
                maxLength={10}
                placeholder="Nickname"
                onChange={(e) => {
                  setName(e.target.value);
                }}
                className="h-16 w-72 border-0 border-b-[6px] border-b-gray-300 bg-gray-100 px-4 pb-2 pt-4 !text-4xl font-bold text-gray-800 shadow-none focus-within:border-b-[6px] focus-visible:border-b-blue-500 focus-visible:ring-0 dark:bg-gray-700 dark:focus-visible:border-blue-300"
              />
              <button
                onClick={handleJoinRoom}
                disabled={
                  apiJoinRoom.isPending ||
                  !name.trim().length ||
                  name.trim().length > 10
                }
                className="flex h-16 w-16 items-center justify-center rounded-md border-b-[6px] border-b-gray-300 bg-gray-100 text-gray-800 transition-all duration-200 hover:scale-95 hover:border-b-blue-500 disabled:scale-100 disabled:cursor-not-allowed disabled:opacity-80"
              >
                {apiJoinRoom.isPending ? (
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

export default PlayRegisterModule;
