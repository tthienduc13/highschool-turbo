"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Input } from "@highschool/ui/components/ui/input";
import { IconSearch } from "@tabler/icons-react";
import { useSearchQuery } from "@highschool/react-query/queries";
import {
  Course,
  Document,
  Flashcard,
  Pagination,
  SearchAll,
  SearchType,
} from "@highschool/interfaces";
import Image from "next/image";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@highschool/ui/components/ui/tabs";

import { AllResult } from "@/components/core/search/tabs/all-results";
import { StudySets } from "@/components/core/search/tabs/study-sets";
import { WithFooter } from "@/components/core/common/with-footer";
import { Container } from "@/components/core/layouts/container";
import { Documents } from "@/components/core/search/tabs/documents";
import { Courses } from "@/components/core/search/tabs/courses";

function SearchModule() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const _searchQuery = searchParams.get("q");
  const _type = searchParams.get("type") as SearchType;

  const { data, isLoading } = useSearchQuery({
    type: _type ?? SearchType.All,
    value: _searchQuery!,
    pageNumber: 1,
    pageSize: _type === SearchType.All ? 4 : 8,
  });

  const handleSearch = (search: string) => {
    const params = new URLSearchParams(searchParams);

    if (search) {
      params.set("q", search);
    } else {
      params.delete("q");
    }
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <WithFooter>
      <Container className="flex flex-col gap-4" maxWidth="7xl">
        <div className="flex flex-col gap-2">
          <div className="flex h-12 w-full items-center gap-2 rounded-lg border-2 border-gray-200 bg-white px-4 transition-all duration-200 focus-within:border-blue-600 dark:bg-gray-800">
            <IconSearch />
            <Input
              className="size-full border-none !text-lg font-semibold shadow-none focus-visible:ring-0 dark:border-gray-700"
              defaultValue={_searchQuery!}
              placeholder="Tìm kiếm"
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>
          <h1 className="text-xl font-semibold">
            Kết quả tìm kiếm cho &quot;{_searchQuery}&quot;
          </h1>
        </div>
        <div className="flex flex-col gap-6">
          <Tabs className="w-full" defaultValue={_type ?? SearchType.All}>
            <TabsList
              className="mb-5 h-10 w-full border-b-2 border-gray-200 p-0 dark:border-gray-800/50 "
              variant={"outline"}
            >
              <TabsTrigger
                className="h-10 text-sm data-[state=active]:border-b-blue-800 data-[state=active]:text-blue-700 md:text-base dark:data-[state=active]:border-b-blue-400 dark:data-[state=active]:text-blue-400"
                value={SearchType.All}
                variant={"outline"}
                onClick={() => {
                  router.push(
                    `/search?q=${_searchQuery?.trim() ?? ""}&type=${SearchType.All}`,
                  );
                }}
              >
                Tất cả
              </TabsTrigger>
              <TabsTrigger
                className="h-10 text-sm  data-[state=active]:border-b-blue-800 data-[state=active]:text-blue-700 md:text-base dark:data-[state=active]:border-b-blue-400 dark:data-[state=active]:text-blue-400"
                value={SearchType.Flashcard}
                variant={"outline"}
                onClick={() => {
                  router.push(
                    `/search?q=${_searchQuery?.trim() ?? ""}&type=${SearchType.Flashcard}`,
                  );
                }}
              >
                Thẻ ghi nhớ
              </TabsTrigger>
              {/* <TabsTrigger
                className="h-10 text-sm  data-[state=active]:border-b-blue-800 data-[state=active]:text-blue-700 md:text-base dark:data-[state=active]:border-b-blue-400 dark:data-[state=active]:text-blue-400"
                value={SearchType.Folder}
                variant={"outline"}
                onClick={() => {
                  router.push(
                    `/search?q=${_searchQuery?.trim() ?? ""}&type=${SearchType.Folder}`,
                  );
                }}
              >
                Thư mục
              </TabsTrigger> */}
              <TabsTrigger
                className="h-10 text-sm  data-[state=active]:border-b-blue-800 data-[state=active]:text-blue-700 md:text-base dark:data-[state=active]:border-b-blue-400 dark:data-[state=active]:text-blue-400"
                value={SearchType.Subject}
                variant={"outline"}
                onClick={() => {
                  router.push(
                    `/search?q=${_searchQuery?.trim() ?? ""}&type=${SearchType.Subject}`,
                  );
                }}
              >
                Môn học
              </TabsTrigger>
              <TabsTrigger
                className="h-10 text-sm  data-[state=active]:border-b-blue-800 data-[state=active]:text-blue-700 md:text-base dark:data-[state=active]:border-b-blue-400 dark:data-[state=active]:text-blue-400"
                value={SearchType.Document}
                variant={"outline"}
                onClick={() => {
                  router.push(
                    `/search?q=${_searchQuery?.trim() ?? ""}&type=${SearchType.Document}`,
                  );
                }}
              >
                Tài liệu
              </TabsTrigger>
              {/* <TabsTrigger
                className="h-10 text-sm  data-[state=active]:border-b-blue-800 data-[state=active]:text-blue-700 md:text-base dark:data-[state=active]:border-b-blue-400 dark:data-[state=active]:text-blue-400"
                value={SearchType.News}
                variant={"outline"}
                onClick={() => {
                  router.push(
                    `/search?q=${_searchQuery?.trim() ?? ""}&type=${SearchType.News}`,
                  );
                }}
              >
                Hướng dẫn
              </TabsTrigger> */}
            </TabsList>
            <TabsContent value={SearchType.All}>
              {isLoading ? (
                <div />
              ) : data ? (
                <AllResult data={data.data as SearchAll} />
              ) : (
                <SearchNotFound query={_searchQuery!} />
              )}
            </TabsContent>
            <TabsContent value={SearchType.Flashcard}>
              {isLoading ? (
                <div />
              ) : data ? (
                <StudySets data={data as Pagination<Flashcard[]>} />
              ) : (
                <SearchNotFound query={_searchQuery!} />
              )}
            </TabsContent>
            <TabsContent value={SearchType.Subject}>
              {isLoading ? (
                <div />
              ) : data ? (
                <Courses data={data as Pagination<Course[]>} />
              ) : (
                <SearchNotFound query={_searchQuery!} />
              )}
            </TabsContent>
            <TabsContent value={SearchType.Document}>
              {isLoading ? (
                <div />
              ) : data ? (
                <Documents data={data as Pagination<Document[]>} />
              ) : (
                <SearchNotFound query={_searchQuery!} />
              )}
            </TabsContent>
          </Tabs>
        </div>
      </Container>
    </WithFooter>
  );
}

export default SearchModule;

interface SearchNotFoundProps {
  query: string;
}

const SearchNotFound = ({ query }: SearchNotFoundProps) => {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-4">
      <Image
        alt="No study sets"
        height={100}
        src="/icons/empty-search.svg"
        width={350}
      />
      <div className="text-lg font-semibold">
        Không tìm thấy kết quả cho &quot;{query}&quot;
      </div>
      <div className="text-base">
        Hãy thử lại với từ khóa khác hoặc kiểm tra lại cú pháp của từ khóa
      </div>
    </div>
  );
};
