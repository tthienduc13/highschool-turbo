"use client";

import { useState } from "react";
import { IconAlertTriangle } from "@tabler/icons-react";
import { toast } from "sonner";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@highschool/ui/components/ui/alert";
import { Input } from "@highschool/ui/components/ui/input";
import { Label } from "@highschool/ui/components/ui/label";
import { MajorCategory } from "@highschool/interfaces";

import { ConfirmDialog } from "@/components/ui/confirm-dialog";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentRow: MajorCategory;
}

export function MajorCategoryDeleteDialog({
  open,
  onOpenChange,
  currentRow,
}: Props) {
  const [value, setValue] = useState("");

  const handleDelete = () => {
    if (value.trim() !== currentRow.majorCategoryCode) return;

    onOpenChange(false);
    toast("The following user has been deleted:", {
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">
            {JSON.stringify(currentRow, null, 2)}
          </code>
        </pre>
      ),
    });
  };

  return (
    <ConfirmDialog
      destructive
      confirmText="Delete"
      desc={
        <div className="space-y-4">
          <p className="mb-2">
            Are you sure you want to delete{" "}
            <span className="font-bold">{currentRow.name}</span>?
            <br />
            This action will permanently remove the major category with the code
            is{" "}
            <span className="font-bold">
              {currentRow.majorCategoryCode?.toUpperCase()}
            </span>{" "}
            from the system. This cannot be undone.
          </p>

          <Label className="my-2">
            MajorCategory Name:
            <Input
              className="mt-2"
              placeholder="Enter MajorCategoryCode to confirm deletion."
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
          </Label>

          <Alert variant="destructive">
            <AlertTitle>Warning!</AlertTitle>
            <AlertDescription>
              Please be carefull, this operation can not be rolled back.
            </AlertDescription>
          </Alert>
        </div>
      }
      disabled={value.trim() !== currentRow.majorCategoryCode}
      handleConfirm={handleDelete}
      open={open}
      title={
        <span className="text-destructive">
          <IconAlertTriangle
            className="stroke-destructive mr-1 inline-block"
            size={18}
          />{" "}
          Delete Major Category
        </span>
      }
      onOpenChange={onOpenChange}
    />
  );
}
