import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@highschool/ui/components/ui/alert";
import { IconAlertTriangle } from "@tabler/icons-react";

import { ConfirmDialog } from "@/components/ui/confirm-dialog";

interface ChapterDeleteModalProps {
  open: boolean;
  onClose: () => void;
  chapterName: string;
  onConfirm: () => void;
}

export const ChapterDeleteModal = ({
  open,
  onClose,
  chapterName,
  onConfirm,
}: ChapterDeleteModalProps) => {
  return (
    <ConfirmDialog
      destructive
      confirmText="Delete"
      desc={
        <div className="space-y-4">
          <p className="mb-2">
            Are you sure you want to delete{" "}
            <span className="font-bold">{chapterName}</span>?
            <br />
            This action will permanently remove the user with the role of{" "}
            <span className="font-bold">{chapterName?.toUpperCase()}</span> from
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
          Delete chapter
        </span>
      }
      onOpenChange={onClose}
    />
  );
};
