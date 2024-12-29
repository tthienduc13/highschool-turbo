import Link from "next/link";

import { useOwnFlashcardQuery } from "@highschool/react-query/queries";
import { Button } from "@highschool/ui/components/ui/button";

import { useProfile } from "@/hooks/use-profile";
import { groupIntoTimeline } from "@/utils/grouping";

import { ProfileLinkable } from "../profile-linkable";
import { FlashcardList } from "./flashcard";

export const OwnFlashcard = () => {
  const profile = useProfile()!;

  const placeholder = !profile.isMe
    ? "Người này không có bộ thẻ ghi nhớ nào công khai"
    : "Bạn chưa tạo bộ thẻ ghi nhớ nào";

  const { data, isLoading } = useOwnFlashcardQuery({
    pageNumber: 1,
    pageSize: 100,
  });

  if (isLoading) {
    return <FlashcardList.Skeleton />;
  }

  const grouped = groupIntoTimeline(data?.data ?? []);

  return (
    <div className="flex w-full flex-col gap-8">
      {grouped.map((group, i) => (
        <div key={i} className="flex flex-col gap-6">
          <div className="flex flex-row items-center gap-2">
            <div className="whitespace-nowrap text-2xl font-bold">
              {group.label}
            </div>
            <div className="h-[1px] w-full bg-gray-300 dark:bg-gray-700"></div>
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
        <div className="flex w-full flex-col items-center justify-center gap-2 text-center">
          <h2 className="text-lg font-bold">Không có gì cả 🫠</h2>
          <p className="text-muted-foreground">{placeholder}</p>
          <Link href={"/create"}>
            <Button className="mt-2 w-fit">Tạo ngay</Button>
          </Link>
        </div>
      )}
    </div>
  );
};
