import { useQueryClient } from "@tanstack/react-query";
import { Grade, classNumberMap } from "@highschool/interfaces";
import {
  useCoursesQuery,
  useCurriculumQuery,
  useUpdateBaseUserInfoMutation,
} from "@highschool/react-query/queries";
import { Button } from "@highschool/ui/components/ui/button";
import { IconLoader2 } from "@tabler/icons-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@highschool/ui/components/ui/select";
import { toast } from "sonner";
import { useSession } from "next-auth/react";

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
  const { data: session, update } = useSession();

  const {
    currentStep,
    setCurrentStep,
    selectedCity,
    selectedClass,
    selectedCurriculum,
    setSelectedCurriculum,
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

  const { data: curriculumData, isLoading: curriculumLoading } =
    useCurriculumQuery();

  const transformData =
    data?.data.map((course) => ({
      label: course.subjectName,
      value: course.id,
    })) ?? [];

  const updateUser = useUpdateBaseUserInfoMutation();

  const handleDone = () => {
    updateUser.mutate(
      {
        address: selectedCity.name!,
        birthdate: selectedDob!,
        student: {
          grade: convertToClass(selectedClass!),
          subjectIds: selectedSubjects,
          schoolName: selectedSchool!,
          typeExams: selectedExamTypes,
          curriculumId: selectedCurriculum!,
        },
      },
      {
        onSuccess: async (data) => {
          await update({
            ...session,
            user: {
              ...session?.user,
              curriculumId: selectedCurriculum,
            },
          });
          queryClient.invalidateQueries({ queryKey: ["progress-stage"] });
          toast.success(data.message);
          setOpen(false);
        },
        onError: (error) => {
          toast.error(error.message);
        },
      },
    );
  };

  return (
    <WizardLayout
      currentStep={currentStep}
      description="Hãy chọn đủ 4 môn mà bạn đang chuẩn bị cho kì thi THPTQG và chương trình học của bạn"
      steps={6}
      title="Chọn các môn học "
    >
      <div className="flex flex-col gap-6 pt-4">
        <Select
          disabled={curriculumLoading}
          value={selectedCurriculum ?? ""}
          onValueChange={(curriculum) => {
            setSelectedCurriculum(curriculum);
          }}
        >
          <SelectTrigger className="bg-background h-12 w-full rounded-lg border-2 border-gray-200 text-left text-lg font-bold dark:border-gray-800">
            <SelectValue
              className="px-4"
              placeholder={"Bạn học bộ sách nào?"}
            />
          </SelectTrigger>
          <SelectContent
            className="placeholder:text-muted-foreground"
            onCloseAutoFocus={(e) => e.preventDefault()}
          >
            {curriculumData?.map((curriculum) => (
              <SelectItem key={curriculum.id} value={curriculum.id}>
                {curriculum.curriculumName}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
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
