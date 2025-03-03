import {
  useCitiesQuery,
  useCitySchoolQuery,
  useCoursesQuery,
} from "@highschool/react-query/queries";
import { Button } from "@highschool/ui/components/ui/button";
import { Label } from "@highschool/ui/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@highschool/ui/components/ui/select";
import { IconFilterCancel } from "@tabler/icons-react";

import { Filters } from ".";

import { YearPicker } from "@/components/core/common/year-picker";

interface FilterProps {
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
  filters: Filters;
  categoryName?: string | null;
}

export const Filter = ({ setFilters, filters, categoryName }: FilterProps) => {
  const { data: provinces, isLoading: provincesLoading } = useCitiesQuery({
    pageSize: 63,
    pageNumber: 1,
  });
  const { data: subjects, isLoading: subjectsLoading } = useCoursesQuery({
    grade: categoryName!,
    pageSize: 100,
    pageNumber: 1,
  });
  const { data: schools, isLoading: schoolsLoading } = useCitySchoolQuery({
    cityId: parseInt(filters.regionId),
    pageSize: 100,
    pageNumber: 1,
  });

  const handleFilterChange = (
    key: keyof Filters,
    value: string | number | null,
  ) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
      ...(key === "regionId" ? { schoolId: "" } : {}),
    }));
  };

  const clearFilters = () => {
    setFilters({ courseId: "", regionId: "", schoolId: "", year: null });
  };

  return (
    <div className="flex w-full flex-col rounded-lg border-2 border-gray-200 p-4 shadow">
      <div className="flex justify-between">
        <h2 className="font-bold">Bộ lọc</h2>

        <Button size="icon" variant="ghost" onClick={clearFilters}>
          <IconFilterCancel size={16} />
        </Button>
      </div>
      <div className="mt-4 space-y-4">
        <div>
          <Label>Năm học</Label>
          <YearPicker
            value={filters.year}
            onChange={(value) => handleFilterChange("year", value)}
          />
        </div>
        <div>
          <Label>Môn học</Label>
          <Select
            disabled={subjectsLoading}
            value={filters.courseId}
            onValueChange={(value) => handleFilterChange("courseId", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Chọn môn học" />
            </SelectTrigger>
            <SelectContent>
              {subjects?.data.map((subject) => (
                <SelectItem key={subject.id} value={subject.id}>
                  {subject.subjectName}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label>Thành phố</Label>
          <Select
            disabled={provincesLoading}
            value={filters.regionId}
            onValueChange={(value) => handleFilterChange("regionId", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Chọn thành phố" />
            </SelectTrigger>
            <SelectContent>
              {provinces?.data.map((province) => (
                <SelectItem
                  key={province.provinceId}
                  value={province.provinceId.toString()}
                >
                  {province.provinceName}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label>Trường</Label>
          <Select
            disabled={schoolsLoading || !filters.regionId}
            value={filters.schoolId}
            onValueChange={(value) => handleFilterChange("schoolId", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Chọn trường" />
            </SelectTrigger>
            <SelectContent>
              {schools?.data.map((school) => (
                <SelectItem key={school.id} value={school.id}>
                  {school.schoolName}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};
