"use client";

import { useSession } from "next-auth/react";

import { useEffect } from "react";

import {
  StudentProgressState,
  TeacherProgressState,
} from "@highschool/interfaces";
import { useProgressStageQuery } from "@highschool/react-query/queries";
import { Button } from "@highschool/ui/components/ui/button";

import {
  IconArrowMergeAltLeft,
  IconCircleCheck,
  IconUser,
} from "@tabler/icons-react";

import { SegmentedProgress } from "@/components/core/common/onboard/segmented-progress";
import { menuEventChannel } from "@/events/menu";
import { useMe } from "@/hooks/use-me";
import { useIsTeacher } from "@/hooks/use-role";

export const FinishProfile = () => {
  const me = useMe();
  const { data: session, update } = useSession();
  const { data, isLoading, isSuccess } = useProgressStageQuery();

  const isTeacher = useIsTeacher();
  const progressEnum = isTeacher ? TeacherProgressState : StudentProgressState;

  const currentStep = Object.values(progressEnum).indexOf(data?.data);
  const totalSteps = Object.keys(progressEnum).length;

  useEffect(() => {
    if (isSuccess) {
      const handleUpdate = async () => {
        await update({
          ...session,
          user: {
            ...session?.user,
            progressStage: data.data,
          },
        });
      };
      if (me?.progressStage !== data.data) {
        handleUpdate();
      }
    }
  }, [isSuccess]);

  if (isLoading) return;

  if (
    data?.data === String(StudentProgressState.Completion) ||
    data?.data === String(TeacherProgressState.Completion)
  ) {
    return null;
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="bg-background flex flex-col rounded-3xl border-2 border-gray-100 p-4 shadow-lg dark:border-gray-700 dark:bg-gray-800">
        {isTeacher ? (
          <h2 className="px-4 py-2 text-xl font-medium">
            Xin chào! Điền thông tin để có thêm quyền truy cập
          </h2>
        ) : (
          <h2 className="px-4 py-2 text-xl font-medium">
            Xin chào! Cùng hoàn thiện thông tin cá nhân để nhận quà nhé
          </h2>
        )}
        <div className="px-4">
          <SegmentedProgress currentStep={currentStep} steps={totalSteps} />
        </div>
        {data?.data === progressEnum.SubjectInformation && (
          <>
            {isTeacher ? (
              <Button
                className="h-full w-full justify-start whitespace-pre-wrap md:!text-base"
                variant={"ghost"}
                onClick={() => {
                  menuEventChannel.emit("openTeacherInformationModal");
                }}
              >
                <div className="flex flex-col gap-1 text-left">
                  <div className="flex flex-row items-center gap-2">
                    <IconUser className="mb-1 !size-[18px]" />
                    Thông tin cá nhân
                  </div>
                  <p className="text-muted-foreground text-xs md:text-sm">
                    Hãy hoàn thiện thông tin cá nhân để được xác thực 🚀
                  </p>
                </div>
              </Button>
            ) : (
              <Button
                className="h-full w-full justify-start whitespace-pre-wrap md:!text-base"
                variant={"ghost"}
                onClick={() => {
                  menuEventChannel.emit("openInformationModal");
                }}
              >
                <div className="flex flex-col gap-1 text-left">
                  <div className="flex flex-row items-center gap-2">
                    <IconUser className="mb-1 !size-[18px]" />
                    Thông tin cá nhân
                  </div>
                  <p className="text-muted-foreground text-xs md:text-sm">
                    Thêm vào thông tin trường, lớp để được gợi ý học tập tốt
                    nhất 🚀
                  </p>
                </div>
              </Button>
            )}
          </>
        )}

        {!isTeacher &&
          data?.data === StudentProgressState.PersonalityAssessment && (
            <Button
              className="h-full w-full justify-start whitespace-pre-wrap md:!text-base"
              variant={"ghost"}
              onClick={() => {
                menuEventChannel.emit("openCareerGuidanceModal");
              }}
            >
              <div className="flex flex-col gap-1 text-left">
                <div className="flex flex-row items-center gap-2">
                  <IconArrowMergeAltLeft className="mb-1 !size-[18px]" />
                  Hướng nghiệp
                </div>
                <p className="text-muted-foreground text-xs md:text-sm">
                  Hoàn thành 2 bài kiểm tra MBTI và Holland để tìm ra công việc
                  phù hợp🚀
                </p>
              </div>
            </Button>
          )}
        {isTeacher && data?.data === TeacherProgressState.VerifyTeacher && (
          <Button
            className="h-full w-full justify-start whitespace-pre-wrap md:!text-base"
            variant={"ghost"}
            onClick={() => {
              menuEventChannel.emit("openCareerGuidanceModal");
            }}
          >
            <div className="flex flex-col gap-1 text-left">
              <div className="flex flex-row items-center gap-2">
                <IconCircleCheck className="mb-1 !size-[18px]" />
                Xác thực người dùng
              </div>
              <p className="text-muted-foreground text-xs md:text-sm">
                Kết quả của bạn đang được quản trị viên xác thực, vui lòng chờ
                📍
              </p>
            </div>
          </Button>
        )}
      </div>
    </div>
  );
};
