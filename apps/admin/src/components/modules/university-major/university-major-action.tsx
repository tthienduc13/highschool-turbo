import {
  AdmissionMethod,
  degreeLevels,
  UniversityMajor,
} from "@highschool/interfaces";
import {
  useCreateUniversityMajorListMutation,
  useDeleteUniversityMajorMutation,
  useGetMajorNameQuery,
  useUpdateUniversityMajorMutation,
} from "@highschool/react-query/queries";
import { Button } from "@highschool/ui/components/ui/button";
import { Input } from "@highschool/ui/components/ui/input";
import { Label } from "@highschool/ui/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@highschool/ui/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@highschool/ui/components/ui/sheet";
import { useState } from "react";
import { toast } from "sonner";

import { Combobox } from "../documents/management/combobox-document";

import { FancyBox, FancyBoxType } from "@/components/ui/fancy-box";

interface UniversityMajorActionProps {
  mode: "create" | "edit" | "delete" | null;
  uniCode: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentUniversityMajor?: UniversityMajor;
}

export const UniversityMajorAction = ({
  mode,
  uniCode,
  open,
  onOpenChange,
  currentUniversityMajor,
}: UniversityMajorActionProps) => {
  console.log("currentUniversityMajor", currentUniversityMajor);
  const title =
    mode === "create" ? "Create University Major" : "Edit University Major";
  const { mutate: createUniversityMajorList, isPending: isCreating } =
    useCreateUniversityMajorListMutation();
  const { mutate: updateUniversity, isPending: isUpdating } =
    useUpdateUniversityMajorMutation();
  const { mutate: deleteUniversityMajor, isPending: isDeleting } =
    useDeleteUniversityMajorMutation();

  const { data: majorNames, isPending: isMajorLoading } = useGetMajorNameQuery({
    pageNumber: -1,
    pageSize: 10,
  });

  const [majorCode, setMajorCode] = useState<string>(
    currentUniversityMajor?.majorCode ?? "",
  );
  const [quota, setQuota] = useState<number>(
    currentUniversityMajor?.quota ?? 0,
  );
  const [admissionMethods, setAdmissionMethods] = useState<FancyBoxType[]>(
    currentUniversityMajor?.admissionMethods
      ? (currentUniversityMajor?.admissionMethods as AdmissionMethod[]).map(
        (item) => ({
          label: item,
          value: item,
          color: "black",
        }),
      )
      : [],
  );
  const [degreeLevel, setDegreeLevel] = useState<string>(
    currentUniversityMajor?.degreeLevel ?? "",
  );
  const [tuitionFee, setTuitionFee] = useState<number>(
    currentUniversityMajor?.tuitionPerYear ?? 0,
  );
  const [yearReference, setYearReference] = useState<number>(
    currentUniversityMajor?.yearOfReference ?? new Date().getFullYear(),
  );

  const isDisabled = isCreating || isUpdating;

  const resetField = () => {
    setMajorCode("");
    setQuota(0);
    setAdmissionMethods([]);
    setDegreeLevel("");
  };

  const validationFields = () => {
    if (!majorCode || !quota || !admissionMethods.length || !degreeLevel) {
      toast.error("Please fill all required fields");

      return false;
    }

    if (quota < 0) {
      toast.error("Quota must be greater or equal than 0");

      return false;
    }

    return true;
  };

  const handleSaveUniversityMajor = () => {
    if (!validationFields()) {
      return;
    }

    try {
      if (mode === "create") {
        createUniversityMajorList({
          universityMajorList: [
            {
              uniCode: uniCode,
              majorCode: majorCode,
              admissionMethods: admissionMethods.map(
                (item) => item.value,
              ) as AdmissionMethod[],
              quota: quota,
              degreeLevel: degreeLevel,
              tuitionPerYear: tuitionFee,
              yearOfReference: yearReference,
            },
          ],
        });
      } else if (mode === "edit") {
        updateUniversity({
          universityMajor: {
            id: currentUniversityMajor?.id,
            uniCode: uniCode,
            majorCode: majorCode,
            admissionMethods: admissionMethods.map(
              (item) => item.value,
            ) as AdmissionMethod[],
            quota: quota,
            degreeLevel: degreeLevel,
            tuitionPerYear: tuitionFee,
            yearOfReference: yearReference,
          },
        });
      }

      resetField();
    } catch {
      return;
    }
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
        <div className="w-full space-y-5 px-1 py-4">
          <div>
            <Label className="text-sm font-semibold">
              Major <span className="text-primary">(required)</span>
            </Label>
            <Combobox
              className="w-full"
              disabled={isMajorLoading}
              items={
                majorNames?.data.map((item) => ({
                  label: item.name,
                  value: item.majorCode,
                })) ?? []
              }
              placeHolder="Select Major"
              setValue={setMajorCode}
              value={majorCode}
            />
          </div>
          <div>
            <Label className="text-sm font-semibold">
              Year Reference <span className="text-primary">(required)</span>
            </Label>
            <Input
              placeholder="yearReference"
              type="number"
              value={yearReference}
              onChange={(e) => setYearReference(Number(e.target.value))}
            />
          </div>

          <div className="flex gap-4">
            <div>
              <Label className="text-sm font-semibold">
                Quota <span className="text-primary">(required)</span>
              </Label>
              <Input
                placeholder="Quota"
                type="number"
                value={quota}
                onChange={(e) => setQuota(Number(e.target.value))}
              />
            </div>
            <div>
              <Label className="text-sm font-semibold">
                Tuitio Fee <span className="text-primary">(required)</span>
              </Label>
              <Input
                placeholder="Quota"
                type="number"
                value={tuitionFee}
                onChange={(e) => setTuitionFee(Number(e.target.value))}
              />
            </div>
          </div>
          <div>
            <Label className="text-sm font-semibold">
              Admission Method <span className="text-primary">(required)</span>
            </Label>
            <FancyBox
              items={
                Object.entries(AdmissionMethod)?.map(([key, value]) => {
                  return {
                    label: key,
                    value: value,
                    color: "black",
                  };
                }) ?? []
              }
              selectedValues={admissionMethods}
              setSelectedValues={setAdmissionMethods}
            />
          </div>
          <div>
            <Label className="text-sm font-semibold">
              Degree Level <span className="text-primary">(required)</span>
            </Label>
            <Select
              value={degreeLevel}
              onValueChange={(value) => setDegreeLevel(value)}
            >
              <SelectTrigger className="bg-background mr-4 rounded-lg border-2 text-left">
                <SelectValue className="px-4" placeholder="Select your level" />
              </SelectTrigger>
              <SelectContent
                className="placeholder:text-muted-foreground h-[25vh] overflow-y-auto"
                onCloseAutoFocus={(e) => e.preventDefault()}
              >
                {Object.entries(degreeLevels)?.map(([key, value]) => (
                  <SelectItem key={key} value={key}>
                    {value}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <SheetFooter>
          <Button
            disabled={isDisabled}
            type="submit"
            onClick={handleSaveUniversityMajor}
          >
            Save changes
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
