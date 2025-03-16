"use client";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@highschool/ui/components/ui/card";
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@highschool/ui/components/ui/chart";
import {
    Bar,
    BarChart,
    CartesianGrid,
    ResponsiveContainer,
    XAxis,
    YAxis,
} from "recharts";

// This would typically come from an API or database query
const data = [
    { range: "0-2", count: 87 },
    { range: "3-5", count: 124 },
    { range: "6-10", count: 156 },
    { range: "11-15", count: 42 },
    { range: "16+", count: 18 },
];

export default function TeacherExperienceChart() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Experience Distribution</CardTitle>
                <CardDescription>Years of teaching experience</CardDescription>
            </CardHeader>
            <CardContent className="h-[50vh]">
                <ResponsiveContainer>
                    <ChartContainer
                        className="size-[100px]"
                        config={{
                            count: {
                                label: "Teachers",
                                color: "hsl(var(--chart-1))",
                            },
                        }}
                    >
                        <BarChart
                            accessibilityLayer
                            data={data}
                            margin={{
                                top: 5,
                                right: 30,
                                left: 20,
                                bottom: 5,
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3" vertical={false} />
                            <XAxis
                                dataKey="range"
                                label={{
                                    value: "Years of Experience",
                                    position: "insideBottom",
                                    offset: -5,
                                }}
                            />
                            <YAxis
                                label={{
                                    value: "Number of Teachers",
                                    angle: -90,
                                    position: "insideLeft",
                                }}
                            />
                            <ChartTooltip content={<ChartTooltipContent />} />
                            <Bar
                                dataKey="count"
                                fill="var(--color-count)"
                                radius={[4, 4, 0, 0]}
                            />
                        </BarChart>
                    </ChartContainer>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
}
