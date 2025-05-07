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
import { UserPreview } from "@highschool/interfaces";
import { useUpdateUserStatusMutation } from "@highschool/react-query/queries";
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
import { UserStatus } from "@/domain/enums/user";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentRow: UserPreview;
}

export function UsersDeleteDialog({ open, onOpenChange, currentRow }: Props) {
  const [value, setValue] = useState("");
  const { mutateAsync: updateUser } = useUpdateUserStatusMutation();
  const [statusSelected, setStatusSelected] = useState<UserStatus>(
    UserStatus[currentRow.status as keyof typeof UserStatus],
  );

  const handleDelete = async () => {
    if (value.trim() !== currentRow.username) return;

    await updateUser({
      userId: currentRow.id,
      status: UserStatus[statusSelected],
    });

    onOpenChange(false);
  };

  return (
    <ConfirmDialog
      destructive
      confirmText="Save"
      desc={
        <div className="space-y-4">
          <p className="mb-2">
            Are you sure you want to delete{" "}
            <span className="font-bold">{currentRow.username}</span>?
            <br />
            This action will permanently remove the user with the role of{" "}
            <span className="font-bold">
              {currentRow.roleName?.toUpperCase()}
            </span>{" "}
            from the system. This cannot be undone.
          </p>

          <Label className="my-2">
            Username:
            <Input
              placeholder="Enter username to confirm deletion."
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
          </Label>

          <Select
            value={statusSelected}
            onValueChange={(value) => setStatusSelected(value as UserStatus)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {Object.values(UserStatus).map(
                  (status) =>
                    status !== UserStatus.All && (
                      <SelectItem key={status} value={status}>
                        <SelectLabel>{status}</SelectLabel>
                      </SelectItem>
                    ),
                )}
              </SelectGroup>
            </SelectContent>
          </Select>

          <Alert variant="destructive">
            <AlertTitle>Warning!</AlertTitle>
            <AlertDescription>
              Please be carefull, this operation can be affected directly to
              user.
            </AlertDescription>
          </Alert>
        </div>
      }
      disabled={value.trim() !== currentRow.username}
      handleConfirm={handleDelete}
      open={open}
      title={
        <span className="text-destructive">
          <IconAlertTriangle
            className="stroke-destructive mr-1 inline-block"
            size={18}
          />{" "}
          Delete User
        </span>
      }
      onOpenChange={onOpenChange}
    />
  );
}
