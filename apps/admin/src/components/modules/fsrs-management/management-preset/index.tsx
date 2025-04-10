"use client";

import { Input } from "@highschool/ui/components/ui/input";
import { Button } from "@highschool/ui/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@highschool/ui/components/ui/card";
import { IconArrowsUpDown, IconPlus, IconSearch } from "@tabler/icons-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@highschool/ui/components/ui/dropdown-menu";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useGetFsrsQuery } from "@highschool/react-query/queries";
import { Skeleton } from "@highschool/ui/components/ui/skeleton";

import { CardPreset } from "./card-preset";

function PresetManagementModule() {
    const router = useRouter();
    const [presetSortBy, setPresetSortBy] = useState<"title" | "date">("date");
    const [presetSearchQuery, setPresetSearchQuery] = useState("");
    const [presetSortOrder, setPresetSortOrder] = useState<"asc" | "desc">(
        "desc",
    );

    const { data, isPending } = useGetFsrsQuery({
        pageNumber: 1,
        pageSize: 999,
        search: "",
    });

    const filteredAndSortedPresets = data?.data
        .filter((preset) => {
            const matchesSearch = preset.title
                .toLowerCase()
                .includes(presetSearchQuery.toLowerCase());

            return matchesSearch;
        })
        .sort((a, b) => {
            if (presetSortBy === "title") {
                return presetSortOrder === "asc"
                    ? a.title.localeCompare(b.title)
                    : b.title.localeCompare(a.title);
            }

            if (presetSortBy === "date") {
                return presetSortOrder === "asc"
                    ? new Date(a.updatedAt!).getTime() - new Date(b.updatedAt!).getTime()
                    : new Date(b.updatedAt!).getTime() - new Date(a.updatedAt!).getTime();
            }

            return 0;
        });

    return (
        <div className="mt-4 h-full space-y-4">
            <Card className="h-full">
                <CardHeader className="pb-3">
                    <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
                        <div>
                            <CardTitle className="text-primary mb-0 pb-0 text-2xl font-bold">
                                Preset Management
                            </CardTitle>
                            <CardDescription className="text-lg text-gray-400">
                                Manage and organize your FSRS presets
                            </CardDescription>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            <div className="relative">
                                <IconSearch className="text-muted-foreground absolute left-2.5 top-2.5 size-4" />
                                <Input
                                    className="w-[200px] pl-9"
                                    placeholder="Search presets..."
                                    value={presetSearchQuery}
                                    onChange={(e) => setPresetSearchQuery(e.target.value)}
                                />
                            </div>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button size="sm" variant="outline">
                                        <IconArrowsUpDown className="mr-2 size-4" />
                                        Sort
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuItem
                                        onClick={() => {
                                            setPresetSortBy("title");
                                            setPresetSortOrder(
                                                presetSortOrder === "asc" ? "desc" : "asc",
                                            );
                                        }}
                                    >
                                        By Name{" "}
                                        {presetSortBy === "title" &&
                                            (presetSortOrder === "asc" ? "(A-Z)" : "(Z-A)")}
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                        onClick={() => {
                                            setPresetSortBy("date");
                                            setPresetSortOrder(
                                                presetSortOrder === "asc" ? "desc" : "asc",
                                            );
                                        }}
                                    >
                                        By Date{" "}
                                        {presetSortBy === "date" &&
                                            (presetSortOrder === "asc" ? "(Oldest)" : "(Newest)")}
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                            <Button
                                onClick={() => router.push("/fsrs-management/create-preset")}
                            >
                                <IconPlus className="size-4" />
                                New Preset
                            </Button>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {isPending ? (
                            <div className="mb-8 grid w-full grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                                {Array.from({ length: 6 }).map((_, index) => (
                                    <div
                                        key={index}
                                        className="border-border group overflow-hidden rounded-lg border bg-white transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
                                    >
                                        <Skeleton className="h-[30vh] w-full" />
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <CardPreset
                                filteredAndSortedPresets={filteredAndSortedPresets ?? []}
                            />
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

export default PresetManagementModule;
