"use client";

import { IconFileTypePdf } from "@tabler/icons-react";

import { useFolder } from "@/hooks/use-folder";

export const DocumentList = () => {
  const folder = useFolder();
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-row items-center gap-2">
        <IconFileTypePdf size={24} />
        <h2 className="whitespace-nowrap text-2xl font-bold">
          Tài liệu ({folder.folderUser.countDocument})
        </h2>
      </div>
    </div>
  );
};
