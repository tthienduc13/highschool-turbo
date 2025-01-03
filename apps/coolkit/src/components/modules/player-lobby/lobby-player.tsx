'use client'

import { ButtonKet } from "@/components/ui/button"
import Image from "next/image"
import { motion } from "motion/react"
import { Player } from '@/api/user/type'
import { useChannel } from "ably/react"
import { RoomEvent, RoomEventType } from "@/api/ket/type"
import { useRouter } from "next/navigation"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../../../store/store"
import { addOrUpdatePlayer, setPlayers } from "../../../../store/slice/players-slice"

export function LobbyPlayer() {
    const router = useRouter()
    const dispatch = useDispatch();

    const roomId = useSelector((state: RootState) => state.currentLobbySlice);
    const currentPlayer = useSelector((state: RootState) => state.currentPlayerSlice);
    const playerList = useSelector((state: RootState) => state.listPlayerSlice);

    const { channel } = useChannel(`room:${roomId}`, 'message-game', (message) => {
        const data: RoomEvent = message.data
        switch (data.Type) {
            case RoomEventType.PlayerJoined:
                {
                    const newPlayer: Player = {
                        avatar: data.Data.Avatar,
                        displayName: data.Data.DisplayName,
                        id: data.Data.Id,
                        roomId: data.Data.RoomId,
                        score: data.Data.Score,
                        timeAverage: data.Data.TimeAverage
                    };
                    dispatch(addOrUpdatePlayer(newPlayer));
                    return;
                }
            case RoomEventType.PlayerKicked:
                if (data.Data == currentPlayer?.id) {
                    return router.back()
                } else {
                    dispatch(setPlayers(playerList.filter((player) => player?.id !== data.Data)));
                }
        }
    })

    console.log(channel);

    return (
        <>
            <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="text-white text-3xl flex justify-between w-[55vw] content-center mb-1rem"
            >
                <div
                    className="flex-none text-white font-extrabold text-2xl text-center w-full"
                >
                    Waiting for host...
                </div>
            </motion.div>
            <div className="flex flex-wrap justify-around w-[75vw] mt-[8vh] gap-5">
                {playerList.map((player) => (
                    <PlayerCard key={player?.id} player={player} />
                ))}
            </div>
        </>
    )
}

type PlayerProp = {
    player: Player
}

const PlayerCard: React.FC<PlayerProp> = ({ player }) => {

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
        >
            <ButtonKet className="flex items-center gap-4 bg-white flex-none hover:bg-slate-50 pl-0 py-8">
                <div className="w-[3.2rem] mb-2">
                    <Image
                        src={player?.avatar ?? ""}
                        width={100} height={100}
                        alt="avatar"
                        className="-rotate-12"
                    />
                </div>
                <div className="text-black text-center w-[14vw] overflow-hidden whitespace-nowrap text-ellipsis mb-2">
                    <span className="text-xl font-[500]">{player?.displayName}</span>
                </div>
            </ButtonKet>

        </motion.div>
    )

}



