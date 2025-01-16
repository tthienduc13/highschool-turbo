"use client";

import { useState } from "react";

import Link from "next/link";

import { University, UniversityCity } from "@highschool/interfaces";
import { useUniversitiesQuery } from "@highschool/react-query/queries";
import { Button } from "@highschool/ui/components/ui/button";
import { Card, CardContent } from "@highschool/ui/components/ui/card";
import { cn } from "@highschool/ui/lib/utils";

import { IconFilter, IconHeart, IconLink } from "@tabler/icons-react";

import { Hint } from "@/components/core/common/hint";
import { Loading } from "@/components/core/common/loading";

import { FilterModal, cityRender } from "./filter-modal";

interface UniversitySectionProps {
  selectedMajor: string | null;
  setSavedUniversity: React.Dispatch<React.SetStateAction<University[]>>;
  savedUniversities: University[];
}

export interface FilterState {
  minTuition: number | null;
  maxTuition: number | null;
  city: UniversityCity | null;
}

export const UniversitySection = ({
  selectedMajor,
  setSavedUniversity,
  savedUniversities,
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

  const isSaved = (uni: University) =>
    savedUniversities.some((savedUni) => savedUni.id === uni.id);

  const toggleSaveUni = (uni: University) => {
    setSavedUniversity((prev) =>
      isSaved(uni)
        ? prev.filter((savedUni) => savedUni.id !== uni.id)
        : [...prev, uni],
    );
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
          <div className="flex flex-col gap-2">
            <h1 className="group relative w-fit cursor-pointer text-3xl font-bold md:text-4xl">
              Chọn trường
              <div className="bg-primary absolute bottom-0 left-0 h-1 w-1/2 transition-all duration-200 group-hover:w-full" />
            </h1>
            <h2 className="text-muted-foreground font-medium">
              Hãy đánh dấu những trường bạn muốn tìm hiểu thêm
            </h2>
          </div>
          <Button variant={"outline"} onClick={() => setOpenFilter(true)}>
            <IconFilter />
            Bộ lọc
          </Button>
        </div>
        <div className="grid w-full grid-cols-1 items-stretch gap-4 md:grid-cols-2">
          {data?.data?.map((university) => {
            return (
              <UniversityCard
                key={university.id}
                university={university}
                onToggleSave={toggleSaveUni}
                isSaved={isSaved(university)}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};

interface UniversityCardProps {
  university: University;
  isSaved: boolean;
  onToggleSave: (uni: University) => void;
}

const UniversityCard = ({
  university,
  isSaved,
  onToggleSave,
}: UniversityCardProps) => {
  return (
    <Card className="flex h-full flex-col p-4 dark:bg-gray-800">
      <CardContent className="p-0">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <div className="flex flex-row items-center justify-between">
              <div className="flex flex-row items-start gap-2">
                <img
                  src={university.logoUrl}
                  alt={university.name}
                  height={32}
                  width={64}
                  className="h-8 object-contain"
                />
                <Link href={university.websiteLink}>
                  <h2 className="hover:text-primary text-lg font-semibold">
                    {university.name}
                  </h2>
                </Link>
              </div>
              <div className="flex flex-row items-center">
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
                <Button
                  size={"icon"}
                  variant={"ghost"}
                  className={cn(
                    "rounded-full",
                    isSaved ? "fill-red-500 text-red-500" : "",
                  )}
                  onClick={() => onToggleSave(university)}
                >
                  <IconHeart
                    fill={isSaved ? "red" : "white"}
                    className="!size-5"
                  />
                </Button>
              </div>
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
