"use client";

import { Badge } from "@highschool/ui/components/ui/badge";
import { Button } from "@highschool/ui/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@highschool/ui/components/ui/card";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@highschool/ui/components/ui/dropdown-menu";
import { Input } from "@highschool/ui/components/ui/input";
import { Label } from "@highschool/ui/components/ui/label";
import {
    IconChevronRight,
    IconDeviceFloppy,
    IconRestore,
} from "@tabler/icons-react";
import { useState } from "react";
import { FSRSCategory, FSRSPreset } from "@highschool/interfaces";
import { Switch } from "@highschool/ui/components/ui/switch";
import { toast } from "sonner";

import CardParam from "./card-param";
import { RetrievabilityGraph } from "./graph-overview";

import {
    categoryConfig,
    defaultParameters,
} from "@/domain/constants/fsrs-constant";

function CreatePresetModule() {
    const [activeFilter, setActiveFilter] = useState<"all" | FSRSCategory>("all");
    const [activeSort, setActiveSort] = useState<"name" | "value" | "impact">(
        "name",
    );
    const [isPublic, setIsPublic] = useState<boolean>(false);

    const [activePreset, setActivePreset] = useState<FSRSPreset>({
        title: "New Preset",
        fsrsParameters: [...defaultParameters],
        retrievability: 0,
        isPublicPreset: true,
    });

    // Filter parameters based on active filter
    const filteredParameters = activePreset.fsrsParameters.filter(
        (param) => activeFilter === "all" || param.category === activeFilter,
    );

    const sortedParameters = [...filteredParameters].sort((a, b) => {
        if (activeSort === "name") return a.name.localeCompare(b.name);
        if (activeSort === "value") return b.value - a.value;
        if (activeSort === "impact") {
            const impactOrder = { high: 0, medium: 1, low: 2 };

            return impactOrder[a.impact] - impactOrder[b.impact];
        }

        return 0;
    });

    const handlePublicChange = (value: boolean) => {
        setIsPublic(value);
        setActivePreset({
            ...activePreset,
            isPublicPreset: value,
        });

        toast.success(
            value
                ? `Preset is now public. This preset will share with students.`
                : "Preset is now private.",
        );
    };

    return (
        <div className="mt-4 flex flex-col gap-6">
            <div className="flex items-center justify-between">
                <div>
                    <div className="text-primary text-3xl font-bold">
                        Create Preset for FSRS Algorithms
                    </div>
                    <div className="text-lg text-gray-400">
                        Customize your FSRS preset with parameters that suit your needs.
                    </div>
                </div>
                <div className="flex items-center space-x-2">
                    <Button>
                        <IconRestore />
                        Reset
                    </Button>
                    <Button>
                        <IconDeviceFloppy />
                        Save
                    </Button>
                </div>
            </div>
            <Card>
                <CardHeader className="pb-3">
                    <CardTitle className="text-xl">Main Settings</CardTitle>
                    <CardDescription>
                        Configure the main settings for your FSRS preset
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 items-start gap-6 md:grid-cols-2">
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label>Input Your Title Preset</Label>
                                <Input placeholder="Input your title preset" type="text" />
                            </div>
                            <div className="space-y-2">
                                <div className="flex justify-between">
                                    <Label htmlFor="retrievability">Retrievability</Label>
                                </div>

                                <div className="flex items-center space-x-4">
                                    <div className="flex size-12 items-center justify-center rounded-full border-2 border-gray-200">
                                        <span className="overflow-hidden text-lg font-bold">
                                            {activePreset.retrievability}
                                        </span>
                                    </div>
                                    <div className="space-y-2">
                                        <Input
                                            type="number"
                                            value={activePreset.retrievability}
                                            onChange={(e) => {
                                                setActivePreset({
                                                    ...activePreset,
                                                    retrievability: parseFloat(e.target.value),
                                                });
                                            }}
                                        />
                                        <div />
                                        <p className="text-muted-foreground text-xs">
                                            Desired probability of recall at review time
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Label>{isPublic ? "Public Preset" : "Private Preset"}</Label>
                                <Switch
                                    checked={isPublic}
                                    onCheckedChange={handlePublicChange}
                                />
                            </div>
                        </div>
                        <RetrievabilityGraph parameters={activePreset.fsrsParameters} />
                    </div>
                </CardContent>
            </Card>

            {/* Parameter filters */}
            <div className="flex flex-col justify-between gap-4 md:flex-row">
                <div className="flex flex-wrap gap-2">
                    <Badge
                        className="cursor-pointer"
                        variant={activeFilter === "all" ? "default" : "outline"}
                        onClick={() => setActiveFilter("all")}
                    >
                        All Parameters
                    </Badge>
                    {Object.entries(categoryConfig).map(([category, config]) => (
                        <Badge
                            key={category}
                            className={`cursor-pointer ${activeFilter === category ? config.color : ""}`}
                            variant={activeFilter === category ? "default" : "outline"}
                            onClick={() => setActiveFilter(category as any)}
                        >
                            {config.icon}
                            <span className="ml-1">{config.title}</span>
                        </Badge>
                    ))}
                </div>

                <div className="flex items-center gap-2">
                    <span className="text-muted-foreground text-sm">Sort by:</span>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button size="sm" variant="outline">
                                {activeSort === "name" && "Name"}
                                {activeSort === "value" && "Value"}
                                {activeSort === "impact" && "Impact"}
                                <IconChevronRight className="ml-2 size-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => setActiveSort("name")}>
                                Name
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setActiveSort("value")}>
                                Value
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setActiveSort("impact")}>
                                Impact
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>

            {/* Parameters grid */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {sortedParameters.map((param, index) => (
                    <CardParam
                        key={index}
                        activePreset={activePreset}
                        index={index}
                        param={param}
                        setActivePreset={setActivePreset}
                    />
                ))}
            </div>
        </div>
    );
}

export default CreatePresetModule;
