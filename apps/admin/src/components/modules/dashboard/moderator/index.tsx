"use client";

import React from "react";
import {
    IconCircleKey,
    IconFlame,
    IconLock,
    IconLockOpen2,
    IconNews,
    IconPlayCardStar,
    IconTrashX,
} from "@tabler/icons-react";
import {
    useStatisticFlashcardQuery,
    useStatisticNewsQuery,
} from "@highschool/react-query/queries";

import { TopCourse } from "./top-course";

import CardContent from "@/components/ui/card-content";
import { contentAnalysts } from "@/domain/constants/analyst-card";
import { ContentCreationChart } from "@/components/ui/charts/content-creation-trend";
import { EngagementChart } from "@/components/ui/charts/engagement-chart";

function ModeratorDashboardModule() {
    const { data: news } = useStatisticNewsQuery({
        newType: "All",
    });

    const { data: flashcards } = useStatisticFlashcardQuery({
        type: "all",
    });

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
                            data={0}
                            icon={content.icon}
                            items={content.items}
                            title={content.title}
                        />
                    );
                })}
                <CardContent
                    color="bg-[#F8EFE2]"
                    data={flashcards?.totalFlashcards ?? 0}
                    icon={<IconPlayCardStar className="size-5 text-orange-400" />}
                    items={[
                        {
                            title: "Open",
                            data: flashcards?.totalFlashcardOpens ?? 0,
                            icon: IconLockOpen2,
                        },
                        {
                            title: "Draf",
                            data: flashcards?.totalFlashcardDrafts ?? 0,
                            icon: IconLock,
                        },
                        {
                            title: "Link",
                            data: flashcards?.totalFlashcardLinks ?? 0,
                            icon: IconCircleKey,
                        },
                    ]}
                    title={"Flashcards"}
                />
                <CardContent
                    color={"bg-[#e2f3f7]"}
                    data={news?.totalNews ?? 0}
                    icon={<IconNews className="size-5 text-blue-500" />}
                    items={[
                        { title: "Hot", data: news?.totalHotNews ?? 0, icon: IconFlame },
                        {
                            title: "Deleted",
                            data: news?.totalDeletedNews ?? 0,
                            icon: IconTrashX,
                        },
                    ]}
                    title={"News"}
                />
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
