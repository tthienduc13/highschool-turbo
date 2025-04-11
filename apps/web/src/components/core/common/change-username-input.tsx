"use client";

import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { useEffect, useRef, useState, useCallback } from "react";
import { useDebounceValue } from "@highschool/hooks";
import {
  useCheckUsernameQuery,
  useUpdateBaseUserInfoMutation,
} from "@highschool/react-query/queries";
import { Button } from "@highschool/ui/components/ui/button";
import { Input } from "@highschool/ui/components/ui/input";
import { cn } from "@highschool/ui/lib/utils";
import { IconLoader2 } from "@tabler/icons-react";

import { AnimatedCheckCircle } from "./animated-icons/animated-check-circle";
import { AnimatedXCircle } from "./animated-icons/animated-x-icon";

import { mutationEventChannel } from "@/events/mutation";
import { USERNAME_REGEXP } from "@/lib/constants/constants";

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
  const wasUpdatedRef = useRef(false);

  // Keep ref in sync with state
  usernameRef.current = usernameValue;

  const debouncedUsername = useDebounceValue(usernameValue, 500);

  const checkUsername = useCheckUsernameQuery({
    username: debouncedUsername,
  });

  const changeUsername = useUpdateBaseUserInfoMutation();

  // Calculate validation states
  const isTooLong = usernameValue.length > 40;
  const isEmpty = usernameValue.length === 0;
  const isFormatValid = USERNAME_REGEXP.test(usernameValue);
  const isTaken = checkUsername.data === true;
  const isAvailable = checkUsername.data === false;
  const isChecking = checkUsername.isLoading;
  const isPendingChange = changeUsername.isPending;
  const isUnchanged = usernameValue === session?.user?.username;

  const isInvalid = !isEmpty && (!isFormatValid || isTooLong);

  const isDisabled =
    isInvalid ||
    isChecking ||
    debouncedUsername !== usernameValue ||
    isTaken ||
    (disabledIfUnchanged && isUnchanged) ||
    isPendingChange;

  // Handle button click
  const handleUsernameChange = useCallback(async () => {
    if (isDisabled) return;

    try {
      // Set flag to prevent multiple updates
      wasUpdatedRef.current = true;

      // Perform update mutation
      await changeUsername.mutateAsync({
        userName: usernameValue,
      });

      // Update session once
      if (session) {
        await update({
          ...session,
          user: {
            ...session.user,
            username: usernameValue,
          },
        });

        toast.success("Tên người dùng được cập nhật");
      }
    } catch (error) {
      console.error("Failed to update username:", error);
      toast.error("Không thể cập nhật tên người dùng");
      wasUpdatedRef.current = false;
    }
  }, [changeUsername, isDisabled, session, update, usernameValue]);

  // Reset update flag when username changes
  useEffect(() => {
    wasUpdatedRef.current = false;
  }, [usernameValue]);

  // Set up event listener for external submit
  useEffect(() => {
    const mutate = async () => {
      if (!wasUpdatedRef.current) {
        handleUsernameChange();
      }
    };

    mutationEventChannel.on("submitUsername", mutate);

    return () => {
      mutationEventChannel.off("submitUsername", mutate);
    };
  }, [handleUsernameChange]);

  // Notify parent component about disabled state changes
  useEffect(() => {
    onActionStateChange?.(isDisabled);
  }, [isDisabled, onActionStateChange]);

  // Notify parent component about loading state changes
  useEffect(() => {
    onLoadingChange?.(isPendingChange);
  }, [isPendingChange, onLoadingChange]);

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
            className="size-full items-center border-none bg-gray-100 px-4 py-0 font-bold focus-visible:ring-0 sm:!text-base md:!text-xl dark:bg-gray-800/50"
            disabled={isPendingChange}
            maxLength={40}
            placeholder="Nhập tên người dùng"
            value={usernameValue}
            onChange={(e) => {
              if (!isPendingChange) setUsernameValue(e.target.value);
            }}
          />
          <div
            className={cn(
              "flex h-full items-center justify-center bg-gray-200 px-3 dark:bg-gray-700",
              isChecking || isEmpty
                ? "text-gray-500"
                : isAvailable && !isInvalid
                  ? "text-emerald-500"
                  : "text-destructive",
            )}
          >
            {isChecking || isEmpty || isUnchanged ? (
              <div className="h-full w-6" />
            ) : isAvailable && !isInvalid ? (
              <AnimatedCheckCircle />
            ) : (
              <AnimatedXCircle />
            )}
          </div>
        </div>
        {showButton && (
          <Button
            className="h-12 w-full sm:w-[120px]"
            disabled={isDisabled}
            size="lg"
            variant="outline"
            onClick={handleUsernameChange}
          >
            {isPendingChange ? (
              <IconLoader2 className="animate-spin" />
            ) : (
              "Thay đổi"
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
            : !isFormatValid
              ? "Chỉ chữ, số, gạch dưới là được phép"
              : ""}
      </p>
    </div>
  );
};
