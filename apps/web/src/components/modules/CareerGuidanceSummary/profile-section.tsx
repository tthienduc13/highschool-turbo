import { useSession } from "next-auth/react";

import { CareerGuidanceBrief } from "@highschool/react-query/apis";
import { useUserProfileQuery } from "@highschool/react-query/queries";
import { Avatar, AvatarImage } from "@highschool/ui/components/ui/avatar";
import { Card, CardContent } from "@highschool/ui/components/ui/card";

import { IconUser } from "@tabler/icons-react";

import { useMe } from "@/hooks/use-me";

interface ProfileSectionProps {
  brief: CareerGuidanceBrief;
}

export const ProfileSection = ({ brief }: ProfileSectionProps) => {
  const me = useMe();
  const { data: session, status } = useSession();
  const { data: userInfo, isLoading } = useUserProfileQuery({
    username: me?.username!,
    status: status,
  });
  return (
    <div className="flex flex-col gap-8">
      <h1 className="group relative w-fit cursor-pointer text-3xl font-bold md:text-4xl">
        Hiểu mình
        <div className="bg-primary absolute bottom-0 left-0 h-1 w-1/2 transition-all duration-200 group-hover:w-full" />
      </h1>

      <div className="flex flex-col gap-6 md:px-4">
        <div className="flex flex-col gap-4 md:flex-row md:items-center">
          <Avatar className="-z-10 size-16 md:size-24">
            <AvatarImage
              src={me?.image ?? "/logo.svg"}
              alt={me?.fullname ?? "Người dùng Highschool"}
            />
          </Avatar>
          <div className="grid w-full grid-cols-1 items-center gap-2 font-medium md:grid-cols-2 md:text-lg">
            <div className="flex flex-row items-center gap-2">
              Họ và tên: {userInfo?.data?.fullname}
            </div>
            <div className="flex flex-row items-center gap-2">
              Email: {userInfo?.data?.email}
            </div>
            <div className="flex flex-row items-center gap-2">
              Trường: {userInfo?.data?.schoolName}
            </div>
            <div className="flex flex-row items-center gap-2">
              Lớp: {userInfo?.data?.grade}
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold md:text-2xl">
            Tóm tắt từ kết quả
          </h2>
          <div className="grid w-full grid-cols-1 items-stretch gap-4 md:grid-cols-2">
            <Card className="w-full border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
              <CardContent className="flex flex-col gap-4 p-5">
                <div className="flex flex-row items-center justify-between">
                  <h3 className="highlight highlight-[#C9F77A] highlight-variant-5 w-fit text-lg font-medium">
                    Kiểm tra tính cách
                  </h3>
                  <div className="bg-primary/40 flex h-8 items-center justify-center rounded-md px-3 text-base font-bold">
                    {userInfo?.data?.mbtiType}
                  </div>
                </div>
                <p className="text-muted-foreground text-sm">
                  {brief.mbtiBrief}
                </p>
              </CardContent>
            </Card>
            <Card className="w-full border-gray-200 dark:border-gray-700 dark:bg-gray-800">
              <CardContent className="flex flex-col gap-4 p-5">
                <div className="flex flex-row items-center justify-between">
                  <h3 className="highlight highlight-[#C9F77A] highlight-variant-5 w-fit text-lg font-medium">
                    Định hướng nghề nghiệp
                  </h3>
                  <div className="bg-primary/40 flex h-8 items-center justify-center rounded-md px-3 text-base font-bold">
                    {userInfo?.data?.hollandType}
                  </div>
                </div>
                <p className="text-muted-foreground text-sm">
                  {brief.hollandBrief}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
