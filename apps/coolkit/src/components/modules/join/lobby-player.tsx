"use client";

import { motion } from "motion/react";

import React from "react";

import Image from "next/image";

import { IconUsers } from "@tabler/icons-react";

import { useKickPlayerMutation } from "@/api/ket/query";
import { Player } from "@/api/user/type";
import { ButtonKet } from "@/components/ui/button";

interface LobbyPlayerProps {
  count: number;
  players: Player[];
  roomId: string;
}

interface PlayerProp {
  avatar: string;
  name: string;
  roomId: string;
  playerId: string;
}

export function LobbyPlayer({ count, players, roomId }: LobbyPlayerProps) {
  return (
    <>
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="flex w-[55vw] content-center justify-between text-3xl text-white"
      >
        <div className="flex items-center gap-1">
          <IconUsers className="h-[1.875rem] w-[1.875rem]" />
          <span className="font-medium">
            {count == 0 ? "Chờ người chơi" : `${count}`}
          </span>
        </div>
        <div className="text-5xl font-bold">
          <h2>Coolket</h2>
        </div>
        <ButtonKet
          className="flex-none text-2xl text-black"
          backgroundColor="white"
          isDisabled={count == 0}
        >
          {count == 0 ? "+1 người" : "Bắt đầu"}
        </ButtonKet>
      </motion.div>
      <div className="mt-[8vh] flex w-[75vw] flex-wrap justify-around gap-5">
        {players.map((player, index) => (
          <PlayerTag
            key={index}
            avatar={player?.avatar ?? ""}
            name={player?.displayName ?? ""}
            roomId={roomId}
            playerId={player?.id ?? ""}
          />
        ))}
      </div>
    </>
  );
}

const PlayerTag: React.FC<PlayerProp> = ({
  avatar,
  name,
  roomId,
  playerId,
}) => {
  const { mutateAsync, isPending } = useKickPlayerMutation();

  const HandleKickPlayer = async () => {
    try {
      const res = await mutateAsync({
        data: { roomId: roomId, userId: playerId },
      });
      if (res.status == 200) {
        // success toast
      } else {
        // fail toast
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
    >
      <ButtonKet
        className="flex flex-none items-center gap-4 bg-white py-8 pl-0 hover:bg-slate-50"
        onClick={HandleKickPlayer}
        isDisabled={isPending}
      >
        <div className="mb-2 w-[3.2rem]">
          <Image
            src={avatar}
            width={100}
            height={100}
            alt="avatar"
            className="-rotate-12"
          />
        </div>
        <div className="mb-2 w-[14vw] overflow-hidden text-ellipsis whitespace-nowrap text-center text-black hover:line-through">
          <span className="text-xl font-[500]">{name}</span>
        </div>
      </ButtonKet>
    </motion.div>
  );
};
