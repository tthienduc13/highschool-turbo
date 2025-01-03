"use client";

import { ChannelProvider } from "ably/react";
import { useSelector } from "react-redux";

import { useEffect } from "react";

import { useRouter } from "next/navigation";

import { Player } from "@/api/user/type";

import PlayerLobbyModule from ".";
import { RootState } from "../../../../store/store";

export default function LobbyProviderModule() {
  const router = useRouter();

  const currentLobby = useSelector(
    (state: RootState) => state.currentLobbySlice,
  );
  const currentPlayer = useSelector(
    (state: RootState) => state.currentPlayerSlice,
  );

  useEffect(() => {
    if (currentLobby == "") router.back();
  }, [currentLobby]);

  return (
    <ChannelProvider channelName={`room:${currentLobby}`}>
      <PlayerLobbyModule
        roomId={currentLobby}
        currentPlayer={currentPlayer as Player}
      />
    </ChannelProvider>
  );
}
