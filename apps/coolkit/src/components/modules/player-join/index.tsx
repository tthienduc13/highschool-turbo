"use client";

import { ButtonKet } from "@/components/ui/button";
import { IconArrowNarrowRight } from "@tabler/icons-react";
import { PlayerHeader } from "./play-header";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { motion } from "motion/react";
import { useCheckRoomMutation, useJoinRoomMutation } from "@/api/ket/query";
import { useDispatch } from "react-redux";
import { setPlayer } from "../../../../store/slice/player-slice";
import { Player } from "@/api/user/type";
import { setLobby } from "../../../../store/slice/lobby-slice";



export default function PlayerJoinModule() {

    const router = useRouter();
    const dispatch = useDispatch()

    const [id, setId] = useState<string>('');
    const [name, setName] = useState<string>('')
    const [isRoomExist, setIsRoomExist] = useState<boolean>(false)

    const { mutateAsync: checkRoomMutate, isPending: checkRoomPending } = useCheckRoomMutation()
    const { mutateAsync: joinRoomMutate, isPending: joinRoomPending } = useJoinRoomMutation();

    const HandleCheckRoom = async () => {
        const res = await checkRoomMutate({ data: { roomId: id } })
        if (res.status == 200) {
            setIsRoomExist(true)
        } else {
            alert('No room found')
        }
    }

    const HandleJoinRoom = async () => {
        const res = await joinRoomMutate({ data: { avatar: 'https://res.cloudinary.com/dhdyel6be/image/upload/v1734691286/HighSchool/avatars/game/Moose.svg', displayName: name, roomId: id } })
        if (res.status == 200) {
            const currentPlayer: Player = {
                avatar: res.data!.avatar,
                displayName: res.data!.displayName,
                id: res.data!.id,
                roomId: res.data!.roomId,
                score: res.data!.score,
                timeAverage: res.data!.timeAverage
            }
            dispatch(setPlayer(currentPlayer))
            dispatch(setLobby(id))
            router.push(`/play/lobby`)
        } else {
            setName('')
            alert('failed')
        }
    };

    const onChangeId = (value: string) => {
        const numericValue = value.replace(/\D/g, "");
        if (numericValue.length <= 6) {
            setId(numericValue);
        }
    };

    return (
        <>
            <PlayerHeader />
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                hidden={isRoomExist}
                className="text-6xl absolute left-[40%] top-[40%] transform text-white text-center font-extrabold"
            >
                <h3 className="my-6">Coolket</h3>
                <div className="flex items-center space-x-2">
                    <input
                        type="text"
                        className="text-center text-gray-600 text-2xl shadow-inset-gray-shadow outline-none bg-white border-none px-4 rounded-xl w-[16vw] h-[10vh] pb-3"
                        value={id}
                        onChange={(e) => onChangeId(e.target.value)}
                        placeholder="Nhập ID..."
                        maxLength={6}
                    />
                    <ButtonKet
                        backgroundColor="white"
                        className="text-black text-center h-[10vh]"
                        heightShadow="-10px"
                        onClick={HandleCheckRoom}
                        isDisabled={!id || checkRoomPending}
                    >
                        <IconArrowNarrowRight style={{ width: "2.25rem", height: "2.25rem" }} />
                    </ButtonKet>
                </div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                hidden={!isRoomExist}
                className="text-6xl absolute left-[40%] top-[40%] transform text-white text-center font-extrabold"
            >
                <h3 className="my-6">Coolket</h3>
                <div className="flex items-center space-x-2">
                    <input
                        className="text-center text-gray-600 text-2xl shadow-inset-gray-shadow outline-none bg-white border-none px-4 rounded-xl w-[16vw] h-[10vh] pb-3"
                        placeholder="Biệt danh..."
                        onChange={(e) => setName(e.target.value)}
                    />
                    <ButtonKet
                        backgroundColor="white"
                        className="text-black text-center h-[10vh]"
                        heightShadow="-10px"
                        onClick={HandleJoinRoom}
                        isDisabled={!name || joinRoomPending}
                    >
                        <IconArrowNarrowRight style={{ width: "2.25rem", height: "2.25rem" }} />
                    </ButtonKet>
                </div>
            </motion.div>
        </>
    );
}
