"use client";

import { useAuthorQuery } from "@highschool/react-query/queries";
import { Avatar, AvatarImage } from "@highschool/ui/components/ui/avatar";
import { Skeleton } from "@highschool/ui/components/ui/skeleton";
import { IconDiscountCheck, IconSchool } from "@tabler/icons-react";
import { Button } from "@highschool/ui/components/ui/button";

import { Hint } from "../common/hint";
import { UsernameLink } from "../common/username-link";
import { flashcardAttachToTypeLabels } from "../editor/title-properties";

import { ActionArea } from "./action-area";

import { useSet } from "@/hooks/use-set";

export const DescriptionArea = () => {
  const data = useSet();
  const { data: authorData, isLoading } = useAuthorQuery({
    authorId: data.flashcard.userId,
  });

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col justify-start gap-8 sm:flex-row sm:justify-between sm:gap-0 md:items-center">
        {isLoading ? (
          <div className="flex flex-row items-center gap-x-4">
            <Skeleton className="size-12 rounded-full" />
            <div className="flex flex-col gap-y-1">
              <Skeleton className="h-6 w-[200px]" />
              <Skeleton className="h-5 w-[200px]" />
            </div>
          </div>
        ) : (
          <div className="flex flex-row items-center gap-4">
            <Avatar className="size-12">
              <AvatarImage
                alt={authorData?.data?.username ?? "Người dùng Highschool"}
                src={authorData?.data?.profilePicture ?? "/logo.svg"}
              />
            </Avatar>
            <div className="flex flex-col">
              <div className="flex flex-row items-center gap-2">
                <UsernameLink
                  displayName={
                    authorData?.data?.fullname ?? "Người dùng Highschool"
                  }
                  username={authorData?.data?.username ?? "#"}
                />
                {!authorData?.data?.isStudent && (
                  <Hint label="Giáo viên">
                    <IconDiscountCheck
                      aria-label="teacher"
                      className="text-blue-700"
                      size={20}
                    />
                  </Hint>
                )}
              </div>
              <p className="text-muted-foreground text-sm">
                {authorData?.data?.username}
              </p>
            </div>
          </div>
        )}
        <div className="flex flex-col items-end gap-2">
          <ActionArea />
          {data.flashcard.entityId && (
            <Button>
              {flashcardAttachToTypeLabels[data.flashcard.flashcardType].label}{" "}
              : {data.flashcard.entityName}
              <IconSchool />
            </Button>
          )}
        </div>
      </div>
      <p className="break-all">{data.flashcard.flashcardDescription}</p>
    </div>
  );
};
