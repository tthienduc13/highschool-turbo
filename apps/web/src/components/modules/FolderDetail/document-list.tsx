"use client";

import { IconFileTypePdf } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import {
  useAuthorsQuery,
  useRemoveDocumentMutation,
} from "@highschool/react-query/queries";

import { useFolder } from "@/hooks/use-folder";
import { DocumentCard } from "@/components/core/common/document-card";

export const DocumentList = () => {
  const folder = useFolder();
  const [userIds, setUserIds] = useState<string[]>([]);

  const { data: user, isLoading: userLoading } = useAuthorsQuery({ userIds });
  const removeDocument = useRemoveDocumentMutation();

  useEffect(() => {
    if (folder.documents) {
      const uniqueUserIds = Array.from(
        new Set(
          folder.documents.map(
            (document: { createdBy: string }) => document.createdBy,
          ),
        ),
      );

      setUserIds(uniqueUserIds);
    }
  }, [folder.documents]);

  if (!folder.documents) {
    return null;
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-row items-center gap-2">
        <IconFileTypePdf size={24} />
        <h2 className="whitespace-nowrap text-2xl font-bold">
          Tài liệu ({folder.folderUser.countDocument})
        </h2>
      </div>
      <div className="grid w-full grid-cols-[repeat(auto-fill,minmax(256px,1fr))] gap-4">
        {folder.documents?.map((document) => {
          const matchedUser = user?.find(
            (user) => user.id === document.createdBy,
          );

          return (
            <DocumentCard
              key={document.id}
              removable
              data={document}
              user={{
                fullname: matchedUser?.fullname!,
                image: matchedUser?.profilePicture!,
              }}
              userLoading={userLoading}
              onRemove={() => {
                removeDocument.mutate({
                  folderId: folder.folderUser.id,
                  documentId: document.id,
                });
              }}
            />
          );
        })}
      </div>
    </div>
  );
};
