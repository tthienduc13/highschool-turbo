"use client";

import { useState } from "react";

import Link from "next/link";

import { University, UniversityCity } from "@highschool/interfaces";
import { useUniversitiesQuery } from "@highschool/react-query/queries";
import { Button } from "@highschool/ui/components/ui/button";
import { Card, CardContent } from "@highschool/ui/components/ui/card";

import {
  IconBuildingSkyscraper,
  IconFilter,
  IconLink,
} from "@tabler/icons-react";

import { Hint } from "@/components/core/common/hint";
import { Loading } from "@/components/core/common/loading";

import { FilterModal, cityRender } from "./filter-modal";

interface UniversitySectionProps {
  selectedMajor: string | null;
}

export interface FilterState {
  minTuition: number | null;
  maxTuition: number | null;
  city: UniversityCity | null;
}

export const UniversitySection = ({
  selectedMajor,
}: UniversitySectionProps) => {
  const initialFilterState: FilterState = {
    minTuition: null,
    maxTuition: null,
    city: null,
  };

  const [filterState, setFilterState] =
    useState<FilterState>(initialFilterState);

  const updateFilterState = (key: keyof FilterState, value: any) => {
    setFilterState((prev) => ({ ...prev, [key]: value }));
  };

  const clearFilter = () => {
    setFilterState(initialFilterState);
  };

  const { data, isLoading } = useUniversitiesQuery({
    pageNumber: 1,
    pageSize: 5,
    majorCode: selectedMajor!,
    minTuition: filterState.minTuition!,
    maxTuition: filterState.maxTuition!,
    city: filterState.city!,
  });
  const [openFilter, setOpenFilter] = useState<boolean>(false);
  if (!selectedMajor) {
    return (
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <h1 className="group relative w-fit cursor-pointer text-3xl font-bold md:text-4xl">
            Chọn trường
            <div className="bg-primary absolute bottom-0 left-0 h-1 w-1/2 transition-all duration-200 group-hover:w-full" />
          </h1>
          <h2 className="text-muted-foreground font-medium">
            Để chọn được trường, bạn vui lòng chọn ngành học mong muốn ở trên
            trước
          </h2>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex flex-col gap-8">
        <h1 className="group relative w-fit cursor-pointer text-3xl font-bold md:text-4xl">
          Chọn trường
          <div className="bg-primary absolute bottom-0 left-0 h-1 w-1/2 transition-all duration-200 group-hover:w-full" />
        </h1>
        <Loading />
      </div>
    );
  }

  if (!data?.data || data.data.length === 0) {
    return (
      <div className="text-center">
        Có vẻ không có kết quả phù hợp với bạn, hãy thử xoá bộ lọc hoặc thử lại
        sau
      </div>
    );
  }
  return (
    <>
      <FilterModal
        filterState={filterState}
        isOpen={openFilter}
        onClose={() => setOpenFilter(false)}
        updateFilterState={updateFilterState}
        clearFilter={clearFilter}
      />
      <div className="flex flex-col gap-8">
        <div className="flex flex-row items-center justify-between">
          <h1 className="group relative w-fit cursor-pointer text-3xl font-bold md:text-4xl">
            Chọn trường
            <div className="bg-primary absolute bottom-0 left-0 h-1 w-1/2 transition-all duration-200 group-hover:w-full" />
          </h1>
          <Button variant={"outline"} onClick={() => setOpenFilter(true)}>
            <IconFilter />
            Bộ lọc
          </Button>
        </div>
        <div className="grid w-full grid-cols-[repeat(auto-fill,minmax(400,1fr))] items-stretch gap-4">
          {data?.data?.map((university) => {
            return (
              <UniversityCard key={university.id} university={university} />
            );
          })}
        </div>
      </div>
    </>
  );
};

interface UniversityCardProps {
  university: University;
}

const UniversityCard = ({ university }: UniversityCardProps) => {
  return (
    <Card className="flex h-full flex-col p-4 dark:bg-gray-800">
      <CardContent className="p-0">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <div className="flex flex-row items-center justify-between">
              <div className="flex flex-row items-start gap-2">
                <IconBuildingSkyscraper />
                <Link href={university.websiteLink}>
                  <h2 className="hover:text-primary text-lg font-semibold">
                    {university.name}
                  </h2>
                </Link>
              </div>
              <Hint label="Trang web">
                <Link href={university.websiteLink}>
                  <Button
                    size={"icon"}
                    variant={"ghost"}
                    className="rounded-full"
                  >
                    <IconLink className="!size-5" />
                  </Button>
                </Link>
              </Hint>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                Mã trường:{" "}
                <span className="font-medium">{university.uniCode}</span>
              </div>
              <div>Vị trí: {cityRender(university.city as UniversityCity)}</div>
              <div>
                SĐT:{" "}
                <a
                  href={`tel:${university.contactPhone}`}
                  className="text-blue-500"
                >
                  {university.contactPhone}
                </a>
              </div>
              <div>
                Email:{" "}
                <a
                  href={`mailto:${university.contactEmail}`}
                  className="text-blue-500"
                >
                  {university.contactEmail}
                </a>
              </div>
            </div>
            <p className="text-muted-foreground text-sm font-medium">
              {university.description}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
