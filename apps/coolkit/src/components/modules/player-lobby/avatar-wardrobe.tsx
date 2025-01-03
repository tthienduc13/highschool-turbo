"use client"

import { useGetAvatarQuery, useGetOwnerAvatarQuery } from "@/api/user/query";
import { Avatar, AvatarRarity } from "@/api/user/type";
import { ButtonKet } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@highschool/ui/components/ui/dialog";
import { motion } from "motion/react"
import Image from "next/image";
import { useEffect, useState, useMemo } from "react";
import { BookAvatar } from "./book-avatar";
import { IconX } from "@tabler/icons-react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../store/store";
import { DefaultAvatars } from "@/constants/user";
import { updatePlayerInfo } from "../../../../store/slice/player-slice";
import { useUpdatePlayerInformationMutation } from "@/api/game/query";

interface AvatarWardrobeProps {
    isOpen: boolean;
    setOpen: (value: boolean) => void;
    setIsLoadingAvatar: (value: boolean) => void;
}


export const AvatarWardrobe = ({ isOpen, setOpen, setIsLoadingAvatar }: AvatarWardrobeProps) => {
    const background = "https://static.wikia.nocookie.net/blooket/images/9/92/BlizzardPackBackground.webp/revision/latest/scale-to-width-down/200?cb=20221116001218";
    const { data } = useGetAvatarQuery({
        page: -1,
        pageSize: 10
    });
    const { mutateAsync: updatePlayer, isPending: isUpdateLoading } = useUpdatePlayerInformationMutation();
    const avatars: Avatar[] = useMemo(() => (Array.isArray(data?.data) ? data.data : []), [data]);
    const currentPlayer = useSelector((state: RootState) => state.currentPlayerSlice)
    const [selectAvatar, setSelectAvatar] = useState<Avatar | null>(null);
    const { data: ownerAvatars, isPending: isOwneAvatarLoading } = useGetOwnerAvatarQuery();
    const dispatch = useDispatch();

    const onChangeAvatar = (avatar: Avatar) => {
        if (selectAvatar?.id !== avatar.id) {
            setSelectAvatar(avatar);
        }
    };

    useEffect(() => {
        if (avatars.length > 0 && !isOwneAvatarLoading) {
            setSelectAvatar(avatars.find(avatar => avatar.image === currentPlayer?.avatar) ?? avatars[0]);
            setIsLoadingAvatar(false);
        }
    }, [avatars, setIsLoadingAvatar, isOwneAvatarLoading, currentPlayer?.avatar, isOpen]);

    const confirmAvatar = async () => {
        try {
            const result = await updatePlayer({
                userId: currentPlayer?.id ?? "",
                roomId: currentPlayer?.roomId ?? "",
                avatar: selectAvatar?.image ?? ""
            })

            if (result.status === 200) {
                dispatch(updatePlayerInfo({ avatar: `${selectAvatar?.image}` }))
                setOpen(false);
            }

        } catch {
            console.log("error")
        }

    }

    return (
        <Dialog open={isOpen} onOpenChange={setOpen}>
            <DialogTitle></DialogTitle>
            <DialogContent className="max-w-[80vw] p-4">
                <motion.button
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    whileHover={{ scale: 1.1, transition: { duration: 0.2 } }}
                    className="absolute top-3 right-4"
                    onClick={() => setOpen(false)}
                >
                    <IconX />
                </motion.button>
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="flex items-center w-full "
                >
                    <BookAvatar avatars={avatars} onChangeAvatar={onChangeAvatar} ownerAvatars={ownerAvatars ?? DefaultAvatars} />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex flex-col items-center justify-center m-auto gap-4"
                    >
                        <div className="relative w-[20vw] h-[20vw] rounded-2xl overflow-hidden">

                            <Image
                                src={background}
                                alt="background"
                                width={420} height={420}
                                className="relative"
                            />

                            <div className="w-[100%] mb-2 z-50 absolute top-1/2 -translate-y-[60%] flex flex-col justify-center items-center">
                                <div className="text-white font-extrabold text-2xl mb-2"
                                    style={{ textShadow: "0px 3px 3px rgba(0,0,0,.2)" }}
                                >
                                    {selectAvatar?.name}
                                </div>
                                <div className="text-white font-extrabold text-xl mb-2"
                                    style={{ WebkitTextStroke: "#3a3a3a 1.5px" }}
                                >
                                    {AvatarRarity[selectAvatar?.rarity ?? 1]}
                                </div>
                                <Image
                                    src={selectAvatar?.image ?? ""}
                                    width={100} height={100}
                                    alt="avatar"
                                />
                            </div>
                        </div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="w-[20vw] rounded-2xl"
                        >
                            <ButtonKet
                                className="m-auto"
                                onClick={confirmAvatar}
                                isDisabled={isUpdateLoading}
                            >
                                Lựa chọn Avatar này
                            </ButtonKet>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="w-[20vw] rounded-2xl m-auto"
                        >
                            <ButtonKet className="m-auto" isDisabled={isUpdateLoading}>Đăng nhập để khám phá thêm</ButtonKet>
                        </motion.div>
                    </motion.div>

                </motion.div>
            </DialogContent>
        </Dialog>

    )
}

