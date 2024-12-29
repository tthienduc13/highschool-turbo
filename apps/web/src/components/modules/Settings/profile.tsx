"use client";

import { useSession } from "next-auth/react";

import { useRouter } from "next/navigation";

import { Button } from "@highschool/ui/components/ui/button";

import { IconUser } from "@tabler/icons-react";

import { ChangeFullnameInput } from "@/components/core/common/change-fullname-input";
import { ChangeUsernameInput } from "@/components/core/common/change-username-input";

import { Wrapper } from "./wrapper";

export const Profile = () => {
  const { data: session } = useSession();
  const router = useRouter();

  return (
    <Wrapper
      heading="Profile"
      description="Your username and public profile info"
      additional={
        <Button
          onClick={() => router.push(`/profile/${session?.user.username}`)}
          variant="outline"
          size={"lg"}
          className="w-fit"
        >
          <IconUser size={18} /> Xem hồ sơ
        </Button>
      }
    >
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Thay đổi họ và tên
          </p>
          <ChangeFullnameInput />
        </div>
        <div className="h-[1px] w-full bg-gray-400 dark:bg-gray-600" />
        <div className="flex flex-col gap-2">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Thay đổi tên người dùng
          </p>
          <ChangeUsernameInput />
        </div>
      </div>
    </Wrapper>
  );
};
