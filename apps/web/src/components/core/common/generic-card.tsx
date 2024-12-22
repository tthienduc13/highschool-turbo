"use client";

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
    IconStar,
    IconTrash,
} from "@tabler/icons-react";
import Link from "next/link";
import { useState } from "react";

export interface GenericCardProps {
    title: string;
    numItems: number;
    itemsLabel: string;
    star: number;
    label?: React.ReactNode;
    bottom?: React.ReactNode;
    url: string;
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
    star,
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
        <Link href={url}>
            <div
                className="h-full rounded-lg p-5 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 shadow-lg transition-all ease-in-out duration-200 hover:-translate-y-2 hover:border-b-primary cursor-pointer "
                style={{ zIndex: menuOpen ? 30 : 25 }}
            >
                <div className="flex flex-col justify-center h-full gap-4">
                    <div
                        className={cn(
                            "flex  gap-2",
                            reverseTitle ? "flex-col-reverse" : "flex-col"
                        )}
                    >
                        <h2 className="overflow-hidden text-lg font-bold text-ellipsis line-clamp-2">
                            {title}
                        </h2>
                        <div className="flex flex-row items-center justify-between">
                            {!label ? (
                                <div className="flex flex-row items-center gap-2 text-gray-600 dark:text-gray-400">
                                    {leftIcon}
                                    <div className="text-sm">
                                        {numItems} thẻ
                                    </div>
                                    {rightIcon}
                                </div>
                            ) : (
                                <div className="flex flex-row items-center gap-2 text-gray-600 dark:text-gray-400">
                                    {label}
                                </div>
                            )}
                            <div className="flex gap-[2px] flex-row items-center">
                                <IconStar
                                    size={16}
                                    className="mb-0.5 fill-yellow-500 text-yellow-500"
                                />
                                <p className="h-fit text-sm text-gray-600 dark:text-gray-400">
                                    {star}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-row justify-between">
                        {user && (
                            <div className="flex flex-row items-center gap-2">
                                <Avatar className="size-6">
                                    <AvatarImage
                                        src={user.image ?? ""}
                                        alt={user.fullname ?? ""}
                                    />
                                </Avatar>
                                <div className="flex flex-row items-center gap-1">
                                    <div className="text-sm font-semibold">
                                        {user.fullname}
                                    </div>
                                    {verified && (
                                        <IconDiscountCheck
                                            aria-label="Verified"
                                            size={18}
                                        />
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
        <Card className="h-full p-5 shadow-lg border-2 border-gray-200 dark:bg-gray-800 dark:border-gray-700">
            <CardContent className="p-0 flex flex-col justify-between h-full gap-4">
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
