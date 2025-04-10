"use client";

import { Button } from "@highschool/ui/components/ui/button";
import { Badge } from "@highschool/ui/components/ui/badge";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@highschool/ui/components/ui/dropdown-menu";
import {
    IconCalendar,
    IconCopy,
    IconDotsCircleHorizontal,
    IconEdit,
    IconFileText,
    IconShare2,
    IconTrash,
} from "@tabler/icons-react";
import { FlashcardPreview } from "@highschool/interfaces";
import { useState } from "react";

import {
    getStatusColor,
    getTypeIcon,
} from "@/components/modules/flashcard/flashcard";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";

interface FlashcardListProps {
    flashcards: FlashcardPreview[];
}

export function FlashcardList({ flashcards }: FlashcardListProps) {
    const [open, setOpen] = useState(false);

    const handleConfirmDelete = () => {
        // Handle delete flashcard logic here
        console.log("Flashcard deleted");
        setOpen(false);
    };

    return (
        <>
            <div className="space-y-3">
                {flashcards.map((flashcard) => (
                    <div
                        key={flashcard.id}
                        className="bg-card group flex flex-col justify-between gap-4 rounded-lg border p-4 transition-all duration-300 hover:shadow-md sm:flex-row sm:items-center"
                    >
                        <div className="flex grow flex-col gap-2">
                            <div className="flex flex-wrap items-center gap-2">
                                <h3 className="group-hover:text-primary text-lg font-semibold transition-colors">
                                    {flashcard.flashcardName}
                                </h3>
                                <Badge
                                    className="flex items-center gap-1 px-2 py-0.5"
                                    variant="outline"
                                >
                                    {getTypeIcon(flashcard.flashcardType)}
                                    <span className="text-xs">{flashcard.flashcardType}</span>
                                </Badge>
                                {flashcard.grade && (
                                    <Badge className="text-xs" variant="secondary">
                                        Grade {flashcard.grade}
                                    </Badge>
                                )}
                                <Badge className={`${getStatusColor(flashcard.status)}`}>
                                    {flashcard.status}
                                </Badge>
                            </div>

                            <p className="text-muted-foreground line-clamp-1 text-sm">
                                {flashcard.entityName}
                            </p>

                            <div className="text-muted-foreground mt-1 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs">
                                <div className="flex items-center gap-1">
                                    <IconFileText className="size-3" />
                                    <span>{flashcard.numberOfFlashcardContent} cards</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <IconCalendar className="size-3" />
                                    <span>
                                        {flashcard.updatedAt == undefined ? (
                                            <>
                                                Updated{" "}
                                                {new Date(flashcard.createdAt).toLocaleDateString()}
                                            </>
                                        ) : (
                                            <>
                                                Created{" "}
                                                {new Date(flashcard.updatedAt).toLocaleDateString()}
                                            </>
                                        )}
                                    </span>
                                </div>
                                <div className="flex flex-wrap gap-1">
                                    {flashcard.tags?.map((tag, i) => (
                                        <Badge key={i} className="text-xs" variant="outline">
                                            {tag}
                                        </Badge>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-2 self-end sm:self-center">
                            <Button className="h-8" size="sm" variant="outline">
                                <IconEdit className="mr-1 size-4" />
                                Edit
                            </Button>

                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button className="size-8" size="icon" variant="ghost">
                                        <IconDotsCircleHorizontal className="size-4" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuItem>
                                        <IconCopy className="mr-2 size-4" />
                                        <span>Duplicate</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <IconShare2 className="mr-2 size-4" />
                                        <span>Share</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem
                                        className="text-red-600"
                                        onClick={() => setOpen(true)}
                                    >
                                        <IconTrash className="mr-2 size-4" />
                                        <span>Delete</span>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>
                ))}
            </div>
            <ConfirmDialog
                desc={
                    <p className="mb-2">
                        Are you sure you want to delete this flashcard? This action cannot
                        be undone.
                    </p>
                }
                handleConfirm={handleConfirmDelete}
                open={open}
                title="Delete Flashcard"
                onOpenChange={setOpen}
            />
        </>
    );
}
