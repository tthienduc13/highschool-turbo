import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@highschool/ui/components/ui/alert";
import { IconAlertTriangle } from "@tabler/icons-react";

import { ConfirmDialog } from "@/components/ui/confirm-dialog";

interface LessonDeleteModalProps {
  open: boolean;
  onClose: () => void;
  lessonName: string;
  onConfirm: () => void;
}

export const LessonDeleteModal = ({
  open,
  onClose,
  lessonName,
  onConfirm,
}: LessonDeleteModalProps) => {
  return (
    <ConfirmDialog
      destructive
      confirmText="Delete"
      desc={
        <div className="space-y-4">
          <p className="mb-2">
            Are you sure you want to delete{" "}
            <span className="font-bold">{lessonName}</span>?
            <br />
            This action will permanently remove the user with the role of{" "}
            <span className="font-bold">{lessonName?.toUpperCase()}</span> from
            the system. This cannot be undone.
          </p>

          <Alert variant="destructive">
            <AlertTitle>Warning!</AlertTitle>
            <AlertDescription>
              Please be carefull, this operation can not be rolled back.
            </AlertDescription>
          </Alert>
        </div>
      }
      handleConfirm={onConfirm}
      open={open}
      title={
        <span className="text-destructive">
          <IconAlertTriangle
            className="stroke-destructive mr-1 inline-block"
            size={18}
          />{" "}
          Delete lesson
        </span>
      }
      onOpenChange={onClose}
    />
  );
};
