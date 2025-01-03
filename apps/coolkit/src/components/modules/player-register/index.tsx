"use client"

import { ButtonKet } from "@/components/ui/button";
import { PlayerHeader } from "./play-header";
import { IconArrowNarrowRight } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";

export default function PlayerRegisterModule() {
    const router = useRouter();

    return (
        <>
            <PlayerHeader />
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="text-6xl absolute left-[33%] top-[35%] text-white text-center font-extrabold">
                <div className="text-center">
                    <h3 className="my-6">Nhập tên của bạn</h3>
                </div>
                <div className="flex items-center space-x-2 justify-center w-full">
                    <input
                        className="text-center text-gray-600 text-4xl shadow-inset-gray-shadow outline-none bg-white border-none px-4 rounded-xl w-[20vw] h-[10vh] pb-3"
                        placeholder="Biệt danh..."
                    />
                    <ButtonKet
                        backgroundColor="white"
                        className="text-black py-[1.9rem] flex-none"
                        heightShadow="-10px"
                        onClick={() => router.push("/play/lobby")}
                    >
                        <IconArrowNarrowRight style={{ width: "2.25rem", height: "2.25rem" }} />
                    </ButtonKet>
                </div>
            </motion.div>
        </>
    )
}