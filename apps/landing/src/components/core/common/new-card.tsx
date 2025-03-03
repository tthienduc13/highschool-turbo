import Image from "next/image";
import Link from "next/link";
import { News } from "@highschool/interfaces";
import { formatDate } from "@highschool/lib/date";
import { estimateReadingTime } from "@highschool/lib/estimate-reading-time";
import { Avatar } from "@highschool/ui/components/ui/avatar";
import { Separator } from "@highschool/ui/components/ui/separator";

interface NewCardProps {
  news: News;
}

export const NewsCard = ({ news }: NewCardProps) => {
  return (
    <div className="group relative grid grid-cols-1 gap-4 transition-colors sm:grid-cols-3 sm:gap-6">
      <Link
        className="relative aspect-video w-full overflow-hidden rounded-lg sm:col-span-1"
        href={`/tin-tuc/${news.slug}`}
      >
        <Image
          fill
          alt={news.newName}
          className="object-cover transition-transform group-hover:scale-105"
          src={news.image}
        />
      </Link>
      <div className="flex w-full flex-col gap-2 sm:col-span-2 sm:gap-4">
        <div className="w-fit rounded-md bg-blue-500 px-3 py-1 text-xs font-medium text-white">
          {news.newsTagName.toUpperCase()}
        </div>
        <Link href={`/tin-tuc/${news.slug}`}>
          <h3 className="line-clamp-2 text-base font-semibold sm:text-lg md:text-xl">
            {news.newName}
          </h3>
          <p className="text-muted-foreground mt-2 line-clamp-2 text-sm sm:text-base">
            {news.content}
          </p>
        </Link>
        <div className="mt-auto flex flex-wrap items-center gap-2 sm:gap-4">
          {news.author && (
            <Link
              className="flex items-center gap-2"
              href={`/tac-gia/${news.author.authorId}`}
            >
              <Avatar className="size-6">
                <Image
                  alt={news.author.authorName}
                  className="rounded-full"
                  height={24}
                  src={news.author.authorImage ?? ""}
                  width={24}
                />
              </Avatar>
              <span className="text-xs font-medium sm:text-sm">
                {news.author.authorName}
              </span>
            </Link>
          )}
          <Separator className="hidden h-4 sm:block" orientation="vertical" />
          <span className="text-muted-foreground text-xs sm:text-sm">
            {formatDate(news.createdAt)}
          </span>
          <Separator className="hidden h-4 sm:block" orientation="vertical" />
          <span className="text-muted-foreground text-xs sm:text-sm">
            {estimateReadingTime(news.content)} phút đọc
          </span>
        </div>
      </div>
    </div>
  );
};
