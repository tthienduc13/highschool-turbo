import { TypeExam, examDescriptions } from "@highschool/interfaces";
import { Button } from "@highschool/ui/components/ui/button";

import { WizardLayout } from "./wizard-layout";

import { useAccountInformationStore } from "@/stores/use-profile-information-store";

export const SelectExamType = () => {
  const {
    currentStep,
    setCurrentStep,
    setSelectedExamTypes,
    selectedExamTypes,
  } = useAccountInformationStore();
  const handleExamTypeSelect = (examType: TypeExam) => {
    const newTypes = selectedExamTypes.includes(examType)
      ? selectedExamTypes.filter((type: TypeExam) => type !== examType)
      : [...selectedExamTypes, examType];

    setSelectedExamTypes(newTypes);
  };

  return (
    <WizardLayout
      currentStep={currentStep}
      description="Hãy chọn loại kì thi mà bạn đang hoặc sẽ quan tâm tới"
      steps={6}
      title="Chọn loại kì thi"
    >
      <div className="flex flex-col gap-6 pt-4">
        <div className="flex flex-row flex-wrap items-center justify-center gap-2">
          {Object.keys(examDescriptions).map((key) => (
            <Button
              key={key}
              className="rounded-full"
              size={"sm"}
              variant={
                selectedExamTypes.includes(key as TypeExam)
                  ? "default"
                  : "outline"
              }
              onClick={() => handleExamTypeSelect(key as TypeExam)}
            >
              {examDescriptions[key as TypeExam]}
            </Button>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-2 md:gap-4">
          <div className="w-full">
            <Button
              className="w-fit"
              variant={"ghost"}
              onClick={() => setCurrentStep(currentStep - 1)}
            >
              Quay lại
            </Button>
          </div>
          <Button
            disabled={selectedExamTypes.length === 0}
            onClick={() => setCurrentStep(currentStep + 1)}
          >
            Tiếp theo
          </Button>
        </div>
      </div>
    </WizardLayout>
  );
};
