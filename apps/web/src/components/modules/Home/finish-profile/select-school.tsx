import { Button } from "@highschool/ui/components/ui/button";
import { WizardLayout } from "./wizard-layout";
import { ICity } from "@/components/core/common/account-information-modal";
import { useCitySchoolQuery } from "@highschool/react-query/queries";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@highschool/ui/components/ui/select";
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
      title="Chọn trường của bạn"
      description=""
      steps={5}
      currentStep={currentStep}
    >
      <div className="flex flex-col gap-6 ">
        <Select
          disabled={schoolLoading}
          value={selectedSchool ?? ""}
          onValueChange={(school) => {
            setSelectedSchool(school);
          }}
        >
          <SelectTrigger className="h-12 w-full rounded-lg border-2 bg-background text-left text-lg font-bold">
            <SelectValue placeholder={"Bạn học trường nào?"} className="px-4" />
          </SelectTrigger>
          <SelectContent
            onCloseAutoFocus={(e) => e.preventDefault()}
            className="placeholder:text-muted-foreground"
          >
            {schoolData?.data.map((school) => (
              <SelectItem key={school.id} value={school.schoolName}>
                {school.schoolName}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <div className="grid grid-cols-2 md:gap-4 gap-2">
          <div className="w-full ">
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
