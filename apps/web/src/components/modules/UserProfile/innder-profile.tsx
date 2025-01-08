import dynamic from "next/dynamic";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@highschool/ui/components/ui/tabs";

import { useProfile } from "@/hooks/use-profile";

import { ProfileArea } from "./profile-area";

const FlashcardList = dynamic(
  () => import("./tabs/flashcard").then((l) => l.FlashcardList),
  { ssr: false },
);

const FolderList = dynamic(
  () => import("./tabs/folder").then((l) => l.FolderList),
  { ssr: false },
);
export const InnerProfile = () => {
  return (
    <div className="mx-auto w-full max-w-4xl">
      <div className="flex flex-col gap-12">
        <ProfileArea />
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="mb-5 md:mb-10">
            <TabsTrigger value="overview">Thông tin tổng quan</TabsTrigger>
            <TabsTrigger value="flashcard">Thẻ ghi nhớ</TabsTrigger>
            <TabsTrigger value="folder">Thư mục</TabsTrigger>
            {/* <TabsTrigger value="documents">Tài liệu</TabsTrigger> */}
          </TabsList>
          <TabsContent value="overview">
            <div>Đây là overview</div>
          </TabsContent>
          <TabsContent value="flashcard">
            <FlashcardList />
          </TabsContent>
          <TabsContent value="folder">
            <FolderList />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
