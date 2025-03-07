"use client";

import Link from "next/link";
import { useAuthorQuery } from "@highschool/react-query/queries";
import { Avatar, AvatarImage } from "@highschool/ui/components/ui/avatar";
import { Skeleton } from "@highschool/ui/components/ui/skeleton";
import { IconBooks, IconDiscountCheck, IconSchool } from "@tabler/icons-react";

import { Hint } from "../common/hint";
import { gradeTextRenderer } from "../common/renderer/grade";
import { UsernameLink } from "../common/username-link";

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
              <p className="text-sm text-muted-foreground">
                {authorData?.data?.username}
              </p>
            </div>
          </div>
        )}
        <ActionArea />
      </div>
      {data.flashcard.subjectName && (
        <div className="flex cursor-pointer flex-row gap-2 text-lg text-gray-600 dark:text-gray-400">
          <Link
            className="ease-in-out flex flex-row items-center gap-2 transition-all duration-200 hover:text-primary"
            href={"/course"}
          >
            <IconBooks size={20} />
            {data.flashcard.subjectName}
          </Link>
          <p>•</p>
          <div className="flex flex-row items-center gap-2">
            <IconSchool size={20} />
            {gradeTextRenderer(data.flashcard.grade)}
          </div>
        </div>
      )}
      <p className="break-all">{data.flashcard.flashcardDescription}</p>
    </div>
  );
};
