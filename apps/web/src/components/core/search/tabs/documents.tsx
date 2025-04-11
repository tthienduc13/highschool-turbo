import { useMediaQuery } from "@highschool/hooks";
import { Document, Pagination } from "@highschool/interfaces";
import { Button } from "@highschool/ui/components/ui/button";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { useAuthorsQuery } from "@highschool/react-query/queries";

import { DocumentCard } from "../../common/document-card";

interface StudySetsProps {
  data?: Pagination<Document[]>;
}

export const Documents = ({ data }: StudySetsProps) => {
  // State management
  const [openFilter, setOpenFilter] = useState(false);
  const [userIds, setUserIds] = useState<string[]>([]);

  const isTablet = useMediaQuery("(min-width: 768px)");
  const { data: users, isLoading: usersLoading } = useAuthorsQuery({ userIds });

  useEffect(() => {
    if (data?.data && Array.isArray(data.data)) {
      const uniqueUserIds = Array.from(
        new Set(data.data.map((document) => document.createdBy)),
      );

      setUserIds(uniqueUserIds);
    }
  }, [data]);

  // Early returns for handling edge cases
  if (!data || !Array.isArray(data.data)) {
    return null;
  }

  const renderFlashcardList = () => (
    <div className="flex flex-col gap-6">
      <h2 className="text-2xl font-semibold">Tài liêụ</h2>
      <div className="flex w-full flex-1 flex-col gap-5">
        {data.data.map((document) => {
          const user = users?.find((user) => user.id === document.createdBy);
          const displayName = user?.fullname || "Người dùng Highschool";
          const profileImage = user?.profilePicture || "/logo.svg";

          return (
            <DocumentCard
              key={document.id}
              data={document}
              user={{
                fullname: displayName,
                image: profileImage,
              }}
              userLoading={usersLoading}
              onRemove={() => {}}
            />
          );
        })}
      </div>
      <div className="flex flex-row items-center justify-between gap-2">
        <Button disabled variant="ghost">
          <IconChevronLeft />
          Trước
        </Button>
        <div className="flex-1 text-center">1</div>
        <Button variant="ghost">
          Sau
          <IconChevronRight />
        </Button>
      </div>
    </div>
  );

  return (
    <>
      <div className="flex flex-col gap-6">
        <div className="grid grid-cols-1 items-stretch gap-0 md:grid-cols-3 md:gap-6">
          {renderFlashcardList()}
        </div>
      </div>
    </>
  );
};
