"use client";

import React from "react";
import {
    IconBrandParsinta,
    IconCircleKey,
    IconFileTypeDoc,
    IconFlame,
    IconFolder,
    IconLock,
    IconLockOpen2,
    IconNews,
    IconPlayCardStar,
    IconScript,
    IconTrashX,
    IconVocabulary,
} from "@tabler/icons-react";
import {
    useGetMaterials,
    useGetSubjectCurriculumAnalystQuery,
    useStatisticFlashcardQuery,
    useStatisticNewsQuery,
} from "@highschool/react-query/queries";

import { TopCourse } from "./top-course";

import CardContent from "@/components/ui/card-content";
import { ContentCreationChart } from "@/components/ui/charts/content-creation-trend";
import { EngagementChart } from "@/components/ui/charts/engagement-chart";

function ModeratorDashboardModule() {
    const { data: news } = useStatisticNewsQuery({
        newType: "All",
    });

    const { data: flashcards } = useStatisticFlashcardQuery();

    const { data: materials } = useGetMaterials();

    const { data: subjectCurriculums } = useGetSubjectCurriculumAnalystQuery();

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
                <CardContent
                    key={"course"}
                    color={"bg-[#EFF7E2]"}
                    data={
                        (subjectCurriculums?.published ?? 0) +
                        (subjectCurriculums?.unpublished ?? 0)
                    }
                    icon={<IconBrandParsinta className="size-5 text-green-500" />}
                    items={[
                        {
                            title: "Published",
                            data: subjectCurriculums?.published ?? 0,
                            icon: IconLockOpen2,
                        },
                        {
                            title: "Unpublished",
                            data: subjectCurriculums?.unpublished ?? 0,
                            icon: IconLock,
                        },
                    ]}
                    title={"Courses"}
                />
                <CardContent
                    key={"material"}
                    color={"bg-[#EAE8F5]"}
                    data={materials?.totalCount ?? 0}
                    icon={<IconFileTypeDoc className="size-5 text-indigo-500" />}
                    items={[
                        {
                            title: "Lessons",
                            data: materials?.lessonCount ?? 0,
                            icon: IconVocabulary,
                        },
                        {
                            title: "Folders",
                            data: materials?.folderCount ?? 0,
                            icon: IconFolder,
                        },
                        {
                            title: "Documents",
                            data: materials?.documentCount ?? 0,
                            icon: IconScript,
                        },
                    ]}
                    title={"Materials"}
                />
                <CardContent
                    color="bg-[#F8EFE2]"
                    data={flashcards?.totalFlashcard ?? 0}
                    icon={<IconPlayCardStar className="size-5 text-orange-400" />}
                    items={[
                        {
                            title: "Open",
                            data: flashcards?.totalFlashcardOpen ?? 0,
                            icon: IconLockOpen2,
                        },
                        {
                            title: "Draf",
                            data: flashcards?.totalFlashcardDraft ?? 0,
                            icon: IconLock,
                        },
                        {
                            title: "Link",
                            data: flashcards?.totalFlashcardLink ?? 0,
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
