"use client";

import { Skeleton } from "@highschool/ui/components/ui/skeleton";
import { Input } from "@highschool/ui/components/ui/input";
import { useState } from "react";
import { Button } from "@highschool/ui/components/ui/button";
import { IconPlus, IconSearch } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { UseGetOccupationsQuery } from "@highschool/react-query/queries";
import { useDebounceValue } from "@highschool/hooks";

import { ImportOccupationMajorButton } from "./button-import";
import { OccupationCard } from "./occupation-card";

function OccupationModule() {
  const [searchQuery, setSearchQuery] = useState("");
  const debounceSearch = useDebounceValue(searchQuery, 300);
  const { data: occupations, isPending: isOccupationLoading } =
    UseGetOccupationsQuery({
      pageNumber: 1,
      pageSize: 10,
      search: debounceSearch,
    });
  const router = useRouter();

  return (
    <div className="space-y-6 px-4 py-8">
      <div className="space-y-1">
        <h1 className="text-primary text-3xl font-bold tracking-tight">
          Career Paths
        </h1>
        <p className="text-muted-foreground">
          Explore detailed information about different career paths and their
          requirements
        </p>
      </div>

      <div className="flex justify-between">
        <div className="relative w-[30vw]">
          <IconSearch className="text-muted-foreground absolute left-3 top-1/2 size-4 -translate-y-1/2" />
          <Input
            className="pl-9"
            placeholder="Search career..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-4">
          <ImportOccupationMajorButton />
          {/* <Button>Download Template</Button> */}
          <Button
            onClick={() => router.push("/career-mentor/occupation/create")}
          >
            <IconPlus /> Create Career Path
          </Button>
        </div>
      </div>

      {!isOccupationLoading ? (
        <OccupationCard
          careers={Array.isArray(occupations?.data) ? occupations?.data : []}
        />
      ) : (
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
      )}
    </div>
  );
}

export default OccupationModule;
