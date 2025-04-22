import { useSession } from "next-auth/react";
import { University } from "@highschool/interfaces";
import { CareerGuidanceBrief } from "@highschool/react-query/apis";
import { useUserProfileQuery } from "@highschool/react-query/queries";
import { Avatar, AvatarImage } from "@highschool/ui/components/ui/avatar";
import { Button } from "@highschool/ui/components/ui/button";
import { Card, CardContent } from "@highschool/ui/components/ui/card";
import { IconBuilding, IconDownload } from "@tabler/icons-react";

import { useMe } from "@/hooks/use-me";

interface ProfileSectionProps {
  brief: CareerGuidanceBrief;
  savedUniversity: University[];
  onViewSaved: () => void;
}

export const ProfileSection = ({
  brief,
  savedUniversity,
  onViewSaved,
}: ProfileSectionProps) => {
  const me = useMe();
  const { status } = useSession();
  const { data: userInfo } = useUserProfileQuery({
    username: me?.username!,
    status: status,
  });

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col-reverse justify-between gap-4 md:flex-row md:items-center">
        <h1 className="group relative w-fit cursor-pointer text-3xl font-bold md:text-4xl">
          Hiểu mình
          <div className="bg-primary absolute bottom-0 left-0 h-1 w-1/2 transition-all duration-200 group-hover:w-full" />
        </h1>
        <div className="flex flex-row items-center gap-2">
          <Button onClick={() => window.print()}>
            <IconDownload className="!size-5" />
            Tải xuống bản PDF
          </Button>
          {savedUniversity.length > 0 && (
            <Button variant={"outline"} onClick={onViewSaved}>
              <IconBuilding className="!size-5" />
              Xem trường đã lưu
            </Button>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-6 md:px-4">
        <div className="flex flex-col gap-10 md:flex-row md:items-start">
          <Avatar className="-z-10 size-16 md:size-24">
            <AvatarImage
              alt={me?.fullname ?? "Người dùng Highschool"}
              src={me?.image ?? "/logo.svg"}
            />
          </Avatar>
          <div className="flex w-full flex-col gap-4 rounded-xl border-2 border-gray-200 bg-white p-5 dark:border-gray-700 dark:bg-gray-800">
            <h2 className="text-3xl font-semibold">Thông tin cá nhân</h2>
            <div className="grid w-full grid-cols-1 items-center gap-2 font-medium md:grid-cols-2 md:text-lg">
              <div className="flex flex-row items-center gap-2">
                Họ và tên: {userInfo?.data?.fullname}
              </div>
              <div className="flex flex-row items-center gap-2">
                Email: {userInfo?.data?.email}
              </div>
              <div className="flex flex-row items-center gap-2">
                Ngày sinh:{" "}
                {userInfo?.data?.birthdate &&
                  new Date(userInfo?.data?.birthdate).toLocaleDateString(
                    "vi-VN",
                  )}
              </div>
              <div className="flex flex-row items-center gap-2">
                Trường: {userInfo?.data?.schoolName}
              </div>
              <div className="flex flex-row items-center gap-2">
                Thành phố: {userInfo?.data?.address}
              </div>
              <div className="flex flex-row items-center gap-2">
                Lớp: {userInfo?.data?.grade}
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold md:text-2xl">
            Tóm tắt từ kết quả
          </h2>
          <div className="flex flex-col items-center justify-center gap-4">
            <div className="grid w-full grid-cols-1 items-stretch gap-4 md:grid-cols-2">
              <Card className="w-full border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
                <CardContent className="flex flex-col gap-4 p-5">
                  <div className="flex flex-row items-center justify-between">
                    <h3 className="highlight highlight-[#C9F77A] highlight-variant-5 w-fit text-lg font-medium">
                      Kiểm tra tính cách (MBTI)
                    </h3>
                    <div className="bg-primary/40 flex h-8 items-center justify-center rounded-md px-3 text-base font-bold">
                      {brief.mbtiResponse.mbtiType}
                    </div>
                  </div>
                  <div className="flex flex-col gap-1 pl-4">
                    {brief.mbtiResponse.mbtiSummary.map((item, index) => (
                      <p key={index} className="list-item text-gray-700">
                        {item}
                      </p>
                    ))}
                  </div>
                </CardContent>
              </Card>
              <Card className="w-full border-gray-200 dark:border-gray-700 dark:bg-gray-800">
                <CardContent className="flex flex-col gap-4 p-5">
                  <div className="flex flex-row items-center justify-between">
                    <h3 className="highlight highlight-[#C9F77A] highlight-variant-5 w-fit text-lg font-medium">
                      Định hướng nghề nghiệp (Holland)
                    </h3>
                    <div className="bg-primary/40 flex h-8 items-center justify-center rounded-md px-3 text-base font-bold">
                      {brief.hollandResponse.hollandType}
                    </div>
                  </div>
                  <div className="flex flex-col gap-1 pl-4">
                    {brief.hollandResponse.hollandSummary.map((item, index) => (
                      <p key={index} className="list-item text-gray-700">
                        {item}
                      </p>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
            <Card className="w-full border-gray-200 dark:border-gray-700 dark:bg-gray-800">
              <CardContent className="flex flex-col gap-4 p-5">
                <div className="flex flex-row items-center justify-between">
                  <h3 className="highlight highlight-[#C9F77A] highlight-variant-5 w-fit text-xl font-bold">
                    Về bạn
                  </h3>
                </div>
                <div className="flex flex-col gap-1 pl-4">
                  {brief.overallResponse.overallBrief.map((item, index) => (
                    <p key={index} className="list-item text-gray-700">
                      {item}
                    </p>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>{" "}
    </div>
  );
};
