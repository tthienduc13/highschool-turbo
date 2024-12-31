"use client";

import { SegmentedProgress } from "@/components/core/common/onboard/segmented-progress";
import { menuEventChannel } from "@/events/menu";
import { useMe } from "@/hooks/use-me";
import { useIsTeacher } from "@/hooks/use-role";
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
import { useSession } from "next-auth/react";
import { useEffect } from "react";

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
      <div className="p-4 flex flex-col  bg-background dark:bg-gray-800 border-gray-100 rounded-3xl border-2 shadow-lg dark:border-gray-700">
        {isTeacher ? (
          <h2 className="text-xl font-medium px-4 py-2">
            Xin chào! Điền thông tin để có thêm quyền truy cập
          </h2>
        ) : (
          <h2 className="text-xl font-medium px-4 py-2">
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
                className="w-full h-full md:!text-base justify-start whitespace-pre-wrap"
                variant={"ghost"}
                onClick={() => {
                  menuEventChannel.emit("openTeacherInformationModal");
                }}
              >
                <div className="flex flex-col gap-1 text-left">
                  <div className="flex flex-row items-center gap-2">
                    <IconUser className="!size-[18px] mb-1" />
                    Thông tin cá nhân
                  </div>
                  <p className="text-xs md:text-sm text-muted-foreground">
                    Hãy hoàn thiện thông tin cá nhân để được xác thực 🚀
                  </p>
                </div>
              </Button>
            ) : (
              <Button
                className="w-full h-full md:!text-base justify-start whitespace-pre-wrap"
                variant={"ghost"}
                onClick={() => {
                  menuEventChannel.emit("openInformationModal");
                }}
              >
                <div className="flex flex-col gap-1 text-left">
                  <div className="flex flex-row items-center gap-2">
                    <IconUser className="!size-[18px] mb-1" />
                    Thông tin cá nhân
                  </div>
                  <p className=" text-xs md:text-sm text-muted-foreground">
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
              className="w-full h-full md:!text-base justify-start whitespace-pre-wrap"
              variant={"ghost"}
              onClick={() => {
                menuEventChannel.emit("openCareerGuidanceModal");
              }}
            >
              <div className="flex flex-col gap-1 text-left">
                <div className="flex flex-row items-center gap-2">
                  <IconArrowMergeAltLeft className="!size-[18px] mb-1" />
                  Hướng nghiệp
                </div>
                <p className="text-xs md:text-sm text-muted-foreground">
                  Hoàn thành 2 bài kiểm tra MBTI và Holland để tìm ra công việc
                  phù hợp🚀
                </p>
              </div>
            </Button>
          )}
        {isTeacher && data?.data === TeacherProgressState.VerifyTeacher && (
          <Button
            className="w-full h-full md:!text-base justify-start whitespace-pre-wrap"
            variant={"ghost"}
            onClick={() => {
              menuEventChannel.emit("openCareerGuidanceModal");
            }}
          >
            <div className="flex flex-col gap-1 text-left">
              <div className="flex flex-row items-center gap-2">
                <IconCircleCheck className="!size-[18px] mb-1" />
                Xác thực người dùng
              </div>
              <p className="text-xs md:text-sm text-muted-foreground">
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
