import React, { useState, useEffect } from "react";
import { Input } from "@highschool/ui/components/ui/input";
import { Button } from "@highschool/ui/components/ui/button";
import { Checkbox } from "@highschool/ui/components/ui/checkbox";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@highschool/ui/components/ui/dialog";
import { Label } from "@highschool/ui/components/ui/label";
import { ScrollArea } from "@highschool/ui/components/ui/scroll-area";
import {
    RadioGroup,
    RadioGroupItem,
} from "@highschool/ui/components/ui/radio-group";
import {
    useCoursesQuery,
    useCurriculaQuery,
    useProvincesQuery,
    useSchoolFilterQuery,
} from "@highschool/react-query/queries";
import { IconFilter, IconSearch } from "@tabler/icons-react";

import { Combobox } from "./combobox-document";

import { generateYearOptions, getRandomHexColor } from "@/lib/utils";
import { FancyBox, FancyBoxType } from "@/components/ui/fancy-box";

export interface DocumentFilter {
    schoolId: string | null;
    subjectIds: string[];
    semester: number | null;
    documentYear: number | null;
    provinceId: string | null;
    categoryIds: string[];
    curriculumIds: string[];
    search: string;
}

interface FilterDocumentProps {
    filters: DocumentFilter;
    setFilters: React.Dispatch<React.SetStateAction<DocumentFilter>>;
    handleFilter: () => void;
}

