'use client'

import { useLobbyInformationQuery } from "@/api/ket/query";
import { LobbyHeader } from "./lobby-header";
import { LobbyPlayer } from "./lobby-player";
import { LobbySetting } from "./lobby-setting";
import { Player } from "@/api/user/type";
import { Room } from "@/api/game/type";
import { useDispatch } from "react-redux";
import { setPlayers } from "../../../../store/slice/players-slice";

type Prop = {
    roomId: string;
    currentPlayer: Player;
}

export default function PlayerLobbyModule({ roomId, currentPlayer }: Prop) {
    const { data } = useLobbyInformationQuery({ data: { roomId } });

    const fetchedPlayers: Player[] = data?.players ?? [];
    const fetchedRoom = data?.room ?? {};

    const playerList: Player[] = [
        currentPlayer,
        ...fetchedPlayers.filter((player) => player?.id !== currentPlayer?.id)
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
