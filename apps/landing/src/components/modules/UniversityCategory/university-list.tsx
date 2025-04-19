"use client";

import { useDebounceValue } from "@highschool/hooks";
import { City, Major } from "@highschool/interfaces";
import {
  useCitiesQuery,
  useGetMajorQuery,
  useUniversityCategoryQuery,
} from "@highschool/react-query/queries";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@highschool/ui/components/ui/dropdown-menu";
import { Input } from "@highschool/ui/components/ui/input";
import { Separator } from "@highschool/ui/components/ui/separator";
import { cn } from "@highschool/ui/lib/utils";
import {
  IconBuilding,
  IconChevronLeft,
  IconChevronRight,
  IconLoader2,
  IconPointFilled,
  IconSearch,
  IconTrash,
  IconX,
} from "@tabler/icons-react";
import { Fragment, useState } from "react";
import { Button } from "@highschool/ui/components/ui/button";

import UniversityCard from "./university-card";

export const UniversityList = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [majorQuery, setMajorQuery] = useState("");
  const debounceMajorQuery = useDebounceValue(majorQuery, 300);

  const [selectedCity, setSeletectedCity] = useState<City | null>(null);
  const [selectedMajors, setSelectedMajors] = useState<Major[]>([]);

  const [uniQuery, setUniQuery] = useState("");
  const debounceUniQuery = useDebounceValue(uniQuery, 300);

  const { data: cityData, isLoading: cityLoading } = useCitiesQuery({
    pageNumber: 1,
    pageSize: 64,
  });

  const { data: majorData, isLoading: majorLoading } = useGetMajorQuery({
    search: debounceMajorQuery,
    pageNumber: 1,
    pageSize: 12,
  });

  const { data: universityData, isLoading: universityLoading } =
    useUniversityCategoryQuery({
      search: debounceUniQuery,
      pageNumber: currentPage,
      pageSize: 12,
      city: selectedCity?.provinceId,
      majorCode: selectedMajors.map((major) => major.majorCode).join(","),
    });

  const handleDeleteMajor = (majorId: string) => {
    setSelectedMajors((prev) => prev.filter((major) => major.id !== majorId));
  };

  const filteredMajors =
    majorData?.data?.filter(
      (major) => !selectedMajors.some((selected) => selected.id === major.id),
    ) || [];

  return (
    <div className="mt-10 flex w-full  flex-col items-center justify-center gap-6 ">
      <div className="flex w-full max-w-4xl flex-row items-center overflow-hidden rounded-full border shadow-lg ">
        <DropdownMenu>
          <DropdownMenuTrigger className="group w-[230px] rounded-3xl">
            <div className="flex flex-col items-start rounded-3xl px-8 py-3 group-hover:bg-gray-50">
              {selectedCity ? (
                <p className="text-base font-bold">Thành phố</p>
              ) : (
                <p className="text-base font-bold">Thành phố</p>
              )}
              <p className="text-sm">
                {selectedCity ? (
                  <div className="flex flex-row items-center gap-2">
                    <IconBuilding size={14} /> {selectedCity.provinceName}
                  </div>
                ) : (
                  "Tìm kiếm thành phố"
                )}
              </p>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="no-scrollbar max-h-[300px] overflow-y-scroll rounded-2xl shadow-lg"
            style={{
              width: "calc(var(--radix-dropdown-menu-trigger-width) - 20px)",
            }}
          >
            {cityLoading ? (
              <div className="flex h-10 items-center justify-center">
                <IconLoader2 className="animate-spin" />
              </div>
            ) : (
              <Fragment>
                <DropdownMenuItem
                  className={cn("hover:bg-destructive/10 border-b py-2")}
                  onClick={() => setSeletectedCity(null)}
                >
                  <IconTrash className="text-destructive" />
                  Xoá thành phố
                </DropdownMenuItem>
                {cityData?.data.map((city) => {
                  const isSelected =
                    selectedCity?.provinceId === city.provinceId;

                  return (
                    <DropdownMenuItem
                      key={city.provinceId}
                      className={cn(isSelected && "bg-primary/10")}
                      onClick={() => setSeletectedCity(city)}
                    >
                      {isSelected && <IconPointFilled />}
                      {city.provinceName}
                    </DropdownMenuItem>
                  );
                })}
              </Fragment>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
        <Separator className="h-6 w-px" orientation="vertical" />
        <DropdownMenu>
          <DropdownMenuTrigger className="group w-[230px] rounded-3xl">
            <div className="flex flex-col items-start rounded-3xl px-8 py-3 group-hover:bg-gray-50">
              <p className="text-base font-bold">Ngành</p>
              <p className="text-sm">Tìm kiếm tên ngành</p>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="start"
            className="no-scrollbar max-h-[300px] overflow-y-scroll rounded-2xl shadow-lg"
            style={{
              width: "calc(var(--radix-dropdown-menu-trigger-width) + 60px)",
            }}
          >
            <DropdownMenuGroup className="flex flex-row items-center gap-2 border-b px-2">
              <Input
                className="flex-1 border-none shadow-none focus-visible:ring-0"
                placeholder="Tìm kiếm "
                value={majorQuery}
                onChange={(e) => setMajorQuery(e.target.value)}
              />
              <IconX size={18} onClick={() => setMajorQuery("")} />
            </DropdownMenuGroup>
            <DropdownMenuGroup>
              {majorLoading ? (
                <div className="flex h-10 items-center justify-center">
                  <IconLoader2 className="animate-spin" />
                </div>
              ) : !filteredMajors.length ? (
                <div className="flex h-10 items-center justify-center">
                  <p className="text-sm text-gray-500">Không có ngành nào</p>
                </div>
              ) : (
                filteredMajors.map((major) => (
                  <DropdownMenuItem
                    key={major.id}
                    onClick={() =>
                      setSelectedMajors([...selectedMajors, major])
                    }
                  >
                    {major.name}
                  </DropdownMenuItem>
                ))
              )}
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
        <Separator className="h-6 w-px" orientation="vertical" />
        <div className="flex h-full flex-1 flex-row items-center gap-5 pl-6 pr-2">
          <Input
            className="border-none !text-base shadow-none focus-visible:ring-0"
            placeholder="Tìm theo tên"
            value={uniQuery}
            onChange={(e) => {
              setCurrentPage(1);
              setUniQuery(e.target.value);
            }}
          />
          <div className="bg-primary rounded-full p-3">
            <IconSearch className="text-white" />
          </div>
        </div>
      </div>
      {selectedMajors.length > 0 && (
        <div className="mx-auto w-full max-w-4xl px-5">
          <div className="flex flex-row flex-wrap items-center gap-2">
            <h2 className="font-bold text-gray-500">Các ngành đã chọn:</h2>
            {selectedMajors.map((major) => (
              <div
                key={major.id}
                className="bg-primary/10 hover:border-destructive hover:bg-destructive/10 border-primary ease-cubic-ease group flex flex-row items-center gap-2 rounded-full px-3 py-1.5 transition-all duration-300"
              >
                <p className="group-hover:text-destructive text-sm font-semibold text-blue-700">
                  {major.name}
                </p>
                <IconX
                  className="group-hover:text-destructive cursor-pointer text-blue-700 group-hover:scale-125"
                  size={14}
                  onClick={() => handleDeleteMajor(major.id!)}
                />
              </div>
            ))}
          </div>
        </div>
      )}
      <div className="mt-10 w-full ">
        {universityLoading ? (
          <div className="flex h-10 items-center justify-center">
            <IconLoader2 className="animate-spin" />
          </div>
        ) : (
          <div className="flex w-full flex-col gap-4">
            <div className="flex w-full flex-row items-center justify-between">
              <p className="font-light italic text-gray-500">
                Hiển thị{" "}
                {(universityData?.pageSize ?? 0) *
                  ((universityData?.currentPage ?? 1) - 1)}
                -{" "}
                {(universityData?.pageSize ?? 0) *
                  (universityData?.currentPage ?? 1)}{" "}
                trong tổng số {universityData?.totalCount ?? 0} kết quả
              </p>
              {(selectedCity !== null ||
                selectedMajors.length > 0 ||
                uniQuery !== "") && (
                <Button
                  variant={"destructive"}
                  onClick={() => {
                    setSeletectedCity(null);
                    setSelectedMajors([]);
                    setUniQuery("");
                  }}
                >
                  Xoá bộ lọc
                </Button>
              )}
            </div>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
              {universityData?.data.map((university) => (
                <UniversityCard key={university.id} university={university} />
              ))}
            </div>
            <div className="flex w-full flex-row items-center justify-center">
              <div className="flex flex-row items-center gap-2">
                <Button
                  disabled={currentPage === 1}
                  variant={"ghost"}
                  onClick={() => {
                    setCurrentPage((prev) => Math.max(prev - 1, 1));
                  }}
                >
                  <IconChevronLeft className="!size-6" />
                </Button>
                <div className="flex flex-row items-center">
                  <p className="text-sm font-semibold text-gray-500">
                    Trang {currentPage} / {universityData?.totalPages}
                  </p>
                </div>
                <Button
                  className=""
                  disabled={currentPage === universityData?.totalPages}
                  variant={"ghost"}
                  onClick={() => {
                    setCurrentPage((prev) =>
                      Math.min(prev + 1, universityData?.totalPages ?? prev),
                    );
                  }}
                >
                  <IconChevronRight className="!size-6" />
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
