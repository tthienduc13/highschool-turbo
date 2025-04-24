"use client";

import { UniversityCity } from "@highschool/interfaces";
import { useUniversityCategoryQuery } from "@highschool/react-query/queries";
import { Button } from "@highschool/ui/components/ui/button";
import { IconFilter } from "@tabler/icons-react";

import UniversityCard from "./university-card";

import { Loading } from "@/components/core/common/loading";

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
  const { data: universityData, isLoading: universityLoading } =
    useUniversityCategoryQuery({
      pageNumber: 1,
      pageSize: 6,
      majorCode: selectedMajor!,
    });

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

  if (universityLoading) {
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

  if (!universityData?.data || universityData.data.length === 0) {
    return (
      <div className="text-center">
        Có vẻ không có kết quả phù hợp với bạn, hãy thử xoá bộ lọc hoặc thử lại
        sau
      </div>
    );
  }

  return (
    <>
      {/* <FilterModal
        clearFilter={clearFilter}
        filterState={filterState}
        isOpen={openFilter}
        updateFilterState={updateFilterState}
        onClose={() => setOpenFilter(false)}
      /> */}
      <div className="flex flex-col gap-8">
        <div className="flex flex-row items-center justify-between">
          <div className="flex flex-col gap-2">
            <h1 className="group relative w-fit cursor-pointer text-3xl font-bold md:text-4xl">
              Chọn trường
              <div className="bg-primary absolute bottom-0 left-0 h-1 w-1/2 transition-all duration-200 group-hover:w-full" />
            </h1>
            <h2 className="text-muted-foreground font-medium">
              Hãy đánh dấu những trường bạn muốn tìm hiểu thêm
            </h2>
          </div>
          <Button variant={"outline"}>
            <IconFilter />
            Bộ lọc
          </Button>
        </div>
        <div className="grid w-full grid-cols-1 items-stretch gap-4 md:grid-cols-2">
          {universityData?.data?.map((university) => {
            return (
              <UniversityCard
                key={university.id}
                savedButton
                university={university}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};
