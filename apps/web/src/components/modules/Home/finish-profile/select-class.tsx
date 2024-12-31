import { Grade, classDescriptions } from "@highschool/interfaces";
import { Button } from "@highschool/ui/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@highschool/ui/components/ui/select";

import { useAccountInformationStore } from "@/stores/use-profile-information-store";

import { WizardLayout } from "./wizard-layout";

export const SelectClass = () => {
  const { currentStep, setCurrentStep, selectedClass, setSelectedClass } =
    useAccountInformationStore();
  return (
    <WizardLayout
      title="Chọn lớp của bạn"
      description=""
      steps={5}
      currentStep={currentStep}
    >
      <div className="flex flex-col gap-6 pt-4">
        <Select
          value={selectedClass ?? ""}
          onValueChange={(grade) => {
            setSelectedClass(grade as Grade);
          }}
        >
          <SelectTrigger className="bg-background h-12 w-full rounded-lg border-2 text-left text-lg font-bold">
            <SelectValue placeholder={"Bạn học lớp mấy?"} className="px-4" />
          </SelectTrigger>
          <SelectContent
            onCloseAutoFocus={(e) => e.preventDefault()}
            className="placeholder:text-muted-foreground"
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
