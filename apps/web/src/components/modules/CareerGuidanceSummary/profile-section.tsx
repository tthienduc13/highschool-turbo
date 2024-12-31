import { useMe } from "@/hooks/use-me";
import { CareerGuidanceBrief } from "@highschool/react-query/apis";
import { useUserProfileQuery } from "@highschool/react-query/queries";
import { Avatar, AvatarImage } from "@highschool/ui/components/ui/avatar";
import { Card, CardContent } from "@highschool/ui/components/ui/card";
import { IconUser } from "@tabler/icons-react";
import { useSession } from "next-auth/react";

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
      <h1 className="md:text-4xl group text-3xl font-bold relative w-fit cursor-pointer ">
        Hiểu mình
        <div className="absolute bottom-0 left-0 h-1 bg-primary w-1/2 group-hover:w-full transition-all duration-200 " />
      </h1>

      <div className="flex flex-col gap-6 md:px-4">
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <Avatar className="md:size-24 size-16 -z-10">
            <AvatarImage
              src={me?.image ?? "/logo.svg"}
              alt={me?.fullname ?? "Người dùng Highschool"}
            />
          </Avatar>
          <div className="w-full items-center grid grid-cols-1 md:grid-cols-2 gap-2 md:text-lg font-medium">
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
          <h2 className="md:text-2xl text-xl font-semibold">
            Tóm tắt từ kết quả
          </h2>
          <div className="w-full grid md:grid-cols-2 grid-cols-1 gap-4 items-stretch">
            <Card className="w-full border-gray-200 dark:border-gray-700">
              <CardContent className="flex flex-col gap-4 p-5">
                <div className="flex flex-row items-center justify-between">
                  <h3 className="text-lg font-medium highlight w-fit highlight-[#C9F77A] highlight-variant-5">
                    Kiểm tra tính cách
                  </h3>
                  <div className="bg-primary/40 flex h-8  items-center justify-center rounded-md px-3 text-base font-bold">
                    {userInfo?.data?.mbtiType}
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  {brief.mbtiBrief}
                </p>
              </CardContent>
            </Card>
            <Card className="w-full border-gray-200 dark:border-gray-700">
              <CardContent className="flex flex-col gap-4 p-5">
                <div className="flex flex-row items-center justify-between">
                  <h3 className="text-lg font-medium highlight w-fit highlight-[#C9F77A] highlight-variant-5">
                    Định hướng nghề nghiệp
                  </h3>
                  <div className="bg-primary/40 flex h-8  items-center justify-center rounded-md px-3 text-base font-bold">
                    {userInfo?.data?.hollandType}
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
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
