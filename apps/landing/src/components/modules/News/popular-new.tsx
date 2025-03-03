import Image from "next/image";
import Link from "next/link";
import { News } from "@highschool/interfaces";
import { formatDate } from "@highschool/lib/date";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@highschool/ui/components/ui/avatar";
import { Separator } from "@highschool/ui/components/ui/separator";

interface PopularNewsProps {
  news: News[];
}

export const PopularNews = ({ news }: PopularNewsProps) => {
  if (!news || news.length === 0) {
    return (
      <div className="flex w-full flex-col gap-8 lg:col-span-4">
        <h2 className="text-2xl font-bold lg:text-3xl">Phổ biến</h2>
        <p>Không có tin tức phổ biến</p>
      </div>
    );
  }

  const topNews = news[0];

  return (
    <div className="flex w-full flex-col gap-8 lg:col-span-4">
      <h2 className="text-2xl font-bold lg:text-3xl">Phổ biến</h2>
      <div className="flex flex-col gap-4">
        {topNews?.image ? (
          <div className="relative aspect-video w-full overflow-hidden rounded-lg">
            <Image
              fill
              alt={topNews?.newName || "News"}
              className="object-cover transition-transform group-hover:scale-105"
              src={topNews.image}
            />
          </div>
        ) : (
          <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-gray-200">
            {/* Placeholder for missing image */}
            <p className="flex h-full items-center justify-center text-gray-500">
              Không có hình ảnh
            </p>
          </div>
        )}
        <div className="flex flex-col gap-2">
          <h3 className="line-clamp-2 font-medium group-hover:text-blue-500 md:text-lg">
            {topNews?.newName || "Unnamed News"}
          </h3>
          <div className="flex flex-row items-center gap-4">
            <Avatar className="size-8">
              {topNews?.author?.authorImage ? (
                <AvatarImage
                  alt={topNews.author.authorName || "Author"}
                  src={topNews.author.authorImage}
                />
              ) : (
                <AvatarFallback>
                  {topNews?.author?.authorName || "N/A"}
                </AvatarFallback>
              )}
            </Avatar>
            <Link
              className="flex flex-col"
              href={`/tac-gia/${topNews?.author?.authorId || "#"}`}
            >
              <p className="text-xs">
                {topNews?.author?.authorName || "Unknown Author"}
              </p>
              <p className="text-muted-foreground text-xs">
                {topNews?.createdAt
                  ? formatDate(topNews.createdAt)
                  : "Unknown Date"}
              </p>
            </Link>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-6">
        {news.slice(1, 4).map((newsItem) => (
          <Link
            key={newsItem?.id || Math.random()}
            className="group flex gap-4"
            href={`/tin-tuc/${newsItem?.slug || "#"}`}
          >
            <div className="relative aspect-video w-1/3 overflow-hidden rounded-lg">
              {newsItem?.image ? (
                <Image
                  fill
                  alt={newsItem?.newName || "News"}
                  className="object-cover transition-transform group-hover:scale-105"
                  src={newsItem.image}
                />
              ) : (
                <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-gray-200">
                  {/* Placeholder for missing image */}
                  <p className="flex h-full items-center justify-center text-gray-500">
                    Image not available
                  </p>
                </div>
              )}
            </div>
            <div className="flex w-2/3 flex-col gap-2">
              <h3 className="line-clamp-2 font-medium group-hover:text-blue-500">
                {newsItem?.newName || "Unnamed News"}
              </h3>
              <div className="text-muted-foreground flex items-center gap-2 text-sm">
                <span>
                  {newsItem?.createdAt
                    ? formatDate(newsItem.createdAt)
                    : "Unknown Date"}
                </span>
                <Separator className="h-4" orientation="vertical" />
                <span>
                  {newsItem?.view ? `${newsItem.view} views` : "No views"}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
