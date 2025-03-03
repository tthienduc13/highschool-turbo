"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { formatDate } from "@highschool/lib/date";
import { estimateReadingTime } from "@highschool/lib/estimate-reading-time";
import {
  useNewBySlugQuery,
  useRelatedNewsQuery,
} from "@highschool/react-query/queries";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@highschool/ui/components/ui/avatar";
import { IconClock } from "@tabler/icons-react";

import { NewsLoading } from "../Author";

import { Breadcrumbs } from "@/components/core/common/bread-crumbs";
import { NewsCard } from "@/components/core/common/new-card";

function NewsDetailModule() {
  const { slug } = useParams();
  const { data: newDetail, isLoading: newsLoading } = useNewBySlugQuery(
    slug as string,
  );
  const breadcrumbItems = [
    { title: "Tin tức", link: "/tin-tuc" },
    { title: newDetail?.newName ?? "", link: "" },
  ];

  const { data: relatedNews, isLoading: relatedLoading } = useRelatedNewsQuery({
    newsId: newDetail?.id!,
    newsTagId: newDetail?.newsTagId!,
    location: newDetail?.location!,
  });

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <div className="mb-10">
        <Breadcrumbs items={breadcrumbItems} />
      </div>

      <div className="mb-8 text-left">
        <p className="text-muted-foreground mb-4 text-left">
          {formatDate(newDetail?.createdAt!)}
        </p>
        <h1 className="mb-4 text-4xl font-bold leading-tight">
          {newDetail?.newName}
        </h1>
        <div className="flex items-center justify-between space-x-4 text-sm text-gray-600">
          {newDetail?.author && (
            <Link
              className="flex items-center gap-2"
              href={
                newDetail.author.authorName
                  ? `/tac-gia/${newDetail.author.authorId}`
                  : ""
              }
            >
              <Avatar>
                <AvatarImage
                  alt={newDetail.author.authorName}
                  src={newDetail.author.authorImage}
                />
                <AvatarFallback>HS</AvatarFallback>
              </Avatar>
              <p>{newDetail.author.authorName ?? "Tác giả Highschool"}</p>
            </Link>
          )}
          <span className="flex items-center">
            <IconClock className="mr-1 size-4" />
            {estimateReadingTime(newDetail?.content!)} phút đọc
          </span>
        </div>
      </div>

      <figure className="mb-8">
        <Image
          priority
          alt={newDetail?.newName ?? ""}
          className="rounded-lg object-cover"
          height={400}
          layout="responsive"
          quality={100}
          sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 33vw"
          src={newDetail?.image ?? ""}
          width={800}
        />
        <figcaption className="mt-2 text-center text-sm text-gray-600">
          Image caption: Visualization of Artificial Intelligence
        </figcaption>
      </figure>

      <div className="flex flex-col gap-8 md:flex-row">
        <aside className="font-sans md:w-1/4">
          {/* <div className="sticky top-4">
            <div className="mb-4 rounded-lg bg-gray-100 p-4">
              <h2 className="mb-2 text-lg font-bold">Quick Facts</h2>
              <ul className="list-inside list-disc text-sm">
                <li>AI is transforming healthcare and finance</li>
                <li>Ethical considerations are crucial</li>
                <li>AI has potential to solve complex problems</li>
              </ul>
            </div>
            <div className="text-sm text-gray-600">
              <p>
                Danh mục:{" "}
                <Link href="" className="text-theme_color">
                  {newDetail?.newsTagName}
                </Link>
              </p>
              <p>{newDetail?.view} views</p>
            </div>
          </div> */}
        </aside>

        <main className="md:w-3/4">
          <div
            dangerouslySetInnerHTML={{ __html: newDetail?.contentHtml! }}
            className="prose max-w-none"
          />
          <div className="mt-8 border-t border-gray-300 pt-4 text-sm text-gray-600">
            <p>
              Bài viết này được cập nhật lần cuối ngày{" "}
              {formatDate(newDetail?.createdAt!)}.
            </p>
          </div>
        </main>
      </div>

      <div className="mt-10 flex flex-col gap-5">
        <h2 className="text-base font-bold lg:text-xl">Bài viết liên quan</h2>
        <div className="flex flex-col gap-5">
          {relatedLoading ? (
            <NewsLoading />
          ) : (
            relatedNews?.map((news) => <NewsCard key={news.id} news={news} />)
          )}
        </div>
      </div>
    </div>
  );
}

export default NewsDetailModule;
