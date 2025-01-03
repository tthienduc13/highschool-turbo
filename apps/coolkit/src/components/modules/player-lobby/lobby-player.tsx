"use client";

import { useChannel } from "ably/react";
import { motion } from "motion/react";
import { useDispatch, useSelector } from "react-redux";

import Image from "next/image";
import { useRouter } from "next/navigation";

import { RoomEvent, RoomEventType } from "@/api/ket/type";
import { Player } from "@/api/user/type";
import { ButtonKet } from "@/components/ui/button";

import {
  addOrUpdatePlayer,
  setPlayers,
} from "../../../../store/slice/players-slice";
import { RootState } from "../../../../store/store";

export function LobbyPlayer() {
  const router = useRouter();
  const dispatch = useDispatch();

  const roomId = useSelector((state: RootState) => state.currentLobbySlice);
  const currentPlayer = useSelector(
    (state: RootState) => state.currentPlayerSlice,
  );
  const playerList = useSelector((state: RootState) => state.listPlayerSlice);

  const { channel } = useChannel(
    `room:${roomId}`,
    "message-game",
    (message) => {
      const data: RoomEvent = message.data;
      switch (data.Type) {
        case RoomEventType.PlayerJoined: {
          const newPlayer: Player = {
            avatar: data.Data.Avatar,
            displayName: data.Data.DisplayName,
            id: data.Data.Id,
            roomId: data.Data.RoomId,
            score: data.Data.Score,
            timeAverage: data.Data.TimeAverage,
          };
          dispatch(addOrUpdatePlayer(newPlayer));
          return;
        }
        case RoomEventType.PlayerKicked:
          if (data.Data == currentPlayer?.id) {
            return router.back();
          } else {
            dispatch(
              setPlayers(
                playerList.filter((player) => player?.id !== data.Data),
              ),
            );
          }
      }
    },
  );

  console.log(channel);

  return (
    <>
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="mb-1rem flex w-[55vw] content-center justify-between text-3xl text-white"
      >
        <div className="w-full flex-none text-center text-2xl font-extrabold text-white">
          Waiting for host...
        </div>
      </motion.div>
      <div className="mt-[8vh] flex w-[75vw] flex-wrap justify-around gap-5">
        {playerList.map((player) => (
          <PlayerCard key={player?.id} player={player} />
        ))}
      </div>
    </>
  );
}

type PlayerProp = {
  player: Player;
};

const PlayerCard: React.FC<PlayerProp> = ({ player }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
    >
      <ButtonKet className="flex flex-none items-center gap-4 bg-white py-8 pl-0 hover:bg-slate-50">
        <div className="mb-2 w-[3.2rem]">
          <Image
            src={player?.avatar ?? ""}
            width={100}
            height={100}
            alt="avatar"
            className="-rotate-12"
          />
        </div>
        <div className="mb-2 w-[14vw] overflow-hidden text-ellipsis whitespace-nowrap text-center text-black">
          <span className="text-xl font-[500]">{player?.displayName}</span>
        </div>
      </ButtonKet>
    </motion.div>
  );
};
