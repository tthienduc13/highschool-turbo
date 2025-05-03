import { Skeleton } from "@highschool/ui/components/ui/skeleton";
import { useFlashcardResultQuery } from "@highschool/react-query/queries";
import Link from "next/link";

import { ProfileLinkable } from "../profile-linkable";

import { groupIntoTimeline } from "@/utils/grouping";
import { visibilityIcon } from "@/components/core/common/renderer/visibility-icon";

export const LearningFlashcardList = () => {
  const { data, isLoading } = useFlashcardResultQuery({
    pageNumber: 1,
    pageSize: 1000,
  });

  if (isLoading) {
    return <LearningFlashcardList.Skeleton />;
  }

  const grouped = groupIntoTimeline(data?.data ?? []);

  return (
    <div className="flex flex-row-reverse gap-6">
      <div className="flex size-fit">
        <div className="flex w-fit flex-col gap-3 rounded-lg border-2 border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
          <div className="flex flex-row items-center gap-2 text-sm text-gray-700">
            Số thẻ mới <div className="size-3 rounded-full bg-blue-500" />
          </div>
          <div className="flex flex-row items-center gap-2 text-sm text-gray-700">
            Số thẻ đang học
            <div className="size-3 rounded-full bg-orange-500" />
          </div>
          <div className="flex flex-row items-center gap-2 text-sm text-gray-700">
            Số thẻ tới hạn
            <div className="size-3 rounded-full bg-green-500" />
          </div>
        </div>
      </div>
      <div className="flex w-full flex-1 flex-col gap-8">
        {grouped.map((group, i) => (
          <div key={i} className="flex flex-col gap-6">
            <div className="flex flex-row items-center gap-2">
              <div className="whitespace-nowrap text-2xl font-bold">
                {group.label}
              </div>
              <div className="h-px w-full bg-gray-300 dark:bg-gray-700" />
            </div>
            <div className="flex flex-col gap-6">
              {group.items.map((item) => (
                <Link key={item.id} href={`/study-set/${item.slug}`}>
                  <div className="h-full cursor-pointer rounded-lg border-2 border-gray-200 bg-white p-4 shadow-md transition-all duration-200 ease-in-out hover:-translate-y-2 hover:border-b-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:hover:border-b-blue-300">
                    <div className="flex flex-col gap-2">
                      <div className="flex flex-row items-center justify-between">
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {item.numberOfFlashcardContent} thẻ ghi nhớ
                        </p>
                        <div className="text-gray-500">
                          {visibilityIcon(item.status!, 18)}
                        </div>
                      </div>
                      <div className="flex flex-row items-center gap-2">
                        <p className="text-lg font-bold">
                          {item.flashcardName}
                        </p>
                      </div>
                      <div className="flex flex-row items-center gap-4">
                        <div className="flex flex-row items-center gap-1">
                          <div className="size-2 rounded-full bg-blue-500" />
                          <p className="text-xs text-gray-600 dark:text-gray-400">
                            {item.newCardCount}
                          </p>
                        </div>
                        <div className="flex flex-row items-center gap-1">
                          <div className="size-2 rounded-full bg-orange-500" />
                          <p className="text-xs text-gray-600 dark:text-gray-400">
                            {item.cardInLearningCount}
                          </p>
                        </div>
                        <div className="flex flex-row items-center gap-1">
                          <div className="size-2 rounded-full bg-green-500" />
                          <p className="text-xs text-gray-600 dark:text-gray-400">
                            {item.dueForReview}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
        {!grouped.length && (
          <div className="flex w-full flex-col items-center justify-center gap-2 text-center">
            <h2 className="text-lg font-bold">Không có gì cả 🫠</h2>
            <p className="text-muted-foreground">Bạn chưa có tiến trình học</p>
          </div>
        )}
      </div>
    </div>
  );
};

LearningFlashcardList.Skeleton = function FlashcardListSkeleton() {
  const Group = ({ numSets }: { numSets: number }) => (
    <div className="flex flex-col gap-6">
      <div className="flex flex-row items-center gap-4">
        <div className="flex h-7 flex-row items-center">
          <Skeleton className="h-[26px] w-[100px] rounded-md" />
        </div>
        <div className="h-px w-full bg-gray-300 dark:bg-gray-700" />
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
