"use client";

import { useState } from "react";
import { IconAlertTriangle } from "@tabler/icons-react";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@highschool/ui/components/ui/alert";
import { Input } from "@highschool/ui/components/ui/input";
import { Label } from "@highschool/ui/components/ui/label";
import { ZonePreview, ZoneStatus } from "@highschool/interfaces";
import { useChangeZoneStatusMutation } from "@highschool/react-query/queries";

import { ConfirmDialog } from "@/components/ui/confirm-dialog";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentRow: ZonePreview;
}

export function ZoneDeleteDialog({ open, onOpenChange, currentRow }: Props) {
  const [value, setValue] = useState("");
  const { mutateAsync: changeStatusZone } = useChangeZoneStatusMutation();

  const getStatus = () => {
    if (currentRow.status === ZoneStatus.Available) return ZoneStatus.Banned;
    if (currentRow.status === ZoneStatus.Banned) return ZoneStatus.Available;

    return currentRow.status;
  };

  const handleDelete = async () => {
    if (value.trim() !== currentRow.name) return;

    await changeStatusZone({
      zoneId: currentRow.id,
      status: getStatus() ?? ZoneStatus.Available,
    });

    onOpenChange(false);
  };

  return (
    <ConfirmDialog
      destructive
      confirmText={currentRow.status}
      desc={
        <div className="space-y-4">
          <p className="mb-2">
            Are you sure you want to delete{" "}
            <span className="font-bold">{currentRow.name}</span>?
            <br />
            This action will permanently remove this zone from the system. This
            cannot be undone.
          </p>

          <Label className="my-2">
            Zone Name:
            <Input
              placeholder="Enter Zone Name to confirm deletion."
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
      disabled={value.trim() !== currentRow.name}
      handleConfirm={handleDelete}
      open={open}
      title={
        <span className="text-destructive">
          <IconAlertTriangle
            className="stroke-destructive mr-1 inline-block"
            size={18}
          />{" "}
          {getStatus()} Zone
        </span>
      }
      onOpenChange={onOpenChange}
    />
  );
}
