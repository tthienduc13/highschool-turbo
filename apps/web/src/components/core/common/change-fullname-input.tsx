"use client";

import { useSession } from "next-auth/react";
import { toast } from "sonner";

import { useEffect, useRef, useState } from "react";

import { useUpdateBaseUserInfoMutation } from "@highschool/react-query/queries";
import { Button } from "@highschool/ui/components/ui/button";
import { Input } from "@highschool/ui/components/ui/input";
import { cn } from "@highschool/ui/lib/utils";

import { IconLoader2 } from "@tabler/icons-react";

export interface ChangeFullnameInputProps {
  disabledIfUnchanged?: boolean;
  onChange?: () => void;
}

export const ChangeFullnameInput = ({
  disabledIfUnchanged = true,
}: ChangeFullnameInputProps) => {
  const { data: session, update } = useSession();
  const [fullnameValue, setFullnameValue] = useState(
    session?.user?.fullname || "",
  );
  const fullnameRef = useRef(fullnameValue);
  fullnameRef.current = fullnameValue;

  const isTooLong = fullnameValue.trim().length > 80;

  const changeUsername = useUpdateBaseUserInfoMutation();

  const isInvalid = !!fullnameValue.length && isTooLong;

  const isDisabled =
    isInvalid ||
    (disabledIfUnchanged && fullnameValue === session?.user?.fullname);

  useEffect(() => {
    if (changeUsername.isSuccess) {
      const updateSession = async () => {
        await update({
          ...session,
          user: {
            ...session?.user,
            fullname: fullnameValue,
          },
        });
        toast.success("Tên người dùng được cập nhật");
      };
      updateSession();
    }
  }, [changeUsername.isSuccess]);

  return (
    <div className="flex w-full flex-col gap-2">
      <div className="flex w-full flex-col items-center gap-2 sm:flex-row">
        <div
          className={cn(
            "ease-cubic-ease flex h-12 w-full flex-row items-center overflow-hidden rounded-lg border-2 border-gray-200 transition-all duration-200 dark:border-gray-700",
            isInvalid
              ? "focus-within:border-destructive"
              : "focus-within:border-blue-600",
          )}
        >
          <Input
            disabled={changeUsername.isPending}
            value={fullnameValue}
            onChange={(e) => {
              if (!changeUsername.isPending) setFullnameValue(e.target.value);
            }}
            placeholder="Nhập tên người dùng"
            className="h-full w-full items-center border-none bg-gray-100 px-4 py-0 font-bold focus-visible:ring-0 sm:!text-base md:!text-xl dark:bg-gray-800/50"
          />
        </div>
        <Button
          size="lg"
          variant="outline"
          className="h-12 w-full sm:w-[120px]"
          disabled={isDisabled || changeUsername.isPending}
          onClick={async () => {
            changeUsername.mutateAsync({
              fullName: fullnameValue,
            });
          }}
        >
          {changeUsername.isPending ? (
            <IconLoader2 className="animate-spin" />
          ) : (
            " Thay đổi"
          )}
        </Button>
      </div>
      <p
        className={cn(
          "text-muted-foreground text-left text-xs font-medium",
          isInvalid ? "" : "hidden",
        )}
      >
        {isTooLong && "Họ và tên không được vượt quá 80 kí tự"}
      </p>
    </div>
  );
};
