import { Skeleton } from "@highschool/ui/components/ui/skeleton";
import { ProfileArea } from "./profile-area";
import { FlashcardList } from "./tabs/flashcard";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@highschool/ui/components/ui/tabs";

export const ProfileLoading = () => {
    return (
        <div className="max-w-4xl mx-auto flex flex-col gap-12">
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
