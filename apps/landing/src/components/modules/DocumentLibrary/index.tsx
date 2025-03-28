"use client";

import { useDebounceValue } from "@highschool/hooks";
import {
  useAuthorsQuery,
  useCategoriesQuery,
  useCurriculumQuery,
  useDocumentsQuery,
} from "@highschool/react-query/queries";
import { Button } from "@highschool/ui/components/ui/button";
import { Input } from "@highschool/ui/components/ui/input";
import { Skeleton } from "@highschool/ui/components/ui/skeleton";
import { IconFilter, IconSearch } from "@tabler/icons-react";
import { useEffect, useState } from "react";

import { Filter } from "./filter";
import { InPageFilter } from "./in-page-filter";

import { useFilterStore } from "@/stores/use-filter-store";
import { Container } from "@/components/core/common/layouts/container";
import { DocumentCard } from "@/components/core/common/document-card";
import { DocumentCardSkeleton } from "@/components/core/common/document-skeleton";

// Constants
const GRADE_CATEGORIES = ["Grade 10", "Grade 11", "Grade 12"];
const GRADE_TRANSLATIONS: Record<string, string> = {
  "Grade 10": "Lớp 10",
  "Grade 11": "Lớp 11",
  "Grade 12": "Lớp 12",
};

function DocumentLibraryModule() {
  // Get state and actions from Zustand store
  const {
    filters,
    inPageFilters,
    topFilters,
    selectedCategories,
    selectedCurricula,
    selectedCategoryName,
    searchQuery,
    setOpenFilter,
    setSearchQuery,
    toggleCategory,
    toggleCurriculum,
  } = useFilterStore();

  const [userIds, setUserIds] = useState<string[]>([]);

  // Queries
  const { data: user, isLoading: userLoading } = useAuthorsQuery({ userIds });
  const { data: categoryData, isLoading: categoryLoading } =
    useCategoriesQuery();
  const { data: curriculumData, isLoading: curriculumLoading } =
    useCurriculumQuery();
  const debounceSearch = useDebounceValue(searchQuery, 300);

  // Filter data
  const filteredCategories = categoryData?.filter((item) =>
    GRADE_CATEGORIES.includes(item.categoryName),
  );

  // Query documents with all filters
  const { data, isLoading } = useDocumentsQuery({
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

  // Helper function to translate grade names
  const translateGrade = (categoryName: string): string => {
    return GRADE_TRANSLATIONS[categoryName] || categoryName;
  };

  useEffect(() => {
    if (data) {
      const uniqueUserIds = Array.from(
        new Set(
          data.data.map(
            (document: { createdBy: string }) => document.createdBy,
          ),
        ),
      );

      setUserIds(uniqueUserIds);
    }
  }, [data]);

  return (
    <Container className="flex flex-col gap-12 lg:px-20" maxWidth="[1440px]">
      {/* Header */}
      <div className="flex flex-row justify-between">
        <h1 className="text-3xl font-bold">Kho tài liệu</h1>
        <div className="flex items-center justify-between lg:hidden">
          <Button
            size="icon"
            variant="outline"
            onClick={() => setOpenFilter(true)}
          >
            <IconFilter size="18" />
          </Button>
        </div>
      </div>

      {/* Top filters */}
      <div className="flex flex-col gap-4">
        {/* Categories section */}
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
              : filteredCategories?.map((category) => (
                  <Button
                    key={category.id}
                    size="sm"
                    variant={
                      selectedCategories.includes(category.id)
                        ? "default"
                        : "outline"
                    }
                    onClick={() =>
                      toggleCategory(category.id, category.categoryName)
                    }
                  >
                    {translateGrade(category.categoryName)}
                  </Button>
                ))}
          </div>
        </section>

        {/* Curriculum section */}
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
              : curriculumData?.map((curriculum) => (
                  <Button
                    key={curriculum.id}
                    size="sm"
                    variant={
                      selectedCurricula.includes(curriculum.id)
                        ? "default"
                        : "outline"
                    }
                    onClick={() => toggleCurriculum(curriculum.id)}
                  >
                    {curriculum.curriculumName}
                  </Button>
                ))}
          </div>
        </section>
      </div>

      {/* Main content area */}
      <div className="flex w-full flex-row gap-8">
        {/* Side filter (desktop only) */}
        <div className="hidden w-1/5 lg:block">
          <Filter categoryName={selectedCategoryName} />
        </div>

        {/* Document grid */}
        <div className="flex flex-1 flex-col gap-8">
          {/* Search and in-page filters */}
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
            <InPageFilter />
          </div>

          {/* Document cards */}
          <div className="grid w-full grid-cols-[repeat(auto-fill,minmax(256px,1fr))] gap-4">
            {isLoading || userLoading
              ? Array(9)
                  .fill(0)
                  .map((_, idx) => <DocumentCardSkeleton key={idx} />)
              : data?.data.map((document) => {
                  const matchedUser = user?.find(
                    (user) => user.id === document.createdBy,
                  );

                  return (
                    <DocumentCard
                      key={document.id}
                      data={document}
                      user={{
                        fullname: matchedUser?.fullname!,
                        image: matchedUser?.profilePicture!,
                      }}
                      userLoading={userLoading}
                      onRemove={() => {}}
                    />
                  );
                })}
          </div>
        </div>
      </div>
    </Container>
  );
}

export default DocumentLibraryModule;
