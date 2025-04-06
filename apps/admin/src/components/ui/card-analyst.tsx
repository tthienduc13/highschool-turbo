import { Badge } from "@highschool/ui/components/ui/badge";
import { Card, CardContent } from "@highschool/ui/components/ui/card";
import React from "react";

interface AnalystCardProps {
    title: string;
    data: number;
    icon: {
        element: React.ReactNode;
        bgColor: string;
    };
    percentage?: number;
    growth?: number;
}

export default function AnalystCard({
    title,
    data,
    icon,
    percentage,
    growth,
}: AnalystCardProps) {
    return (
        <Card>
            <CardContent className="p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-muted-foreground text-sm font-medium">{title}</p>
                        <h3 className="mt-1 text-2xl font-bold">{data}</h3>
                    </div>
                    <div className={`${icon.bgColor} rounded-full p-2`}>
                        {icon.element}
                    </div>
                </div>
                <div className="mt-4">
                    <div className="flex items-center justify-between text-xs">
                        <span className="text-muted-foreground">
                            {percentage ?? 0}% from last month
                        </span>
                        <Badge
                            className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                            variant="outline"
                        >
                            +{growth ?? 0}
                        </Badge>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
