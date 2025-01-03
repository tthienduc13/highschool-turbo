"use client";

import { useChannel } from "ably/react";
import { useDispatch, useSelector } from "react-redux";

import { RoomEvent, RoomEventType } from "@/api/ket/type";
import { Player } from "@/api/user/type";
import SnowEffect from "@/components/animation/snow/snow-effect";
import { LobbyHeader } from "@/components/core/main/lobby-header";

import {
  addOrUpdatePlayer,
  setPlayers,
  updatePlayerInfoOnList,
} from "../../../../store/slice/players-slice";
import { RootState } from "../../../../store/store";
import { LobbyPlayer } from "./lobby-player";
import { LobbySetting } from "./lobby-setting";

type Prop = {
  roomId: string;
};

export const JoinModule: React.FC<Prop> = ({ roomId }) => {
  const players = useSelector((state: RootState) => state.listPlayerSlice);
  const dispatch = useDispatch();

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
        case RoomEventType.PlayerKicked: {
          dispatch(
            setPlayers(players.filter((player) => player?.id !== data.Data)),
          );
          return;
        }
        case RoomEventType.UpdatePlayerInfo: {
          dispatch(
            updatePlayerInfoOnList({
              id: data.Data.Id,
              avatar: data.Data.Avatar,
            }),
          );
          return;
        }
      }
    },
  );

  console.log(channel);

  return (
    <div
      className="min-h-screen bg-opacity-20"
      style={{
        backgroundColor: "rgb(11, 194, 207)",
        backgroundImage:
          "linear-gradient(rgb(49, 170, 224), rgb(187, 221, 255))",
      }}
    >
      <SnowEffect count={150} />

      <div className="relative z-10 flex flex-col items-center">
        <LobbyHeader gameId={roomId} />
        <LobbyPlayer
          count={players.length}
          players={[...players]}
          roomId={roomId}
        />
        <LobbySetting />
      </div>
    </div>
  );
};
