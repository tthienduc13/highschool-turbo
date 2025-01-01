"use client";

import { useEffect, useState } from "react";

import { usePathname, useRouter } from "next/navigation";

import { useOrientationStatusQuery } from "@highschool/react-query/queries";
import { Button, buttonVariants } from "@highschool/ui/components/ui/button";
import { Skeleton } from "@highschool/ui/components/ui/skeleton";
import { cn } from "@highschool/ui/lib/utils";

import { IconCircleCheck } from "@tabler/icons-react";

import {
  Credenza,
  CredenzaBody,
  CredenzaClose,
  CredenzaContent,
  CredenzaDescription,
  CredenzaFooter,
  CredenzaTitle,
} from "@/components/ui/credenza";
import { menuEventChannel } from "@/events/menu";

export const CareerGuidanceModal = () => {
  const router = useRouter();
  const pathName = usePathname();

  const [open, setOpen] = useState<boolean>(false);
  const { data, isLoading } = useOrientationStatusQuery(open);
  const testRouters = ["/career-guidance/mbti", "/career-guidance/holland"];

  const isDoneMbti = data?.data?.isMBTIDone;
  const isDoneHolland = data?.data?.isHollandDone;

  const isBothDone = isDoneMbti && isDoneHolland;

  useEffect(() => {
    const handler = () => {
      setOpen(true);
    };

    menuEventChannel.on("openCareerGuidanceModal", handler);
    return () => {
      menuEventChannel.off("openCareerGuidanceModal", handler);
    };
  }, []);

  return (
    <Credenza open={open} onOpenChange={() => setOpen(false)}>
      <CredenzaContent>
        <CredenzaTitle className="text-center text-2xl md:text-start md:text-3xl">
          Hướng nghiệp
        </CredenzaTitle>
        <CredenzaDescription className="text-center md:text-start">
          {isBothDone
            ? "Đã có kết quả hướng nghiệp của bạn"
            : isDoneHolland || isDoneMbti
              ? " Hoàn thành xong bài kiểm tra còn lại, chúng tôi sẽ dễ dàng đưa ra kết quả phù hợp với bạn"
              : " Bằng cách hoàn thành 2 bài kiểm tra dưới đây, chúng tôi có thể giúp bạn chọn được nghề nghiệp phù hợp với bạn"}
        </CredenzaDescription>
        <CredenzaBody className="mt-4">
          {isLoading ? (
            <div className="flex flex-col gap-5 md:flex-row">
              <Skeleton className="h-[150px] w-full" />
              <Skeleton className="h-[150px] w-full" />
            </div>
          ) : isBothDone ? (
            <Button
              onClick={() => {
                router.push("/career-guidance/summary");
                setOpen(false);
              }}
              variant={"outline"}
              className="h-[150px] w-full border-gray-100 shadow-lg dark:border-gray-700"
            >
              <div className="flex flex-col gap-y-2">
                <div className="text-lg font-medium">
                  Đã có kết quả. Chúc mừng bạn 🎉
                </div>
                <div className="text-sm text-gray-500">
                  Bạn đã hoàn thành 2 bài test , hãy xem ngay kết quả về <br />
                  định hướng nghề nghiệp dành riêng cho bạn
                </div>
              </div>
            </Button>
          ) : (
            <div className="flex flex-col gap-5 md:flex-row">
              <div
                onClick={() => {
                  if (!isDoneMbti) {
                    router.push("/career-guidance/mbti");
                    setOpen(false);
                  }
                }}
                className={cn(
                  buttonVariants({ variant: "outline" }),
                  "flex min-h-[150px] w-full cursor-pointer",
                  isDoneMbti
                    ? "relative border-emerald-500 bg-emerald-500/10"
                    : "border-gray-100 shadow-lg dark:border-gray-700",
                )}
              >
                <div className="flex flex-col items-center justify-center gap-y-2">
                  <div className="text-lg font-medium">
                    Bài kiểm tra tính cách
                  </div>
                  <div className="text-center text-sm text-gray-500">
                    Tìm hiểu bản thân và <br /> khám phá những điểm mạnh của bạn
                  </div>
                  {isDoneMbti && (
                    <Button
                      onClick={(e) => {
                        e.stopPropagation();
                        router.push("/career-guidance/mbti");
                        setOpen(false);
                      }}
                    >
                      Làm lại
                    </Button>
                  )}
                </div>
                {isDoneMbti && (
                  <div className="absolute -right-3 -top-4 rounded-full p-1 text-blue-600 dark:text-blue-200">
                    <div className="rounded-full bg-white p-[4px] text-emerald-500 shadow-md dark:bg-gray-800/50">
                      <IconCircleCheck size={24} className="!size-6" />
                    </div>
                  </div>
                )}
              </div>
              <div
                onClick={() => {
                  if (!isDoneHolland) {
                    router.push("/career-guidance/holland");
                    setOpen(false);
                  }
                }}
                className={cn(
                  buttonVariants({ variant: "outline" }),
                  "min-h-[150px] w-full cursor-pointer",
                  isDoneHolland
                    ? "relative border-emerald-500 bg-emerald-500/10"
                    : "border-gray-100 shadow-lg dark:border-gray-700",
                )}
              >
                <div className="flex flex-col items-center justify-center gap-y-2">
                  <div className="text-lg font-medium">
                    Định hướng nghề nghiệp
                  </div>
                  <div className="text-center text-sm text-gray-500">
                    Tìm hiểu bản thân <br /> và khám phá những điểm mạnh của bạn
                  </div>
                  {isDoneHolland && (
                    <Button
                      onClick={(e) => {
                        e.stopPropagation();
                        router.push("/career-guidance/holland");
                        setOpen(false);
                      }}
                    >
                      Làm lại
                    </Button>
                  )}
                </div>
                {isDoneHolland && (
                  <div className="absolute -right-3 -top-4 rounded-full p-1 text-blue-600 dark:text-blue-200">
                    <div className="rounded-full bg-white p-[4px] text-emerald-500 shadow-md dark:bg-gray-800/50">
                      <IconCircleCheck size={24} className="!size-6" />
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </CredenzaBody>
        <CredenzaFooter>
          <CredenzaClose asChild>
            <Button
              onClick={() => {
                if (testRouters.includes(pathName)) {
                  router.replace("/");
                }
              }}
              variant="ghost"
            >
              Huỷ
            </Button>
          </CredenzaClose>
        </CredenzaFooter>
      </CredenzaContent>
    </Credenza>
  );
};
