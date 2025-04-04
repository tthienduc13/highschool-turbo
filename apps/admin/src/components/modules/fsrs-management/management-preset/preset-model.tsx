"use client";

import { Button } from "@highschool/ui/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogTitle,
} from "@highschool/ui/components/ui/dialog";
import { IconDownload, IconEdit } from "@tabler/icons-react";
import React from "react";

import { ParamDetail } from "./param-detail";

import LongText from "@/components/ui/long-text";

interface PresetModalProps {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function PresetModal({ open, setOpen }: PresetModalProps) {
    return (
        <div className="flex flex-col items-center justify-center ">
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="h-[90vh]">
                    <div className="flex items-center justify-between">
                        <div>
                            <DialogTitle className="text-2xl font-bold">
                                Custom Preset
                            </DialogTitle>
                            <p className="text-muted-foreground text-sm">
                                Preset ID: 0195d7ec-d6b6-74c2-4537-00d6a2e299fe
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
                            <LongText className="w-full">
                                Custom preset with lower retrievability
                            </LongText>
                        </div>

                        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                            <div>
                                <p className="text-muted-foreground text-sm">Retrievability</p>
                                <p>44%</p>
                            </div>

                            <div>
                                <p className="text-muted-foreground text-sm">Created</p>
                                <p>Mar 15, 2023</p>
                            </div>

                            <div>
                                <p className="text-muted-foreground text-sm">Last Modified</p>
                                <p>Apr 10, 2023</p>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h3 className="mb-4 text-lg font-semibold">Parameters</h3>

                        <ParamDetail
                            params={[
                                0.40255, 1.18385, 3.173, 15.69105, 7.1949, 0.5345, 1.4604,
                                0.0046, 1.54575, 0.1192, 1.01925, 1.9395, 0.11, 0.29605, 2.2698,
                                0.2315, 2.9898, 0.51655, 0.6621,
                            ]}
                        />
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}
