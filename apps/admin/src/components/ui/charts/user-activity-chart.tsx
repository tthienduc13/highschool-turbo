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

// Generate sample data for different time periods
const generateActivityData = (
    timeRange: string,
    customValue: string = "0",
    customUnit: string = "0",
) => {
    const data = [];
    const now = new Date();

    let startDate, endDate, interval;

    if (timeRange === "custom" && customValue && customUnit) {
        // Calculate custom time range
        const customTime = Number.parseInt(customValue);

        if (isNaN(customTime) || customTime <= 0) {
            // Default to 1 hour if invalid input
            startDate = new Date(now);
            startDate.setHours(startDate.getHours() - 1);
        } else {
            startDate = new Date(now);
            if (customUnit === "minutes") {
                startDate.setMinutes(startDate.getMinutes() - customTime);
            } else if (customUnit === "hours") {
                startDate.setHours(startDate.getHours() - customTime);
            } else if (customUnit === "months") {
                startDate.setMonth(startDate.getMonth() - customTime);
            } else if (customUnit === "years") {
                startDate.setFullYear(startDate.getFullYear() - customTime);
            }
        }
        endDate = new Date(now);

        // Choose interval based on unit
        if (customUnit === "years") {
            interval = "years"; // One data point per year
        } else if (customUnit === "months") {
            interval = "months"; // One data point per month
        } else if (customUnit === "hours") {
            interval = "hours"; // One data point per hour
        } else {
            interval = "minutes"; // Minute-by-minute for minutes
        }
    } else {
        // Predefined ranges
        switch (timeRange) {
            case "week":
                interval = "days";
                // Find the most recent Monday
                startDate = new Date(now);
                startDate.setDate(
                    startDate.getDate() -
                    startDate.getDay() +
                    (startDate.getDay() === 0 ? -6 : 1),
                );
                startDate.setHours(0, 0, 0, 0);
                // Find the upcoming Sunday
                endDate = new Date(startDate);
                endDate.setDate(endDate.getDate() + 6);
                endDate.setHours(23, 59, 59, 999);
                break;
            case "month":
                interval = "days";
                // First day of current month
                startDate = new Date(now.getFullYear(), now.getMonth(), 1);
                // Last day of current month
                endDate = new Date(
                    now.getFullYear(),
                    now.getMonth() + 1,
                    0,
                    23,
                    59,
                    59,
                    999,
                );
                break;
            case "year":
            default:
                interval = "months";
                // First day of current year
                startDate = new Date(now.getFullYear(), 0, 1);
                // Last day of current year
                endDate = new Date(now.getFullYear(), 11, 31, 23, 59, 59, 999);
                break;
        }
    }

    if (interval === "years") {
        // Generate yearly data
        const currentYear = now.getFullYear();
        const startYear = currentYear - Number.parseInt(customValue) + 1;

        for (let year = startYear; year <= currentYear; year++) {
            // Base values with growth trend
            const yearIndex = year - startYear;
            const growthFactor = 1 + yearIndex * 0.15; // Stronger growth for yearly view

            // Add some randomness
            const randomFactor = 0.9 + Math.random() * 0.2;

            data.push({
                year: year, // Use year directly as the x-axis value
                students: Math.floor(8000 * growthFactor * randomFactor),
                teachers: Math.floor(600 * growthFactor * randomFactor),
                moderators: Math.floor(120 * growthFactor * randomFactor),
            });
        }
    } else if (interval === "months") {
        // Generate monthly data
        const totalMonths = Number.parseInt(customValue) || 12; // Default to 12 months for year view

        for (let i = 0; i < totalMonths; i++) {
            const date = new Date(now);

            date.setMonth(date.getMonth() - (totalMonths - 1 - i));

            // Growth trend over time
            const growthFactor = 1 + i * 0.05;

            // Seasonal variations (higher in fall and spring)
            const month = date.getMonth();
            const seasonalFactor =
                (month >= 8 && month <= 10) || (month >= 1 && month <= 3) ? 1.2 : 1;

            data.push({
                month: date.getMonth(), // Store month number (0-11)
                monthYear: `${date.getMonth() + 1}/${date.getFullYear().toString().substr(2, 2)}`, // For display
                students: Math.floor(
                    2000 * growthFactor * seasonalFactor + Math.random() * 500,
                ),
                teachers: Math.floor(
                    150 * growthFactor * seasonalFactor + Math.random() * 40,
                ),
                moderators: Math.floor(
                    30 * growthFactor * seasonalFactor + Math.random() * 10,
                ),
            });
        }
    } else if (interval === "hours") {
        // Generate hourly data
        const totalHours = Number.parseInt(customValue) || 24;

        for (let i = 0; i < totalHours; i++) {
            const date = new Date(now);

            date.setHours(date.getHours() - (totalHours - 1 - i));

            // Base values with time-of-day pattern
            const hour = date.getHours();
            const timeOfDayFactor =
                hour >= 9 && hour <= 17 ? 1.2 : hour >= 18 && hour <= 22 ? 1.5 : 0.6;

            data.push({
                hour: hour, // Store hour (0-23)
                hourDay: `${hour}h00`, // For display
                students: Math.floor(800 + Math.random() * 400 * timeOfDayFactor),
                teachers: Math.floor(60 + Math.random() * 30 * timeOfDayFactor),
                moderators: Math.floor(15 + Math.random() * 10 * timeOfDayFactor),
            });
        }
    } else if (interval === "minutes") {
        // Generate minute-by-minute data
        const totalMinutes = Number.parseInt(customValue) || 60;

        for (let i = 0; i < totalMinutes; i++) {
            const date = new Date(now);

            date.setMinutes(date.getMinutes() - (totalMinutes - 1 - i));

            // Random fluctuations
            const randomFactor = 0.9 + Math.random() * 0.2;

            data.push({
                minute: i,
                minuteTime: `${date.getHours()}h${date.getMinutes().toString().padStart(2, "0")}`, // Format as "11h33"
                date: date.toISOString(), // Keep for compatibility
                students: Math.floor(800 * randomFactor),
                teachers: Math.floor(60 * randomFactor),
                moderators: Math.floor(15 * randomFactor),
            });
        }
    } else if (interval === "days") {
        // Generate daily data
        const totalDays = Math.ceil(
            (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24),
        );

        for (let i = 0; i < totalDays; i++) {
            const date = new Date(startDate);

            date.setDate(date.getDate() + i);

            // Base value with some randomness
            const students = Math.floor(2000 + Math.random() * 800);
            const teachers = Math.floor(150 + Math.random() * 50);
            const moderators = Math.floor(30 + Math.random() * 10);

            // Add weekly pattern - higher on weekdays, lower on weekends
            const day = date.getDay();
            const weekendFactor = day === 0 || day === 6 ? 0.7 : 1;

            data.push({
                date: date.toISOString().split("T")[0],
                students: Math.floor(students * weekendFactor),
                teachers: Math.floor(teachers * weekendFactor),
                moderators: Math.floor(moderators * weekendFactor),
            });
        }
    }

    return data;
};

export function UserActivityChart() {
    const [timeRange, setTimeRange] = useState("month");
    const [customValue, setCustomValue] = useState("1");
    const [customUnit, setCustomUnit] = useState("hours");

    // Generate data based on selected time range
    const data =
        timeRange === "custom"
            ? generateActivityData(timeRange, customValue, customUnit)
            : generateActivityData(timeRange);

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
                    <Select value={timeRange} onValueChange={setTimeRange}>
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
                                            onChange={(e) => setCustomValue(e.target.value)}
                                        />
                                        <div className="col-span-1">
                                            <RadioGroup
                                                className="flex flex-col space-y-1"
                                                value={customUnit}
                                                onValueChange={setCustomUnit}
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
                <ResponsiveContainer height={300} width="100%">
                    <LineChart data={data}>
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
