"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { Input } from "@highschool/ui/components/ui/input";

import { IconSearch } from "@tabler/icons-react";

import { WithFooter } from "@/components/core/common/with-footer";
import { Container } from "@/components/core/layouts/container";

function SearchModule() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const _searchQuery = searchParams.get("q");
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
      <Container maxWidth="7xl" className="flex flex-col gap-8">
        <div className="flex h-12 w-full items-center gap-2 rounded-lg border-2 border-gray-200 bg-white px-4 transition-all duration-200 focus-within:border-blue-600 dark:bg-gray-800">
          <IconSearch />
          <Input
            placeholder="Tìm kiếm"
            defaultValue={_searchQuery!}
            onChange={(e) => handleSearch(e.target.value)}
            className="h-full w-full border-none !text-lg font-semibold shadow-none focus-visible:ring-0 dark:border-gray-700"
          />
        </div>
        <h1 className="text-xl font-semibold">
          Kết quả tìm kiếm cho "{_searchQuery}"
        </h1>
      </Container>
    </WithFooter>
  );
}
export default SearchModule;