export const FilterDocument = ({
    filters,
    setFilters,
    handleFilter,
}: FilterDocumentProps) => {
    const { data: provinces } = useProvincesQuery({
        pageSize: 20,
        pageNumber: 1,
    });

    const { data: schools, isPending: isSchoolLoading } = useSchoolFilterQuery({
        pageSize: 20,
        pageNumber: 1,
        provinceId: filters.provinceId,
    });

    const { data: subjects, isPending: isSubjectLoading } = useCoursesQuery({
        pageNumber: 1,
        pageSize: 9999,
    });

    const { data: curriculums } = useCurriculaQuery({
        pageNumber: 1,
        pageSize: 9999,
    });

    const [selectedSubject, setSelectedSubject] = useState<FancyBoxType[]>([]);

    const [isFilterDialogOpen, setIsFilterDialogOpen] = useState(false);

    const handleFilterChange = (
        filterName: string,
        value: string | string[] | Date | null,
    ) => {
        setFilters((prev) => ({ ...prev, [filterName]: value }));
        // set pageIndex = 1
    };

    const categories = ["Grade 10", "Grade 11", "Grade 12"];

    useEffect(() => {
        handleFilterChange(
            "subjectIds",
            selectedSubject.map((subject) => subject.value),
        );
    }, [selectedSubject]);

    const clearFilters = () => {
        setFilters({
            schoolId: null,
            subjectIds: [],
            semester: null,
            documentYear: null,
            provinceId: null,
            categoryIds: [],
            curriculumIds: [],
            search: "",
        });
        // set pageIndex = 1
    };

    const activeFiltersCount = Object.values(filters).filter(
        (value) =>
            value !== "" &&
            value !== null &&
            (Array.isArray(value) ? value.length > 0 : true),
    ).length;

    return (
        <div className="mb-4 flex flex-col items-center gap-4 sm:flex-row">
            <div className="relative grow">
                <Input
                    className="pl-10"
                    placeholder="Search documents..."
                    type="text"
                    value={filters.search}
                    onChange={(e) => handleFilterChange("search", e.target.value)}
                />
                <IconSearch
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    size={20}
                />
            </div>
            <Dialog open={isFilterDialogOpen} onOpenChange={setIsFilterDialogOpen}>
                <DialogTrigger asChild>
                    <Button className="w-full sm:w-auto" variant="outline">
                        <IconFilter className="mr-2" size={20} />
                        Filters
                        {activeFiltersCount > 0 && (
                            <span className="bg-primary text-primary-foreground ml-2 rounded-full px-2 py-1 text-xs">
                                {activeFiltersCount}
                            </span>
                        )}
                    </Button>
                </DialogTrigger>
                <DialogContent className="w-[35vw]">
                    <DialogHeader>
                        <DialogTitle>Filter Documents</DialogTitle>
                        <DialogDescription>
                            Apply filters to narrow down the document list.
                        </DialogDescription>
                    </DialogHeader>
                    <ScrollArea className="mt-4 h-[60vh]">
                        <div className="space-y-4 pr-4">
                            <div className="flex justify-between">
                                <div className="space-y-2">
                                    <Label className="text-sm font-semibold">Year</Label>
                                    <Combobox
                                        className="w-full"
                                        items={generateYearOptions(
                                            2000,
                                            new Date().getFullYear(),
                                            "desc",
                                        )}
                                        placeHolder="Select Year"
                                        setValue={(value) =>
                                            handleFilterChange("documentYear", value)
                                        }
                                        value={filters.documentYear?.toString() ?? ""}
                                    />
                                </div>

                                <div className="flex flex-col space-y-6">
                                    <Label className="text-sm font-semibold">Semester</Label>
                                    <RadioGroup
                                        className="flex"
                                        defaultValue={filters.semester?.toString() ?? ""}
                                        onValueChange={(value) =>
                                            handleFilterChange("semester", value)
                                        }
                                    >
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem id="r1" value="1" />
                                            <Label htmlFor="r1">Semester 1</Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem id="r2" value="2" />
                                            <Label htmlFor="r2">Semester 2</Label>
                                        </div>
                                    </RadioGroup>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label className="text-sm font-semibold">Province</Label>
                                <Combobox
                                    className="w-full"
                                    items={
                                        provinces?.data.map((province: any) => {
                                            return {
                                                label: province.provinceName,
                                                value: province.provinceId.toString(),
                                            };
                                        }) ?? []
                                    }
                                    placeHolder="Select Province"
                                    setValue={(value) => handleFilterChange("provinceId", value)}
                                    value={filters.provinceId ?? ""}
                                />
                            </div>
                            <div className="flex flex-col space-y-2">
                                <Label className="text-sm font-semibold">School</Label>
                                <Combobox
                                    className="w-full"
                                    disabled={isSchoolLoading}
                                    items={
                                        schools?.data.map((school) => {
                                            return {
                                                label: school.schoolName,
                                                value: school.id,
                                            };
                                        }) ?? []
                                    }
                                    placeHolder="Select School"
                                    setValue={(value) => handleFilterChange("schoolId", value)}
                                    value={filters.schoolId ?? ""}
                                />
                            </div>

                            <div className="flex gap-16">
                                <div className="space-y-2">
                                    <Label className="text-sm font-semibold">Categories</Label>
                                    <div className="space-y-2">
                                        {categories.map((category) => (
                                            <div
                                                key={category}
                                                className="flex items-center space-x-2"
                                            >
                                                <Checkbox
                                                    checked={filters.categoryIds.includes(category)}
                                                    id={`category-${category}`}
                                                    onCheckedChange={(checked) => {
                                                        if (checked) {
                                                            handleFilterChange("categoryIds", [
                                                                ...filters.categoryIds,
                                                                category,
                                                            ]);
                                                        } else {
                                                            handleFilterChange(
                                                                "categoryIds",
                                                                filters.categoryIds.filter(
                                                                    (id) => id !== category,
                                                                ),
                                                            );
                                                        }
                                                    }}
                                                />
                                                <Label htmlFor={`category-${category}`}>
                                                    {category}
                                                </Label>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label className="text-sm font-semibold">Curriculums</Label>
                                    <div className="space-y-2">
                                        {curriculums?.data.map((curriculum) => (
                                            <div
                                                key={curriculum.id}
                                                className="flex items-center space-x-2"
                                            >
                                                <Checkbox
                                                    checked={filters.curriculumIds.includes(
                                                        curriculum.id,
                                                    )}
                                                    id={`curriculum-${curriculum}`}
                                                    onCheckedChange={(checked) => {
                                                        if (checked) {
                                                            handleFilterChange("curriculumIds", [
                                                                ...filters.curriculumIds,
                                                                curriculum.id,
                                                            ]);
                                                        } else {
                                                            handleFilterChange(
                                                                "curriculumIds",
                                                                filters.curriculumIds.filter(
                                                                    (id) => id !== curriculum.id,
                                                                ),
                                                            );
                                                        }
                                                    }}
                                                />
                                                <Label htmlFor={`curriculum-${curriculum}`}>
                                                    {curriculum.curriculumName}
                                                </Label>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col gap-2">
                                <Label className="text-sm font-semibold">Subjects</Label>
                                <FancyBox
                                    disabled={isSubjectLoading}
                                    items={
                                        subjects?.data.map((subject) => {
                                            return {
                                                label: subject.subjectName,
                                                value: subject.id,
                                                color: getRandomHexColor(),
                                                groupBy: subject.masterSubjectName,
                                            };
                                        }) ?? []
                                    }
                                    selectedValues={selectedSubject}
                                    setSelectedValues={setSelectedSubject}
                                />
                            </div>
                        </div>
                    </ScrollArea>
                    <div className="mt-4 flex justify-between">
                        <Button variant="outline" onClick={clearFilters}>
                            Clear Filters
                        </Button>
                        <Button
                            onClick={() => {
                                setIsFilterDialogOpen(false);
                                handleFilter();
                            }}
                        >
                            Apply Filters
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
};
