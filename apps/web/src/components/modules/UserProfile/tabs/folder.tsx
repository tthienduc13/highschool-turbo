import { Loading } from "@/components/core/common/loading";
import { useProfile } from "@/hooks/use-profile";
import { groupIntoTimeline } from "@/utils/grouping";
import {
    useUserFlashcardQuery,
    useUserFoldersQuery,
} from "@highschool/react-query/queries";
import { Button } from "@highschool/ui/components/ui/button";
import Link from "next/link";
import { ProfileLinkable } from "../profile-linkable";
import { IconFolder } from "@tabler/icons-react";

export const FolderList = () => {
    const profile = useProfile()!;

    const placeholder = !profile.isMe
        ? "Người này không có thư mục nào cả"
        : "Bạn chưa tạo thư mục nhớ nào";

    const { data, isLoading } = useUserFoldersQuery({
        pageNumber: 1,
        pageSize: 100,
    });

    if (isLoading) {
        return <Loading />;
    }

    const grouped = groupIntoTimeline(data?.data ?? []);

    return (
        <div className="flex flex-col gap-8 w-full">
            {grouped.map((group, i) => (
                <div key={i} className="flex flex-col gap-6">
                    <div className="flex flex-row gap-2 items-center">
                        <div className="text-2xl font-bold whitespace-nowrap">
                            {group.label}
                        </div>
                        <div className="bg-gray-300 dark:bg-gray-700 w-full h-[1px]"></div>
                    </div>
                    <div className="flex flex-col gap-6">
                        {group.items.map((item) => (
                            <ProfileLinkable
                                key={item.id}
                                title={item.name}
                                url={`/profile/${profile.username}/folder/${item.id}`}
                                numValues={3}
                                label="mục"
                                leftIcon={
                                    <IconFolder
                                        size="18"
                                        className="min-w-[18px]"
                                    />
                                }
                            />
                        ))}
                    </div>
                </div>
            ))}
            {!grouped.length && (
                <div className="flex flex-col gap-2 w-full text-center justify-center items-center">
                    <h2 className="font-bold text-lg">Không có gì cả 🫠</h2>
                    <p className="text-muted-foreground">{placeholder}</p>
                </div>
            )}
        </div>
    );
};
