"use client";

import { TecherExperience } from "@highschool/interfaces";
import { useTeacherExperienceQuery } from "@highschool/react-query/queries";
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

export default function TeacherExperienceChart() {
    const { data } = useTeacherExperienceQuery();

    const users: TecherExperience[] = data ?? [];

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
                            data={users}
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
