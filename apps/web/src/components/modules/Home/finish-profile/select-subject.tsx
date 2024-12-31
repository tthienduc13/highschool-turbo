import { useQueryClient } from "@tanstack/react-query";

import { Grade, classNumberMap } from "@highschool/interfaces";
import {
  useCoursesQuery,
  useUpdateBaseUserInfoMutation,
} from "@highschool/react-query/queries";
import { Button } from "@highschool/ui/components/ui/button";

import { IconLoader2 } from "@tabler/icons-react";

import { MultiSelect } from "@/components/ui/multi-select";
import { useAccountInformationStore } from "@/stores/use-profile-information-store";

import { WizardLayout } from "./wizard-layout";

export const convertToClass = (grade: Grade): number => {
  const number = classNumberMap[grade];
  if (number !== undefined) {
    return number;
  }
  throw new Error(`Unhandled class: ${grade}`);
};

export const SelectSubject = () => {
  const queryClient = useQueryClient();
  const {
    currentStep,
    setCurrentStep,
    selectedClass,
    selectedSubjects,
    setSelectedSubjects,
    selectedSchool,
    selectedExamTypes,
    setOpen,
  } = useAccountInformationStore();
  const { data, isLoading } = useCoursesQuery({
    grade: selectedClass!,
    pageNumber: 1,
    pageSize: 100,
  });

  const transformData =
    data?.data.map((course) => ({
      label: course.subjectName,
      value: course.id,
    })) ?? [];

  const updateUser = useUpdateBaseUserInfoMutation();

  const handleDone = () => {
    updateUser.mutate(
      {
        student: {
          grade: convertToClass(selectedClass!),
          subjectIds: selectedSubjects,
          schoolName: selectedSchool!,
          typeExams: selectedExamTypes,
        },
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["progress-stage"] });
          setOpen(false);
        },
      },
    );
  };

  return (
    <WizardLayout
      title="Chọn các môn học "
      description="Hãy chọn đủ 4 môn mà bạn đang chuẩn bị cho kì thi THPTQG"
      steps={5}
      currentStep={currentStep}
    >
      <div className="flex flex-col gap-6 pt-4">
        <MultiSelect
          disabled={isLoading || updateUser.isPending}
          options={transformData}
          onValueChange={setSelectedSubjects}
          defaultValue={selectedSubjects}
          placeholder="Chọn môn học "
          variant="inverted"
          animation={2}
          maxCount={3}
          limit={4}
        />
        <div className="grid grid-cols-2 gap-2 md:gap-4">
          <div className="w-full">
            <Button
              disabled={updateUser.isPending}
              className="w-fit"
              variant={"ghost"}
              onClick={() => setCurrentStep(currentStep - 1)}
            >
              Quay lại
            </Button>
          </div>
          <Button disabled={updateUser.isPending} onClick={handleDone}>
            {updateUser.isPending ? (
              <IconLoader2 className="animate-spin" />
            ) : (
              "Hoàn thành"
            )}
          </Button>
        </div>
      </div>
    </WizardLayout>
  );
};
