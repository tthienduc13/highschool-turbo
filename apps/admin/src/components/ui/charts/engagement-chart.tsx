"use client";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@highschool/ui/components/ui/card";

import {
    Bar,
    BarChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "@/components/ui/chart";

const data = [
    {
        name: "Documents",
        views: 78562,
        completions: 42891,
        avgTime: 18,
    },
    {
        name: "Flashcards",
        views: 45123,
        completions: 24893,
        avgTime: 32,
    },
    {
        name: "Videos",
        views: 32456,
        completions: 18234,
        avgTime: 24,
    },
    {
        name: "Quizzes",
        views: 28765,
        completions: 21543,
        avgTime: 15,
    },
    {
        name: "Assignments",
        views: 19876,
        completions: 12453,
        avgTime: 45,
    },
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
                    <BarChart data={data}>
                        <XAxis
                            axisLine={false}
                            dataKey="name"
                            fontSize={12}
                            stroke="#888888"
                            tickLine={false}
                        />
                        <YAxis
                            axisLine={false}
                            fontSize={12}
                            stroke="#888888"
                            tickFormatter={(value) => `${value / 1000}k`}
                            tickLine={false}
                        />
                        <Tooltip
                            content={({ active, payload }) => {
                                if (active && payload && payload.length) {
                                    const data = payload[0].payload;

                                    return (
                                        <div className="bg-background rounded-lg border p-2 shadow-sm">
                                            <div className="grid gap-2">
                                                <div className="flex flex-col">
                                                    <span className="text-muted-foreground text-[0.70rem] uppercase">
                                                        Content Type
                                                    </span>
                                                    <span className="text-xs font-bold">{data.name}</span>
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="text-muted-foreground text-[0.70rem] uppercase">
                                                        Views
                                                    </span>
                                                    <span className="text-xs font-bold">
                                                        {data.views.toLocaleString()}
                                                    </span>
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="text-muted-foreground text-[0.70rem] uppercase">
                                                        Completions
                                                    </span>
                                                    <span className="text-xs font-bold">
                                                        {data.completions.toLocaleString()}
                                                    </span>
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="text-muted-foreground text-[0.70rem] uppercase">
                                                        Avg. Time Spent
                                                    </span>
                                                    <span className="text-xs font-bold">
                                                        {data.avgTime} minutes
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
                            dataKey="views"
                            fill="#2563eb"
                            radius={[4, 4, 0, 0]}
                        />
                        <Bar
                            className="fill-green-600"
                            dataKey="completions"
                            fill="#16a34a"
                            radius={[4, 4, 0, 0]}
                        />
                    </BarChart>
                </ResponsiveContainer>
                <div className="mt-2 flex items-center justify-center gap-4">
                    <div className="flex items-center gap-1">
                        <div className="bg-primary size-3 rounded-full" />
                        <span className="text-muted-foreground text-xs">Views</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <div className="size-3 rounded-full bg-green-600" />
                        <span className="text-muted-foreground text-xs">Completions</span>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
