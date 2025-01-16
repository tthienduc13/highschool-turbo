import { Modal } from "@highschool/components/modal";
import { UniversityCity } from "@highschool/interfaces";
import { Button } from "@highschool/ui/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@highschool/ui/components/ui/select";
import { Separator } from "@highschool/ui/components/ui/separator";

import { IconLocation, IconMoneybag } from "@tabler/icons-react";

import { FilterState } from "./university-section";

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  updateFilterState: (key: keyof FilterState, value: any) => void;
  filterState: FilterState;
  clearFilter: () => void;
}

export const FilterModal = ({
  isOpen,
  onClose,
  filterState,
  updateFilterState,
  clearFilter,
}: FilterModalProps) => {
  console.log(filterState);
  return (
    <Modal isOpen={isOpen} onClose={onClose} withoutFooter title="Bộ lọc">
      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-3 items-center">
          <div className="flex flex-row items-center gap-2">
            <IconLocation size={18} />
            <h2 className="text-lg font-medium">Vị trí</h2>
          </div>
          <Select
            value={filterState.city ?? ""}
            onValueChange={(city) => {
              updateFilterState("city", city as UniversityCity);
            }}
          >
            <SelectTrigger className="col-span-2">
              <SelectValue
                placeholder={"Bạn muốn học ở đâu?"}
                className="px-4"
              />
            </SelectTrigger>
            <SelectContent
              onCloseAutoFocus={(e) => e.preventDefault()}
              className="placeholder:text-muted-foreground"
            >
              {Object.values(UniversityCity).map((city) => (
                <SelectItem key={city} value={city}>
                  {cityRender(city)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Separator />
        <div className="grid grid-cols-3 items-center">
          <div className="flex flex-row items-center gap-2">
            <IconMoneybag size={18} />
            <h2 className="text-lg font-medium">Học phí</h2>
          </div>
          {/* <Select
            value={filterState.city ?? ""}
            onValueChange={(city) => {
              updateFilterState("city", city as UniversityCity);
            }}
          >
            <SelectTrigger className="col-span-2">
              <SelectValue
                placeholder={"Bạn muốn học ở đâu?"}
                className="px-4"
              />
            </SelectTrigger>
            <SelectContent
              onCloseAutoFocus={(e) => e.preventDefault()}
              className="placeholder:text-muted-foreground"
            >
              {Object.values(UniversityCity).map((city) => (
                <SelectItem key={city} value={city}>
                  {cityRender(city)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select> */}
        </div>

        <div className="mt-4 flex w-full justify-end">
          <Button
            variant={"destructive"}
            onClick={() => {
              clearFilter();
              onClose();
            }}
          >
            Xoá bộ lọc
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export const cityRender = (city: UniversityCity) => {
  switch (city) {
    case UniversityCity.HaNoi:
      return "Hà Nội";
    case UniversityCity.DaNang:
      return "Đà Nẵng";
    case UniversityCity.QuyNhon:
      return "Quy Nhơn";
    case UniversityCity.TpHCM:
      return "Thành phố Hồ Chí Minh";
    case UniversityCity.CanTho:
      return "Cần Thơ";
    default:
      return "Không xác định"; // Fallback for unknown values
  }
};
