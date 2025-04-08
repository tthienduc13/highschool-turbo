"use client";

import { useState } from "react";
import { Button } from "@highschool/ui/components/ui/button";
import { Input } from "@highschool/ui/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@highschool/ui/components/ui/select";
import {
    IconFilter,
    IconGrid3x3,
    IconList,
    IconPlus,
    IconSearch,
} from "@tabler/icons-react";
import { useFlashcardQuery } from "@highschool/react-query/queries";
import { useDebounceValue } from "@highschool/hooks";
import {
    FlashcardAttachToType,
    StudySetVisibility,
} from "@highschool/interfaces";

import { ComboboxTag } from "../combo-tag";
import { PaginationList } from "../pagination";

import { FlashcardGrid } from "./flashcard-grid";
import { FlashcardList } from "./flashcard-list";

export function FlashcardManagementModule() {
    const [searchQuery, setSearchQuery] = useState("");
    const debounceSearch: string = useDebounceValue(searchQuery, 300);
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
    const [status, setStatus] = useState("All");
    const [type, setType] = useState("All");
    const [tags, setTags] = useState<string[]>([]);
    const [page, setPage] = useState(1);

    const { data: flashcards } = useFlashcardQuery({
        pageSize: 9,
        pageNumber: page,
        search: debounceSearch,
        status: status == "All" ? "" : status,
        flashcardType: type == "All" ? "" : type,
        tags: tags.length > 0 ? tags : undefined,
    });

    return (
        <div className="py-8">
            <div className="flex flex-col gap-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold">My Flashcards</h1>
                    <Button className="">
                        <IconPlus className="mr-2 size-4" />
                        Create Flashcard
                    </Button>
                </div>

                <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
                    <div className="relative w-full md:w-96">
                        <IconSearch className="text-muted-foreground absolute left-3 top-1/2 size-4 -translate-y-1/2" />
                        <Input
                            className="pl-10"
                            placeholder="Search flashcards..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                        <div className="flex items-center gap-1 rounded-md border">
                            <Button
                                className={`rounded-r-none ${viewMode === "grid" ? "bg-muted" : ""}`}
                                size="icon"
                                variant="ghost"
                                onClick={() => setViewMode("grid")}
                            >
                                <IconGrid3x3 className="size-4" />
                            </Button>
                            <Button
                                className={`rounded-l-none ${viewMode === "list" ? "bg-muted" : ""}`}
                                size="icon"
                                variant="ghost"
                                onClick={() => setViewMode("list")}
                            >
                                <IconList className="size-4" />
                            </Button>
                        </div>
                    </div>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                    <Select defaultValue="All" onValueChange={setType}>
                        <SelectTrigger className="w-[180px]">
                            <IconFilter className="size-4" />
                            <SelectValue placeholder="Filter by type" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="All">All Types</SelectItem>
                            {Object.values(FlashcardAttachToType).map((type) => (
                                <SelectItem key={type} value={type}>
                                    {type}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    <Select defaultValue="All" onValueChange={setStatus}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Filter by status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="All">All Status</SelectItem>
                            {Object.values(StudySetVisibility).map((status) => (
                                <SelectItem key={status} value={status}>
                                    {status}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    <ComboboxTag setTags={setTags} />
                </div>

                {viewMode === "grid" ? (
                    <FlashcardGrid flashcards={flashcards?.data ?? []} />
                ) : (
                    <FlashcardList flashcards={flashcards?.data ?? []} />
                )}

                <PaginationList
                    page={flashcards?.currentPage ?? 1}
                    setPage={setPage}
                    totalPages={flashcards?.totalPages ?? 1}
                />
            </div>
        </div>
    );
}

export default FlashcardManagementModule;
