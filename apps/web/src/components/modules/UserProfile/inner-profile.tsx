import dynamic from "next/dynamic";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@highschool/ui/components/ui/tabs";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { ProfileArea } from "./profile-area";

const FlashcardList = dynamic(
  () => import("./tabs/flashcard").then((l) => l.FlashcardList),
  { ssr: false },
);

const FolderList = dynamic(
  () => import("./tabs/folder").then((l) => l.FolderList),
  { ssr: false },
);

export enum NavTab {
  Overview = "Overview",
  Flashcard = "Flashcard",
  Folder = "Folder",
}

export const InnerProfile = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathName = usePathname();

  const _type = searchParams.get("type") as NavTab;

  return (
    <div className="mx-auto w-full max-w-4xl">
      <div className="flex flex-col gap-12">
        <ProfileArea />
        <Tabs className="w-full  " defaultValue={_type ?? NavTab.Overview}>
          <TabsList
            className="mb-5 h-10 w-full border-b-2 border-gray-200 p-0 dark:border-gray-800/50 md:mb-10 "
            variant={"outline"}
          >
            <TabsTrigger
              className="h-10 text-sm data-[state=active]:border-b-blue-800 data-[state=active]:text-blue-700 dark:data-[state=active]:border-b-blue-400 dark:data-[state=active]:text-blue-400 md:text-base"
              value={NavTab.Overview}
              variant={"outline"}
              onClick={() => {
                router.replace(`${pathName}?type=${NavTab.Overview}`);
              }}
            >
              Thông tin tổng quan
            </TabsTrigger>
            <TabsTrigger
              className="h-10 text-sm  data-[state=active]:border-b-blue-800 data-[state=active]:text-blue-700 dark:data-[state=active]:border-b-blue-400 dark:data-[state=active]:text-blue-400 md:text-base"
              value={NavTab.Flashcard}
              variant={"outline"}
              onClick={() => {
                router.replace(`${pathName}?type=${NavTab.Flashcard}`);
              }}
            >
              Thẻ ghi nhớ
            </TabsTrigger>
            <TabsTrigger
              className="h-10 text-sm  data-[state=active]:border-b-blue-800 data-[state=active]:text-blue-700 dark:data-[state=active]:border-b-blue-400 dark:data-[state=active]:text-blue-400 md:text-base"
              value={NavTab.Folder}
              variant={"outline"}
              onClick={() => {
                router.replace(`${pathName}?type=${NavTab.Folder}`);
              }}
            >
              Thư mục
            </TabsTrigger>
            {/* <TabsTrigger value="documents">Tài liệu</TabsTrigger> */}
          </TabsList>
          <TabsContent value={NavTab.Overview}>
            <div>Đây là overview</div>
          </TabsContent>
          <TabsContent value={NavTab.Flashcard}>
            <FlashcardList />
          </TabsContent>
          <TabsContent value={NavTab.Folder}>
            <FolderList />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
