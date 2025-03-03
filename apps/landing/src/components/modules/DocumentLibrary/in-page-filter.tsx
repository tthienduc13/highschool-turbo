import { Semester } from "@highschool/interfaces";
import { Button } from "@highschool/ui/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@highschool/ui/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@highschool/ui/components/ui/select";
import { IconAdjustmentsHorizontal } from "@tabler/icons-react";

interface InPageFilters {
  sort: boolean | null; // null = "Mới nhất", true = "Nhiều lượt xem nhất", false = "Ít lượt xem nhất"
  semester: number | null; // 1 = Học kì 1, 2 = Học kì 2, null = Tất cả
}

interface InPageFilterProps {
  inPageFilters: InPageFilters;
  setInPageFilters: React.Dispatch<React.SetStateAction<InPageFilters>>;
}

export const InPageFilter = ({
  inPageFilters,
  setInPageFilters,
}: InPageFilterProps) => {
  const semesterMap: { [key in Semester]: number | null } = {
    [Semester.ALL]: null,
    [Semester.HK1]: 1,
    [Semester.HK2]: 2,
  };

  const sortMap: { default: string; true: string; false: string } = {
    default: "Mới nhất",
    true: "Nhiều lượt xem nhất",
    false: "Ít lượt xem nhất",
  };

  return (
    <div className="flex gap-2">
      <Select
        value={
          inPageFilters.sort === null
            ? "default"
            : inPageFilters.sort.toString()
        }
        onValueChange={(value) =>
          setInPageFilters({
            ...inPageFilters,
            sort: value === "default" ? null : value === "true",
          })
        }
      >
        <SelectTrigger className="w-[200px] border-gray-200">
          <SelectValue>
            {
              sortMap[
                inPageFilters.sort === null
                  ? "default"
                  : (inPageFilters.sort.toString() as "true" | "false")
              ]
            }
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="default">Mới nhất</SelectItem>
          <SelectItem value="true">Nhiều lượt xem nhất</SelectItem>
          <SelectItem value="false">Ít lượt xem nhất</SelectItem>
        </SelectContent>
      </Select>

      {/* Semester Dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="border-gray-200" size="icon" variant="outline">
            <IconAdjustmentsHorizontal />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-60" side="bottom">
          <DropdownMenuLabel>Học kì</DropdownMenuLabel>
          <DropdownMenuGroup className="flex flex-row flex-wrap gap-2 p-2">
            {Object.entries(semesterMap).map(([key, value]) => (
              <Button
                key={key}
                size="sm"
                variant={
                  inPageFilters.semester === value ? "default" : "outline"
                }
                onClick={() =>
                  setInPageFilters({
                    ...inPageFilters,
                    semester: value,
                  })
                }
              >
                {key}
              </Button>
            ))}
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
