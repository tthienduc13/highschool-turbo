"use client";

import { signOut, useSession } from "next-auth/react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { Avatar, AvatarImage } from "@highschool/ui/components/ui/avatar";
import { Button } from "@highschool/ui/components/ui/button";
import {
  IconLogout,
  IconMoon,
  IconSettings,
  IconSun,
  IconUser,
} from "@tabler/icons-react";
import { deleteClientCookie } from "@highschool/lib/cookies";
import { ACCESS_TOKEN } from "@highschool/lib/constants";

interface UserMobileOptionProps {
  onClose: () => void;
}

export const UserMobileOption = ({ onClose }: UserMobileOptionProps) => {
  const { data: session } = useSession();
  const { theme, setTheme } = useTheme();
  const user = session?.user;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-row items-center gap-2">
        <Avatar className="size-8">
          <AvatarImage
            alt={user?.fullname ?? "Chưa đặt tên"}
            src={user?.image ?? ""}
          />
        </Avatar>
        <p className="font-semibold">{user?.fullname ?? "Chưa đặt tên"}</p>
      </div>
      <div className="flex w-full flex-col gap-4">
        <Link href={`/profile/${user?.username}`}>
          <Button
            className="w-full text-base"
            size={"lg"}
            variant="outline"
            onClick={onClose}
          >
            <IconUser className="!size-[18px]" size={18} />
            Thông tin cá nhân
          </Button>
        </Link>
        <Link href={`/settings`}>
          <Button
            className="w-full text-base"
            size={"lg"}
            variant="outline"
            onClick={onClose}
          >
            <IconSettings className="!size-[18px]" size={18} />
            Cài đặt
          </Button>
        </Link>
        <Button
          className="w-full text-base"
          size={"lg"}
          variant="outline"
          onClick={() => {
            setTheme(theme === "dark" ? "light" : "dark");
            onClose();
          }}
        >
          {theme === "dark" ? (
            <IconSun className="!size-[18px]" size={18} />
          ) : (
            <IconMoon className="!size-[18px]" size={18} />
          )}
          Chế độ {theme === "light" ? "tối" : "sáng"}
        </Button>
        <Button
          className="w-full text-base"
          size={"lg"}
          variant="outline"
          onClick={async () => {
            await deleteClientCookie(ACCESS_TOKEN);
            await signOut();
            onClose();
          }}
        >
          <IconLogout className="!size-[18px]" size={18} />
          Đăng xuất
        </Button>
      </div>
    </div>
  );
};
