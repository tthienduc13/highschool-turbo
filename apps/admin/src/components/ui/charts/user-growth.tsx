/* eslint-disable padding-line-between-statements */
"use client";

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
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@highschool/ui/components/ui/popover";
import { Button } from "@highschool/ui/components/ui/button";
import { Label } from "@highschool/ui/components/ui/label";
import { Input } from "@highschool/ui/components/ui/input";
import {
    RadioGroup,
    RadioGroupItem,
} from "@highschool/ui/components/ui/radio-group";
import { useState } from "react";
import { IconClock } from "@tabler/icons-react";
import { useUserGrowthQuery } from "@highschool/react-query/queries";
import { UserGrowth } from "@highschool/interfaces";

import {
    Area,
    AreaChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "@/components/ui/chart";
import { monthNames, weekDays } from "@/domain/constants/data-const";

export function UserGrowthChart() {
    const [timeRange, setTimeRange] = useState("Year");
    const [customValue, setCustomValue] = useState("1");
    const [customUnit, setCustomUnit] = useState("Year");
    const isLoading = false;

    const { data: usersData } = useUserGrowthQuery({
        amount: Number(customValue),
        isCountFromNow: false,
        userActivityType: timeRange === "Custom" ? customUnit : timeRange,
    });

    const formatDataCustom = () => {
        const result: UserGrowth[] = [];
        if (timeRange === "Custom" && customUnit === "Month") {
            usersData?.forEach(({ date, students, teachers, moderators }) => {
                const d = new Date(date);
                const year = d.getFullYear();
                const month = d.getMonth(); // 0-based month

                const index = result.findIndex((item) => {
                    const itemYear = new Date(item.date).getFullYear();
                    const itemMonth = new Date(item.date).getMonth();
                    return itemYear === year && itemMonth === month;
                });

                if (index === -1) {
                    result.push({
                        date: date,
                        students: 0,
                        teachers: 0,
                        moderators: 0,
                    });
                } else {
                    result[index].students += students;
                    result[index].teachers += teachers;
                    result[index].moderators += moderators;
                }
            });

            return result;
        } else if (timeRange === "Custom" && customUnit === "Year") {
            usersData?.forEach(({ date, students, teachers, moderators }) => {
                const d = new Date(date);
                const year = d.getFullYear();
                const index = result.findIndex((item) => {
                    const itemYear = new Date(item.date).getFullYear();
                    return itemYear === year;
                });

                if (index === -1) {
                    result.push({
                        date: date,
                        students: 0,
                        teachers: 0,
                        moderators: 0,
                    });
                } else {
                    result[index].students += students;
                    result[index].teachers += teachers;
                    result[index].moderators += moderators;
                }
            });

            return result;
        }

        return usersData;
    };

    const users = formatDataCustom();

    // Handle time range changes and trigger API fetch if callback provided
    const handleTimeRangeChange = (newRange: any) => {
        setTimeRange(newRange);
    };

    // Handle custom range changes
    const handleCustomValueChange = (value: any) => {
        setCustomValue(value);
    };

    const handleCustomUnitChange = (unit: any) => {
        setCustomUnit(unit);
    };

    // Process data to ensure all data points have default values
    const processedData =
        users?.map((item: any) => ({
            ...item,
            students: item.students ?? 0,
            teachers: item.teachers ?? 0,
            moderators: item.moderators ?? 0,
        })) ?? [];

    // Get appropriate title based on time range
    const getTimeRangeTitle = () => {
        const now = new Date();

        switch (timeRange) {
            case "Week":
                return "current week (Monday to Sunday)";
            case "Month":
                return `${monthNames[now.getMonth()]} ${now.getFullYear()}`;
            case "Year":
                return now.getFullYear().toString();
            case "Custom":
                if (customUnit === "Year") {
                    const endYear = now.getFullYear();
                    const startYear = endYear - Number.parseInt(customValue) + 1;

                    return `${startYear} - ${endYear}`;
                } else if (customUnit === "Month") {
                    return `past ${customValue} months`;
                } else if (customUnit === "Day") {
                    return `past ${customValue} Days`;
                }

                return `past ${customValue} ${customUnit}`;
            default:
                return "past 12 months";
        }
    };

    // Format the x-axis labels based on time range
    const formatXAxis = (value: any) => {
        if (timeRange === "Custom") {
            if (customUnit === "Year") {
                return new Date(value).getFullYear().toString();
            }
            if (
                customUnit === "Month" &&
                typeof value === "string" &&
                value.includes("-")
            ) {
                const [year, month] = value.split("-");

                return `${monthNames[Number.parseInt(month) - 1].substring(0, 3)}`;
            }
            if (customUnit === "Day" && typeof value === "string") {
                try {
                    const date = new Date(value);

                    return `${date.getDate()}/${date.getMonth() + 1}`;
                } catch (e) {
                    return value;
                }
            }
        }

        try {
            const date = new Date(value);

            if (timeRange === "Week") {
                return weekDays[date.getDay()];
            } else if (timeRange === "Month") {
                return date.getDate().toString();
            } else if (timeRange === "Year") {
                return monthNames[new Date(date).getMonth()].substring(0, 3);
            }
        } catch (e) {
            // If date parsing fails, return the value as is
            return value.toString();
        }

        return value;
    };

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <div>
                    <CardTitle>User Growth</CardTitle>
                    <CardDescription>
                        New registrations over the {getTimeRangeTitle()}
                    </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                    <Select value={timeRange} onValueChange={handleTimeRangeChange}>
                        <SelectTrigger className="w-[130px]">
                            <SelectValue placeholder="Select range" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Week">Week</SelectItem>
                            <SelectItem value="Month">Month</SelectItem>
                            <SelectItem value="Year">Year</SelectItem>
                            <SelectItem value="Custom">Custom</SelectItem>
                        </SelectContent>
                    </Select>

                    {timeRange === "Custom" && (
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    className="flex items-center gap-1"
                                    size="sm"
                                    variant="outline"
                                >
                                    <IconClock className="size-4" />
                                    {customValue} {customUnit}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-80">
                                <div className="grid gap-4">
                                    <div className="space-y-2">
                                        <h4 className="font-medium leading-none">
                                            Custom Time Range
                                        </h4>
                                        <p className="text-muted-foreground text-sm">
                                            Set a specific time range to view data
                                        </p>
                                    </div>
                                    <div className="grid grid-cols-3 items-center gap-4">
                                        <Label className="text-right" htmlFor="custom-value">
                                            Show last
                                        </Label>
                                        <Input
                                            className="col-span-1"
                                            id="custom-value"
                                            min="1"
                                            type="number"
                                            value={customValue}
                                            onChange={(e) => handleCustomValueChange(e.target.value)}
                                        />
                                        <div className="col-span-1">
                                            <RadioGroup
                                                className="flex flex-col space-y-1"
                                                value={customUnit}
                                                onValueChange={handleCustomUnitChange}
                                            >
                                                <div className="flex items-center space-x-2">
                                                    <RadioGroupItem id="days" value="Day" />
                                                    <Label htmlFor="days">Days</Label>
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                    <RadioGroupItem id="months" value="Month" />
                                                    <Label htmlFor="months">Months</Label>
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                    <RadioGroupItem id="years" value="Year" />
                                                    <Label htmlFor="years">Years</Label>
                                                </div>
                                            </RadioGroup>
                                        </div>
                                    </div>
                                </div>
                            </PopoverContent>
                        </Popover>
                    )}
                </div>
            </CardHeader>
            <CardContent>
                {isLoading ? (
                    <div className="flex h-[300px] items-center justify-center">
                        <div className="border-primary size-8 animate-spin rounded-full border-b-2" />
                    </div>
                ) : processedData.length > 0 ? (
                    <ResponsiveContainer height={300} width="100%">
                        <AreaChart data={processedData}>
                            <defs>
                                <linearGradient
                                    id="studentGradient"
                                    x1="0"
                                    x2="0"
                                    y1="0"
                                    y2="1"
                                >
                                    <stop offset="5%" stopColor="#2563eb" stopOpacity={0.8} />
                                    <stop offset="95%" stopColor="#2563eb" stopOpacity={0.1} />
                                </linearGradient>
                                <linearGradient
                                    id="teacherGradient"
                                    x1="0"
                                    x2="0"
                                    y1="0"
                                    y2="1"
                                >
                                    <stop offset="5%" stopColor="#16a34a" stopOpacity={0.8} />
                                    <stop offset="95%" stopColor="#16a34a" stopOpacity={0.1} />
                                </linearGradient>
                                <linearGradient
                                    id="moderatorGradient"
                                    x1="0"
                                    x2="0"
                                    y1="0"
                                    y2="1"
                                >
                                    <stop offset="5%" stopColor="#dc2626" stopOpacity={0.8} />
                                    <stop offset="95%" stopColor="#dc2626" stopOpacity={0.1} />
                                </linearGradient>
                            </defs>
                            <XAxis
                                axisLine={false}
                                dataKey="date"
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
                                        const data = payload[0].payload;
                                        const date = new Date(data.date);
                                        let timeLabel = data.date;

                                        // Format time label based on time range
                                        if (timeRange === "Custom" && customUnit === "Year") {
                                            timeLabel = date.getFullYear().toString();
                                        } else if (
                                            timeRange === "Year" ||
                                            (timeRange === "Custom" && customUnit === "Month")
                                        ) {
                                            if (
                                                typeof data.date === "string" &&
                                                data.date.includes("-")
                                            ) {
                                                const [year, month] = data.date.split("-");
                                                const monthName =
                                                    monthNames[Number.parseInt(month) - 1];

                                                timeLabel = `${monthName} ${year}`;
                                            }
                                        } else if (
                                            timeRange === "Week" ||
                                            (timeRange === "Custom" && customUnit === "Day")
                                        ) {
                                            try {
                                                timeLabel = date.toLocaleDateString();
                                            } catch (e) {
                                                // Use as is
                                            }
                                        } else if (timeRange === "Month") {
                                            try {
                                                timeLabel = date.toLocaleDateString();
                                            } catch (e) {
                                                // Use as is
                                            }
                                        }

                                        return (
                                            <div className="bg-background rounded-lg border p-2 shadow-sm">
                                                <div className="grid gap-2">
                                                    <div className="flex flex-col">
                                                        <span className="text-muted-foreground text-[0.70rem] uppercase">
                                                            {timeRange === "Custom"
                                                                ? customUnit === "Year"
                                                                    ? "Year"
                                                                    : customUnit === "Month"
                                                                        ? "Month"
                                                                        : customUnit === "Day"
                                                                            ? "Day"
                                                                            : "Hour"
                                                                : timeRange === "Week"
                                                                    ? "Day"
                                                                    : timeRange === "Month"
                                                                        ? "Date"
                                                                        : "Month"}
                                                        </span>
                                                        <span className="text-xs font-bold">
                                                            {timeLabel}
                                                        </span>
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <span className="text-muted-foreground text-[0.70rem] uppercase">
                                                            New Students
                                                        </span>
                                                        <span className="text-xs font-bold">
                                                            {data.students.toLocaleString()}
                                                        </span>
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <span className="text-muted-foreground text-[0.70rem] uppercase">
                                                            New Teachers
                                                        </span>
                                                        <span className="text-xs font-bold">
                                                            {data.teachers.toLocaleString()}
                                                        </span>
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <span className="text-muted-foreground text-[0.70rem] uppercase">
                                                            New Moderators
                                                        </span>
                                                        <span className="text-xs font-bold">
                                                            {data.moderators.toLocaleString()}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    }

                                    return null;
                                }}
                            />
                            <Area
                                dataKey="students"
                                fill="url(#studentGradient)"
                                fillOpacity={1}
                                stroke="#2563eb"
                                type="monotone"
                            />
                            <Area
                                dataKey="teachers"
                                fill="url(#teacherGradient)"
                                fillOpacity={1}
                                stroke="#16a34a"
                                type="monotone"
                            />
                            <Area
                                dataKey="moderators"
                                fill="url(#moderatorGradient)"
                                fillOpacity={1}
                                stroke="#dc2626"
                                type="monotone"
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                ) : (
                    <div className="text-muted-foreground flex h-[300px] items-center justify-center">
                        No data available
                    </div>
                )}
                <div className="mt-2 flex items-center justify-center gap-4">
                    <div className="flex items-center gap-1">
                        <div className="size-3 rounded-full bg-[#2563eb]" />
                        <span className="text-muted-foreground text-xs">Students</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <div className="size-3 rounded-full bg-[#16a34a]" />
                        <span className="text-muted-foreground text-xs">Teachers</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <div className="size-3 rounded-full bg-[#dc2626]" />
                        <span className="text-muted-foreground text-xs">Moderators</span>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
