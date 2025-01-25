import dynamic from "next/dynamic";
import Link from "next/link";

import { useUserFlashcardQuery } from "@highschool/react-query/queries";
import { Skeleton } from "@highschool/ui/components/ui/skeleton";

import { useMe } from "@/hooks/use-me";
import { useProfile } from "@/hooks/use-profile";

import { ProfileLinkable } from "../profile-linkable";

const OwnFlashcard = dynamic(
  () => import("./own-flashcard").then((c) => c.OwnFlashcard),
  { ssr: false },
);

const UserFlashcard = dynamic(
  () => import("./user-flashcard").then((c) => c.UserFlashcard),
  { ssr: false },
);

export const FlashcardList = () => {
  const profile = useProfile()!;
  const me = useMe();

  const isMe = me?.username === profile.username;

  return <>{isMe ? <OwnFlashcard /> : <UserFlashcard />}</>;
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
