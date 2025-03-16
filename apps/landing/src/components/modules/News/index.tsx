"use client";

import { Separator } from "@highschool/ui/components/ui/separator";
import {
  useHotNewsQuery,
  usePopularNewsQuery,
} from "@highschool/react-query/queries";

import { LatestNews } from "./latest-new";
import { PopularNews } from "./popular-new";
import { TopNews } from "./top-new";

import { SpinnerLoading } from "@/components/core/common/spinner-loading";

function NewsModule() {
  const { data: news, isLoading: newsLoading } = useHotNewsQuery();
  const { data: popularNews, isLoading: popularNewsLoading } =
    usePopularNewsQuery();

  const isLoading = newsLoading || popularNewsLoading;

  if (isLoading) {
    return <SpinnerLoading />;
  }

  return (
    <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-10 p-4 lg:gap-20 xl:px-20 xl:py-[60px]">
      <TopNews news={news ?? []} />
      <Separator />
      <div className="flex flex-col gap-10 lg:grid lg:grid-cols-12 lg:gap-8 lg:space-y-0">
        <div className="order-2 lg:order-1 lg:col-span-8">
          <LatestNews />
        </div>
        <div className="order-1 lg:order-2 lg:col-span-4">
          <PopularNews news={popularNews ?? []} />
        </div>
      </div>
    </div>
  );
}

export default NewsModule;
