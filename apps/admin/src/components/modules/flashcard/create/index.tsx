"use client";

import { useState } from "react";
import { Button } from "@highschool/ui/components/ui/button";
import { Input } from "@highschool/ui/components/ui/input";
import { Card } from "@highschool/ui/components/ui/card";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@highschool/ui/components/ui/dropdown-menu";
import {
    IconDotsVertical,
    IconEdit,
    IconGlobe,
    IconGrid3x3,
    IconPlus,
    IconTrash,
    IconUpload,
} from "@tabler/icons-react";
import { Textarea } from "@highschool/ui/components/ui/textarea";
import { cn } from "@highschool/ui/lib/utils";

interface Flashcard {
    id: number;
    term: string;
    definition: string;
}

function CreateFLashcardModule() {
    const [title, setTitle] = useState("Set Title");
    const [description, setDescription] = useState("");
    const [tags, setTags] = useState("");
    const [isEditingTitle, setIsEditingTitle] = useState(false);
    const [flashcards, setFlashcards] = useState<Flashcard[]>([
        { id: 1, term: "", definition: "" },
        { id: 2, term: "", definition: "" },
        { id: 3, term: "", definition: "" },
    ]);

    const addFlashcard = (index: number) => {
        const newId = Math.max(...flashcards.map((card) => card.id), 0) + 1;
        const newFlashcards = [...flashcards];

        newFlashcards.splice(index + 1, 0, { id: newId, term: "", definition: "" });
        setFlashcards(newFlashcards);
    };

    const updateFlashcard = (
        id: number,
        field: keyof Flashcard,
        value: string,
    ) => {
        setFlashcards(
            flashcards.map((card) =>
                card.id === id ? { ...card, [field]: value } : card,
            ),
        );
    };

    const deleteFlashcard = (id: number) => {
        if (flashcards.length > 1) {
            setFlashcards(flashcards.filter((card) => card.id !== id));
        }
    };

    const [hoverIndex, setHoverIndex] = useState<number | null>(null);
    const [hoverPosition, setHoverPosition] = useState<{
        top: number;
        left: number;
    } | null>(null);

    return (
        <div className="py-8">
            <Card className="mb-6 flex items-center justify-between p-4 shadow-sm">
                <div className="flex items-center gap-3">
                    <IconEdit className="size-5 text-slate-600" />
                    <div>
                        <h2 className="text-lg font-bold">Create a new set</h2>
                        <p className="text-sm text-slate-500">
                            {flashcards.length} terms saved just now
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <Button className="bg-blue-600 hover:bg-blue-700">Create</Button>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button size="icon" variant="ghost">
                                <IconDotsVertical className="size-5" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem>Rename</DropdownMenuItem>
                            <DropdownMenuItem>Duplicate</DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600">
                                Delete
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </Card>

            <div className="mb-6">
                <Input
                    className={cn(
                        "mb-2 h-full border-none md:text-[3rem] font-bold focus:border-transparent focus-visible:ring-0",
                    )}
                    placeholder="Set Title"
                    value={title}
                    onBlur={() => setIsEditingTitle(false)}
                    onChange={(e) => setTitle(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && setIsEditingTitle(false)}
                />
                <div className="flex gap-5">
                    <Textarea
                        className="min-h-[150px] w-[40vw] resize-none border-0 bg-slate-100"
                        placeholder="Add a description..."
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <div>
                        <h2 className="mb-4 text-2xl font-bold text-slate-800">Tags</h2>
                        <Input
                            className="border-0 bg-slate-100"
                            placeholder="e.g. Science, Chemistry, Organic Chemistry"
                            value={tags}
                            onChange={(e) => setTags(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
                <div className="flex flex-wrap items-center gap-2">
                    <Button className="gap-2 bg-white" variant="outline">
                        <IconUpload className="size-4 rotate-90" />
                        Import terms
                    </Button>
                    <Button className="gap-2 bg-white" variant="outline">
                        <IconUpload className="size-4" />
                        Import from Quizlet
                    </Button>
                </div>

                <div className="flex items-center gap-2">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button className="gap-2 bg-white" variant="outline">
                                <IconGlobe className="size-4" />
                                Public
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                                <IconGlobe className="mr-2 size-4" />
                                Public
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <IconGlobe className="mr-2 size-4" />
                                Private
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>

            <div className="flex flex-col">
                {flashcards.map((flashcard, index) => {
                    return (
                        <div key={flashcard.id}>
                            <div>
                                <Card className="p-4 shadow-sm">
                                    <div className="mb-4 flex items-center justify-between">
                                        <span className="text-xl font-bold text-slate-700">
                                            {index + 1}
                                        </span>
                                        <div className="flex items-center gap-2">
                                            <Button className="size-8" size="icon" variant="ghost">
                                                <IconGrid3x3 className="size-4" />
                                            </Button>
                                            <Button
                                                className="size-8 text-red-500 hover:bg-red-50 hover:text-red-600"
                                                size="icon"
                                                variant="ghost"
                                                onClick={() => deleteFlashcard(flashcard.id)}
                                            >
                                                <IconTrash className="size-4" />
                                            </Button>
                                        </div>
                                    </div>

                                    <div className="grid gap-4 md:grid-cols-2">
                                        <div>
                                            <Input
                                                className="h-10 rounded-none border-0 border-b border-dashed border-slate-300 px-0 focus-visible:border-blue-500 focus-visible:ring-0"
                                                placeholder="Enter term"
                                                value={flashcard.term}
                                                onChange={(e) =>
                                                    updateFlashcard(flashcard.id, "term", e.target.value)
                                                }
                                            />
                                            <p className="mb-1 mt-2 text-sm text-slate-500">Term</p>
                                        </div>
                                        <div>
                                            <Input
                                                className="h-10 rounded-none border-0 border-b border-dashed border-slate-300 px-0 focus-visible:border-blue-500 focus-visible:ring-0"
                                                placeholder="Enter definition"
                                                value={flashcard.definition}
                                                onChange={(e) =>
                                                    updateFlashcard(
                                                        flashcard.id,
                                                        "definition",
                                                        e.target.value,
                                                    )
                                                }
                                            />
                                            <p className="mb-1 mt-2 text-sm text-slate-500">
                                                Definition
                                            </p>
                                        </div>
                                    </div>
                                </Card>
                            </div>
                            <div
                                className="h-4"
                                onMouseEnter={(e) => {
                                    const position = e.currentTarget.getBoundingClientRect();

                                    setHoverIndex(index);
                                    setHoverPosition({
                                        top: position.top + window.scrollY + position.height / 2,
                                        left: position.left + position.width / 2 - position.x,
                                    });
                                }}
                                onMouseLeave={() => {
                                    setHoverIndex(null);
                                    setHoverPosition(null);
                                }}
                            />
                        </div>
                    );
                })}
            </div>

            {hoverPosition && hoverIndex !== null && (
                <div
                    className="absolute z-50"
                    style={{
                        top: hoverPosition.top,
                        left: hoverPosition.left,
                        transform: "translate(-50%, -50%)",
                    }}
                    onMouseEnter={() => {
                        setHoverIndex(hoverIndex);
                        setHoverPosition(hoverPosition);
                    }}
                    onMouseLeave={() => {
                        setHoverIndex(null);
                        setHoverPosition(null);
                    }}
                >
                    <Button
                        className="h-8 rounded-full border-blue-200 bg-blue-50 px-3 text-blue-600 hover:border-blue-300 hover:bg-blue-100 hover:text-blue-700"
                        size="sm"
                        variant="outline"
                        onClick={() => addFlashcard(hoverIndex)}
                    >
                        <IconPlus className="mr-1 size-4" />
                        Add term here
                    </Button>
                </div>
            )}
        </div>
    );
}

export default CreateFLashcardModule;
