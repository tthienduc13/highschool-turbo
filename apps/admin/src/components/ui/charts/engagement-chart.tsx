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
    Cell,
    ResponsiveContainer,
    XAxis,
    YAxis,
} from "@/components/ui/chart";

const data = [
    { name: "Course", count: 4 },
    { name: "Flashcard", count: 17 },
    { name: "Zone", count: 17 },
];

export function EngagementChart() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Student Engagement by Content Type</CardTitle>
                <CardDescription>
                    How students interact with different content
                </CardDescription>
            </CardHeader>
            <CardContent>
                <ResponsiveContainer height={300} width="100%">
                    <ChartContainer
                        className="h-[300px]"
                        config={{
                            course: {
                                label: "Course",
                                color: "hsl(var(--chart-1))",
                            },
                            flashcard: {
                                label: "Flashcard",
                                color: "hsl(var(--chart-2))",
                            },
                            zone: {
                                label: "Zone",
                                color: "hsl(var(--chart-4))",
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
                            <XAxis dataKey="name" />
                            <YAxis />
                            <ChartTooltip
                                content={
                                    <ChartTooltipContent
                                        formatter={(value) => [`${value}`, "Count"]}
                                        labelFormatter={(label) => `${label}`}
                                    />
                                }
                            />
                            <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                                {data.map((entry, index) => {
                                    const colors = ["#dc2626", "#16a34a", "#2563eb"];

                                    return (
                                        <Cell
                                            key={`cell-${index}`}
                                            fill={colors[index % colors.length]}
                                        />
                                    );
                                })}
                            </Bar>
                        </BarChart>
                    </ChartContainer>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
}
