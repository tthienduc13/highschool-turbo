import { Loading } from "@/components/core/common/loading";
import { useProfile } from "@/hooks/use-profile";
import { groupIntoTimeline } from "@/utils/grouping";
import { useUserFlashcardQuery } from "@highschool/react-query/queries";
import { Button } from "@highschool/ui/components/ui/button";
import Link from "next/link";
import { ProfileLinkable } from "../profile-linkable";

export const FlashcardList = () => {
    const profile = useProfile()!;

    const placeholder = !profile.isMe
        ? "Người này không có bộ thẻ ghi nhớ nào công khai"
        : "Bạn chưa tạo bộ thẻ ghi nhớ nào";

    const { data, isLoading } = useUserFlashcardQuery({
        username: profile.username,
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
                                title={item.flashcardName}
                                url={`/study-set/${item.slug}`}
                                visibility={item.status}
                                numValues={item.numberOfFlashcardContent}
                                label="thẻ ghi nhớ"
                            />
                        ))}
                    </div>
                </div>
            ))}
            {!grouped.length && (
                <div className="flex flex-col gap-2 w-full text-center justify-center items-center">
                    <h2 className="font-bold text-lg">Không có gì cả 🫠</h2>
                    <p className="text-muted-foreground">{placeholder}</p>
                    <Link href={"/create"}>
                        <Button className="mt-2 w-fit">Tạo ngay</Button>
                    </Link>
                </div>
            )}
        </div>
    );
};
