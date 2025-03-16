import { Grade, classDescriptions } from "@highschool/interfaces";
import { Button } from "@highschool/ui/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@highschool/ui/components/ui/select";

import { WizardLayout } from "./wizard-layout";

import { useAccountInformationStore } from "@/stores/use-profile-information-store";

export const SelectClass = () => {
  const { currentStep, setCurrentStep, selectedClass, setSelectedClass } =
    useAccountInformationStore();

  return (
    <WizardLayout
      currentStep={currentStep}
      description=""
      steps={6}
      title="Chọn lớp của bạn"
    >
      <div className="flex flex-col gap-6">
        <Select
          value={selectedClass ?? ""}
          onValueChange={(grade) => {
            setSelectedClass(grade as Grade);
          }}
        >
          <SelectTrigger className="h-12 w-full rounded-lg border-2 border-gray-200 bg-background text-left text-lg font-bold dark:border-gray-800">
            <SelectValue className="px-4" placeholder={"Bạn học lớp mấy?"} />
          </SelectTrigger>
          <SelectContent
            className="placeholder:text-muted-foreground"
            onCloseAutoFocus={(e) => e.preventDefault()}
          >
            {Object.values(Grade).map((grade) => (
              <SelectItem key={grade} value={grade}>
                {classDescriptions[grade as Grade]}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
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
            disabled={!selectedClass}
            onClick={() => setCurrentStep(currentStep + 1)}
          >
            Tiếp theo
          </Button>
        </div>
      </div>
    </WizardLayout>
  );
};
