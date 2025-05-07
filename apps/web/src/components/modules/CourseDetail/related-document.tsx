import {
  useAuthorsQuery,
  useDocumentQuery,
} from "@highschool/react-query/queries";
import { Skeleton } from "@highschool/ui/components/ui/skeleton";
import { useEffect, useState } from "react";

import { DocumentCard } from "@/components/core/common/document-card";

interface RelatedFlashcardProps {
  courseId: string;
}

export const RelatedDocument = ({ courseId }: RelatedFlashcardProps) => {
  const { data, isLoading } = useDocumentQuery({
    pageSize: 1000,
    pageNumber: 1,
    subjectIds: courseId,
  });
  const [userIds, setUserIds] = useState<string[]>([]);

  const { data: users, isLoading: userLoading } = useAuthorsQuery({ userIds });

  useEffect(() => {
    if (data) {
      const uniqueUserIds = Array.from(
        new Set(data.data.map((document) => document.createdBy)),
      );

      setUserIds(uniqueUserIds);
    }
  }, [data]);

  if (isLoading) {
    return (
      <div className="grid grid-cols-[repeat(auto-fill,_minmax(256px,_1fr))] gap-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <Skeleton key={index} className="h-[120px] w-full" />
        ))}
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="grid grid-cols-[repeat(auto-fill,_minmax(256px,_1fr))] gap-4">
      {data &&
        data.data.map((document) => {
          const matchedUser = users?.find(
            (user) => user.id === document.createdBy,
          );

          return (
            <div key={document.id}>
              <DocumentCard
                data={document}
                user={{
                  fullname: matchedUser?.fullname!,
                  image: matchedUser?.profilePicture!,
                }}
                userLoading={userLoading}
                onRemove={() => {}}
              />
            </div>
          );
        })}
    </div>
  );
};
