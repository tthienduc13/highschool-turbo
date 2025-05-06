import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@highschool/ui/components/ui/tabs";

import { RelatedFlashcard } from "./related-flashcard";
import { RelatedDocument } from "./related-document";

interface RelatedResourceProps {
  courseId: string;
}

export const RealatedResource = ({ courseId }: RelatedResourceProps) => {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-row items-center justify-between">
        <h2 className="text-xl font-semibold md:text-2xl">
          Tài nguyên liên quan
        </h2>
      </div>
      <Tabs className="w-full" defaultValue="flashcard">
        <TabsList className="grid w-[200px] grid-cols-2">
          <TabsTrigger value="flashcard">Thẻ ghi nhớ</TabsTrigger>
          <TabsTrigger value="documents">Tài liệu</TabsTrigger>
        </TabsList>
        <TabsContent value="flashcard">
          <RelatedFlashcard courseId={courseId} />
        </TabsContent>
        <TabsContent value="documents">
          <RelatedDocument courseId={courseId} />
        </TabsContent>
      </Tabs>
    </div>
  );
};
