"use client";

import { Button } from "@highschool/ui/components/ui/button";
import { Input } from "@highschool/ui/components/ui/input";
import { Major } from "@highschool/interfaces";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@highschool/ui/components/ui/sheet";
import { Label } from "@highschool/ui/components/ui/label";
import { Textarea } from "@highschool/ui/components/ui/textarea";
import { useState } from "react";
import {
  useCreateMajorMutation,
  useGetMajorCategoryNameQuery,
} from "@highschool/react-query/queries";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@highschool/ui/components/ui/select";

import { useTable } from "@/stores/table-context";

interface Props {
  currentRow?: Major;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function MajorActionDialog({ currentRow, open, onOpenChange }: Props) {
  const { open: typeOpen } = useTable();
  const title =
    typeOpen === "add"
      ? "Add Major"
      : typeOpen === "edit"
        ? "Edit Major"
        : "View Major";

  const { mutate: createMajor, isPending: isCreating } =
    useCreateMajorMutation();

  const { data: majorCategories, isPending: isMajorCategoryLoading } =
    useGetMajorCategoryNameQuery({
      pageNumber: -1,
      pageSize: 10,
      search: "",
    });

  const [majorCategoryCode, setMajorCategoryCode] = useState<string>(
    currentRow?.majorCategoryCode ?? "",
  );
  const [majorCode, setMajorCode] = useState<string>(
    currentRow?.majorCode ?? "",
  );
  const [name, setName] = useState<string>(currentRow?.name ?? "");
  const [description, setDescription] = useState<string>(
    currentRow?.description ?? "",
  );
  const [skillYouLearn, setSkillYouLearn] = useState<string>(
    currentRow?.skillYouLearn ?? "",
  );

  const clearFields = () => {
    setMajorCategoryCode("");
    setMajorCode("");
    setName("");
    setDescription("");
    setSkillYouLearn("");
  };

  const validationFields = () => {
    if (
      !majorCategoryCode ||
      !majorCode ||
      !name ||
      !description ||
      !skillYouLearn
    ) {
      return "Please fill all required fields";
    }

    if (majorCategoryCode.length < 2) {
      return "Major Category Code must be at least 2 characters";
    }

    if (!/^[a-zA-Z0-9]{3,}$/.test(majorCode)) {
      return "Major Code must be at least 3 alphanumeric characters";
    }

    if (name.length < 3) {
      return "Name must be at least 3 characters";
    }

    if (description.length < 10) {
      return "Description must be at least 10 characters";
    }

    if (skillYouLearn.length < 5) {
      return "Skills You Learn must be at least 5 characters";
    }

    return "";
  };

  const handleSaveChange = async () => {
    const error = validationFields();

    if (error !== "") {
      toast.error(error);

      return;
    }

    createMajor({
      majors: [
        {
          description: description,
          majorCategoryCode: majorCategoryCode,
          majorCode: majorCode,
          name: name,
          skillYouLearn: skillYouLearn,
        },
      ],
    });

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
              Major Code <span className="text-primary">(required)</span>
            </Label>
            <Input
              placeholder="Major Code"
              type="text"
              value={majorCode}
              onChange={(e) => setMajorCode(e.target.value)}
            />
          </div>
          <div>
            <Label className="text-sm font-semibold">
              Name <span className="text-primary">(required)</span>
            </Label>
            <Input
              placeholder="Major Name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <Label className="text-sm font-semibold">
              Description <span className="text-primary">(required)</span>
            </Label>
            <Textarea
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div>
            <Label className="text-sm font-semibold">
              Skill You Learn <span className="text-primary">(required)</span>
            </Label>
            <Textarea
              placeholder="Skill You Learn"
              value={skillYouLearn}
              onChange={(e) => setSkillYouLearn(e.target.value)}
            />
          </div>
          <div>
            <Label className="text-sm font-semibold">
              Major Category <span className="text-primary">(required)</span>
            </Label>
            <Select
              disabled={isMajorCategoryLoading}
              value={majorCategoryCode}
              onValueChange={setMajorCategoryCode}
            >
              <SelectTrigger className="bg-background mr-4 rounded-lg border-2 text-left">
                <SelectValue
                  className="px-4"
                  placeholder="Select major category"
                />
              </SelectTrigger>
              <SelectContent
                className="placeholder:text-muted-foreground max-h-[50vh] overflow-y-auto"
                onCloseAutoFocus={(e) => e.preventDefault()}
              >
                {majorCategories?.data.map((majorCategory) => (
                  <SelectItem
                    key={majorCategory.majorCategoryCode}
                    value={majorCategory.majorCategoryCode}
                  >
                    {majorCategory.name}
                  </SelectItem>
                ))}
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
