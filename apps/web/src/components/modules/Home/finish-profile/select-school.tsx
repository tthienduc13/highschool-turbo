import { useCitySchoolQuery } from "@highschool/react-query/queries";
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

export const SelectSchool = () => {
  const {
    selectedCity,
    selectedSchool,
    setSelectedSchool,
    currentStep,
    setCurrentStep,
  } = useAccountInformationStore();
  const { data: schoolData, isLoading: schoolLoading } = useCitySchoolQuery({
    cityId: selectedCity.id!,
    pageNumber: 1,
    pageSize: 100,
  });

  return (
    <WizardLayout
      currentStep={currentStep}
      description=""
      steps={6}
      title="Chọn trường của bạn"
    >
      <div className="flex flex-col gap-6">
        <Select
          disabled={schoolLoading}
          value={selectedSchool ?? ""}
          onValueChange={(school) => {
            setSelectedSchool(school);
          }}
        >
          <SelectTrigger className="h-12 w-full rounded-lg border-2 border-gray-200 bg-background text-left text-lg font-bold dark:border-gray-800">
            <SelectValue className="px-4" placeholder={"Bạn học trường nào?"} />
          </SelectTrigger>
          <SelectContent
            className="placeholder:text-muted-foreground"
            onCloseAutoFocus={(e) => e.preventDefault()}
          >
            {schoolData?.data.map((school) => (
              <SelectItem key={school.id} value={school.schoolName}>
                {school.schoolName}
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
            disabled={!selectedSchool}
            onClick={() => setCurrentStep(currentStep + 1)}
          >
            Tiếp theo
          </Button>
        </div>
      </div>
    </WizardLayout>
  );
};
