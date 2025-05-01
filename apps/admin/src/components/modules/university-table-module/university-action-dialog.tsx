"use client";

import { Button } from "@highschool/ui/components/ui/button";
import { Input } from "@highschool/ui/components/ui/input";
import { HighSchoolAssets, University } from "@highschool/interfaces";
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
  useCreateUniversityListMutation,
  useProvincesQuery,
  useUpdateUniversityMutation,
  useUploaderMutation,
} from "@highschool/react-query/queries";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@highschool/ui/components/ui/select";

import { ComboboxTag } from "./combo-tag";

import ImageUploader from "@/components/ui/image-upload";
import { useTable } from "@/stores/table-context";

interface Props {
  currentRow?: University;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function UniversityActionDialog({
  currentRow,
  open,
  onOpenChange,
}: Props) {
  const { open: typeOpen } = useTable();
  const title =
    typeOpen === "add"
      ? "Add Profile"
      : typeOpen === "edit"
        ? "Edit Profile"
        : "View Profile";

  const { mutateAsync: createUniversity } = useCreateUniversityListMutation();
  const { mutateAsync: updateUniversity } = useUpdateUniversityMutation();

  const [university, setUniversity] = useState<University>(
    currentRow ?? ({} as University),
  );

  const [singleFile, setSingleFile] = useState<File | null>(null);

  const uploadImage = useUploaderMutation();

  const clearFields = () => {
    setUniversity({} as University);
    setSingleFile(null);
  };

  const handleUpload = async () => {
    if (singleFile) {
      toast.info("Uploading image...");

      try {
        // Simulate upload delay
        const data = await uploadImage.mutateAsync(
          {
            image: singleFile,
            fileName: title,
            folder: HighSchoolAssets.Test,
            presetName: "avatar",
          },
          {
            onSuccess: (data) => {
              return data;
            },
          },
        );

        toast.success("Image uploaded successfully");

        return data.data ?? "";
      } catch {
        toast.error("Failed to upload image");

        return "";
      }
    }

    return "";
  };

  const validationFields = () => {
    const {
      uniCode,
      name,
      description,
      logoUrl,
      admission_details,
      city,
      field_details,
      news_details,
      program_details,
      tags,
      universityMajors,
    } = university;

    if (
      !uniCode ||
      !name ||
      !description ||
      !admission_details ||
      !city ||
      !field_details ||
      !news_details ||
      !program_details
    ) {
      return "Please fill all required fields";
    }

    if (uniCode.length < 3) {
      return "University code must be at least 3 characters";
    }

    if (name.length < 3) {
      return "Name must be at least 3 characters";
    }

    if (description.length < 10) {
      return "Description must be at least 10 characters";
    }

    if (admission_details.length < 10) {
      return "Admission details must be at least 10 characters";
    }

    if (field_details.length < 10) {
      return "Field details must be at least 10 characters";
    }

    if (news_details.length < 10) {
      return "News details must be at least 10 characters";
    }

    if (program_details.length < 10) {
      return "Program details must be at least 10 characters";
    }

    return "";
  };

  const handleImageChange = (file: File | null) => {
    if (file === null) {
      setSingleFile(null);
    } else {
      setSingleFile(file);
    }
  };

  const handleSaveChange = async () => {
    const error = validationFields();

    if (error !== "") {
      toast.error(error);

      return;
    }

    const profilePicture = await handleUpload();

    if (typeOpen === "add") {
      await createUniversity([
        {
          name: university.name,
          description: university.description,
          uniCode: university.uniCode,
          logoUrl: profilePicture,
          admissionDetails: university.admission_details,
          fieldDetails: university.field_details,
          newsDetails: university.news_details,
          programDetails: university.program_details,
          city: Number(university.cityId),
          tags: university.tags,
        },
      ]);
    } else if (typeOpen === "edit") {
      await updateUniversity({
        id: university.id,
        name: university.name,
        description: university.description,
        uniCode: university.uniCode,
        logoUrl: profilePicture == "" ? university.logoUrl : profilePicture,
        admission_details: university.admission_details,
        field_details: university.field_details,
        news_details: university.news_details,
        program_details: university.program_details,
        cityId: Number(university.cityId),
        tags: university.tags,
      });
    }

    clearFields();
    onOpenChange(false);
  };

  const { data: provinces } = useProvincesQuery({
    pageNumber: 1,
    pageSize: 99999,
  });

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
              UniCode <span className="text-primary">(required)</span>
            </Label>
            <div className="relative">
              <Input
                placeholder="University Code"
                type="text"
                value={university.uniCode}
                onChange={(e) =>
                  setUniversity((prev) => ({
                    ...prev,
                    uniCode: e.target.value,
                  }))
                }
              />
            </div>
          </div>
          <div>
            <Label className="text-sm font-semibold">
              Name <span className="text-primary">(required)</span>
            </Label>
            <Input
              placeholder="Name"
              type="text"
              value={university.name}
              onChange={(e) =>
                setUniversity((prev) => ({ ...prev, name: e.target.value }))
              }
            />
          </div>
          <div>
            <Label className="text-sm font-semibold">
              Description <span className="text-primary">(required)</span>
            </Label>
            <Textarea
              className="h-[15vh]"
              placeholder="Description"
              value={university.description}
              onChange={(e) =>
                setUniversity((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
            />
          </div>
          <div>
            <Label className="text-sm font-semibold">
              News Details <span className="text-primary">(required)</span>
            </Label>
            <div className="relative">
              <Textarea
                className="h-[15vh]"
                placeholder="News Details"
                value={university.news_details}
                onChange={(e) =>
                  setUniversity((prev) => ({
                    ...prev,
                    news_details: e.target.value,
                  }))
                }
              />
            </div>
          </div>
          <div>
            <Label className="text-sm font-semibold">
              Admission Details <span className="text-primary">(required)</span>
            </Label>
            <div className="relative">
              <Textarea
                className="h-[15vh]"
                placeholder="Admission Details"
                value={university.admission_details}
                onChange={(e) =>
                  setUniversity((prev) => ({
                    ...prev,
                    admission_details: e.target.value,
                  }))
                }
              />
            </div>
          </div>
          <div>
            <Label className="text-sm font-semibold">
              Region <span className="text-primary">(required)</span>
            </Label>
            <Select
              value={university.city ?? ""}
              onValueChange={(e) =>
                setUniversity((prev) => ({ ...prev, cityId: Number(e) }))
              }
            >
              <SelectTrigger className="bg-background mr-4 rounded-lg border-2 text-left">
                <SelectValue
                  className="px-4"
                  placeholder="Select your province"
                />
              </SelectTrigger>
              <SelectContent
                className="placeholder:text-muted-foreground h-[50vh] overflow-y-auto"
                onCloseAutoFocus={(e) => e.preventDefault()}
              >
                {provinces?.data.map((country) => (
                  <SelectItem
                    key={country.provinceId}
                    value={country.provinceId?.toString() ?? ""}
                  >
                    {country.provinceName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label className="text-sm font-semibold">
              Program Details <span className="text-primary">(required)</span>
            </Label>
            <div className="relative">
              <Textarea
                className="h-[15vh]"
                placeholder="Program Details"
                value={university.program_details}
                onChange={(e) =>
                  setUniversity((prev) => ({
                    ...prev,
                    program_details: e.target.value,
                  }))
                }
              />
            </div>
          </div>
          <div>
            <Label className="text-sm font-semibold">
              Field Details <span className="text-primary">(required)</span>
            </Label>
            <div className="relative">
              <Textarea
                className="h-[15vh]"
                placeholder="Field Details"
                value={university.field_details}
                onChange={(e) =>
                  setUniversity((prev) => ({
                    ...prev,
                    field_details: e.target.value,
                  }))
                }
              />
            </div>
          </div>
          <div>
            <ImageUploader
              defaultMode="single"
              label="Avatar"
              maxImages={1}
              showModeToggle={false}
              value={university.logoUrl ?? ""}
              onChange={(e) => handleImageChange(Array.isArray(e) ? e[0] : e)}
            />
          </div>
        </div>
        <div className="mb-4 flex flex-col gap-2">
          <Label className="text-sm font-semibold">
            Tags <span className="text-primary">(optional)</span>
          </Label>
          <ComboboxTag
            defaultValues={university.tags ?? []}
            setTags={(tags) =>
              setUniversity((prev) => ({
                ...prev,
                tags,
              }))
            }
          />
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
