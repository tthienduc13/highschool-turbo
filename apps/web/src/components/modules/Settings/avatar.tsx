"use client";

import { useSession } from "next-auth/react";
import { toast } from "sonner";

import { useState } from "react";

import { useUpdateBaseUserInfoMutation } from "@highschool/react-query/queries";
import { Avatar, AvatarImage } from "@highschool/ui/components/ui/avatar";
import { Button } from "@highschool/ui/components/ui/button";

import { IconPlus } from "@tabler/icons-react";

import { UploadAvatarModal } from "@/components/core/common/upload-avatar";
import { useMe } from "@/hooks/use-me";
import { Avatars } from "@/lib/avatar";

export const AvatarSetting = () => {
  const me = useMe();
  const [openUpload, setOpenUpload] = useState<boolean>(false);
  const { data: session, update } = useSession();
  const updateUserImage = useUpdateBaseUserInfoMutation();

  const updateUser = async (avatar: string) => {
    await updateUserImage.mutateAsync(
      {
        profilePicture: avatar,
      },
      {
        onSuccess: () => {
          toast.success("Ảnh đại diện cập nhật");
        },
      },
    );

    await update({
      ...session,
      user: {
        ...session?.user,
        image: avatar,
      },
    });
  };
  return (
    <>
      <UploadAvatarModal
        isOpen={openUpload}
        onClose={() => setOpenUpload(false)}
      />
      <div className="flex flex-col gap-5">
        <h2 className="text-lg font-bold">Ảnh đại diện</h2>
        <div className="flex flex-row gap-5">
          <Avatar className="size-24">
            <AvatarImage
              src={me?.image ?? "/logo.svg"}
              alt={me?.fullname ?? "Highschool Avatar"}
            />
          </Avatar>
          <div className="flex flex-row flex-wrap gap-2">
            {Avatars.filter(
              (avatar) => avatar.rarity.toLowerCase() === "common",
            )
              .slice(0, 24)
              .map((avatar) => (
                <Avatar
                  key={avatar.image}
                  className="bg-primary/50 size-12 cursor-pointer hover:opacity-80"
                  onClick={() => updateUser(avatar.image)}
                >
                  <AvatarImage src={avatar.image} alt={avatar.name} />
                </Avatar>
              ))}
            <Button
              size={"icon"}
              variant={"outline"}
              className="!size-12 rounded-full"
              onClick={() => setOpenUpload(true)}
            >
              <IconPlus className="!size-6" />
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};
