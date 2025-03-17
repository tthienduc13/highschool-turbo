"use client";

import { useEffect, useState } from "react";
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
import { Input } from "@highschool/ui/components/ui/input";
import {
    RadioGroup,
    RadioGroupItem,
} from "@highschool/ui/components/ui/radio-group";
import { Label } from "@highschool/ui/components/ui/label";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@highschool/ui/components/ui/popover";
import { Button } from "@highschool/ui/components/ui/button";
import { IconClock } from "@tabler/icons-react";

import {
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "@/components/ui/chart";
import { monthData, weekData, yearData } from "@/domain/constants/analyst-card";

export function UserActivityChart() {
    const [timeRange, setTimeRange] = useState("month");
    const [customValue, setCustomValue] = useState("1");
    const [customUnit, setCustomUnit] = useState("hours");
    const [data, setData] = useState<any>([]);
    const isLoading = false;

    useEffect(() => {
        if (timeRange === "week") {
            setData(weekData);
        } else if (timeRange === "month") {
            setData(monthData);
        } else if (timeRange === "year") {
            setData(yearData);
        }
    }, [timeRange]);

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
    const processedData = data.map((item: any) => ({
        ...item,
        students: item.students ?? 0,
        teachers: item.teachers ?? 0,
        moderators: item.moderators ?? 0,
    }));

    // Determine which data key to use for X-axis
    const getXAxisDataKey = () => {
        if (timeRange === "custom") {
            if (customUnit === "years") return "year";
            if (customUnit === "months") return "monthYear";
            if (customUnit === "hours") return "hourDay";
            if (customUnit === "minutes") return "minuteTime";
        }

        return "date";
    };

    // Format the x-axis labels based on time range and interval
    const formatXAxis = (value: any) => {
        // Handle special cases for direct display
        if (timeRange === "custom") {
            if (customUnit === "years") {
                return typeof value === "number" ? value.toString() : value;
            }
            if (customUnit === "months") {
                // If it's already formatted as month/year, use it directly
                if (typeof value === "string" && value.includes("/")) {
                    return value;
                }
                // Otherwise, if it's a month number, convert to name
                if (typeof value === "number" && value >= 0 && value <= 11) {
                    return monthNames[value].substring(0, 3);
                }
            }
            if (customUnit === "hours") {
                // If it's already formatted, use it directly
                if (typeof value === "string" && value.includes("h")) {
                    return value;
                }
                // Otherwise, if it's an hour number, format it
                if (typeof value === "number" && value >= 0 && value <= 23) {
                    return `${value}h00`;
                }
            }
            if (customUnit === "minutes") {
                // If it's already formatted as "11h33", use it directly
                if (typeof value === "string" && value.includes("h")) {
                    return value;
                }
            }
        }

        // For other data types, parse the date
        try {
            const date = new Date(value);

            if (timeRange === "week") {
                return weekDays[date.getDay()];
            } else if (timeRange === "month") {
                return date.getDate().toString();
            } else if (timeRange === "year") {
                return monthNames[date.getMonth()].substring(0, 3);
            }
        } catch (e) {
            // If date parsing fails, return the value as is
            return value.toString();
        }

        // Default fallback
        return value.toString();
    };

    // Get appropriate title based on time range
    const getTimeRangeTitle = () => {
        const now = new Date();

        switch (timeRange) {
            case "week":
                return "current week (Monday to Sunday)";
            case "month":
                return `${monthNames[now.getMonth()]} ${now.getFullYear()}`;
            case "year":
                return now.getFullYear().toString();
            case "custom":
                if (customUnit === "years") {
                    const endYear = now.getFullYear();
                    const startYear = endYear - Number.parseInt(customValue) + 1;

                    return `${startYear} - ${endYear}`;
                } else if (customUnit === "months") {
                    return `past ${customValue} months`;
                } else if (customUnit === "hours") {
                    return `past ${customValue} hours`;
                } else if (customUnit === "minutes") {
                    return `past ${customValue} minutes`;
                }

                return `past ${customValue} ${customUnit}`;
            default:
                return "selected period";
        }
    };

    // Month and weekday names for formatting
    const monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];

    const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    // Get tooltip label based on time range
    const getTooltipLabel = () => {
        if (timeRange === "custom") {
            if (customUnit === "years") return "Year";
            if (customUnit === "months") return "Month";
            if (customUnit === "hours") return "Hour";
            if (customUnit === "minutes") return "Time";
        }

        return "Date";
    };

    // Format tooltip date/time value
    const formatTooltipDate = (data: any) => {
        if (timeRange === "custom") {
            if (customUnit === "years" && data.year) {
                return data.year.toString();
            }
            if (customUnit === "months" && data.monthYear) {
                const monthNum = data.month;

                return `${monthNames[monthNum]} ${data.monthYear.split("/")[1]}`;
            }
            if (customUnit === "hours" && data.hourDay) {
                return data.hourDay;
            }
            if (customUnit === "minutes" && data.minuteTime) {
                return data.minuteTime;
            }
        }

        try {
            const date = new Date(data.date);

            if (timeRange === "week") {
                return `${weekDays[date.getDay()]}, ${date.toLocaleDateString()}`;
            } else if (timeRange === "month") {
                return date.toLocaleDateString();
            } else if (timeRange === "year") {
                return `${monthNames[date.getMonth()]} ${date.getFullYear()}`;
            }

            return date.toLocaleDateString();
        } catch (e) {
            return data.date || "N/A";
        }
    };

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <div>
                    <CardTitle>User Activity</CardTitle>
                    <CardDescription>
                        Daily active users for {getTimeRangeTitle()}
                    </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                    <Select value={timeRange} onValueChange={handleTimeRangeChange}>
                        <SelectTrigger className="w-[130px]">
                            <SelectValue placeholder="Select range" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="week">Week</SelectItem>
                            <SelectItem value="month">Month</SelectItem>
                            <SelectItem value="year">Year</SelectItem>
                            <SelectItem value="custom">Custom</SelectItem>
                        </SelectContent>
                    </Select>

                    {timeRange === "custom" && (
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
                            <PopoverContent className="">
                                <div className="grid gap-4">
                                    <div className="space-y-2">
                                        <h4 className="font-medium leading-none">
                                            Custom Time Range
                                        </h4>
                                        <p className="text-muted-foreground text-sm">
                                            Set a specific time range to view data
                                        </p>
                                    </div>
                                    <div className="grid grid-cols-2 items-center gap-4">
                                        <div className="space-y-2">
                                            <Label className="text-right" htmlFor="custom-value">
                                                Show last
                                            </Label>
                                            <Input
                                                className="col-span-1"
                                                id="custom-value"
                                                min="1"
                                                type="number"
                                                value={customValue}
                                                onChange={(e) =>
                                                    handleCustomValueChange(e.target.value)
                                                }
                                            />
                                            <Button className="w-full">Save</Button>
                                        </div>
                                        <div className="col-span-1">
                                            <RadioGroup
                                                className="flex flex-col space-y-1"
                                                value={customUnit}
                                                onValueChange={handleCustomUnitChange}
                                            >
                                                <div className="flex items-center space-x-2">
                                                    <RadioGroupItem id="minutes" value="minutes" />
                                                    <Label htmlFor="minutes">Minutes</Label>
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                    <RadioGroupItem id="hours" value="hours" />
                                                    <Label htmlFor="hours">Hours</Label>
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                    <RadioGroupItem id="months" value="months" />
                                                    <Label htmlFor="months">Months</Label>
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                    <RadioGroupItem id="years" value="years" />
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
            <CardContent className="pl-2">
                {isLoading ? (
                    <div className="flex h-[300px] items-center justify-center">
                        <div className="border-primary size-8 animate-spin rounded-full border-b-2" />
                    </div>
                ) : processedData.length > 0 ? (
                    <ResponsiveContainer height={300} width="100%">
                        <LineChart data={processedData}>
                            <XAxis
                                axisLine={false}
                                dataKey={getXAxisDataKey()}
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

                                        return (
                                            <div className="bg-background rounded-lg border p-2 shadow-sm">
                                                <div className="grid grid-cols-2 gap-2">
                                                    <div className="flex flex-col">
                                                        <span className="text-muted-foreground text-[0.70rem] uppercase">
                                                            {getTooltipLabel()}
                                                        </span>
                                                        <span className="text-xs font-bold">
                                                            {formatTooltipDate(data)}
                                                        </span>
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <span className="text-muted-foreground text-[0.70rem] uppercase">
                                                            Students
                                                        </span>
                                                        <span className="text-xs font-bold">
                                                            {data.students.toLocaleString()}
                                                        </span>
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <span className="text-muted-foreground text-[0.70rem] uppercase">
                                                            Teachers
                                                        </span>
                                                        <span className="text-xs font-bold">
                                                            {data.teachers.toLocaleString()}
                                                        </span>
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <span className="text-muted-foreground text-[0.70rem] uppercase">
                                                            Moderators
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
                            <Line
                                activeDot={{ r: 6, style: { fill: "#2563eb", opacity: 0.8 } }}
                                dataKey="students"
                                stroke="#2563eb"
                                strokeWidth={2}
                                type="monotone"
                            />
                            <Line
                                activeDot={{ r: 6, style: { fill: "#16a34a", opacity: 0.8 } }}
                                dataKey="teachers"
                                stroke="#16a34a"
                                strokeWidth={2}
                                type="monotone"
                            />
                            <Line
                                activeDot={{ r: 6, style: { fill: "#dc2626", opacity: 0.8 } }}
                                dataKey="moderators"
                                stroke="#dc2626"
                                strokeWidth={2}
                                type="monotone"
                            />
                        </LineChart>
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
