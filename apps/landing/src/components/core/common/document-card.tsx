"use client";

import { useRouter } from "next/navigation";
import { useMediaQuery } from "@highschool/hooks";
import { Document } from "@highschool/interfaces";
import { Button } from "@highschool/ui/components/ui/button";
import {
  IconDownload,
  IconEye,
  IconFileLike,
  IconFolder,
} from "@tabler/icons-react";
import Link from "next/link";
import { env } from "@highschool/env";

interface DocumentCardProps {
  data: Document;
}

export const DocumentCard = ({ data }: DocumentCardProps) => {
  const router = useRouter();

  const isDesktop = useMediaQuery("min-width: 1024px");

  const documentName = data.documentName || "Chưa đặt tên";
  const subjectName =
    `${data.subjectCurriculum?.subjectName} - ${data.subjectCurriculum?.curriculumName}` ||
    "Chưa biết";

  const likeCount = data.like ?? 0;
  const viewCount = data.view ?? 0;
  const downloadCount = data.download ?? 0;

  return (
    <div
      key={data.id}
      className="flex w-full flex-col gap-2 rounded-xl border border-gray-200 bg-white shadow-lg md:gap-4 dark:border-gray-700 dark:bg-gray-800"
    >
      <div className="flex flex-col gap-2 border-b p-4">
        <Link
          className="line-clamp-1 cursor-pointer text-sm font-semibold"
          href={`${env.NEXT_PUBLIC_LANDING_URL}/kho-tai-lieu/${data.documentSlug}`}
        >
          {documentName}
        </Link>
        <div className="flex flex-col gap-y-2">
          <div className="flex flex-row items-center gap-1 md:gap-2">
            <IconFolder size={14} />
            <div className="text-xs font-medium md:text-sm">{subjectName}</div>
          </div>
          <div className="flex flex-row items-center justify-between">
            <p className="text-sm font-semibold md:text-base">
              {data.documentYear} - {data.documentYear + 1}
            </p>
            <div className="flex flex-row items-center gap-x-4">
              <div className="flex flex-row items-center gap-x-2">
                <IconFileLike size={18} />
                <div className="text-sm font-medium md:text-base">
                  {likeCount}
                </div>
              </div>
              <div className="flex flex-row items-center gap-x-2">
                <IconEye size={18} />
                <div className="text-sm font-medium md:text-base">
                  {viewCount}
                </div>
              </div>
              <div className="flex flex-row items-center gap-x-2">
                <IconDownload size={18} />
                <div className="text-sm font-medium md:text-base">
                  {downloadCount}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex w-full flex-row gap-x-2 px-4 pb-2 md:w-full">
        <Button
          className="flex-1 border-gray-50 dark:border-gray-800"
          size={isDesktop ? "lg" : "sm"}
          variant="ghost"
          onClick={() => router.push("/kho-tai-lieu/" + data.documentSlug)}
        >
          Xem
        </Button>
        <Button
          className="w-full gap-2 md:w-3/4"
          size={isDesktop ? "lg" : "sm"}
          variant="default"
        >
          <IconDownload size={18} />
          Tải tài liệu
        </Button>
      </div>
    </div>
  );
};
