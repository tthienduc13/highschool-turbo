"use client";

import { useDebounceValue } from "@highschool/hooks";
import { useEffect, useRef, useState } from "react";
import {
    useCheckUsernameQuery,
    useUpdateBaseUserInfoMutation,
} from "@highschool/react-query/queries";
import { cn } from "@highschool/ui/lib/utils";
import { USERNAME_REGEXP } from "@/lib/constants/constants";
import { Input } from "@highschool/ui/components/ui/input";
import { AnimatedCheckCircle } from "./animated-icons/animated-check-circle";
import { AnimatedXCircle } from "./animated-icons/animated-x-icon";
import { Button } from "@highschool/ui/components/ui/button";
import { IconLoader2 } from "@tabler/icons-react";
import { mutationEventChannel } from "@/events/mutation";
import { useSession } from "next-auth/react";

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
    onChange,
    onActionStateChange,
    onLoadingChange,
}: ChangeUsernameInputProps) => {
    const { data: session, update } = useSession();
    const [usernameValue, setUsernameValue] = useState(
        session?.user?.username || ""
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
        const mutate = () => {
            update({
                user: {
                    ...session?.user,
                    username: usernameRef.current,
                },
            });
            changeUsername.mutate({ userName: usernameRef.current });
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
            onChange?.();
        }
    }, [isDisabled]);

    useEffect(() => {
        onLoadingChange?.(changeUsername.isPending);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [changeUsername.isPending]);
    return (
        <div className="flex gap-2 w-full max-w-sm mx-auto flex-col ">
            <div className="flex flex-row items-center gap-2 w-full">
                <div
                    className={cn(
                        "flex flex-row h-12 items-center w-full rounded-lg overflow-hidden border-2 transition-all duration-200 ease-cubic-ease  border-gray-200 dark:border-gray-700",
                        isInvalid
                            ? "focus-within:border-destructive"
                            : "focus-within:border-blue-600"
                    )}
                >
                    <Input
                        disabled={changeUsername.isPending}
                        value={usernameValue}
                        onChange={(e) => {
                            if (!changeUsername.isPending)
                                setUsernameValue(e.target.value);
                        }}
                        placeholder="Nhập tên người dùng"
                        className="h-full py-0 px-4 items-center text-xl font-bold border-none focus-visible:ring-0 bg-gray-100 dark:bg-gray-800/50 w-full"
                    />
                    <div
                        className={cn(
                            "h-full flex items-center justify-center px-3 bg-gray-200 dark:bg-gray-700",
                            checkUsername.isLoading
                                ? "text-gray-200 dark:text-gray-700"
                                : checkUsername.data === false
                                  ? "text-destructive"
                                  : "text-emerald-500"
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
                            <div className="w-6 h-full" />
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
                        disabled={isDisabled || changeUsername.isPending}
                        onClick={() => {
                            changeUsername.mutate({ userName: usernameValue });
                            update({
                                user: {
                                    ...session?.user,
                                    username: usernameValue,
                                },
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
                    "text-xs font-medium text-left text-muted-foreground",
                    isInvalid || isTaken ? "" : "hidden"
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
