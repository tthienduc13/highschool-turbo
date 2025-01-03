"use client";

import { motion } from "motion/react";
import { useDispatch, useSelector } from "react-redux";

import { useEffect, useMemo, useState } from "react";

import Image from "next/image";

import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@highschool/ui/components/ui/dialog";

import { IconX } from "@tabler/icons-react";

import { useUpdatePlayerInformationMutation } from "@/api/game/query";
import { useGetAvatarQuery, useGetOwnerAvatarQuery } from "@/api/user/query";
import { Avatar, AvatarRarity } from "@/api/user/type";
import { ButtonKet } from "@/components/ui/button";
import { DefaultAvatars } from "@/constants/user";

import { updatePlayerInfo } from "../../../../store/slice/player-slice";
import { RootState } from "../../../../store/store";
import { BookAvatar } from "./book-avatar";

interface AvatarWardrobeProps {
  isOpen: boolean;
  setOpen: (value: boolean) => void;
  setIsLoadingAvatar: (value: boolean) => void;
}

export const AvatarWardrobe = ({
  isOpen,
  setOpen,
  setIsLoadingAvatar,
}: AvatarWardrobeProps) => {
  const background =
    "https://static.wikia.nocookie.net/blooket/images/9/92/BlizzardPackBackground.webp/revision/latest/scale-to-width-down/200?cb=20221116001218";
  const { data } = useGetAvatarQuery({
    page: -1,
    pageSize: 10,
  });
  const { mutateAsync: updatePlayer, isPending: isUpdateLoading } =
    useUpdatePlayerInformationMutation();
  const avatars: Avatar[] = useMemo(
    () => (Array.isArray(data?.data) ? data.data : []),
    [data],
  );
  const currentPlayer = useSelector(
    (state: RootState) => state.currentPlayerSlice,
  );
  const [selectAvatar, setSelectAvatar] = useState<Avatar | null>(null);
  const { data: ownerAvatars, isPending: isOwneAvatarLoading } =
    useGetOwnerAvatarQuery();
  const dispatch = useDispatch();

  const onChangeAvatar = (avatar: Avatar) => {
    if (selectAvatar?.id !== avatar.id) {
      setSelectAvatar(avatar);
    }
  };

  useEffect(() => {
    if (avatars.length > 0 && !isOwneAvatarLoading) {
      setSelectAvatar(
        avatars.find((avatar) => avatar.image === currentPlayer?.avatar) ??
          avatars[0],
      );
      setIsLoadingAvatar(false);
    }
  }, [
    avatars,
    setIsLoadingAvatar,
    isOwneAvatarLoading,
    currentPlayer?.avatar,
    isOpen,
  ]);

  const confirmAvatar = async () => {
    try {
      const result = await updatePlayer({
        userId: currentPlayer?.id ?? "",
        roomId: currentPlayer?.roomId ?? "",
        avatar: selectAvatar?.image ?? "",
      });

      if (result.status === 200) {
        dispatch(updatePlayerInfo({ avatar: `${selectAvatar?.image}` }));
        setOpen(false);
      }
    } catch {
      console.log("error");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <DialogTitle></DialogTitle>
      <DialogContent className="max-w-[80vw] p-4">
        <motion.button
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          whileHover={{ scale: 1.1, transition: { duration: 0.2 } }}
          className="absolute right-4 top-3"
          onClick={() => setOpen(false)}
        >
          <IconX />
        </motion.button>
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="flex w-full items-center"
        >
          <BookAvatar
            avatars={avatars}
            onChangeAvatar={onChangeAvatar}
            ownerAvatars={ownerAvatars ?? DefaultAvatars}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="m-auto flex flex-col items-center justify-center gap-4"
          >
            <div className="relative h-[20vw] w-[20vw] overflow-hidden rounded-2xl">
              <Image
                src={background}
                alt="background"
                width={420}
                height={420}
                className="relative"
              />

              <div className="absolute top-1/2 z-50 mb-2 flex w-[100%] -translate-y-[60%] flex-col items-center justify-center">
                <div
                  className="mb-2 text-2xl font-extrabold text-white"
                  style={{ textShadow: "0px 3px 3px rgba(0,0,0,.2)" }}
                >
                  {selectAvatar?.name}
                </div>
                <div
                  className="mb-2 text-xl font-extrabold text-white"
                  style={{ WebkitTextStroke: "#3a3a3a 1.5px" }}
                >
                  {AvatarRarity[selectAvatar?.rarity ?? 1]}
                </div>
                <Image
                  src={selectAvatar?.image ?? ""}
                  width={100}
                  height={100}
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
              className="m-auto w-[20vw] rounded-2xl"
            >
              <ButtonKet className="m-auto" isDisabled={isUpdateLoading}>
                Đăng nhập để khám phá thêm
              </ButtonKet>
            </motion.div>
          </motion.div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
};
