"use client";

import React from "react";

import { TopCourse } from "./top-course";

import CardContent from "@/components/ui/card-content";
import { contentAnalysts } from "@/domain/constants/analyst-card";
import { ContentCreationChart } from "@/components/ui/charts/content-creation-trend";
import { EngagementChart } from "@/components/ui/charts/engagement-chart";

function ModeratorDashboardModule() {
    return (
        <div className="flex-1 space-y-4 overflow-auto p-2 md:py-4">
            <div>
                <h1 className="text-3xl font-semibold">Content Dashboard</h1>
                <p className="text-muted-foreground">
                    Welcome back! Here&apos;s what&apos;s happening with your platform
                    today
                </p>
            </div>
            <div className="mb-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {contentAnalysts.map((content, index) => {
                    return (
                        <CardContent
                            key={index}
                            color={content.bgColor}
                            darkColor={content.darkColor}
                            icon={content.icon}
                            items={content.items}
                            title={content.title}
                        />
                    );
                })}
            </div>
            <div className="space-y-5">
                <ContentCreationChart />
                <div className="grid gap-4 md:grid-cols-2">
                    <TopCourse />
                    <EngagementChart />
                </div>
            </div>
        </div>
    );
}

export default ModeratorDashboardModule;
