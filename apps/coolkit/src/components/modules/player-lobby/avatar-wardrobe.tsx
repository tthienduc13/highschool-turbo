"use client"

import { useGetAvatarQuery } from "@/api/user/query";
import { Avatar } from "@/api/user/type";
import { ButtonKet } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@highschool/ui/components/ui/dialog";
import { motion } from "motion/react"
import Image from "next/image";
import { useEffect, useState, useMemo } from "react";
import { BookAvatar } from "./book-avatar";

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
    const avatars = useMemo(() => data?.data || [], [data]);

    const [selectAvatar, setSelectAvatar] = useState<Avatar | null>(null);

    const onChangeAvatar = (index: number) => {
        setSelectAvatar(avatars[index]);
    }

    useEffect(() => {
        if (avatars.length > 0) {
            setSelectAvatar(avatars[0]);
            setIsLoadingAvatar(false);
        }
    }, [avatars]);

    return (
        <Dialog open={isOpen} onOpenChange={setOpen}>
            <DialogTitle></DialogTitle>
            <DialogContent className="max-w-[80vw] p-4">
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="flex items-center w-full "
                >
                    <BookAvatar />
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
                                    {selectAvatar?.rarity}
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
                            className="w-[20vw] rounded-2xl m-auto"
                        >
                            <ButtonKet>Đăng nhập để khám phá thêm</ButtonKet>
                        </motion.div>
                    </motion.div>

                </motion.div>
            </DialogContent>
        </Dialog>

    )
}

