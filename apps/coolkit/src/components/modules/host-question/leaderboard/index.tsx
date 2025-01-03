import { ButtonKet } from "@/components/ui/button"
import { QuestionHeader } from "./question-header"
import { motion } from "motion/react"
import Image from "next/image"
import { IconX } from "@tabler/icons-react"

export const LeaderboardModule = () => {
    return (
        <div
            className="relative z-10 flex flex-col items-center bg-zinc-100 h-max"
        >
            <QuestionHeader />

            <div className="absolute top-0 right-10">
                <ButtonKet
                    className="mt-10"
                    onClick={() => console.log("clicked")}
                >
                    Next Question
                </ButtonKet>
            </div>

            <div className="flex flex-col items-center gap-5 mt-10 mb-10">
                <PlayerResult />
                <PlayerResult />
                <PlayerResult />
                <PlayerResult />
                <PlayerResult />
                <PlayerResult />
                <PlayerResult />
            </div>
        </div>
    )
}

const PlayerResult = () => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center gap-6 bg-white flex-none hover:bg-slate-50 rounded-lg shadow-inset-gray-shadow py-2 w-[40vw] px-4"
        >
            <div className="text-2xl font-extrabold">1<sup>st</sup></div>
            <div className="w-[3.2rem] mb-2">
                <Image
                    src={"https://res.cloudinary.com/dhdyel6be/image/upload/v1734691286/HighSchool/avatars/game/Duck.svg"}
                    width={100} height={100}
                    alt="avatar"
                />
            </div>
            <div className="text-black text-center w-[27vw] overflow-hidden whitespace-nowrap text-ellipsis mb-2 hover:line-through">
                <span className="text-2xl font-[500]">sdasdas</span>
            </div>
            <button><IconX /></button>
        </motion.div>
    )
}