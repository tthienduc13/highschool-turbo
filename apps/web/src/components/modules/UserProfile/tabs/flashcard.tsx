import Link from "next/link";

import { useUserFlashcardQuery } from "@highschool/react-query/queries";
import { Button } from "@highschool/ui/components/ui/button";
import { Skeleton } from "@highschool/ui/components/ui/skeleton";

import { useProfile } from "@/hooks/use-profile";
import { groupIntoTimeline } from "@/utils/grouping";

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

FlashcardList.Skeleton = function FlashcardListSkeleton() {
  const Group = ({ numSets }: { numSets: number }) => (
    <div className="flex flex-col gap-6">
      <div className="flex flex-row items-center gap-4">
        <div className="flex h-7 flex-row items-center">
          <Skeleton className="h-[26px] w-[100px] rounded-md" />
        </div>
        <div className="h-[1px] w-full bg-gray-300 dark:bg-gray-700"></div>
      </div>
      <div className="flex flex-col gap-4">
        {Array.from({ length: numSets }, (_, i) => (
          <ProfileLinkable.Skeleton key={i} />
        ))}
      </div>
    </div>
  );
  return (
    <div className="flex flex-col gap-8">
      <Group numSets={3} />
      <Group numSets={5} />
    </div>
  );
};
