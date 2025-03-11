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
import { IconBookmark, IconClock, IconShare } from "@tabler/icons-react";

import { NewsLoading } from "../Author";

import { SpinnerLoading } from "@/components/core/common/spinner-loading";
import { NewsCard } from "@/components/core/common/new-card";

// Font styles
const fontStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Source+Serif+4:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400;1,600&display=swap');

  .medium-content {
    font-family: 'Source Serif 4', serif;
  }

  .medium-content h1 {
    font-family: 'Source Serif 4', serif;
    font-weight: 700;
    font-size: 2.5rem;
    line-height: 1.2;
    letter-spacing: -0.03em;
  }

  .medium-content .article-body {
    font-family: 'Source Serif 4', serif;
    font-size: 1.25rem;
    line-height: 1.7;
    color: rgba(0, 0, 0, 0.84);
  }

  .medium-sans {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  }
`;

function NewsDetailModule() {
  const { slug } = useParams();
  const { data: newDetail, isLoading: newsLoading } = useNewBySlugQuery(
    slug as string,
  );

  const { data: relatedNews, isLoading: relatedLoading } = useRelatedNewsQuery({
    newsId: newDetail?.id!,
    newsTagId: newDetail?.newsTagId!,
    location: newDetail?.location!,
  });

  if (newsLoading) return <SpinnerLoading />;

  const formattedDate = newDetail?.createdAt
    ? new Date(newDetail.createdAt).toLocaleDateString("vi-VN", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "";

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: fontStyles }} />

      <div className="medium-content mx-auto max-w-4xl px-4 py-8">
        {/* Topic Tag */}
        <div className="mb-6">
          <Link
            className="medium-sans text-sm font-medium text-gray-600 hover:text-gray-900"
            href="/tin-tuc"
          >
            Tin tức
          </Link>
        </div>

        {/* Article Title */}
        <h1 className="mb-6 text-[2.5rem] font-bold leading-[1.2] tracking-tight">
          {newDetail?.newName}
        </h1>

        {/* Subtitle - if available
        {newDetail?.subtitle && (
          <h2 className="mb-6 text-xl font-normal leading-snug text-gray-700">
            {newDetail.subtitle}
          </h2>
        )} */}

        {/* Author Info and Article Meta */}
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {newDetail?.author && (
              <Link
                className="flex items-center gap-2"
                href={
                  newDetail.author.authorName
                    ? `/tac-gia/${newDetail.author.authorId}`
                    : ""
                }
              >
                <Avatar className="size-[48px] border border-gray-100">
                  <AvatarImage
                    alt={newDetail.author.authorName}
                    src={newDetail.author.authorImage}
                  />
                  <AvatarFallback className="bg-emerald-100 font-medium text-emerald-800">
                    {newDetail.author.authorName
                      ?.substring(0, 2)
                      .toUpperCase() || "HS"}
                  </AvatarFallback>
                </Avatar>

                <div className="medium-sans flex flex-col">
                  <span className="font-medium text-gray-900">
                    {newDetail.author.authorName ?? "Tác giả Highschool"}
                  </span>
                  <div className="flex items-center gap-1 text-sm text-gray-600">
                    <span>{formattedDate}</span>
                    <span>·</span>
                    <span className="flex items-center">
                      <IconClock className="mr-1 size-3.5" />
                      {estimateReadingTime(newDetail?.content!)} phút đọc
                    </span>
                  </div>
                </div>
              </Link>
            )}
          </div>

          <div className="medium-sans flex items-center gap-2">
            <button className="rounded-full p-2 hover:bg-gray-100">
              <IconBookmark className="size-5 text-gray-700" />
            </button>
            <button className="rounded-full p-2 hover:bg-gray-100">
              <IconShare className="size-5 text-gray-700" />
            </button>
          </div>
        </div>

        {/* Feature Image */}
        <figure className="mb-10">
          <div className="relative aspect-[1.91/1] w-full overflow-hidden">
            <Image
              fill
              priority
              alt={newDetail?.newName ?? ""}
              className="object-cover"
              quality={100}
              sizes="(max-width: 768px) 100vw, 680px"
              src={newDetail?.image ?? ""}
            />
          </div>
          <figcaption className="medium-sans mt-2 text-center text-sm text-gray-500">
            {newDetail?.image || "Visualization of Artificial Intelligence"}
          </figcaption>
        </figure>

        {/* Article Content */}
        <article className="article-body mb-12">
          <div
            dangerouslySetInnerHTML={{ __html: newDetail?.contentHtml! }}
            className="prose prose-headings:font-serif prose-headings:font-bold prose-headings:tracking-tight prose-h2:text-3xl prose-p:text-xl prose-p:leading-relaxed prose-p:my-5 prose-img:my-8 prose-a:text-green-600 prose-a:no-underline hover:prose-a:underline prose-blockquote:border-l-green-600 prose-blockquote:font-serif prose-blockquote:text-2xl prose-blockquote:font-light prose-blockquote:leading-normal prose-blockquote:text-gray-700 max-w-none"
          />
        </article>

        {/* Tags - if available */}

        <div className="medium-sans mb-10 flex flex-wrap gap-2">
          <Link
            className="rounded-full bg-gray-100 px-4 py-2 text-sm text-gray-700 hover:bg-gray-200"
            href={`/tin-tuc/tag/${newDetail?.newsTagId}`}
          >
            {newDetail?.newsTagName}
          </Link>
        </div>

        {/* Article Footer */}
        <div className="medium-sans border-t border-gray-200 pt-6 text-sm text-gray-500">
          <p>
            Bài viết này được cập nhật lần cuối ngày{" "}
            {formatDate(newDetail?.createdAt!)}
          </p>
        </div>

        {/* Author Card */}
        <div className="medium-sans mt-10 flex flex-row items-start justify-between rounded-xl bg-gray-50 p-6">
          {newDetail?.author && (
            <div className="flex gap-4">
              <Avatar className="size-[64px] border border-gray-100">
                <AvatarImage
                  alt={newDetail.author.authorName}
                  src={newDetail.author.authorImage}
                />
                <AvatarFallback className="text-lg">
                  {newDetail.author.authorName?.substring(0, 2).toUpperCase() ||
                    "HS"}
                </AvatarFallback>
              </Avatar>

              <div className="flex flex-col">
                <p className="text-sm text-gray-600">Viết bởi</p>
                <h3 className="mb-1 text-lg font-medium">
                  {newDetail.author.authorName ?? "Tác giả Highschool"}
                </h3>
              </div>
            </div>
          )}
          <button className=" self-start rounded-full bg-green-600 px-4 py-1.5 text-sm font-medium text-white hover:bg-green-700">
            Theo dõi
          </button>
        </div>
        <div className="medium-sans mt-10 flex flex-col gap-5">
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

      {/* Related Articles */}
    </>
  );
}

export default NewsDetailModule;
