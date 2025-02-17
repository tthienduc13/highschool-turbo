import { DatePicker } from "@highschool/components";
import { Button } from "@highschool/ui/components/ui/button";

import { WizardLayout } from "./wizard-layout";

import { useAccountInformationStore } from "@/stores/use-profile-information-store";

export const SelectDob = () => {
  const { currentStep, setCurrentStep, selectedDob, setSelectedDob } =
    useAccountInformationStore();

  return (
    <WizardLayout
      currentStep={currentStep}
      description=""
      steps={6}
      title="Ngày sinh của bạn"
    >
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <DatePicker
            selectedDate={selectedDob!}
            setSelectedDate={setSelectedDob}
          />
        </div>
        <div className="grid grid-cols-2 gap-2 md:gap-4">
          <div className="w-full" />
          <Button
            disabled={!selectedDob}
            onClick={() => setCurrentStep(currentStep + 1)}
          >
            Tiếp theo
          </Button>
        </div>
      </div>
    </WizardLayout>
  );
};
