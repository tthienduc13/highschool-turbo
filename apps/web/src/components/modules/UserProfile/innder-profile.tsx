import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@highschool/ui/components/ui/tabs";
import { ProfileArea } from "./profile-area";
import { useProfile } from "@/hooks/use-profile";
import dynamic from "next/dynamic";

const FlashcardList = dynamic(
    () => import("./tabs/flashcard").then((l) => l.FlashcardList),
    { ssr: false }
);

const FolderList = dynamic(
    () => import("./tabs/folder").then((l) => l.FolderList),
    { ssr: false }
);
export const InnerProfile = () => {
    const profile = useProfile();
    return (
        <div className="max-w-4xl w-full mx-auto ">
            <div className="flex flex-col gap-12">
                <ProfileArea />
                <Tabs defaultValue="overview" className="w-full">
                    <TabsList className="mb-5 md:mb-10">
                        <TabsTrigger value="overview">
                            Thông tin tổng quan
                        </TabsTrigger>
                        <TabsTrigger value="flashcard">Thẻ ghi nhớ</TabsTrigger>
                        {profile.isMe && (
                            <TabsTrigger value="folder">Thư mục</TabsTrigger>
                        )}
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
