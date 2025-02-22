"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Input } from "@highschool/ui/components/ui/input";
import { IconSearch } from "@tabler/icons-react";

import { AllResult } from "./tabs/all-results";

import { WithFooter } from "@/components/core/common/with-footer";
import { Container } from "@/components/core/layouts/container";

function SearchModule() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const _searchQuery = searchParams.get("q");
  const _type = searchParams.get("type");
  const handleSearch = (search: string) => {
    const params = new URLSearchParams(searchParams);

    if (search) {
      params.set("q", search);
    } else {
      params.delete("q");
    }
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <WithFooter>
      <Container className="flex flex-col gap-4" maxWidth="7xl">
        <div className="flex flex-col gap-2">
          <div className="flex h-12 w-full items-center gap-2 rounded-lg border-2 border-gray-200 bg-white px-4 transition-all duration-200 focus-within:border-blue-600 dark:bg-gray-800">
            <IconSearch />
            <Input
              className="h-full w-full border-none !text-lg font-semibold shadow-none focus-visible:ring-0 dark:border-gray-700"
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
          <div>{_type}</div>
          <AllResult />
        </div>
      </Container>
    </WithFooter>
  );
}
export default SearchModule;
