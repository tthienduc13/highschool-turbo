import { Skeleton } from "@highschool/ui/components/ui/skeleton";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@highschool/ui/components/ui/tabs";

import { ProfileArea } from "./profile-area";
import { FlashcardList } from "./tabs/flashcard";

export const ProfileLoading = () => {
  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-12">
      <ProfileArea.Skeleton />
      <Tabs className="mb-5 md:mb-10">
        <TabsList>
          <TabsTrigger value="overview">
            <Skeleton className="w-32" />
          </TabsTrigger>
          <TabsTrigger value="flashcard">
            <Skeleton className="w-32" />
          </TabsTrigger>
          <TabsTrigger value="folder">
            <Skeleton className="w-32" />
          </TabsTrigger>
        </TabsList>
        <TabsContent value="flashcard">
          <FlashcardList.Skeleton />
        </TabsContent>
        <TabsContent value="folder">
          <FlashcardList.Skeleton />
        </TabsContent>
      </Tabs>
    </div>
  );
};
