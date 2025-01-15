import { DatePicker } from "@highschool/components";
import { Button } from "@highschool/ui/components/ui/button";

import { useAccountInformationStore } from "@/stores/use-profile-information-store";

import { WizardLayout } from "./wizard-layout";

export const SelectDob = () => {
  const { currentStep, setCurrentStep, selectedDob, setSelectedDob } =
    useAccountInformationStore();

  return (
    <WizardLayout
      title="Ngày sinh của bạn"
      description=""
      steps={6}
      currentStep={currentStep}
    >
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <DatePicker
            selectedDate={selectedDob!}
            setSelectedDate={setSelectedDob}
          />
        </div>
        <div className="grid grid-cols-2 gap-2 md:gap-4">
          <div className="w-full"></div>
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
