import { memo } from "react";
import { Skeleton } from "@highschool/ui/components/ui/skeleton";
import { Button } from "@highschool/ui/components/ui/button";
import { LoadingFlashcard } from "../loading-flashcard";
import { LinkAreaSkeleton } from "./link-area-skeleton";

export const FlashcardPreviewSkeletonRaw = () => {
    return (
        <div className="flex w-full flex-col items-stretch gap-8 lg:flex-row">
            <LinkAreaSkeleton />
            <div className="w-full flex-1 items-center justify-center">
                <LoadingFlashcard h="500px" />
            </div>
            <div className="flex w-full flex-col lg:w-[160px]">
                <div className="flex flex-col space-y-4 lg:flex-col lg:space-x-0 lg:space-y-0">
                    <div className="flex w-full flex-row gap-3 lg:flex-col">
                        <Skeleton className="w-full rounded-lg">
                            <Button
                                size={"lg"}
                                variant={"ghost"}
                                className="flex w-full items-center gap-x-2"
                            ></Button>
                        </Skeleton>
                        <Skeleton className="w-full rounded-lg">
                            <Button
                                size={"lg"}
                                variant={"ghost"}
                                className="flex w-full items-center gap-x-2"
                            ></Button>
                        </Skeleton>
                    </div>
                </div>
                <div className="mt-4 flex justify-end lg:justify-start">
                    <Skeleton className="w-full rounded-lg">
                        <Button
                            size={"lg"}
                            variant={"ghost"}
                            className="flex w-full items-center gap-x-2"
                        ></Button>
                    </Skeleton>
                </div>
            </div>
        </div>
    );
};
export const FlashcardPreviewSkeleton = memo(FlashcardPreviewSkeletonRaw);
