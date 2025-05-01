"use client";

import { Button } from "@highschool/ui/components/ui/button";
import { Input } from "@highschool/ui/components/ui/input";
import { School } from "@highschool/interfaces";
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
import { useProvincesQuery } from "@highschool/react-query/queries";
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

import { useTable } from "@/stores/table-context";

interface Props {
  currentRow?: School;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SchoolActionDialog({ currentRow, open, onOpenChange }: Props) {
  const { open: typeOpen } = useTable();
  const title =
    typeOpen === "add"
      ? "Add School"
      : typeOpen === "edit"
        ? "Edit School"
        : "View School";

  // const { mutate: createSchool } = useCreateSchoolMutation();

  const { data: provinces } = useProvincesQuery({
    pageNumber: 1,
    pageSize: 99999,
  });

  const [schoolName, setSchoolName] = useState<string>(
    currentRow?.schoolName ?? "",
  );
  const [regionId, setRegionId] = useState<number>(currentRow?.provinceId ?? 0);

  const clearFields = () => {
    setSchoolName("");
    setRegionId(0);
  };

  const validationFields = () => {
    if (!schoolName && !regionId) {
      return "Please fill all required fields";
    }

    if (schoolName.length < 2) {
      return "Username must be at least 3 characters";
    }

    if (regionId == 0) {
      return "Region is not invalid";
    }

    return "";
  };

  const handleSaveChange = async () => {
    const error = validationFields();

    if (error !== "") {
      toast.error(error);

      return;
    }

    // createSchool([
    //   {
    //     schoolName: schoolName,
    //     provinceId: regionId,
    //   },
    // ]);

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
              School Name <span className="text-primary">(required)</span>
            </Label>
            <div className="relative">
              <Input
                placeholder="School Name"
                type="text"
                value={schoolName}
                onChange={(e) => setSchoolName(e.target.value)}
              />
            </div>
          </div>
          <div>
            <Select defaultValue={regionId.toString()}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select a province" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {provinces?.data?.map((province) => (
                    <SelectItem
                      key={province.provinceId}
                      value={province.provinceId?.toString() ?? ""}
                      onClick={() => setRegionId(province.provinceId ?? 0)}
                    >
                      <SelectLabel>{province.provinceName}</SelectLabel>
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
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
