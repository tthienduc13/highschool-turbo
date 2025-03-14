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

import {
    Bar,
    BarChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "@/components/ui/chart";

// Generate sample data for different time periods
const generateTimeData = (timeRange: string) => {
    const data = [];
    const now = new Date();

    if (timeRange === "1d") {
        // Generate hourly data for the past 24 hours
        for (let i = 23; i >= 0; i--) {
            const hour = new Date(now);

            hour.setHours(hour.getHours() - i);

            // More activity during work hours
            const hourOfDay = hour.getHours();
            const activityFactor = hourOfDay >= 9 && hourOfDay <= 17 ? 1.5 : 0.7;

            data.push({
                time: `${hour.getHours().toString().padStart(2, "0")}:00`,
                documents: Math.floor((5 + Math.random() * 8) * activityFactor),
                flashcards: Math.floor((2 + Math.random() * 4) * activityFactor),
                courses: Math.floor((0 + Math.random() * 2) * activityFactor),
            });
        }
    } else if (timeRange === "1w") {
        // Generate daily data for the past 7 days
        for (let i = 6; i >= 0; i--) {
            const day = new Date(now);

            day.setDate(day.getDate() - i);

            // Less activity on weekends
            const dayOfWeek = day.getDay();
            const weekendFactor = dayOfWeek === 0 || dayOfWeek === 6 ? 0.6 : 1.2;

            data.push({
                time: day.toLocaleDateString("en-US", { weekday: "short" }),
                documents: Math.floor((15 + Math.random() * 20) * weekendFactor),
                flashcards: Math.floor((8 + Math.random() * 10) * weekendFactor),
                courses: Math.floor((1 + Math.random() * 3) * weekendFactor),
            });
        }
    } else if (timeRange === "1m") {
        // Generate data for the past 30 days
        for (let i = 29; i >= 0; i--) {
            const day = new Date(now);

            day.setDate(day.getDate() - i);

            data.push({
                time: `${day.getMonth() + 1}/${day.getDate()}`,
                documents: Math.floor(20 + Math.random() * 30),
                flashcards: Math.floor(10 + Math.random() * 15),
                courses: Math.floor(2 + Math.random() * 4),
            });
        }
    } else {
        // Generate monthly data for the past 12 months (default)
        const currentMonth = now.getMonth();

        for (let i = 11; i >= 0; i--) {
            const month = (currentMonth - i + 12) % 12;
            const year = now.getFullYear() - (currentMonth < i ? 1 : 0);

            // Base values with some randomness and growth trend
            const growthFactor = 1 + (11 - i) * 0.03;
            const documents = Math.floor((200 + Math.random() * 100) * growthFactor);
            const flashcards = Math.floor((80 + Math.random() * 40) * growthFactor);
            const courses = Math.floor((15 + Math.random() * 10) * growthFactor);

            data.push({
                time: `${year}-${String(month + 1).padStart(2, "0")}`,
                documents,
                flashcards,
                courses,
            });
        }
    }

    return data;
};

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
    const [timeRange, setTimeRange] = useState("1y");
    const data = generateTimeData(timeRange);

    // Format the x-axis labels based on time range
    const formatXAxis = (value: string) => {
        if (timeRange === "1y") {
            const [year, month] = value.split("-");

            return `${monthNames[Number.parseInt(month) - 1]}`;
        }

        return value;
    };

    // Get appropriate title based on time range
    const getTimeRangeTitle = () => {
        switch (timeRange) {
            case "1d":
                return "past 24 hours";
            case "1w":
                return "past week";
            case "1m":
                return "past month";
            case "1y":
                return "past 12 months";
            default:
                return "past 12 months";
        }
    };

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <div>
                    <CardTitle>Content Creation Trends</CardTitle>
                    <CardDescription>
                        New content created over the {getTimeRangeTitle()}
                    </CardDescription>
                </div>
                <Select value={timeRange} onValueChange={setTimeRange}>
                    <SelectTrigger className="w-[120px]">
                        <SelectValue placeholder="Select range" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="1d">1 Day</SelectItem>
                        <SelectItem value="1w">1 Week</SelectItem>
                        <SelectItem value="1m">1 Month</SelectItem>
                        <SelectItem value="1y">1 Year</SelectItem>
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
                            tickFormatter={(value) =>
                                timeRange === "1y" ? `${value / 1000}k` : `${value}`
                            }
                            tickLine={false}
                        />
                        <Tooltip
                            content={({ active, payload }) => {
                                if (active && payload && payload.length) {
                                    const data = payload[0].payload;
                                    let timeLabel = data.time;

                                    // Format time label based on time range
                                    if (timeRange === "1y") {
                                        const [year, month] = data.time.split("-");
                                        const monthName = monthNames[Number.parseInt(month) - 1];

                                        timeLabel = `${monthName} ${year}`;
                                    } else if (timeRange === "1d") {
                                        timeLabel = `${data.time}`;
                                    }

                                    return (
                                        <div className="bg-background rounded-lg border p-2 shadow-sm">
                                            <div className="grid gap-2">
                                                <div className="flex flex-col">
                                                    <span className="text-muted-foreground text-[0.70rem] uppercase">
                                                        {timeRange === "1d"
                                                            ? "Hour"
                                                            : timeRange === "1w"
                                                                ? "Day"
                                                                : timeRange === "1m"
                                                                    ? "Date"
                                                                    : "Month"}
                                                    </span>
                                                    <span className="text-xs font-bold">{timeLabel}</span>
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="text-muted-foreground text-[0.70rem] uppercase">
                                                        Documents
                                                    </span>
                                                    <span className="text-xs font-bold">
                                                        {data.documents.toLocaleString()}
                                                    </span>
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="text-muted-foreground text-[0.70rem] uppercase">
                                                        Flashcards
                                                    </span>
                                                    <span className="text-xs font-bold">
                                                        {data.flashcards.toLocaleString()}
                                                    </span>
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="text-muted-foreground text-[0.70rem] uppercase">
                                                        Courses
                                                    </span>
                                                    <span className="text-xs font-bold">
                                                        {data.courses.toLocaleString()}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                }

                                return null;
                            }}
                        />
                        <Bar
                            className="fill-primary"
                            dataKey="documents"
                            fill="#2563eb"
                            radius={[4, 4, 0, 0]}
                        />
                        <Bar
                            className="fill-green-600"
                            dataKey="flashcards"
                            fill="#16a34a"
                            radius={[4, 4, 0, 0]}
                        />
                        <Bar
                            className="fill-red-600"
                            dataKey="courses"
                            fill="#dc2626"
                            radius={[4, 4, 0, 0]}
                        />
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
