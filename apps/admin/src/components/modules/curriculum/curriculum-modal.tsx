import { useState } from "react";
import { Input } from "@highschool/ui/components/ui/input";
import {
  useCurriculumMutation,
  useDeleteCurriculumMutation,
  useEditCurriculumMutation,
  useUploaderMutation,
} from "@highschool/react-query/queries";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { Curriculum, HighSchoolAssets } from "@highschool/interfaces";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@highschool/ui/components/ui/alert";
import { Checkbox } from "@highschool/ui/components/ui/checkbox";

import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { useTable } from "@/stores/table-context";
import ImageUploader from "@/components/ui/image-upload";

interface Props {
  currentRow?: Curriculum;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const CurriculumModal = ({ open, onOpenChange, currentRow }: Props) => {
  const { open: openType } = useTable();
  const queryClient = useQueryClient();

  const title =
    openType === "add"
      ? "Create Curriculum"
      : openType === "edit"
        ? `Edit for: ${currentRow?.curriculumName}`
        : openType === "delete"
          ? `Delete ${currentRow?.curriculumName}`
          : "";

  const [curriculumName, setCurriculumName] = useState(
    currentRow?.curriculumName ?? "",
  );
  const [isExternal, setIsExternal] = useState<boolean>(
    currentRow?.isExternal ?? false,
  );
  const [singleFile, setSingleFile] = useState<File | null>(null);

  const uploadImage = useUploaderMutation();
  const createCurriculum = useCurriculumMutation();
  const editCurriculum = useEditCurriculumMutation();
  const deleteMasterCourse = useDeleteCurriculumMutation();

  const isDisabled =
    curriculumName.trim().length === 0 || curriculumName === "";

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
            presetName: "thumbnail",
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

  const handleImageChange = (file: File | null) => {
    if (file === null) {
      setSingleFile(null);
    } else {
      setSingleFile(file);
    }
  };

  const validationFields = () => {
    if (!curriculumName && !singleFile) {
      toast.error("Please fill all fields");

      return false;
    }

    return true;
  };

  const handleCreateSubject = async () => {
    if (!validationFields()) {
      return;
    }

    const thumbnail = await handleUpload();

    await createCurriculum.mutateAsync(
      {
        curriculumName: curriculumName,
        isExternal: isExternal,
        imageUrl: thumbnail,
      },
      {
        onSuccess: (data) => {
          toast.success(data.message);
          onOpenChange(false);
          queryClient.invalidateQueries({ queryKey: ["curricula"] });
        },
      },
    );
  };

  const handleEditSubject = async () => {
    const thumbnail = singleFile
      ? await handleUpload()
      : (currentRow?.imageUrl ?? "");

    await editCurriculum.mutateAsync(
      {
        id: currentRow?.id!,
        curriculumName: curriculumName,
        isExternal: isExternal,
        imageUrl: thumbnail,
      },
      {
        onSuccess: (data) => {
          toast.success(data.message);
          onOpenChange(false);
          queryClient.invalidateQueries({ queryKey: ["master-courses"] });
        },
      },
    );
  };

  const handleDeleteSubject = async () => {
    await deleteMasterCourse.mutateAsync(
      {
        id: currentRow?.id!,
      },
      {
        onSuccess: (data) => {
          toast.success(data.message);
          onOpenChange(false);
          queryClient.invalidateQueries({ queryKey: ["curricula"] });
        },
      },
    );
  };

  const handleEnter = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (isDisabled) {
      return;
    }
    if (e.key === "Enter") {
      actions();
    }
  };

  const actions = async () => {
    switch (openType) {
      case "add":
        await handleCreateSubject();
        break;
      case "edit":
        await handleEditSubject();
        break;
      case "delete":
        await handleDeleteSubject();
        break;
      default:
        break;
    }
  };

  return (
    <ConfirmDialog
      confirmText={
        openType === "add"
          ? "Create"
          : openType === "delete"
            ? "Delete"
            : openType === "edit"
              ? "Save"
              : ""
      }
      desc={
        openType === "delete" ? (
          <div className="space-y-4">
            <p className="mb-2">
              Are you sure you want to delete{" "}
              <span className="font-bold">{currentRow?.curriculumName!}</span>
              ?
              <br />
              This action will permanently remove{" "}
              <span className="font-bold">
                {currentRow?.curriculumName!.toUpperCase()}
              </span>{" "}
              from the system. This cannot be undone.
            </p>
            <Alert variant="destructive">
              <AlertTitle>Warning!</AlertTitle>
              <AlertDescription>
                Please be carefull, this operation can not be rolled back.
              </AlertDescription>
            </Alert>
          </div>
        ) : (
          ""
        )
      }
      destructive={openType === "delete"}
      disabled={curriculumName.trim().length === 0}
      handleConfirm={async () => {
        await actions();
      }}
      isLoading={createCurriculum.isPending}
      open={open}
      title={title}
      onOpenChange={onOpenChange}
    >
      {openType !== "delete" && (
        <>
          <ImageUploader
            defaultMode="single"
            label="Thumbnail"
            maxImages={1}
            showModeToggle={false}
            value={currentRow?.imageUrl ?? ""}
            onChange={(e) => handleImageChange(Array.isArray(e) ? e[0] : e)}
          />
          <Input
            className="h-12 w-full border-0 border-b-4 border-b-blue-300  bg-gray-100 pt-2 !text-lg font-bold shadow-none focus-within:border-b-4 focus-visible:border-b-blue-500 focus-visible:ring-0 dark:bg-gray-700 dark:focus-visible:border-blue-300"
            placeholder="Curriculum Name"
            value={curriculumName}
            onChange={(e) => setCurriculumName(e.target.value)}
            onKeyDown={(e) => handleEnter(e)}
          />
          <div className="flex items-center gap-2">
            <strong>Is this external curriculum?</strong>
            <Checkbox
              checked={isExternal}
              onCheckedChange={(checked) => {
                if (typeof checked === "boolean") {
                  setIsExternal(checked);
                }
              }}
            />
          </div>
        </>
      )}
    </ConfirmDialog>
  );
};
