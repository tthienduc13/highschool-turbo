'use client'

import { ButtonKet } from "@/components/ui/button"
import Image from "next/image"
import { motion } from "motion/react"


export function LobbyPlayer() {

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
                    Waiting to host...
                </div>
            </motion.div>
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
        <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
        >
            <ButtonKet className="flex items-center gap-4 bg-white flex-none hover:bg-slate-50 pl-0 py-8">
                <div className="w-[3.2rem] mb-2">
                    <Image
                        src="https://res.cloudinary.com/dhdyel6be/image/upload/v1734691286/HighSchool/avatars/game/SpookyGhost.svg"
                        width={100} height={100}
                        alt="avatar"
                        className="-rotate-12"
                    />
                </div>
                <div className="text-black text-center w-[14vw] overflow-hidden whitespace-nowrap text-ellipsis mb-2">
                    <span className="text-xl font-[500]">Nguyễn Văn AAAA</span>
                </div>
            </ButtonKet>

        </motion.div>
    )

}



