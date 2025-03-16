"use client";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@highschool/ui/components/ui/card";

import {
    Area,
    AreaChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "@/components/ui/chart";

// Generate sample data for the past 12 months with growth trend
const generateGrowthData = () => {
    const data = [];
    const now = new Date();
    const currentMonth = now.getMonth();

    // Starting values
    let studentCount = 8500;
    let teacherCount = 620;
    let moderatorCount = 85;

    for (let i = 11; i >= 0; i--) {
        const month = (currentMonth - i + 12) % 12;
        const year = now.getFullYear() - (currentMonth < i ? 1 : 0);

        // Add some randomness to growth
        const studentGrowth = Math.floor(
            studentCount * (0.03 + Math.random() * 0.02),
        );
        const teacherGrowth = Math.floor(
            teacherCount * (0.01 + Math.random() * 0.01),
        );
        const moderatorGrowth = Math.floor(
            moderatorCount * (0.005 + Math.random() * 0.01),
        );

        // Add seasonal variation (higher growth in September and January)
        const seasonalFactor = month === 8 ? 1.5 : month === 0 ? 1.3 : 1;

        data.push({
            month: `${year}-${String(month + 1).padStart(2, "0")}`,
            students: Math.floor(studentGrowth * seasonalFactor),
            teachers: Math.floor(teacherGrowth * seasonalFactor),
            moderators: Math.floor(moderatorGrowth * seasonalFactor),
        });

        // Update counts for next month
        studentCount += Math.floor(studentGrowth * seasonalFactor);
        teacherCount += Math.floor(teacherGrowth * seasonalFactor);
        moderatorCount += Math.floor(moderatorGrowth * seasonalFactor);
    }

    return data;
};

const data = generateGrowthData();

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

export function UserGrowthChart() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>User Growth</CardTitle>
                <CardDescription>
                    New registrations over the past 12 months
                </CardDescription>
            </CardHeader>
            <CardContent>
                <ResponsiveContainer height={300} width="100%">
                    <AreaChart data={data}>
                        <defs>
                            <linearGradient id="studentGradient" x1="0" x2="0" y1="0" y2="1">
                                <stop offset="5%" stopColor="#2563eb" stopOpacity={0.8} />
                                <stop offset="95%" stopColor="#2563eb" stopOpacity={0.1} />
                            </linearGradient>
                            <linearGradient id="teacherGradient" x1="0" x2="0" y1="0" y2="1">
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
                            dataKey="month"
                            fontSize={12}
                            stroke="#888888"
                            tickFormatter={(value) => {
                                const [year, month] = value.split("-");

                                return `${monthNames[Number.parseInt(month) - 1]}`;
                            }}
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
                                    const [year, month] = data.month.split("-");
                                    const monthName = monthNames[Number.parseInt(month) - 1];

                                    return (
                                        <div className="bg-background rounded-lg border p-2 shadow-sm">
                                            <div className="grid gap-2">
                                                <div className="flex flex-col">
                                                    <span className="text-muted-foreground text-[0.70rem] uppercase">
                                                        Month
                                                    </span>
                                                    <span className="text-xs font-bold">
                                                        {monthName} {year}
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
