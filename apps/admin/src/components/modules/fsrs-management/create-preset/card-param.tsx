"use client";

import { Button } from "@highschool/ui/components/ui/button";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@highschool/ui/components/ui/card";
import { Input } from "@highschool/ui/components/ui/input";
import { IconInfoCircle, IconLock, IconLockOpen } from "@tabler/icons-react";
import { FSRSParameter, FSRSPreset } from "@highschool/interfaces";
import { toast } from "sonner";
import { Badge } from "@highschool/ui/components/ui/badge";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@highschool/ui/components/ui/popover";

import { categoryConfig, impactConfig } from "@/domain/constants/fsrs-constant";
import { Hint } from "@/components/ui/hint";

interface CardParamProps {
    param: FSRSParameter;
    index: number;
    activePreset: FSRSPreset;
    setActivePreset: React.Dispatch<React.SetStateAction<FSRSPreset>>;
}

export default function CardParam({
    param,
    index,
    activePreset,
    setActivePreset,
}: CardParamProps) {
    const handleParameterChange = (index: number, value: number) => {
        const updatedParameters = [...activePreset.fsrsParameters];

        updatedParameters[index] = {
            ...updatedParameters[index],
            value,
        };
        setActivePreset({
            ...activePreset,
            fsrsParameters: updatedParameters,
        });
    };

    const handleLockParameter = (index: number) => {
        const updatedParameters = [...activePreset.fsrsParameters];

        updatedParameters[index] = {
            ...updatedParameters[index],
            isLocked: !updatedParameters[index].isLocked,
        };
        setActivePreset({
            ...activePreset,
            fsrsParameters: updatedParameters,
        });

        toast.info(
            updatedParameters[index].isLocked
                ? "The parameter has been locked from your preset! You should unlock before update."
                : "The parameter has been unlocked from your preset!",
        );
    };

    const paramIndex = activePreset.fsrsParameters.findIndex((p) => p === param);

    const category =
        categoryConfig[param.category as keyof typeof categoryConfig];
    const impact = impactConfig[param.impact];

    return (
        <Card key={index} className={`border-t-4 ${category.borderColor}`}>
            <CardHeader className="pb-2">
                <div className="flex items-start justify-between">
                    <div className="space-y-1">
                        <CardTitle className="text-base">{param.name}</CardTitle>
                        <div className="flex items-center gap-2">
                            <Hint
                                label={<div>this is the category of the parameter</div>}
                                side="top"
                            >
                                <Badge className={category.textColor} variant="outline">
                                    {category.icon}
                                    <span className="ml-1">{category.title}</span>
                                </Badge>
                            </Hint>
                            <Hint
                                label={
                                    <div>
                                        This is show impact of the parameter on the FSRS algorithm.
                                        The higher the impact, the more
                                    </div>
                                }
                                side="top"
                            >
                                <Badge className={`${impact.textColor}`} variant="outline">
                                    {impact.label}
                                </Badge>
                            </Hint>
                        </div>
                    </div>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button className="size-8" size="icon" variant="ghost">
                                <IconInfoCircle className="size-4" />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-80">
                            <div className="space-y-2">
                                <h4 className="font-medium">{param.name}</h4>
                                <p className="text-muted-foreground text-sm">
                                    {param.description}
                                </p>
                            </div>
                        </PopoverContent>
                    </Popover>
                </div>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <div className="flex size-12 items-center justify-center rounded-full border-2 border-gray-200">
                            <span className="overflow-hidden text-lg font-bold">
                                {activePreset.fsrsParameters[paramIndex].value}
                            </span>
                        </div>
                        <div className="ml-4 flex-1">
                            <div className="text-muted-foreground mt-1 flex justify-between text-xs">
                                <Input
                                    disabled={param.isLocked}
                                    type="number"
                                    value={param.value}
                                    onChange={(e) => {
                                        handleParameterChange(paramIndex, Number(e.target.value));
                                    }}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end">
                        <Button
                            className="h-8 px-2 text-xs"
                            size="sm"
                            variant="ghost"
                            onClick={() => handleLockParameter(paramIndex)}
                        >
                            {param.isLocked ? (
                                <>
                                    <IconLockOpen className="mr-1 size-4" />
                                    Unlock
                                </>
                            ) : (
                                <>
                                    <IconLock className="mr-1 size-4" />
                                    Lock
                                </>
                            )}
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
