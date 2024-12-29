"use client";

import { useState } from "react";

import Link from "next/link";

import { Grade } from "@highschool/interfaces";
import { Avatar, AvatarImage } from "@highschool/ui/components/ui/avatar";
import { Button } from "@highschool/ui/components/ui/button";
import { Card, CardContent } from "@highschool/ui/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@highschool/ui/components/ui/dropdown-menu";
import { Skeleton } from "@highschool/ui/components/ui/skeleton";
import { cn } from "@highschool/ui/lib/utils";

import {
  IconDiscountCheck,
  IconDotsVertical,
  IconTrash,
} from "@tabler/icons-react";

import { gradeRenderer } from "./renderer/grade";

export interface GenericCardProps {
  title: string;
  numItems: number;
  itemsLabel: string;
  grade: Grade;
  label?: React.ReactNode;
  bottom?: React.ReactNode;
  url: string;
  userLoading?: boolean;
  user: {
    fullname: string | null;
    image: string | null;
  };
  reverseTitle?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  verified?: boolean;
  removable?: boolean;
  onRemove: () => void;
}

export const GenericCard = ({
  title,
  numItems,
  grade,
  userLoading = false,
  itemsLabel,
  label,
  bottom,
  url,
  user,
  reverseTitle = false,
  leftIcon,
  rightIcon,
  verified = false,
  removable = false,
  onRemove,
}: GenericCardProps) => {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <Link href={url} passHref>
      <div
        className="hover:border-b-primary h-full cursor-pointer rounded-lg border-2 border-gray-200 bg-white p-5 shadow-md transition-all duration-200 ease-in-out hover:-translate-y-2 dark:border-gray-700 dark:bg-gray-800"
        style={{ zIndex: menuOpen ? 30 : 25 }}
      >
        <div className="flex h-full flex-col justify-center gap-4">
          <div
            className={cn(
              "flex gap-2",
              reverseTitle ? "flex-col-reverse" : "flex-col",
            )}
          >
            <h2 className="line-clamp-1 overflow-hidden text-ellipsis text-lg font-bold">
              {title}
            </h2>
            <div className="flex flex-row items-center justify-between">
              {!label ? (
                <div className="flex flex-row items-center gap-2 text-gray-600 dark:text-gray-400">
                  {leftIcon}
                  <div className="text-sm">{numItems} thẻ</div>
                  {rightIcon}
                </div>
              ) : (
                <div className="flex flex-row items-center gap-2 text-gray-600 dark:text-gray-400">
                  {label}
                </div>
              )}
              <div className="flex flex-row items-center gap-[2px]">
                {gradeRenderer(grade)}
              </div>
            </div>
          </div>
          <div className="flex flex-row justify-between">
            {!userLoading && (
              <div className="flex flex-row items-center gap-2">
                <Avatar className="size-6">
                  <AvatarImage
                    src={user.image ?? "/logo.svg"}
                    alt={user.fullname ?? "Người dùng Highschool"}
                  />
                </Avatar>
                <div className="flex flex-row items-center gap-1">
                  <div className="text-sm font-semibold">
                    {user.fullname ?? "Người dùng Highschool"}
                  </div>
                  {verified && (
                    <IconDiscountCheck aria-label="Verified" size={18} />
                  )}
                </div>
              </div>
            )}
            {removable && (
              <DropdownMenu
                open={menuOpen}
                onOpenChange={() => setMenuOpen(false)}
              >
                <DropdownMenuTrigger asChild>
                  <Button
                    className="rounded-full"
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
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

GenericCard.Skeleton = function GenericCardSkeleton() {
  return (
    <Card className="h-full border-2 border-gray-200 p-5 shadow-lg dark:border-gray-700 dark:bg-gray-800">
      <CardContent className="flex h-full flex-col justify-between gap-4 p-0">
        <div className="space-y-2">
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-4 w-1/4" />
        </div>
        <div className="flex items-center space-x-2">
          <Skeleton className="h-6 w-6 rounded-full" />
          <Skeleton className="h-4 w-1/3" />
        </div>
      </CardContent>
    </Card>
  );
};
