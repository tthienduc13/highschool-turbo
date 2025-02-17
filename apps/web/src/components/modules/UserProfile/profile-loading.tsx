import { Skeleton } from "@highschool/ui/components/ui/skeleton";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@highschool/ui/components/ui/tabs";

import { ProfileArea } from "./profile-area";
import { FlashcardList } from "./tabs/flashcard";

import { Container } from "@/components/core/layouts/container";

export const ProfileLoading = () => {
  return (
    <Container className="flex flex-col gap-12" maxWidth="4xl">
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
    </Container>
  );
};
