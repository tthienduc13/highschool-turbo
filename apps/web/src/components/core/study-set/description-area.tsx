import { useSet } from "@/hooks/use-set";
import { useAuthorQuery } from "@highschool/react-query/queries";
import { Avatar, AvatarImage } from "@highschool/ui/components/ui/avatar";
import { UsernameLink } from "../common/username-link";
import { Hint } from "../common/hint";
import { IconBooks, IconDiscountCheck, IconSchool } from "@tabler/icons-react";
import { ActionArea } from "./action-area";
import { Skeleton } from "@highschool/ui/components/ui/skeleton";
import Link from "next/link";
import { gradeTextRenderer } from "../common/renderer/grade";

export const DescriptionArea = () => {
    const { flashcard } = useSet();
    const { data: authorData, isLoading } = useAuthorQuery({
        authorId: flashcard.userId,
    });

    return (
        <div className="flex flex-col gap-8">
            <div className="flex flex-col sm:flex-row justify-start sm:justify-between items-center gap-8 sm:gap-0">
                {isLoading ? (
                    <div className="flex flex-row items-center gap-x-4">
                        <Skeleton className="h-12 w-12 rounded-full" />
                        <div className="flex flex-col gap-y-1">
                            <Skeleton className="h-6 w-[200px]" />
                            <Skeleton className="h-5 w-[200px]" />
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-row items-center gap-4">
                        <Avatar className="size-12">
                            <AvatarImage
                                src={
                                    authorData?.data?.profilePicture ??
                                    "/logo.svg"
                                }
                                alt={
                                    authorData?.data?.username ??
                                    "Người dùng Highschool"
                                }
                            />
                        </Avatar>
                        <div className="flex flex-col">
                            <div className="flex flex-row items-center gap-2">
                                <UsernameLink
                                    displayName={
                                        authorData?.data?.fullname ??
                                        "Người dùng Highschool"
                                    }
                                    username={authorData?.data?.username ?? "#"}
                                />
                                {!authorData?.data?.isStudent && (
                                    <Hint label="Giáo viên">
                                        <IconDiscountCheck
                                            size={20}
                                            className="text-blue-700"
                                            aria-label="teacher"
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
                <ActionArea />
            </div>
            <div className="flex flex-row gap-2 text-lg text-gray-600 dark:text-gray-400 cursor-pointer">
                <Link
                    href={"/course"}
                    className="flex flex-row items-center gap-2 hover:text-primary transition-all ease-in-out duration-200"
                >
                    <IconBooks size={20} />
                    {flashcard.subjectName}
                </Link>
                <p>•</p>
                <div className="flex flex-row items-center gap-2">
                    <IconSchool size={20} />
                    {gradeTextRenderer(flashcard.grade)}
                </div>
            </div>
            <p className="whitespace-pre-wrap">
                {flashcard.flashcardDescription}
            </p>
        </div>
    );
};
