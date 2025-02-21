import { useQueryClient } from "@tanstack/react-query";
import { Grade, classNumberMap } from "@highschool/interfaces";
import {
  useCoursesQuery,
  useUpdateBaseUserInfoMutation,
} from "@highschool/react-query/queries";
import { Button } from "@highschool/ui/components/ui/button";
import { IconLoader2 } from "@tabler/icons-react";

import { WizardLayout } from "./wizard-layout";

import { MultiSelect } from "@/components/ui/multi-select";
import { useAccountInformationStore } from "@/stores/use-profile-information-store";

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
    selectedCity,
    selectedClass,
    selectedSubjects,
    setSelectedSubjects,
    selectedSchool,
    selectedExamTypes,
    setOpen,
    selectedDob,
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
    const dateObj = new Date(selectedDob!);

    // Format date in local time without timezone conversion
    const formattedDate =
      dateObj.getFullYear() +
      "-" +
      String(dateObj.getMonth() + 1).padStart(2, "0") +
      "-" +
      String(dateObj.getDate()).padStart(2, "0");

    updateUser.mutate(
      {
        address: selectedCity.name!,
        birthdate: formattedDate.toString(),
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
      currentStep={currentStep}
      description="Hãy chọn đủ 4 môn mà bạn đang chuẩn bị cho kì thi THPTQG"
      steps={6}
      title="Chọn các môn học "
    >
      <div className="flex flex-col gap-6 pt-4">
        <MultiSelect
          animation={2}
          defaultValue={selectedSubjects}
          disabled={isLoading || updateUser.isPending}
          limit={4}
          maxCount={3}
          options={transformData}
          placeholder="Chọn môn học "
          variant="inverted"
          onValueChange={setSelectedSubjects}
        />
        <div className="grid grid-cols-2 gap-2 md:gap-4">
          <div className="w-full">
            <Button
              className="w-fit"
              disabled={updateUser.isPending}
              variant={"ghost"}
              onClick={() => setCurrentStep(currentStep - 1)}
            >
              Quay lại
            </Button>
          </div>
          <Button
            disabled={updateUser.isPending || selectedSubjects?.length! < 4}
            onClick={handleDone}
          >
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
