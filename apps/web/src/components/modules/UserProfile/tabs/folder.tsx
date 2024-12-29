import {
  useUserFlashcardQuery,
  useUserFoldersQuery,
} from "@highschool/react-query/queries";

import { IconFolder } from "@tabler/icons-react";

import { Loading } from "@/components/core/common/loading";
import { useProfile } from "@/hooks/use-profile";
import { groupIntoTimeline } from "@/utils/grouping";

import { ProfileLinkable } from "../profile-linkable";
import { FlashcardList } from "./flashcard";

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
                title={item.name}
                url={`/profile/${profile.username}/folder/${item.id}`}
                numValues={item.countFlashCard ?? 0 + item.countDocument ?? 0}
                label="mục"
                leftIcon={<IconFolder size="18" className="min-w-[18px]" />}
              />
            ))}
          </div>
        </div>
      ))}
      {!grouped.length && (
        <div className="flex w-full flex-col items-center justify-center gap-2 text-center">
          <h2 className="text-lg font-bold">Không có gì cả 🫠</h2>
          <p className="text-muted-foreground">{placeholder}</p>
        </div>
      )}
    </div>
  );
};
