"use client";

import { useSet } from "@/hooks/use-set";
import { Button } from "@highschool/ui/components/ui/button";
import { Skeleton } from "@highschool/ui/components/ui/skeleton";
import { IconX } from "@tabler/icons-react";
import { usePathname, useRouter } from "next/navigation";

export const TitleBar = () => {
    const { flashcard } = useSet();
    const router = useRouter();
    const pathName = usePathname();

    const handleNavigate = () => {
        const newPath = pathName.replace("/flashcards", "");
        router.replace(newPath);
    };

    return (
        <div className="w-full gap-4 items-center flex mt-2 justify-between">
            <div className="flex h-8 w-[110px] items-center justify-center rounded-md bg-primary/40 px-3 text-base font-bold">
                Thẻ ghi nhớ
            </div>
            <h1 className="w-full flex-1 text-ellipsis text-center text-xl font-bold hidden md:block line-clamp-1 whitespace-nowrap overflow-hidden">
                {flashcard?.flashcardName}
            </h1>
            <div className="flex w-[110px] justify-end">
                <Button
                    onClick={handleNavigate}
                    size={"icon"}
                    variant={"ghost"}
                    className="rounded-full"
                >
                    <IconX />
                </Button>
            </div>
        </div>
    );
};

TitleBar.Skeleton = function TitleBarSkeleton() {
    return (
        <div className="w-full gap-4 items-center flex mt-2 justify-between">
            <Skeleton className="w-[110px] h-8 rounded-md" />
            <div className="md:flex flex-1 h-full hidden ">
                <Skeleton className="h-full w-[300px] rounded-md" />
            </div>
            <div className="flex w-[110px] h-full justify-end">
                <Skeleton className="rounded-full size-9" />
            </div>
        </div>
    );
};
