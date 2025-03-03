"use client";

import Image from "next/image";
import Link from "next/link";
import { News } from "@highschool/interfaces";
import { formatDate } from "@highschool/lib/date";
import { estimateReadingTime } from "@highschool/lib/estimate-reading-time";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@highschool/ui/components/ui/avatar";
import { Separator } from "@highschool/ui/components/ui/separator";

export const TopNews = ({ news }: { news: News[] }) => {
  let hotNewsItem = news.find((newsItem) => newsItem?.hot);
  const otherNewsItems = news.filter((newsItem) => !newsItem?.hot);

  if (!hotNewsItem && otherNewsItems.length > 0) {
    hotNewsItem = otherNewsItems[0];
  }

  return (
    <div className="grid grid-cols-1 items-stretch md:grid-cols-5 md:gap-5 lg:gap-8">
      <div className="col-span-3">
        {hotNewsItem ? (
          <div className="flex h-full flex-col gap-3 lg:gap-8">
            {hotNewsItem?.image && (
              <Link
                className="relative aspect-video h-[180px] w-full overflow-hidden rounded-lg md:h-[230px] lg:h-[400px]"
                href={`/tin-tuc/${hotNewsItem.slug}`}
              >
                <Image
                  fill
                  alt={hotNewsItem.newName || "Hot News"}
                  className="object-fill"
                  src={hotNewsItem.image}
                />
              </Link>
            )}
            <div className="flex flex-col gap-3">
              <div className="flex flex-row items-center gap-4 text-xs lg:text-base">
                {hotNewsItem?.newsTagName && (
                  <div className="text-theme_color cursor-pointer uppercase hover:opacity-80">
                    {hotNewsItem.newsTagName}
                  </div>
                )}
                <Separator
                  className="h-4 w-0.5 lg:h-5 lg:w-1"
                  orientation="vertical"
                />
                <div className="text-muted-foreground">
                  {hotNewsItem?.content
                    ? `${estimateReadingTime(hotNewsItem.content)} phút đọc`
                    : "N/A"}
                </div>
              </div>
              <Link href={`/tin-tuc/${hotNewsItem.slug}`}>
                <h1 className="line-clamp-2 text-lg font-bold lg:text-3xl">
                  {hotNewsItem?.newName || "Tin nóng"}
                </h1>
              </Link>
              <h2 className="text-muted-foreground line-clamp-1 text-sm md:text-base lg:mt-3">
                {hotNewsItem?.content || "No content available"}
              </h2>
            </div>
            <div className="flex flex-row items-center gap-4">
              <Avatar className="size-8 md:size-10">
                {hotNewsItem?.author?.authorImage ? (
                  <AvatarImage
                    alt={hotNewsItem.author.authorName || "Author"}
                    src={hotNewsItem.author.authorImage}
                  />
                ) : (
                  <AvatarFallback>
                    {hotNewsItem?.author?.authorName || "N/A"}
                  </AvatarFallback>
                )}
              </Avatar>
              <Link
                className="flex flex-col"
                href={`/tac-gia/${hotNewsItem?.author?.authorId}`}
              >
                <p className="text-xs md:text-sm">
                  {hotNewsItem?.author?.authorName || "Unknown Author"}
                </p>
                <p className="text-muted-foreground text-xs md:text-sm">
                  {hotNewsItem?.createdAt
                    ? formatDate(hotNewsItem.createdAt)
                    : "Unknown Date"}
                </p>
              </Link>
            </div>
          </div>
        ) : (
          <p>No hot news available</p>
        )}
      </div>

      <div className="mt-10 flex size-full flex-col gap-5 md:col-span-2 md:mt-0">
        {otherNewsItems.map((newsItem) => (
          <div
            key={newsItem?.id}
            className="flex min-h-[84px] w-full flex-row gap-2 md:gap-3 lg:gap-5"
          >
            {newsItem?.image && (
              <Link
                className="relative my-auto h-2/3 w-1/3 overflow-hidden rounded-lg md:h-full"
                href={`/tin-tuc/${newsItem.slug}`}
              >
                <Image
                  fill
                  alt={newsItem.newName || "News Item"}
                  className="rounded-lg object-cover"
                  src={newsItem.image}
                />
              </Link>
            )}
            <Link
              className="flex flex-1 flex-col gap-2"
              href={`/tin-tuc/${newsItem.slug}`}
            >
              <div className="flex flex-row items-center gap-4 text-xs lg:text-base">
                <div className="text-theme_color line-clamp-2 cursor-pointer uppercase hover:opacity-80">
                  {newsItem?.newsTagName || "General"}
                </div>
                <Separator
                  className="hidden h-4 w-0.5 lg:block"
                  orientation="vertical"
                />
                {newsItem?.content && (
                  <div className="text-muted-foreground line-clamp-2 hidden lg:block">
                    {estimateReadingTime(newsItem.content)} phút đọc
                  </div>
                )}
              </div>
              <div className="flex-1">
                <h2 className="line-clamp-2 font-semibold md:text-base">
                  {newsItem?.newName || "News Item"}
                </h2>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};
