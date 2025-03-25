"use client";

import { Input } from "@highschool/ui/components/ui/input";
import { IconSearch } from "@tabler/icons-react";
import { useState } from "react";
import { Button } from "@highschool/ui/components/ui/button";
import { useDebounceValue } from "@highschool/hooks";
import { useRouter } from "next/navigation";
import {
  useNewsQuery,
  useProvincesQuery,
} from "@highschool/react-query/queries";
import { Skeleton } from "@highschool/ui/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@highschool/ui/components/ui/select";

import { ComboboxTag } from "../combobox-tag";

import ListNews from "./list-news";

function NewsManagementModule() {
  const [tag, setTag] = useState("");
  const titleHeading = "All blogs";
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();
  const [selectedProvince, setSelectedProvince] = useState<string>("");
  const [page, setPage] = useState(1);

  const debounceSearch: string = useDebounceValue(searchQuery, 300);

  const { data: initialNewsData, isLoading } = useNewsQuery({
    search: debounceSearch,
    page: page,
    eachPage: 9,
    newsTagId: tag === "" ? null : tag,
    location: selectedProvince === "" ? null : selectedProvince,
  });

  const { data: provices } = useProvincesQuery({
    search: debounceSearch,
    pageNumber: 1,
    pageSize: 9999999,
  });

  return (
    <div className="px-4 py-8">
      {/* Header Section */}
      <div className="mb-8 flex flex-col gap-6">
        <div className="text-primary text-3xl font-bold">{titleHeading}</div>

        <div className="flex flex-col items-stretch justify-between gap-4 sm:flex-row sm:items-center">
          <div className="flex w-[50vw] gap-3">
            <div className="relative w-[60vw]">
              <IconSearch className="text-muted-foreground absolute left-3 top-1/2 size-4 -translate-y-1/2" />
              <Input
                className="pl-9"
                placeholder="Search blogs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <ComboboxTag setTag={setTag} />

            <Select
              value={selectedProvince ?? ""}
              onValueChange={setSelectedProvince}
            >
              <SelectTrigger className="bg-background mr-4 rounded-lg border-2 text-left">
                <SelectValue
                  className="px-4"
                  placeholder="Select your province"
                />
              </SelectTrigger>
              <SelectContent
                className="placeholder:text-muted-foreground h-[50vh] overflow-y-auto"
                onCloseAutoFocus={(e) => e.preventDefault()}
              >
                {provices?.data.map((provice) => (
                  <SelectItem
                    key={provice.provinceId}
                    value={provice.provinceName}
                  >
                    {provice.provinceName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button
            className="bg-emerald-600 hover:bg-emerald-700"
            onClick={() => router.push("/news-management/create")}
          >
            Create blog
          </Button>
        </div>
      </div>

      {isLoading ? (
        <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="border-border group overflow-hidden rounded-lg border bg-white transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
            >
              <Skeleton className="h-[30vh] w-full" />
            </div>
          ))}
        </div>
      ) : (
        initialNewsData && (
          <ListNews listNews={initialNewsData} page={page} setPage={setPage} />
        )
      )}
    </div>
  );
}

export default NewsManagementModule;
