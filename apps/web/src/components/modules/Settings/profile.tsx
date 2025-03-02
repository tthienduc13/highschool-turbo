"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@highschool/ui/components/ui/button";
import { IconUser } from "@tabler/icons-react";

import { Wrapper } from "./wrapper";

import { ChangeFullnameInput } from "@/components/core/common/change-fullname-input";
import { ChangeUsernameInput } from "@/components/core/common/change-username-input";

export const Profile = () => {
  const { data: session } = useSession();
  const router = useRouter();

  return (
    <Wrapper
      additional={
        <Button
          className="w-fit"
          size={"lg"}
          variant="outline"
          onClick={() => router.push(`/profile/${session?.user.username}`)}
        >
          <IconUser size={18} /> Xem hồ sơ
        </Button>
      }
      description="Tên người dùng và hồ sơ của bạn"
      heading="Thông tin cá nhân"
    >
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Thay đổi họ và tên
          </p>
          <ChangeFullnameInput />
        </div>
        <div className="h-px w-full bg-gray-400 dark:bg-gray-600" />
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
