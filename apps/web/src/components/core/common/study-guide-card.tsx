import { Avatar, AvatarImage } from "@highschool/ui/components/ui/avatar";
import { IconDiscountCheck } from "@tabler/icons-react";
import Link from "next/link";

interface StudyGuideCardProps {
  title: string;
  slug: string;
  authorName?: string;
  authorImage?: string;
}

export const StudyGuideCard = ({
  title,
  slug,
  authorImage,
  authorName,
}: StudyGuideCardProps) => {
  return (
    <Link passHref href={`/study-guide/${slug}`}>
      <div className="flex size-full cursor-pointer flex-row rounded-lg border-2 border-gray-200 bg-white shadow-md dark:border-gray-700 dark:bg-gray-800 md:flex-col">
        <div className="flex flex-col gap-5 p-5">
          <h2 className="line-clamp-1 overflow-hidden text-ellipsis text-lg font-bold">
            {title}
          </h2>
          <div className="flex w-full flex-row items-center gap-2">
            <Avatar className="size-6">
              <AvatarImage
                alt={authorName ?? "Người dùng Highschool"}
                src={authorImage ?? "/logo.svg"}
              />
            </Avatar>
            <div className="flex flex-row items-center gap-1">
              <div className="text-sm font-semibold">
                {authorName ?? "Người dùng Highschool"}
              </div>

              <IconDiscountCheck
                aria-label="Verified"
                className="text-primary"
                size={18}
              />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};
