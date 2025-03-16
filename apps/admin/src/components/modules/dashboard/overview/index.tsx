"use client";

import { IconNews, IconUser } from "@tabler/icons-react";

import AnalystCard from "@/components/ui/card-analyst";
import { UserActivityChart } from "@/components/ui/charts/user-activity-chart";
import TeacherExperienceChart from "@/components/ui/charts/experience-teacher-chart";
import { ExperienceRatingChart } from "@/components/ui/charts/experience-rating-chart";
import { UserRetentionChart } from "@/components/ui/charts/user-retention";
import { UserGrowthChart } from "@/components/ui/charts/user-growth";

function OverviewModule() {
    return (
        <div className="flex-1 space-y-4 overflow-auto p-2 md:py-4">
            <div>
                <h1 className="text-3xl font-semibold">Overview Dashboard</h1>
                <p className="text-muted-foreground">
                    Welcome back! Here&apos;s what&apos;s happening with your platform
                    today
                </p>
            </div>
            <div className="mb-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <AnalystCard
                    data={12}
                    icon={{
                        element: (
                            <IconUser className="size-5 text-blue-600 dark:text-blue-400" />
                        ),
                        bgColor: "bg-blue-100 dark:bg-blue-900/30",
                    }}
                    title="Total Users"
                />
                <AnalystCard
                    data={12}
                    icon={{
                        element: (
                            <IconUser className="size-5 text-orange-600 dark:text-orange-400" />
                        ),
                        bgColor: "bg-orange-100 p-2 dark:bg-orange-900/30",
                    }}
                    title="Total Reports"
                />
                <AnalystCard
                    data={12}
                    icon={{
                        element: (
                            <IconUser className="size-5 text-purple-600 dark:text-purple-400" />
                        ),
                        bgColor: "bg-purple-100 dark:bg-purple-900/30",
                    }}
                    title="Total Flashcards"
                />
                <AnalystCard
                    data={12}
                    icon={{
                        element: (
                            <IconNews className="size-5 text-green-600 dark:text-green-400" />
                        ),
                        bgColor: "bg-green-100 p-2 dark:bg-green-900/30",
                    }}
                    title="Total News"
                />
            </div>
            <div className="space-y-5">
                <UserActivityChart />
                <div className="grid gap-4 md:grid-cols-2">
                    <TeacherExperienceChart />
                    <ExperienceRatingChart />
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                    <UserRetentionChart />
                    <UserGrowthChart />
                </div>
            </div>
        </div>
    );
}

export default OverviewModule;
