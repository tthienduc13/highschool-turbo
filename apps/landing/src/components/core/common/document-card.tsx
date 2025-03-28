"use client";

import { env } from "@highschool/env";
import { Document } from "@highschool/interfaces";
import { Avatar, AvatarImage } from "@highschool/ui/components/ui/avatar";
import { Button } from "@highschool/ui/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@highschool/ui/components/ui/dropdown-menu";
import {
  IconDotsVertical,
  IconDownload,
  IconEye,
  IconFileLike,
  IconFolder,
  IconTrash,
} from "@tabler/icons-react";
import Link from "next/link";
import { useState } from "react";

interface DocumentCardProps {
  data: Document;
  onRemove: () => void;
  removable?: boolean;
  userLoading: boolean;
  user: {
    fullname: string | null;
    image: string | null;
  };
}

export const DocumentCard = ({
  data,
  onRemove,
  userLoading,
  removable = false,
  user,
}: DocumentCardProps) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const documentName = data.documentName || "Chưa đặt tên";
  const subjectName =
    `${data.subjectCurriculum?.subjectName ?? ""} - ${data.subjectCurriculum?.curriculumName ?? ""}` ||
    "Chưa biết";

  const likeCount = data.like ?? 0;
  const viewCount = data.view ?? 0;
  const downloadCount = data.download ?? 0;

  return (
    <Link
      key={data.id}
      passHref
      className="flex w-full flex-col gap-2 rounded-xl border-2 border-gray-200 bg-white shadow-lg md:gap-4 dark:border-gray-700 dark:bg-gray-800"
      href={`${env.NEXT_PUBLIC_APP_URL}/documents/${data.documentSlug}`}
    >
      <div className="flex flex-col gap-2 py-4">
        <h2 className="line-clamp-1 overflow-hidden text-ellipsis px-4 text-lg font-bold">
          {documentName}
        </h2>
        <div className="flex flex-col gap-y-2 px-4">
          <div className="flex flex-row items-center gap-1 md:gap-2">
            <IconFolder size={14} />
            <div className="text-xs font-medium md:text-sm">{subjectName}</div>
          </div>
          <div className="flex flex-row items-center justify-between">
            <p className="text-sm font-medium">
              {data.documentYear} - {data.documentYear + 1}
            </p>
            <div className="flex flex-row items-center gap-x-2">
              <div className="flex flex-row items-center">
                <IconFileLike size={14} />
                <div className="text-sm font-medium md:text-base">
                  {likeCount}
                </div>
              </div>
              <div className="flex flex-row items-center ">
                <IconEye size={14} />
                <div className="text-sm font-medium md:text-base">
                  {viewCount}
                </div>
              </div>
              <div className="flex flex-row items-center ">
                <IconDownload size={14} />
                <div className="text-sm font-medium md:text-base">
                  {downloadCount}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex w-full flex-row justify-between border-t border-gray-200 px-4 pt-4 dark:border-gray-700 ">
          {!userLoading && (
            <div className="flex w-full flex-row items-center gap-2">
              <Avatar className="size-6">
                <AvatarImage
                  alt={user.fullname ?? "Người dùng Highschool"}
                  src={user.image ?? "/logo.svg"}
                />
              </Avatar>
              <div className="flex flex-row items-center gap-1">
                <div className="text-sm font-semibold">
                  {user.fullname ?? "Highschool"}
                </div>
              </div>
            </div>
          )}
          {removable ? (
            <DropdownMenu
              open={menuOpen}
              onOpenChange={() => setMenuOpen(false)}
            >
              <DropdownMenuTrigger asChild>
                <Button
                  className="h-9 rounded-full"
                  size={"icon"}
                  variant={"ghost"}
                  onClick={(e) => {
                    e.preventDefault();
                    setMenuOpen(true);
                  }}
                >
                  <IconDotsVertical />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem
                  className="cursor-pointer"
                  onClick={(e) => {
                    e.preventDefault();
                    onRemove();
                    setMenuOpen(false);
                  }}
                >
                  <IconTrash />
                  Xoá
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : null}
        </div>
      </div>
    </Link>
  );
};
