"use client";

import { FSRSPreset } from "@highschool/interfaces";
import { Button } from "@highschool/ui/components/ui/button";
import {
    Card,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@highschool/ui/components/ui/card";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@highschool/ui/components/ui/dropdown-menu";
import {
    IconCalendar,
    IconChevronRight,
    IconCopy,
    IconSettings,
    IconTrash,
} from "@tabler/icons-react";
import { useState } from "react";
import { Badge } from "@highschool/ui/components/ui/badge";
import { useRouter } from "next/navigation";
import { useDeleteFsrsMutation } from "@highschool/react-query/queries";
import { toast } from "sonner";

import PresetModal from "./preset-model";

import { formatDate } from "@/lib/utils";
import { useFsrsPresetStore } from "@/stores/use-fsrs-preset";

interface CardPresetProps {
    filteredAndSortedPresets: FSRSPreset[];
}

export const CardPreset = ({ filteredAndSortedPresets }: CardPresetProps) => {
    // const handleDuplicatePreset = (preset: FSRSPreset) => {
    //     const newPreset = {
    //         ...preset,
    //         id: crypto.randomUUID(),
    //         title: `${preset.title} (Copy)`,
    //         createdAt: new Date(),
    //         lastModified: new Date(),
    //         isFavorite: false,
    //     };

    //     setPresets([...presets, newPreset]);
    //     setActivePreset(newPreset);

    //     toast.success(`Created a copy of "${preset.title}"`);
    // };

    const router = useRouter();
    const [open, setOpen] = useState(false);
    const [activePreset, setActivePreset] = useState<FSRSPreset>();
    const setPreset = useFsrsPresetStore((state) => state.openEdit);
    const { mutateAsync: deletePreset } = useDeleteFsrsMutation();

    const handleDeletePreset = async (id: string) => {
        try {
            await deletePreset({ id });

            toast.success("Preset deleted successfully.");
        } catch {
            toast.error("Failed to delete preset.");
        }
    };

    return (
        <>
            {filteredAndSortedPresets.map((preset) => (
                <Card key={preset.id} className="overflow-hidden">
                    <CardHeader className="pb-2">
                        <div className="flex items-start justify-between">
                            <div className="space-y-1">
                                <CardTitle className="flex items-center gap-2 text-base">
                                    {preset.title}
                                </CardTitle>
                                <CardDescription>
                                    {preset.fsrsParameters.length} parameters{" "}
                                    <Badge
                                        className={`ml-4 ${preset.isPublicPreset ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}
                                        variant="outline"
                                    >
                                        {preset.isPublicPreset ? "Public" : "Private"}
                                    </Badge>
                                </CardDescription>
                            </div>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button className="size-8" size="icon" variant="ghost">
                                        <IconChevronRight className="size-4" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuItem
                                        onClick={() => {
                                            setPreset(preset);
                                            router.push("create-preset/" + preset.id);
                                        }}
                                    >
                                        <IconSettings className="mr-2 size-4" />
                                        <span>Edit Preset</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <IconCopy className="mr-2 size-4" />
                                        <span>Duplicate</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem
                                        className="text-destructive focus:text-destructive"
                                        onClick={() => handleDeletePreset(preset.id!)}
                                    >
                                        <IconTrash className="mr-2 size-4" />
                                        <span>Delete Preset</span>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </CardHeader>
                    <CardFooter className="text-muted-foreground flex justify-between pt-0 text-xs">
                        <div className="flex items-center">
                            <IconCalendar className="mr-1 size-3" />
                            {formatDate(
                                preset?.updatedAt
                                    ? new Date(preset.updatedAt).getTime()
                                    : Date.now(),
                            )}
                        </div>
                        <Button
                            className="h-7 text-xs"
                            size="sm"
                            variant="ghost"
                            onClick={() => {
                                setOpen(true);
                                setActivePreset(preset);
                            }}
                        >
                            Detail Params
                        </Button>
                    </CardFooter>
                </Card>
            ))}
            <PresetModal open={open} preset={activePreset} setOpen={setOpen} />
        </>
    );
};
