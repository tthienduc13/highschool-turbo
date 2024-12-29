"use client";

import { useSession } from "next-auth/react";
import { toast } from "sonner";

import { useEffect, useRef, useState } from "react";

import { useDebounceValue } from "@highschool/hooks";
import {
  useCheckUsernameQuery,
  useUpdateBaseUserInfoMutation,
} from "@highschool/react-query/queries";
import { Button } from "@highschool/ui/components/ui/button";
import { Input } from "@highschool/ui/components/ui/input";
import { cn } from "@highschool/ui/lib/utils";

import { IconLoader2 } from "@tabler/icons-react";

import { mutationEventChannel } from "@/events/mutation";
import { USERNAME_REGEXP } from "@/lib/constants/constants";

import { AnimatedCheckCircle } from "./animated-icons/animated-check-circle";
import { AnimatedXCircle } from "./animated-icons/animated-x-icon";

export interface ChangeUsernameInputProps {
  showButton?: boolean;
  disabledIfUnchanged?: boolean;
  onChange?: () => void;
  onActionStateChange?: (disabled: boolean) => void;
  onLoadingChange?: (loading: boolean) => void;
}

export const ChangeUsernameInput = ({
  showButton = true,
  disabledIfUnchanged = true,
  onActionStateChange,
  onLoadingChange,
}: ChangeUsernameInputProps) => {
  const { data: session, update } = useSession();
  const [usernameValue, setUsernameValue] = useState(
    session?.user?.username || "",
  );
  const usernameRef = useRef(usernameValue);
  usernameRef.current = usernameValue;

  const debouncedUsername = useDebounceValue(usernameValue, 500);

  const checkUsername = useCheckUsernameQuery({
    username: debouncedUsername,
  });

  const changeUsername = useUpdateBaseUserInfoMutation();

  const isTooLong = usernameValue.length > 40;
  const isTaken = checkUsername.data;

  const isInvalid =
    !!usernameValue.length &&
    (!USERNAME_REGEXP.test(usernameValue) || isTooLong);

  const isDisabled =
    isInvalid ||
    checkUsername.isLoading ||
    debouncedUsername !== usernameValue ||
    checkUsername.data ||
    (disabledIfUnchanged && usernameValue === session?.user?.username);

  useEffect(() => {
    const mutate = async () => {
      changeUsername.mutateAsync({ userName: usernameRef.current });
      await update({
        ...session,
        user: {
          ...session?.user,
          username: usernameRef.current,
        },
      });
    };

    mutationEventChannel.on("submitUsername", mutate);
    return () => {
      mutationEventChannel.off("submitUsername", mutate);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    onActionStateChange?.(isDisabled);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDisabled]);

  useEffect(() => {
    if (changeUsername.isSuccess) {
      const updateSession = async () => {
        await update({
          ...session,
          user: {
            ...session?.user,
            username: usernameValue,
          },
        });
        toast.success("Tên người dùng được cập nhật");
      };
      updateSession();
    }
  }, [changeUsername.isSuccess]);

  useEffect(() => {
    onLoadingChange?.(changeUsername.isPending);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [changeUsername.isPending]);
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
            value={usernameValue}
            onChange={(e) => {
              if (!changeUsername.isPending) setUsernameValue(e.target.value);
            }}
            placeholder="Nhập tên người dùng"
            className="h-full w-full items-center border-none bg-gray-100 px-4 py-0 font-bold focus-visible:ring-0 sm:!text-base md:!text-xl dark:bg-gray-800/50"
          />
          <div
            className={cn(
              "flex h-full items-center justify-center bg-gray-200 px-3 dark:bg-gray-700",
              checkUsername.isLoading
                ? "text-gray-200 dark:text-gray-700"
                : checkUsername.data === false
                  ? "text-destructive"
                  : "text-emerald-500",
            )}
            style={{
              color: checkUsername.isLoading
                ? "gray"
                : checkUsername.data
                  ? "red"
                  : "green",
            }}
          >
            {checkUsername.isLoading && !isInvalid ? (
              <div className="h-full w-6" />
            ) : checkUsername.data === false ? (
              <AnimatedCheckCircle />
            ) : (
              <AnimatedXCircle />
            )}
          </div>
        </div>
        {showButton && (
          <Button
            size="lg"
            variant="outline"
            className="h-12 w-full sm:w-[120px]"
            disabled={isDisabled || changeUsername.isPending}
            onClick={async () => {
              changeUsername.mutateAsync({
                userName: usernameValue,
              });
            }}
          >
            {changeUsername.isPending ? (
              <IconLoader2 className="animate-spin" />
            ) : (
              " Thay đổi"
            )}
          </Button>
        )}
      </div>
      <p
        className={cn(
          "text-muted-foreground text-left text-xs font-medium",
          isInvalid || isTaken ? "" : "hidden",
        )}
      >
        {isTooLong
          ? "Tên người dùng không được vượt quá 40 kí tự"
          : isTaken
            ? "Tên người dùng đã bị lấy"
            : "Chỉ chữ, số, gạch dưới là được phép"}
      </p>
    </div>
  );
};
