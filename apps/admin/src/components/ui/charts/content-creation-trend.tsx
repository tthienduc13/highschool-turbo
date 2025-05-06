"use client";

import { useState } from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@highschool/ui/components/ui/card";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@highschool/ui/components/ui/select";
import { useGetContentCreated } from "@highschool/react-query/queries";

import {
    Bar,
    BarChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "@/components/ui/chart";

const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
];

export function ContentCreationChart() {
    const [timeRange, setTimeRange] = useState<"day" | "week" | "month" | "year">(
        "month",
    );

    const { data: contentCreateds } = useGetContentCreated({
        type: timeRange,
    });

    const data = contentCreateds?.map((entry) => {
        const date = new Date(entry.date);

        let time = "";

        switch (timeRange) {
            case "year":
                time = date.toISOString().slice(0, 7); // "2024-05"
                break;
            case "month":
                time = `${date.getMonth() + 1}/${date.getDate()}`; // "5/1"
                break;
            case "week":
                time = date.toLocaleDateString("en-US", { weekday: "short" }); // "Mon"
                break;
            case "day":
                time = `${date.getHours().toString().padStart(2, "0")}:00`; // "13:00"
                break;
        }

        return { ...entry, time };
    });

    const formatXAxis = (value: string) => {
        switch (timeRange) {
            case "year": {
                const [year, month] = value.split("-");

                return `${monthNames[parseInt(month, 10) - 1]}`;
            }
            default:
                return value;
        }
    };

    const getTimeRangeTitle = () => "past months";

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <div>
                    <CardTitle>Content Creation Trends</CardTitle>
                    <CardDescription>
                        New content created over the {getTimeRangeTitle()}
                    </CardDescription>
                </div>
                <Select
                    value={timeRange}
                    onValueChange={(value) =>
                        setTimeRange(value as "day" | "week" | "month" | "year")
                    }
                >
                    <SelectTrigger className="w-[120px]">
                        <SelectValue placeholder="Select range" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="year">Year</SelectItem>
                        <SelectItem value="month">Month</SelectItem>
                        <SelectItem value="week">Week</SelectItem>
                        <SelectItem value="day">Day</SelectItem>
                    </SelectContent>
                </Select>
            </CardHeader>
            <CardContent className="m-0 mb-5 mr-2 p-0">
                <ResponsiveContainer height={300} width="100%">
                    <BarChart data={data}>
                        <XAxis
                            axisLine={false}
                            dataKey="time"
                            fontSize={12}
                            stroke="#888888"
                            tickFormatter={formatXAxis}
                            tickLine={false}
                        />
                        <YAxis
                            axisLine={false}
                            fontSize={12}
                            stroke="#888888"
                            tickFormatter={(value) => `${value}`}
                            tickLine={false}
                        />
                        <Tooltip
                            content={({ active, payload }) => {
                                if (active && payload && payload.length) {
                                    const d = payload[0].payload;
                                    let labelTitle = "";

                                    switch (timeRange) {
                                        case "year": {
                                            const [year, month] = d.time.split("-");

                                            labelTitle = `${monthNames[parseInt(month, 10) - 1]} ${year}`;
                                            break;
                                        }
                                        case "month":
                                            labelTitle = `Date ${d.time}`;
                                            break;
                                        case "week":
                                            labelTitle = `Day ${d.time}`;
                                            break;
                                        case "day":
                                            labelTitle = `Hour ${d.time}`;
                                            break;
                                    }

                                    return (
                                        <div className="bg-background rounded-lg border p-2 shadow-sm">
                                            <div className="grid gap-2">
                                                <div className="flex flex-col">
                                                    <span className="text-muted-foreground text-[0.70rem] uppercase">
                                                        {timeRange}
                                                    </span>
                                                    <span className="text-xs font-bold">
                                                        {labelTitle}
                                                    </span>
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="text-muted-foreground text-[0.70rem] uppercase">
                                                        Documents
                                                    </span>
                                                    <span className="text-xs font-bold">
                                                        {d.documents.toLocaleString()}
                                                    </span>
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="text-muted-foreground text-[0.70rem] uppercase">
                                                        Flashcards
                                                    </span>
                                                    <span className="text-xs font-bold">
                                                        {d.flashcards.toLocaleString()}
                                                    </span>
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="text-muted-foreground text-[0.70rem] uppercase">
                                                        Courses
                                                    </span>
                                                    <span className="text-xs font-bold">
                                                        {d.courses.toLocaleString()}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                }

                                return null;
                            }}
                        />

                        <Bar dataKey="documents" fill="#2563eb" radius={[4, 4, 0, 0]} />
                        <Bar dataKey="flashcards" fill="#16a34a" radius={[4, 4, 0, 0]} />
                        <Bar dataKey="courses" fill="#dc2626" radius={[4, 4, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
                <div className="mt-2 flex items-center justify-center gap-4">
                    <div className="flex items-center gap-1">
                        <div className="bg-primary size-3 rounded-full" />
                        <span className="text-muted-foreground text-xs">Documents</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <div className="size-3 rounded-full bg-green-600" />
                        <span className="text-muted-foreground text-xs">Flashcards</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <div className="size-3 rounded-full bg-red-600" />
                        <span className="text-muted-foreground text-xs">Courses</span>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
