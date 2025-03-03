"use client";

import {
  useAuthorNewQuery,
  useAuthorQuery,
} from "@highschool/react-query/queries";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@highschool/ui/components/ui/avatar";
import { Separator } from "@highschool/ui/components/ui/separator";
import { Skeleton } from "@highschool/ui/components/ui/skeleton";
import { IconRosetteDiscountCheck } from "@tabler/icons-react";

import { Breadcrumbs } from "@/components/core/common/bread-crumbs";
import { NewsCard } from "@/components/core/common/new-card";

interface AuthorProps {
  id: string;
}

export default function AuthorModule({ id }: AuthorProps) {
  const { data: authorData, isLoading: authorLoading } = useAuthorQuery({
    authorId: id,
  });
  const { data: newsData, isLoading: newsLoading } = useAuthorNewQuery({
    authorId: id,
  });

  const breadcrumbItems = [
    { title: "Tin tức", link: "/tin-tuc" },
    { title: "Tác giả", link: "" },
    { title: authorData?.data?.fullname || "Tác giả", link: "" },
  ];

  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-8 p-4 lg:gap-10 xl:px-20 xl:py-10">
      <Breadcrumbs items={breadcrumbItems} />

      {authorLoading ? (
        <AuthorSkeleton />
      ) : (
        <AuthorDetails
          name={authorData?.data?.fullname}
          profilePicture={authorData?.data?.profilePicture}
        />
      )}

      <div className="flex flex-col gap-4">
        <h2 className="text-base font-bold lg:text-xl">Tất cả bài viết</h2>
        <Separator />
        {newsLoading ? (
          <NewsLoading />
        ) : newsData!.length > 0 ? (
          <NewsList newsData={newsData!} />
        ) : (
          <div className="text-center font-semibold">
            Tác giả này chưa có bài viết nào
          </div>
        )}
      </div>
    </div>
  );
}

const AuthorDetails = ({
  name,
  profilePicture,
}: {
  name: string | undefined;
  profilePicture: string | undefined;
}) => (
  <div className="flex items-center gap-4">
    <Avatar className="size-14">
      <AvatarImage alt={name || "Tác giả"} src={profilePicture} />
      <AvatarFallback>HS</AvatarFallback>
    </Avatar>
    <div className="flex items-center gap-2">
      <h2 className="text-base font-bold md:text-xl lg:text-3xl">{name}</h2>
      <IconRosetteDiscountCheck className="text-theme_color" />
    </div>
  </div>
);

const NewsList = ({ newsData }: { newsData: any[] }) => (
  <div className="flex flex-col gap-4">
    {newsData?.map((data, index) => (
      <div key={data.id}>
        <NewsCard news={data} />
        {index < newsData.length - 1 && <Separator className="mt-4" />}
      </div>
    ))}
  </div>
);

const AuthorSkeleton = () => (
  <div className="flex items-center gap-2">
    <Skeleton className="size-14 rounded-full" />
    <Skeleton className="h-5 w-[150px]" />
  </div>
);

export const NewsLoading = () => (
  <div className="flex flex-col gap-4">
    {Array.from({ length: 3 }).map((_, index) => (
      <div
        key={index}
        aria-hidden="true"
        className="group relative grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-6"
      >
        <div className="relative aspect-video w-full overflow-hidden rounded-lg sm:col-span-1">
          <Skeleton className="size-full" />
        </div>
        <div className="flex flex-col gap-2 sm:col-span-2 sm:gap-4">
          <Skeleton className="h-6 w-20" />
          <Skeleton className="h-6 w-full sm:h-7 md:h-8" />
          <Skeleton className="h-4 w-full sm:h-5" />
          <Skeleton className="h-4 w-3/4 sm:h-5" />
          <div className="mt-auto flex flex-wrap items-center gap-2 sm:gap-4">
            <div className="flex items-center gap-2">
              <Skeleton className="size-6 rounded-full" />
              <Skeleton className="h-4 w-24 sm:h-5" />
            </div>
            <Skeleton className="h-4 w-20 sm:h-5" />
            <Skeleton className="h-4 w-24 sm:h-5" />
          </div>
        </div>
      </div>
    ))}
  </div>
);
