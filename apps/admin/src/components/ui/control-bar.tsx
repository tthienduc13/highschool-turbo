import { Button } from "@highschool/ui/components/ui/button";
import { Checkbox } from "@highschool/ui/components/ui/checkbox";
import { Label } from "@highschool/ui/components/ui/label";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@highschool/ui/components/ui/popover";
import { Separator } from "@highschool/ui/components/ui/separator";
import { cn } from "@highschool/ui/lib/utils";
import {
    IconCheck,
    IconChevronDown,
    IconChevronLeft,
    IconChevronRight,
} from "@tabler/icons-react";
import { PaginationState } from "@tanstack/react-table";

interface ControlBarProps {
    currentPage: number;
    pageSize: number;
    totalCount: number;
    totalPage: number;
    setPagination: (pagination: PaginationState) => void;
    className?: string;
}

export const RowPerPageOptions = [
    { value: "10", label: "10 per page" },
    { value: "25", label: "25 per page" },
    { value: "50", label: "50 per page" },
    { value: "100", label: "100 per page" },
];

export const ControlBar = ({
    setPagination,
    totalCount,
    currentPage,
    pageSize,
    totalPage,
    className,
}: ControlBarProps) => {
    const start = (currentPage - 1) * pageSize + 1;
    const end = Math.min(start + pageSize - 1, totalCount);

    return (
        <div className={`flex w-full items-center justify-between ${className}`}>
            <div className="text-sm text-gray-500 dark:text-gray-400">
                Showing{" "}
                <span className="font-medium text-gray-900 dark:text-gray-100">
                    {start}
                </span>{" "}
                to{" "}
                <span className="font-medium text-gray-900 dark:text-gray-100">
                    {end}
                </span>{" "}
                of{" "}
                <span className="font-medium text-gray-900 dark:text-gray-100">
                    {totalCount}
                </span>{" "}
                results
            </div>
            <div className="flex items-center space-x-2">
                <Popover>
                    <PopoverTrigger asChild>
                        <Button
                            className="flex h-[38px] items-center gap-1"
                            size="sm"
                            variant="outline"
                        >
                            <strong>{pageSize}</strong> per page
                            <IconChevronDown size={16} />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent align="end" className="w-48">
                        <div className="flex flex-col gap-1">
                            {RowPerPageOptions.map((option) => (
                                <div
                                    key={option.value}
                                    className={cn(
                                        "flex items-center space-x-2 p-2 rounded-md cursor-pointer transition-colors",
                                        pageSize.toString() === option.value
                                            ? "bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400"
                                            : "hover:bg-gray-100 dark:hover:bg-gray-800",
                                    )}
                                    role="button"
                                    tabIndex={0}
                                    onClick={() =>
                                        setPagination({
                                            pageIndex: 1,
                                            pageSize: parseInt(option.value),
                                        })
                                    }
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter" || e.key === " ") {
                                            setPagination({
                                                pageIndex: 1,
                                                pageSize: parseInt(option.value),
                                            });
                                        }
                                    }}
                                >
                                    <Checkbox
                                        checked={pageSize.toString() === option.value}
                                        className="border-blue-500"
                                    >
                                        {pageSize.toString() === option.value && (
                                            <IconCheck size={16} />
                                        )}
                                    </Checkbox>
                                    <Label className="cursor-pointer text-sm">
                                        {option.label}
                                    </Label>
                                </div>
                            ))}
                        </div>
                    </PopoverContent>
                </Popover>
                <div className="flex items-center rounded-md border border-gray-200 dark:border-gray-700">
                    <Button
                        className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                        disabled={currentPage === 1}
                        size="icon"
                        variant="ghost"
                        onClick={() =>
                            setPagination({
                                pageIndex: currentPage - 1,
                                pageSize,
                            })
                        }
                    >
                        <IconChevronLeft size={16} />
                    </Button>
                    <Separator className="h-8" orientation="vertical" />
                    <div className="px-3 py-2 text-sm text-gray-600 dark:text-gray-300">
                        Page{" "}
                        <span className="font-medium text-gray-900 dark:text-gray-100">
                            {currentPage}
                        </span>{" "}
                        of{" "}
                        <span className="font-medium text-gray-900 dark:text-gray-100">
                            {totalPage}
                        </span>
                    </div>
                    <Separator className="h-8" orientation="vertical" />
                    <Button
                        className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                        disabled={totalPage === 0 || currentPage === totalPage}
                        size="icon"
                        variant="ghost"
                        onClick={() =>
                            setPagination({
                                pageIndex: currentPage + 1,
                                pageSize,
                            })
                        }
                    >
                        <IconChevronRight size={16} />
                    </Button>
                </div>
            </div>
        </div>
    );
};
