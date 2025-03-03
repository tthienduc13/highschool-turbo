"use client";

import { Fragment } from "react";
import { useInfiniteNewsQuery } from "@highschool/react-query/queries";
import { Button } from "@highschool/ui/components/ui/button";
import { Separator } from "@highschool/ui/components/ui/separator";
import { Skeleton } from "@highschool/ui/components/ui/skeleton";
import { IconLoader2 } from "@tabler/icons-react";

import { NewsCard } from "@/components/core/common/new-card";

export const LatestNews = () => {
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isLoading,
    isFetchingNextPage,
  } = useInfiniteNewsQuery();

  if (isLoading) {
    return <LatestNewsSkeleton />;
  }

  if (error) {
  }

  if (!data || data.pages.length === 0) {
    return (
      <div className="flex w-full flex-col items-center justify-center gap-4 p-8 text-center">
        <h2 className="text-2xl font-bold">Không có tin </h2>
        <p className="text-muted-foreground">Hãy quay lại sau</p>
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col gap-5 lg:col-span-8 lg:gap-8">
      <h2 className="text-2xl font-bold lg:text-3xl">Gần đây</h2>
      {data.pages.map((group, i) => (
        <Fragment key={i}>
          {group.data.map((newsItem, index) => (
            <div key={newsItem.id}>
              <NewsCard news={newsItem} />
              {index < group.data.length - 1 && <Separator className="mt-4" />}
            </div>
          ))}
        </Fragment>
      ))}
      <div className="flex w-full justify-center">
        <Button
          disabled={!hasNextPage || isFetchingNextPage}
          size={"lg"}
          variant={"outline"}
          onClick={() => fetchNextPage()}
        >
          {isFetching ? (
            <IconLoader2 className="animate-spin" />
          ) : hasNextPage ? (
            "Xem thêm"
          ) : (
            "Hết bài viết"
          )}
        </Button>
      </div>
    </div>
  );
};

const LatestNewsSkeleton = () => (
  <div className="flex w-full flex-col gap-5 lg:col-span-8 lg:gap-8">
    <Skeleton className="h-8 w-40" />
    {[...Array(4)].map((_, index) => (
      <div key={index} className="space-y-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-6">
          <Skeleton className="aspect-video w-full sm:col-span-1" />
          <div className="space-y-2 sm:col-span-2">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-4 w-full" />
            <div className="flex items-center gap-2 pt-2">
              <Skeleton className="size-6 rounded-full" />
              <Skeleton className="h-4 w-24" />
            </div>
          </div>
        </div>
        {index < 3 && <Separator className="mt-4" />}
      </div>
    ))}
  </div>
);
