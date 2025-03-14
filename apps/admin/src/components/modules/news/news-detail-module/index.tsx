"use client";

import {
    IconCalendarClock,
    IconEye,
    IconFlame,
    IconMapPin,
    IconTag,
    IconTrash,
    IconUserCircle,
} from "@tabler/icons-react";
import { useState } from "react";
import Image from "next/image";
import { Skeleton } from "@highschool/ui/components/ui/skeleton";
import {
    Card,
    CardContent,
    CardHeader,
} from "@highschool/ui/components/ui/card";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@highschool/ui/components/ui/tooltip";
import { useNewsDetailQuery } from "@highschool/react-query/queries";
import { ContentData } from "@highschool/components/minimal-editor/ui/types";
import { MinimalTiptapEditor } from "@highschool/components/minimal-editor/ui/minimal-tiptap";

import { convertDateString, convertTimeAgo } from "@/domain/utils/time";

interface NewsDetailModuleProps {
    slug: string;
}

function NewsDetailModule({ slug }: NewsDetailModuleProps) {
    const titleHeading = "Update News";

    const [contentData, setContentData] = useState<ContentData>();
    const { data: initialNewsData, isLoading } = useNewsDetailQuery(slug);

    if (isLoading) {
        if (contentData) {
            console.log("ok");
        }

        return (
            <div className="bg-background flex w-full flex-col rounded-lg p-4">
                <Skeleton className="h-[30vh] w-full" />
            </div>
        );
    }

    return (
        <div className="bg-background flex w-full flex-col rounded-lg p-4">
            <div className="text-primary text-3xl font-bold">{titleHeading}</div>

            <Card className="mt-4">
                <CardHeader>
                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <div className="text-muted-foreground inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-semibold">
                                <IconTag size={14} />
                                <span>{initialNewsData?.newsTagName}</span>
                            </div>
                            <div className="bg-destructive-foreground text-muted-foreground inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-semibold">
                                <IconMapPin size={14} />
                                <span>{initialNewsData?.location}</span>
                            </div>
                            {initialNewsData?.hot && (
                                <div className="text-muted-foreground inline-flex items-center gap-1 rounded-full border bg-red-500 px-2.5 py-0.5 text-xs font-semibold text-white">
                                    <IconFlame size={14} />
                                    <span>Hot</span>
                                </div>
                            )}

                            {initialNewsData?.isDeleted && (
                                <div className="text-muted-foreground inline-flex items-center gap-1 rounded-full border bg-slate-500 px-2.5 py-0.5 text-xs font-semibold text-white">
                                    <IconTrash size={14} />
                                    <span>Deleted</span>
                                </div>
                            )}
                        </div>
                    </div>
                    <span className="text-[1.5rem] font-bold">
                        {initialNewsData?.newName}
                    </span>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="flex gap-4">
                        <div className="flex items-center">
                            <IconUserCircle size={18} />
                            <span className="text-muted-foreground ml-1 text-sm">
                                {initialNewsData?.author?.authorName}
                            </span>
                        </div>
                        <div className="mt-0 flex items-center">
                            <IconEye className="size-4" />
                            <span className="text-muted-foreground ml-1 text-sm">
                                {initialNewsData?.view?.toLocaleString()} views
                            </span>
                        </div>
                        <div className="mt-0 flex items-center">
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <div className="mt-0 flex items-center">
                                            <IconCalendarClock size={18} />
                                            <span className="text-muted-foreground ml-1 text-sm">
                                                {convertDateString(
                                                    initialNewsData?.updatedAt?.toString(),
                                                )}{" "}
                                                (
                                                {convertTimeAgo(initialNewsData?.updatedAt?.toString())}
                                                )
                                            </span>
                                        </div>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>
                                            Created{" "}
                                            {convertDateString(
                                                initialNewsData?.createdAt?.toString(),
                                            )}
                                        </p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </div>
                    </div>
                    <div>
                        <Image
                            alt="thumbnail"
                            className="w-full rounded-lg object-cover"
                            height={475}
                            layout="responsive"
                            src={initialNewsData?.image ?? ""}
                            width={700}
                        />
                    </div>

                    <MinimalTiptapEditor
                        autofocus={true}
                        className="w-full"
                        editable={true}
                        editorClassName="focus:outline-none"
                        editorContentClassName="p-5"
                        placeholder="Type your description here..."
                        setContentData={setContentData}
                        value={initialNewsData?.contentHtml}
                    />
                </CardContent>
            </Card>
        </div>
    );
}

export default NewsDetailModule;
