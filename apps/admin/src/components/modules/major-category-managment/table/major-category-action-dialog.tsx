"use client";

import { Button } from "@highschool/ui/components/ui/button";
import { Input } from "@highschool/ui/components/ui/input";
import { MajorCategory } from "@highschool/interfaces";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@highschool/ui/components/ui/sheet";
import { Label } from "@highschool/ui/components/ui/label";
import { useState } from "react";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@highschool/ui/components/ui/select";
import {
  useCreateMajorCategoryMutation,
  useUpdateMajorCategoryMutation,
} from "@highschool/react-query/queries";

import { useTable } from "@/stores/table-context";
import { getRandomHexColor } from "@/lib/utils";
import { FancyBox, FancyBoxType } from "@/components/ui/fancy-box";
import {
  HollandTrait,
  MBTIType,
} from "@/domain/constants/career-mentor-constant";

interface Props {
  currentRow?: MajorCategory;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function MajorCategoryActionDialog({
  currentRow,
  open,
  onOpenChange,
}: Props) {
  const { open: typeOpen } = useTable();
  const title =
    typeOpen === "add"
      ? "Add Major"
      : typeOpen === "edit"
        ? "Edit Major"
        : "View Major";
  const majorCategory = currentRow;

  const [mbtiTypes, setMBTITypes] = useState<FancyBoxType[]>(
    majorCategory?.mbtiTypes.map((mbti) => {
      return {
        label: mbti,
        value: mbti,
        color: getRandomHexColor(),
      };
    }) ?? [],
  );

  const [majorCategoryCode, setMajorCategoryCode] = useState<string>(
    majorCategory?.majorCategoryCode ?? "",
  );
  const [name, setName] = useState<string>(majorCategory?.name ?? "");
  const [primaryHollandTrait, setPrimaryHollandTrait] = useState<string>(
    majorCategory?.primaryHollandTrait ?? HollandTrait.Social,
  );
  const [secondaryHollandTrait, setSecondaryHollandTrait] = useState<string>(
    majorCategory?.secondaryHollandTrait ?? HollandTrait.Realistic,
  );

  console.log("pr: ", primaryHollandTrait);
  console.log("sr: ", secondaryHollandTrait);

  const { mutateAsync: createMajorCategory } = useCreateMajorCategoryMutation();
  const { mutateAsync: updateMajorCategory } = useUpdateMajorCategoryMutation();

  const clearFields = () => {
    setMajorCategoryCode("");
    setName("");
    setPrimaryHollandTrait("");
    setSecondaryHollandTrait("");
    setMBTITypes([]);
  };

  const validationFields = () => {
    if (
      !majorCategoryCode ||
      !name ||
      mbtiTypes.length === 0 ||
      !primaryHollandTrait ||
      !secondaryHollandTrait
    ) {
      return "Please fill all required fields";
    }

    if (name.length < 3) {
      return "Major Category Name must be at least 3 characters";
    }

    return "";
  };

  const handleSaveChange = async () => {
    const error = validationFields();

    if (error !== "") {
      toast.error(error);

      return;
    }

    if (typeOpen === "add") {
      await createMajorCategory({
        majorCategories: [
          {
            majorCategoryCode,
            name,
            mbtiTypes: mbtiTypes.map((mbti) => mbti.value),
            primaryHollandTrait,
            secondaryHollandTrait,
          },
        ],
      });
    } else if (typeOpen === "edit") {
      await updateMajorCategory({
        majorCategory: {
          id: majorCategory?.id,
          majorCategoryCode,
          name,
          mbtiTypes: mbtiTypes.map((mbti) => mbti.value),
          primaryHollandTrait,
          secondaryHollandTrait,
        },
      });
    }

    clearFields();
    onOpenChange(false);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="overflow-y-auto">
        <SheetHeader>
          <SheetTitle>{title}</SheetTitle>
          <SheetDescription>
            Make changes to your profile here. Click save when you&apos;re done.
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 overflow-y-auto py-4">
          <div>
            <Label className="text-sm font-semibold">
              Major Category Code{" "}
              <span className="text-primary">(required)</span>
            </Label>
            <Input
              placeholder="Major Category Code"
              type="text"
              value={majorCategoryCode}
              onChange={(e) => setMajorCategoryCode(e.target.value)}
            />
          </div>
          <div>
            <Label className="text-sm font-semibold">
              Name <span className="text-primary">(required)</span>
            </Label>
            <Input
              placeholder="Name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <Label className="text-sm font-semibold">
              MBTI Types <span className="text-primary">(required)</span>
            </Label>
            <FancyBox
              items={Object.values(MBTIType).map((value) => ({
                label: value, // You can customize the label as needed
                value,
                color: getRandomHexColor(),
              }))}
              selectedValues={mbtiTypes}
              setSelectedValues={setMBTITypes}
            />
          </div>
          <div className="flex gap-4">
            <div className="flex flex-col gap-2">
              <Label className="text-sm font-semibold">
                Primary Holland Trait{" "}
                <span className="text-primary">(required)</span>
              </Label>
              <Select
                value={primaryHollandTrait}
                onValueChange={setPrimaryHollandTrait}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a province" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {Object.values(HollandTrait).map((hollandTrait) => (
                      <SelectItem
                        key={`${hollandTrait}-pr`}
                        value={hollandTrait}
                      >
                        <SelectLabel>{hollandTrait}</SelectLabel>
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-2">
              <Label className="text-sm font-semibold">
                Secondary Holland Trait{" "}
                <span className="text-primary">(required)</span>
              </Label>
              <Select
                value={secondaryHollandTrait}
                onValueChange={setSecondaryHollandTrait}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a province" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {Object.values(HollandTrait).map((hollandTrait) => (
                      <SelectItem
                        key={`${hollandTrait}-sr`}
                        value={hollandTrait}
                      >
                        <SelectLabel>{hollandTrait}</SelectLabel>
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        <SheetFooter>
          <Button type="submit" onClick={handleSaveChange}>
            Save changes
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
