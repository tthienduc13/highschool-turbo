"use client";

import { useFolder } from "@/hooks/use-folder";
import { IconFileTypePdf } from "@tabler/icons-react";

export const DocumentList = () => {
    const folder = useFolder();
    return (
        <div className="flex flex-col gap-6 ">
            <div className="flex flex-row items-center gap-2">
                <IconFileTypePdf size={24} />
                <h2 className="text-2xl font-bold whitespace-nowrap">
                    Tài liệu ({folder.folderUser.countDocument})
                </h2>
            </div>
        </div>
    );
};
