"use client";

import { Button } from "@highschool/ui/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogTitle,
} from "@highschool/ui/components/ui/dialog";
import { IconDownload, IconEdit } from "@tabler/icons-react";
import React from "react";
import { FSRSPreset } from "@highschool/interfaces";

import { ParamDetail } from "./param-detail";

import LongText from "@/components/ui/long-text";
import { formatDate } from "@/lib/utils";

interface PresetModalProps {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    preset?: FSRSPreset;
}

export default function PresetModal({
    open,
    setOpen,
    preset,
}: PresetModalProps) {
    return (
        <div className="flex flex-col items-center justify-center ">
            <Dialog open={open && preset != undefined} onOpenChange={setOpen}>
                <DialogContent className="h-[90vh]">
                    <div className="flex items-center justify-between">
                        <div>
                            <DialogTitle className="text-2xl font-bold">
                                Custom Preset
                            </DialogTitle>
                            <p className="text-muted-foreground text-sm">
                                Preset ID: {preset?.id}
                            </p>
                        </div>
                        <div className="flex gap-2">
                            <Button size="sm" variant="outline">
                                <IconEdit className="mr-2 size-4" />
                                Edit
                            </Button>
                            <Button size="sm" variant="outline">
                                <IconDownload className="mr-2 size-4" />
                                Export
                            </Button>
                        </div>
                    </div>

                    <div className="mt-2">
                        <h3 className="mb-4 text-lg font-semibold">Preset Information</h3>

                        <div className="mb-4">
                            <p className="text-muted-foreground text-sm">Title</p>
                            <LongText className="w-full">{preset?.title}</LongText>
                        </div>

                        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                            <div>
                                <p className="text-muted-foreground text-sm">Retrievability</p>
                                <p>{preset?.retrievability}</p>
                            </div>

                            <div>
                                <p className="text-muted-foreground text-sm">Created</p>
                                <p>{formatDate(preset?.createdAt?.toString())}</p>
                            </div>

                            <div>
                                <p className="text-muted-foreground text-sm">Last Modified</p>
                                <p>{formatDate(preset?.updatedAt!.toString())}</p>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h3 className="mb-4 text-lg font-semibold">Parameters</h3>

                        <ParamDetail params={preset?.fsrsParameters ?? []} />
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}
