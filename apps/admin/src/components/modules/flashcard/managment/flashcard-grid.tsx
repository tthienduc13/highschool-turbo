"use client";

import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from "@highschool/ui/components/ui/card";
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
    IconCopy,
    IconDotsCircleHorizontal,
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

interface FlashcardGridProps {
    flashcards: FlashcardPreview[];
}

export function FlashcardGrid({ flashcards }: FlashcardGridProps) {
    const [open, setOpen] = useState(false);

    const handleConfirmDelete = () => {
        // Handle delete flashcard logic here
        console.log("Flashcard deleted");
        setOpen(false);
    };

    return (
        <>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {flashcards.map((flashcard) => (
                    <Card
                        key={flashcard.id}
                        className="group overflow-hidden transition-all duration-300 hover:shadow-lg"
                    >
                        <CardHeader className="flex flex-row items-start justify-between space-y-0 p-4 pb-2">
                            <div className="flex flex-col gap-1">
                                <div className="flex items-center gap-2">
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
                                </div>
                                <Badge className={`w-fit ${getStatusColor(flashcard.status)}`}>
                                    {flashcard.status}
                                </Badge>
                            </div>
                            <div className="flex items-center gap-1">
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
                                            <span>Edit</span>
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
                        </CardHeader>
                        <CardContent className="p-4 pt-2">
                            <h3 className="group-hover:text-primary mb-1 line-clamp-2 text-lg font-semibold transition-colors">
                                {flashcard.flashcardName}
                            </h3>
                            <p className="text-muted-foreground mb-2 line-clamp-2 text-sm">
                                {flashcard.entityName}
                            </p>
                            <div className="mt-2 flex flex-wrap gap-1">
                                {flashcard.tags?.map((tag, i) => (
                                    <Badge key={i} className="text-xs" variant="outline">
                                        {tag}
                                    </Badge>
                                ))}
                            </div>
                        </CardContent>
                        <CardFooter className="text-muted-foreground flex items-center justify-between p-4 pt-0 text-xs">
                            <div className="flex items-center gap-1">
                                <IconFileText className="size-3" />
                                <span>{flashcard.numberOfFlashcardContent} cards</span>
                            </div>
                            <div>
                                {flashcard.updatedAt == undefined ? (
                                    <>
                                        Updated {new Date(flashcard.createdAt).toLocaleDateString()}
                                    </>
                                ) : (
                                    <>
                                        Created {new Date(flashcard.updatedAt).toLocaleDateString()}
                                    </>
                                )}
                            </div>
                        </CardFooter>
                    </Card>
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
