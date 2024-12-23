"use client"

import { ButtonKet } from "@/components/ui/button";
import { IconArrowNarrowRight } from "@tabler/icons-react";
import { PlayerHeader } from "./play-header";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { motion } from "motion/react";

export default function PlayerJoinModule() {
    const router = useRouter();
    const [id, setId] = useState<string>("");

    const onChangeId = (value: string) => {
        if (id.length < 6) {
            setId(value);
        }
    }

    return (
        <>
            <PlayerHeader />
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="text-6xl absolute left-[40%] top-[40%] transform text-white text-center font-extrabold"
            >
                <h3 className="my-6">Coolket</h3>
                <div
                    className="flex items-center space-x-2"
                >
                    <input
                        type="number"
                        className="text-center text-gray-600 text-4xl shadow-inset-gray-shadow outline-none bg-white border-none px-4 rounded-xl w-[16vw] h-[10vh] pb-3"
                        value={id}
                        onChange={(e) => onChangeId(e.target.value)}
                        placeholder="Enter ID"
                        maxLength={6}
                    />
                    <ButtonKet
                        backgroundColor="white"
                        className="text-black py-[1.9rem]"
                        heightShadow="-10px"
                        onClick={() => router.push(`/play/register?id=${id}`)}
                    >
                        <IconArrowNarrowRight style={{ width: "2.25rem", height: "2.25rem" }} />
                    </ButtonKet>
                </div>
            </motion.div>
        </>

    )
}