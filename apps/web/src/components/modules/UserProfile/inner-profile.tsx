import dynamic from "next/dynamic";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@highschool/ui/components/ui/tabs";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { ProfileArea } from "./profile-area";
import { LearningFlashcardList } from "./tabs/learning-flashcard-list";

import { Container } from "@/components/core/layouts/container";
import { useMe } from "@/hooks/use-me";
import { useProfile } from "@/hooks/use-profile";

const FlashcardList = dynamic(
  () => import("./tabs/flashcard").then((l) => l.FlashcardList),
  { ssr: false },
);

const FolderList = dynamic(
  () => import("./tabs/folder").then((l) => l.FolderList),
  { ssr: false },
);

export enum NavTab {
  LearningFlashcard = "LearningFlashcard",
  Flashcard = "Flashcard",
  Folder = "Folder",
}

export const InnerProfile = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathName = usePathname();

  const me = useMe();
  const profile = useProfile();

  const isMe = me?.username === profile?.username;
  const isTeacher = me?.roleName?.toLowerCase() === "teacher";

  const _type = searchParams.get("type") as NavTab;

  return (
    <Container maxWidth="4xl">
      <div className="flex flex-col gap-12">
        <ProfileArea />
        <Tabs
          className="w-full  "
          defaultValue={
            (_type ?? (isMe && !isTeacher))
              ? NavTab.LearningFlashcard
              : NavTab.Flashcard
          }
        >
          <TabsList
            className="mb-5 h-10 w-full border-b-2 border-gray-200 p-0 dark:border-gray-800/50 "
            variant={"outline"}
          >
            {isMe && !isTeacher && (
              <TabsTrigger
                className="h-10 text-sm data-[state=active]:border-b-blue-800 data-[state=active]:text-blue-700 md:text-base dark:data-[state=active]:border-b-blue-400 dark:data-[state=active]:text-blue-400"
                value={NavTab.LearningFlashcard}
                variant={"outline"}
                onClick={() => {
                  router.replace(
                    `${pathName}?type=${NavTab.LearningFlashcard}`,
                  );
                }}
              >
                Thẻ ghi nhớ đang học
              </TabsTrigger>
            )}
            <TabsTrigger
              className="h-10 text-sm  data-[state=active]:border-b-blue-800 data-[state=active]:text-blue-700 md:text-base dark:data-[state=active]:border-b-blue-400 dark:data-[state=active]:text-blue-400"
              value={NavTab.Flashcard}
              variant={"outline"}
              onClick={() => {
                router.replace(`${pathName}?type=${NavTab.Flashcard}`);
              }}
            >
              Thẻ ghi nhớ {isMe && "của tôi"}
            </TabsTrigger>
            <TabsTrigger
              className="h-10 text-sm  data-[state=active]:border-b-blue-800 data-[state=active]:text-blue-700 md:text-base dark:data-[state=active]:border-b-blue-400 dark:data-[state=active]:text-blue-400"
              value={NavTab.Folder}
              variant={"outline"}
              onClick={() => {
                router.replace(`${pathName}?type=${NavTab.Folder}`);
              }}
            >
              Thư mục {isMe && "của tôi"}
            </TabsTrigger>
            {/* <TabsTrigger value="documents">Tài liệu</TabsTrigger> */}
          </TabsList>
          <TabsContent value={NavTab.LearningFlashcard}>
            <LearningFlashcardList />
          </TabsContent>
          <TabsContent value={NavTab.Flashcard}>
            <FlashcardList />
          </TabsContent>
          <TabsContent value={NavTab.Folder}>
            <FolderList />
          </TabsContent>
        </Tabs>
      </div>
    </Container>
  );
};
