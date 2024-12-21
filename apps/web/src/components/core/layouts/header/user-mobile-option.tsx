"use client";

import { Avatar, AvatarImage } from "@highschool/ui/components/ui/avatar";
import { Button } from "@highschool/ui/components/ui/button";
import {
    IconLogout,
    IconMoon,
    IconSettings,
    IconSun,
    IconUser,
} from "@tabler/icons-react";
import { signOut, useSession } from "next-auth/react";
import { useTheme } from "next-themes";
import Link from "next/link";

interface UserMobileOptionProps {
    onClose: () => void;
}

export const UserMobileOption = ({ onClose }: UserMobileOptionProps) => {
    const { data: session } = useSession();
    const { theme, setTheme } = useTheme();
    const user = session?.user;
    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-row gap-2 items-center">
                <Avatar className="size-8">
                    <AvatarImage
                        src={user?.image ?? ""}
                        alt={user?.fullname ?? "Chưa đặt tên"}
                    />
                </Avatar>
                <p className="font-semibold">
                    {user?.fullname ?? "Chưa đặt tên"}
                </p>
            </div>
            <div className="flex flex-col gap-4 w-full">
                <Link href={`/@${user?.username}`}>
                    <Button
                        className="w-full text-base"
                        variant="outline"
                        size={"lg"}
                        onClick={onClose}
                    >
                        <IconUser size={18} className=" !size-[18px]" />
                        Thông tin cá nhân
                    </Button>
                </Link>
                <Link href={`/settings`}>
                    <Button
                        className="w-full text-base"
                        variant="outline"
                        size={"lg"}
                        onClick={onClose}
                    >
                        <IconSettings size={18} className=" !size-[18px]" />
                        Cài đặt
                    </Button>
                </Link>
                <Button
                    className="w-full text-base"
                    variant="outline"
                    size={"lg"}
                    onClick={() => {
                        setTheme(theme === "dark" ? "light" : "dark");
                        onClose();
                    }}
                >
                    {theme === "dark" ? (
                        <IconSun size={18} className=" !size-[18px]" />
                    ) : (
                        <IconMoon size={18} className=" !size-[18px]" />
                    )}
                    Chế độ {theme === "light" ? "tối" : "sáng"}
                </Button>
                <Button
                    className="w-full text-base"
                    variant="outline"
                    size={"lg"}
                    onClick={async () => {
                        await signOut();
                        onClose();
                    }}
                >
                    <IconLogout size={18} className=" !size-[18px]" />
                    Đăng xuất
                </Button>
            </div>
        </div>
    );
};
