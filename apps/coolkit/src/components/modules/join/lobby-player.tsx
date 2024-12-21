'use client'

import { ButtonKet } from "@/components/ui/button"
import { IconUsers } from "@tabler/icons-react"
import Image from "next/image"

interface LobbyPlayerProps {
    count: number
}

export function LobbyPlayer({ count }: LobbyPlayerProps) {
    return (
        <>
            <div className="text-white text-3xl flex justify-between w-[55vw] content-center">
                <div className="flex items-center gap-1">
                    <IconUsers className="h-[1.875rem] w-[1.875rem]" />
                    <span className=" font-medium ">{count}</span>
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
            </div>
            <div className="flex flex-wrap justify-around w-[75vw] mt-[8vh] gap-5">
                <Player />
                <Player />
                <Player />
                <Player />
                <Player />
                <Player />
                <Player />
                <Player />
            </div>
        </>

    )
}

const Player = () => {
    return (
        <ButtonKet className="flex items-center gap-4 bg-white flex-none hover:bg-slate-50 pl-0 py-8">
            <div className="w-[3.2rem] mb-2">
                <Image
                    src="https://res.cloudinary.com/dhdyel6be/image/upload/v1734691286/HighSchool/avatars/game/SpookyGhost.svg"
                    width={100} height={100}
                    alt="avatar"
                    className="-rotate-12"
                />
            </div>
            <div className="text-black text-center w-[14vw] overflow-hidden whitespace-nowrap text-ellipsis mb-2 hover:line-through">
                <span className="text-xl font-[500]">Nguyễn Văn AAAA</span>
            </div>
        </ButtonKet>
    )
}