"use client";

import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@highschool/ui/components/ui/tooltip";

import { ItemData } from "@/domain/constants/analyst-card";

interface CardContentProps {
    title: string;
    icon: React.ReactNode;
    items: ItemData[];
    color: string;
    data: number;
}

export default function CardContent({
    title,
    icon,
    items,
    color,
    data,
}: CardContentProps) {
    return (
        <div
            className={`${color} dark:bg-background w-full max-w-xs rounded-xl p-4 shadow-sm`}
        >
            <div className="flex items-center justify-between">
                <div className="mb-4 flex flex-col gap-4">
                    <div className="flex size-10 items-center justify-center rounded-full bg-white shadow-sm">
                        {icon}
                    </div>
                    <h3 className="text-lg font-medium text-gray-800 dark:text-white">
                        {title}
                    </h3>
                </div>
                <div className="mr-2 text-xl">{data}</div>
            </div>

            <div className="mt-4 flex rounded-xl bg-white p-2 dark:bg-[#09132b]">
                {items.map((item, index) => (
                    <TooltipProvider key={index} delayDuration={0}>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <div className="flex-1">
                                    <div
                                        key={item.title}
                                        className="flex flex-1 items-center justify-center gap-2 p-2 "
                                    >
                                        <item.icon className="size-4 text-gray-500" />
                                        <span className="text-sm font-medium">{item.data}</span>
                                    </div>
                                </div>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>{item.title}</p>
                            </TooltipContent>
                        </Tooltip>

                        {index !== items.length - 1 && (
                            <div className="border-l border-gray-200" />
                        )}
                    </TooltipProvider>
                ))}
            </div>
        </div>
    );
}
