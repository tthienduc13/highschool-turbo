"use client";

import { IconAlertTriangle } from "@tabler/icons-react";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@highschool/ui/components/ui/alert";
import { UniversityMajor } from "@highschool/interfaces";
import { useDeleteUniversityMajorMutation } from "@highschool/react-query/queries";

import { ConfirmDialog } from "@/components/ui/confirm-dialog";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentRow: UniversityMajor;
}

export function UniversityMajorDeleteDialog({
  open,
  onOpenChange,
  currentRow,
}: Props) {
  const { mutate: deleteUniversityMajor } = useDeleteUniversityMajorMutation();

  const handleDelete = () => {
    onOpenChange(false);
    deleteUniversityMajor(
      {
        universityMajorId: currentRow.id!,
      },
      {
        onSuccess: () => {
          onOpenChange(false);
        },
      },
    );
  };

  return (
    <ConfirmDialog
      destructive
      confirmText="Delete"
      desc={
        <div className="space-y-4">
          <p className="mb-2">
            Are you sure you want to delete{" "}
            <span className="font-bold">{currentRow.major?.name}</span>
          </p>

          <Alert variant="destructive">
            <AlertTitle>Warning!</AlertTitle>
            <AlertDescription>
              Please be carefull, this operation can not be rolled back.
            </AlertDescription>
          </Alert>
        </div>
      }
      handleConfirm={handleDelete}
      open={open}
      title={
        <span className="text-destructive">
          <IconAlertTriangle
            className="stroke-destructive mr-1 inline-block"
            size={18}
          />{" "}
          Delete University Major
        </span>
      }
      onOpenChange={onOpenChange}
    />
  );
}
