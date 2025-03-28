"use client";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@highschool/ui/components/ui/card";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@highschool/ui/components/ui/tabs";
import { useUserRetentionQuery } from "@highschool/react-query/queries";

import {
    Cell,
    Pie,
    PieChart,
    ResponsiveContainer,
    Tooltip,
} from "@/components/ui/chart";
import { getRandomHexColors } from "@/lib/utils";

// Generate cohort data with retention rates
const generateCohortData = () => {
    const cohorts = [
        { name: "0-30 days", value: 100, color: "#2563eb" },
        { name: "31-60 days", value: 85, color: "#3b82f6" },
        { name: "61-90 days", value: 72, color: "#60a5fa" },
        { name: "91-180 days", value: 58, color: "#93c5fd" },
        { name: "181+ days", value: 42, color: "#bfdbfe" },
    ];

    const userTypes = {
        students: [
            { name: "0-30 days", value: 100, color: "#2563eb" },
            { name: "31-60 days", value: 82, color: "#3b82f6" },
            { name: "61-90 days", value: 68, color: "#60a5fa" },
            { name: "91-180 days", value: 54, color: "#93c5fd" },
            { name: "181+ days", value: 38, color: "#bfdbfe" },
        ],
        teachers: [
            { name: "0-30 days", value: 100, color: "#16a34a" },
            { name: "31-60 days", value: 92, color: "#22c55e" },
            { name: "61-90 days", value: 85, color: "#4ade80" },
            { name: "91-180 days", value: 78, color: "#86efac" },
            { name: "181+ days", value: 72, color: "#bbf7d0" },
        ],
        moderators: [
            { name: "0-30 days", value: 100, color: "#dc2626" },
            { name: "31-60 days", value: 95, color: "#ef4444" },
            { name: "61-90 days", value: 90, color: "#f87171" },
            { name: "91-180 days", value: 85, color: "#fca5a5" },
            { name: "181+ days", value: 80, color: "#fecaca" },
        ],
    };

    return { cohorts, userTypes };
};

const { cohorts, userTypes } = generateCohortData();

export function UserRetentionChart() {
    const { data: users } = useUserRetentionQuery("All");
    const { data: students } = useUserRetentionQuery("Student");
    const { data: teachers } = useUserRetentionQuery("Teacher");
    const { data: moderators } = useUserRetentionQuery("Moderator");

    return (
        <Card>
            <CardHeader>
                <CardTitle>User Retention</CardTitle>
                <CardDescription>
                    Return rate by cohort (% of users still active)
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Tabs defaultValue="all">
                    <TabsList className="mb-4">
                        <TabsTrigger value="all">All Users</TabsTrigger>
                        <TabsTrigger value="students">Students</TabsTrigger>
                        <TabsTrigger value="teachers">Teachers</TabsTrigger>
                        <TabsTrigger value="moderators">Moderators</TabsTrigger>
                    </TabsList>

                    <TabsContent value="all">
                        <RetentionPieChart data={users ?? []} />
                    </TabsContent>

                    <TabsContent value="students">
                        <RetentionPieChart data={students ?? []} />
                    </TabsContent>

                    <TabsContent value="teachers">
                        <RetentionPieChart data={teachers ?? []} />
                    </TabsContent>

                    <TabsContent value="moderators">
                        <RetentionPieChart data={moderators ?? []} />
                    </TabsContent>
                </Tabs>
            </CardContent>
        </Card>
    );
}

function RetentionPieChart({
    data,
}: {
    data: { range: string; count: number; percent: number }[];
}) {
    const colors = getRandomHexColors(data.length);

    return (
        <>
            <ResponsiveContainer height={250} width="100%">
                <PieChart>
                    <Pie
                        cx="50%"
                        cy="50%"
                        data={data}
                        dataKey="percent"
                        endAngle={-180}
                        innerRadius={60}
                        label={({ range, percent }) => `${range}: ${percent}%`}
                        labelLine={false}
                        outerRadius={90}
                        paddingAngle={2}
                        startAngle={180}
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={colors.at(index)} />
                        ))}
                    </Pie>
                    <Tooltip
                        content={({ active, payload }) => {
                            if (active && payload && payload.length) {
                                const data = payload[0].payload;

                                return (
                                    <div className="bg-background rounded-lg border p-2 shadow-sm">
                                        <div className="flex flex-col">
                                            <span className="text-sm font-bold">{data.range}</span>
                                            <span className="text-muted-foreground text-xs">
                                                Retention rate: {data.percent}%
                                            </span>
                                            <span className="text-muted-foreground text-xs">
                                                Count: {data.count}
                                            </span>
                                        </div>
                                    </div>
                                );
                            }

                            return null;
                        }}
                    />
                </PieChart>
            </ResponsiveContainer>
            <div className="mt-2 grid grid-cols-3 gap-2">
                {data.map((item, index) => (
                    <div key={item.range} className="flex items-center gap-1">
                        <div
                            className="size-3 rounded-full"
                            style={{ backgroundColor: colors.at(index) }}
                        />
                        <div className="flex flex-col">
                            <span className="text-xs font-medium">{item.range}</span>
                            <span className="text-muted-foreground text-xs">
                                {item.count}%
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}
