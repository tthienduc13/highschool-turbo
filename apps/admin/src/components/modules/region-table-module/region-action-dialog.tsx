"use client";

import { Button } from "@highschool/ui/components/ui/button";
import { Input } from "@highschool/ui/components/ui/input";
import { City } from "@highschool/interfaces";
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
import { useCreateProvincesMutation } from "@highschool/react-query/queries";
import { toast } from "sonner";

import { useTable } from "@/stores/table-context";

interface Props {
  currentRow?: City;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function RegionActionDialog({ currentRow, open, onOpenChange }: Props) {
  const { open: typeOpen } = useTable();
  const title =
    typeOpen === "add"
      ? "Add Province"
      : typeOpen === "edit"
        ? "Edit Province"
        : "View Province";

  const { mutate: createProvinces } = useCreateProvincesMutation();

  const [provinceName, setProvinceName] = useState<string>(
    currentRow?.provinceName ?? "",
  );

  const clearFields = () => {
    setProvinceName("");
  };

  const validationFields = () => {
    if (!provinceName) {
      return "Please fill all required fields";
    }

    if (provinceName.length < 2) {
      return "Username must be at least 3 characters";
    }

    return "";
  };

  const handleSaveChange = async () => {
    const error = validationFields();

    if (error !== "") {
      toast.error(error);

      return;
    }

    if (typeOpen === "edit") {
    } else if (typeOpen === "add") {
      createProvinces([
        {
          provinceName: provinceName,
        },
      ]);
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
              Province Name <span className="text-primary">(required)</span>
            </Label>
            <Input
              placeholder="Name"
              type="text"
              value={provinceName}
              onChange={(e) => setProvinceName(e.target.value)}
            />
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
