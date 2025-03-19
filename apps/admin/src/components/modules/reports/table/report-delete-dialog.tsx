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
import { Report } from "@highschool/interfaces";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@highschool/ui/components/ui/select";

import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { ReportStatus } from "@/domain/enums/report";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentRow: Report;
}

export function ReportDeleteDialog({ open, onOpenChange, currentRow }: Props) {
  const [value, setValue] = useState("");
  const [statusSelected, setStatusSelected] = useState<ReportStatus>(
    ReportStatus[currentRow.status as keyof typeof ReportStatus],
  );

  const handleDelete = () => {
    if (value.trim() !== currentRow.reportTitle) return;

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
            <span className="font-bold">{currentRow.reportTitle}</span>?
            <br />
            This action will permanently remove the user with the role of{" "}
            <span className="font-bold">
              {currentRow.reportTitle?.toUpperCase()}
            </span>{" "}
            from the system. This cannot be undone.
          </p>

          <Label className="my-2">
            Report Name:
            <Input
              placeholder="Enter report name to confirm deletion."
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
          </Label>

          <Select
            value={statusSelected}
            onValueChange={(value) => setStatusSelected(value as ReportStatus)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {Object.values(ReportStatus).map((status) => (
                  <SelectItem key={status} value={status}>
                    <SelectLabel>{status}</SelectLabel>
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>

          <Alert variant="destructive">
            <AlertTitle>Warning!</AlertTitle>
            <AlertDescription>
              Please be carefull, this operation can not be rolled back.
            </AlertDescription>
          </Alert>
        </div>
      }
      disabled={value.trim() !== currentRow.reportTitle}
      handleConfirm={handleDelete}
      open={open}
      title={
        <span className="text-destructive">
          <IconAlertTriangle
            className="stroke-destructive mr-1 inline-block"
            size={18}
          />{" "}
          Change Status Report
        </span>
      }
      onOpenChange={onOpenChange}
    />
  );
}
