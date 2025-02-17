import { useCitiesQuery } from "@highschool/react-query/queries";
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

export const SelectCity = () => {
  const { data: cityData, isLoading: cityLoading } = useCitiesQuery({
    pageSize: 63,
    pageNumber: 1,
  });

  const { currentStep, setCurrentStep, selectedCity, setSelectedCity } =
    useAccountInformationStore();

  return (
    <WizardLayout
      currentStep={currentStep}
      description="Hãy chọn thành phố của bạn để có được thông tin chính xác theo vị trí"
      steps={6}
      title="Chọn thành phố bạn sống"
    >
      <div className="flex flex-col gap-6">
        <Select
          disabled={cityLoading}
          value={selectedCity.id ? String(selectedCity.id) : ""}
          onValueChange={(id) => {
            const selectedRegion = cityData?.data.find(
              (city) => String(city.provinceId) === id,
            );

            setSelectedCity({
              name: selectedRegion?.provinceName ?? null,
              id: selectedRegion?.provinceId ?? null,
            });
          }}
        >
          <SelectTrigger className="bg-background h-12 w-full rounded-lg border-2 border-gray-200 text-left text-lg font-bold dark:border-gray-800">
            <SelectValue className="px-4" placeholder={"Bạn ở đâu?"} />
          </SelectTrigger>
          <SelectContent
            className="placeholder:text-muted-foreground"
            onCloseAutoFocus={(e) => e.preventDefault()}
          >
            {cityData?.data.map((region) => (
              <SelectItem
                key={region.provinceId}
                value={String(region.provinceId)}
              >
                {region.provinceName}
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
            disabled={!selectedCity.id}
            onClick={() => setCurrentStep(currentStep + 1)}
          >
            Tiếp theo
          </Button>
        </div>
      </div>
    </WizardLayout>
  );
};
