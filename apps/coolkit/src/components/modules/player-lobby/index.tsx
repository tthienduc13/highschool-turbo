"use client";

import { useDispatch } from "react-redux";

import { Room } from "@/app/api/game/type";
import { useLobbyInformationQuery } from "@/app/api/ket/query";
import { Player } from "@/app/api/user/type";

import { setPlayers } from "../../../../store/slice/players-slice";
import { LobbyHeader } from "./lobby-header";
import { LobbyPlayer } from "./lobby-player";
import { LobbySetting } from "./lobby-setting";

type Prop = {
  roomId: string;
  currentPlayer: Player;
};

export default function PlayerLobbyModule({ roomId, currentPlayer }: Prop) {
  const { data } = useLobbyInformationQuery({ data: { roomId } });

  const fetchedPlayers: Player[] = data?.players ?? [];
  const fetchedRoom = data?.room ?? {};

  const playerList: Player[] = [
    currentPlayer,
    ...fetchedPlayers.filter((player) => player?.id !== currentPlayer?.id),
  ];

  const dispatch = useDispatch();
  dispatch(setPlayers(playerList));

  return (
    <div className="relative z-10 flex flex-col items-center">
      <LobbyHeader room={fetchedRoom as Room} />
      <LobbyPlayer />
      <LobbySetting />
    </div>
  );
}
