"use client";

import { useState } from "react";
import { useDebounceValue } from "@highschool/hooks";
import {
  useCategoriesQuery,
  useCurriculumQuery,
  useDocumentsQuery,
} from "@highschool/react-query/queries";
import { Button } from "@highschool/ui/components/ui/button";
import { Input } from "@highschool/ui/components/ui/input";
import { Skeleton } from "@highschool/ui/components/ui/skeleton";
import { IconFilter, IconSearch } from "@tabler/icons-react";

import { Filter } from "./filter";
import { InPageFilter } from "./in-page-filter";

import { DocumentCard } from "@/components/core/common/document-card";
import { Container } from "@/components/core/common/layouts/container";

interface InPageFilters {
  sort: boolean | null; // null = "Mới nhất", true = "Nhiều lượt xem nhất", false = "Ít lượt xem nhất"
  semester: number | null; // 1 = Học kì 1, 2 = Học kì 2, null = Tất cả
}

export type TopFilters = {
  categoryIds: string;
  curriculumIds: string;
};

export type Filters = {
  courseId: string;
  regionId: string;
  year: number | null;
  schoolId: string;
};

function DocumentLibraryModule() {
  const [, setOpenFilter] = useState<boolean>(false);
  const [filters, setFilters] = useState<Filters>({
    courseId: "",
    regionId: "",
    year: null,
    schoolId: "",
  });
  const [inPageFilters, setInPageFilters] = useState<InPageFilters>({
    semester: null,
    sort: null,
  });

  const { data: categoryData, isLoading: categoryLoading } =
    useCategoriesQuery();
  const { data: curriculumData, isLoading: curriculumLoading } =
    useCurriculumQuery();
  const [selectedCategoryName, setSelectedCategoryName] = useState<string>("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedCurricula, setSelectedCurricula] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const debounceSearch = useDebounceValue(searchQuery, 300);

  const [topFilters, setTopFilters] = useState<TopFilters>({
    categoryIds: "",
    curriculumIds: "",
  });

  const filteredData = categoryData?.filter(
    (item) =>
      item.categoryName === "Grade 10" ||
      item.categoryName === "Grade 11" ||
      item.categoryName === "Grade 12",
  );

  const toggleCategory = (categoryId: string, categoryName: string) => {
    setSelectedCategories((prev) => {
      const updated = prev.includes(categoryId)
        ? prev.filter((item) => item !== categoryId)
        : [...prev, categoryId];

      if (updated.includes(categoryId)) {
        setSelectedCategoryName(categoryName);
      } else if (selectedCategoryName === categoryName) {
        setSelectedCategoryName("");
      }

      setTopFilters((filters) => ({
        ...filters,
        categoryIds: updated.join(","),
      }));

      return updated;
    });
  };

  const toggleCurriculum = (curriculumId: string) => {
    setSelectedCurricula((prev) => {
      const updated = prev.includes(curriculumId)
        ? prev.filter((item) => item !== curriculumId)
        : [...prev, curriculumId];

      setTopFilters((filters) => ({
        ...filters,
        curriculumIds: updated.join(","),
      }));

      return updated;
    });
  };

  const { data } = useDocumentsQuery({
    search: debounceSearch,
    pageSize: 9,
    pageNumber: 1,
    schoolId: filters.schoolId,
    categoryIds: topFilters.categoryIds,
    sortPopular: inPageFilters.sort,
    curriculumIds: topFilters.curriculumIds,
    semester: inPageFilters.semester,
    documentYear: filters.year!,
    provinceId: filters.regionId,
    subjectId: filters.courseId,
  });

  return (
    <Container className="flex flex-col gap-12 lg:px-20" maxWidth="[1440px]">
      <div className="flex flex-row justify-between">
        <h1 className="text-3xl font-bold">Kho tài liệu</h1>
        <div className="flex items-center justify-between lg:hidden">
          <Button
            size={"icon"}
            variant={"outline"}
            onClick={() => setOpenFilter(true)}
          >
            <IconFilter size={"18"} />
          </Button>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <section className="flex flex-col gap-2">
          <h2 className="group relative w-fit cursor-pointer text-lg font-medium">
            Danh mục
            <div className="bg-primary absolute bottom-1 left-0 h-0.5 w-1/2 transition-all duration-200 ease-in-out group-hover:w-full" />
          </h2>
          <div className="flex flex-row flex-wrap gap-2">
            {categoryLoading
              ? Array(3)
                  .fill(0)
                  .map((_, idx) => <Skeleton key={idx} className="h-8 w-20" />)
              : filteredData?.map((data) => (
                  <Button
                    key={data.id}
                    size="sm"
                    variant={
                      selectedCategories.includes(data.id)
                        ? "default"
                        : "outline"
                    }
                    onClick={() => toggleCategory(data.id, data.categoryName)}
                  >
                    {renderCategory(data.categoryName)}
                  </Button>
                ))}
          </div>
        </section>
        <section className="flex flex-col gap-2">
          <h2 className="group relative w-fit cursor-pointer text-lg font-medium">
            Chương trình học
            <div className="bg-primary absolute bottom-1 left-0 h-0.5 w-1/2 transition-all duration-200 ease-in-out group-hover:w-full" />
          </h2>
          <div className="flex flex-row gap-2">
            {curriculumLoading
              ? Array(3)
                  .fill(0)
                  .map((_, idx) => (
                    <Skeleton key={idx} className="h-8 w-28 rounded-lg" />
                  ))
              : curriculumData?.map((data) => (
                  <Button
                    key={data.id}
                    size="sm"
                    variant={
                      selectedCurricula.includes(data.id)
                        ? "default"
                        : "outline"
                    }
                    onClick={() => toggleCurriculum(data.id)}
                  >
                    {data.curriculumName}
                  </Button>
                ))}
          </div>
        </section>
      </div>
      <div className="flex w-full flex-row gap-8">
        <div className="hidden w-1/5 lg:block">
          <Filter
            categoryName={selectedCategoryName}
            filters={filters}
            setFilters={setFilters}
          />
        </div>
        <div className="flex flex-1 flex-col gap-8">
          <div className="hidden flex-row items-center justify-between md:flex">
            <div className="focus-within:border-primary flex flex-row items-center gap-2 rounded-lg border-2 border-gray-200 px-3 py-0.5 focus-within:border-2">
              <IconSearch size={20} />
              <Input
                className="min-w-[200px] border-none !text-base shadow-none focus-visible:ring-0"
                placeholder="Tìm theo tên"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <InPageFilter
              inPageFilters={inPageFilters}
              setInPageFilters={setInPageFilters}
            />
          </div>
          <div className="grid w-full grid-cols-[repeat(auto-fill,minmax(256px,1fr))] gap-4">
            {data?.data.map((document) => (
              <DocumentCard key={document.id} data={document} />
            ))}
          </div>
        </div>
      </div>
    </Container>
  );
}

export default DocumentLibraryModule;

const renderCategory = (categoryName: string): string => {
  switch (categoryName) {
    case "Grade 10":
      return "Lớp 10";
    case "Grade 11":
      return "Lớp 11";
    case "Grade 12":
      return "Lớp 12";
    default:
      return categoryName; // Return the original name if no match is found
  }
};
