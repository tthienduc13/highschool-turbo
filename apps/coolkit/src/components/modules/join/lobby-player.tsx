'use client'

import { ButtonKet } from "@/components/ui/button"
import { IconUsers } from "@tabler/icons-react"
import Image from "next/image"
import { motion } from "motion/react"
import React from "react"
import { Player } from "@/api/user/type"
import { useKickPlayerMutation } from "@/api/ket/query"

interface LobbyPlayerProps {
    count: number
    players: Player[]
    roomId: string
}

interface PlayerProp {
    avatar: string
    name: string
    roomId: string
    playerId: string
}

export function LobbyPlayer({ count, players, roomId }: LobbyPlayerProps) {
    return (
        <>
            <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="text-white text-3xl flex justify-between w-[55vw] content-center"
            >
                <div className="flex items-center gap-1">
                    <IconUsers className="h-[1.875rem] w-[1.875rem]" />
                    <span className=" font-medium ">
                        {count == 0 ? 'Chờ người chơi' : `${count}`}
                    </span>
                </div>
                <div className="text-5xl font-bold">
                    <h2>Coolket</h2>
                </div>
                <ButtonKet
                    className="flex-none text-black text-2xl"
                    backgroundColor="white"
                    isDisabled={count == 0}
                >
                    {
                        count == 0 ? '+1 người' : 'Bắt đầu'
                    }
                </ButtonKet>
            </motion.div>
            <div className="flex flex-wrap justify-around w-[75vw] mt-[8vh] gap-5">
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

    )
}

const PlayerTag: React.FC<PlayerProp> = ({ avatar, name, roomId, playerId }) => {

    const { mutateAsync, isPending } = useKickPlayerMutation()

    const HandleKickPlayer = async () => {
        try {
            const res = await mutateAsync({ data: { roomId: roomId, userId: playerId } })
            if (res.status == 200) {
                // success toast
            } else {
                // fail toast
            }
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
        >
            <ButtonKet
                className="flex items-center gap-4 bg-white flex-none hover:bg-slate-50 pl-0 py-8"
                onClick={HandleKickPlayer}
                isDisabled={isPending}
            >
                <div className="w-[3.2rem] mb-2">
                    <Image
                        src={avatar}
                        width={100} height={100}
                        alt="avatar"
                        className="-rotate-12"
                    />
                </div>
                <div className="text-black text-center w-[14vw] overflow-hidden whitespace-nowrap text-ellipsis mb-2 hover:line-through">
                    <span className="text-xl font-[500]">{name}</span>
                </div>
            </ButtonKet>
        </motion.div>
    )

}