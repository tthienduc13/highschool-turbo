import {
    FlashcardContent,
    FlashcardContentModify,
} from "@highschool/interfaces";
import { Button } from "@highschool/ui/components/ui/button";
import { Card } from "@highschool/ui/components/ui/card";
import { Textarea } from "@highschool/ui/components/ui/textarea";
import { IconGrid3x3, IconPlus, IconTrash } from "@tabler/icons-react";
import { useState } from "react";

interface FlashcardProps {
    flashcards: FlashcardContentModify[];
    setFlashcards: React.Dispatch<React.SetStateAction<FlashcardContentModify[]>>;
}

export const FLashcardContent = ({
    flashcards,
    setFlashcards,
}: FlashcardProps) => {
    const addFlashcard = (index: number) => {
        const newId = Math.max(...flashcards.map((card) => card.rank!), 0) + 1;
        const newFlashcards = [...flashcards];

        newFlashcards.splice(index + 1, 0, {
            rank: newId,
            flashcardContentTerm: "",
            flashcardContentDefinition: "",
            flashcardContentTermRichText: "",
            flashcardContentDefinitionRichText: "",
        });
        setFlashcards(newFlashcards);
    };

    const updateFlashcard = (
        id: number,
        field: keyof FlashcardContent,
        value: string,
    ) => {
        setFlashcards(
            flashcards.map((card) =>
                card.rank === id ? { ...card, [field]: value } : card,
            ),
        );
    };

    const deleteFlashcard = (id: number) => {
        if (flashcards.length > 1) {
            setFlashcards(flashcards.filter((card) => card.rank !== id));
        }
    };

    const [hoverIndex, setHoverIndex] = useState<number | null>(null);
    const [hoverPosition, setHoverPosition] = useState<{
        top: number;
        left: number;
    } | null>(null);

    const handleChangeContent = (
        index: number,
        type: "term" | "definition",
        text: string,
    ) => {
        const newFlashcards = [...flashcards];
        const newFlashcard = flashcards[index];

        if (type === "term") {
            newFlashcard.flashcardContentTerm = text;
        } else if (type === "definition") {
            newFlashcard.flashcardContentDefinition = text;
        }
        newFlashcards[index] = newFlashcard;
        setFlashcards(newFlashcards);
    };

    return (
        <>
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
                                            onClick={() => deleteFlashcard(flashcard.rank!)}
                                        >
                                            <IconTrash className="size-4" />
                                        </Button>
                                    </div>
                                </div>

                                <div className="grid gap-4 md:grid-cols-2">
                                    <div>
                                        <Textarea
                                            className="h-10 rounded-none border-0 border-b border-dashed border-slate-300 px-0 focus-visible:border-blue-500 focus-visible:ring-0"
                                            placeholder="Enter term"
                                            value={flashcard.flashcardContentTerm}
                                            onChange={(e) => {
                                                updateFlashcard(
                                                    flashcard.rank!,
                                                    "flashcardContentTerm",
                                                    e.target.value,
                                                ),
                                                    handleChangeContent(index, "term", e.target.value);
                                            }}
                                        />
                                        <p className="mb-1 mt-2 text-sm text-slate-500">Term</p>
                                    </div>
                                    <div>
                                        <Textarea
                                            className="h-10 rounded-none border-0 border-b border-dashed border-slate-300 px-0 focus-visible:border-blue-500 focus-visible:ring-0"
                                            placeholder="Enter definition"
                                            value={flashcard.flashcardContentDefinition}
                                            onChange={(e) => {
                                                updateFlashcard(
                                                    flashcard.rank!,
                                                    "flashcardContentDefinition",
                                                    e.target.value,
                                                ),
                                                    handleChangeContent(
                                                        index,
                                                        "definition",
                                                        e.target.value,
                                                    );
                                            }}
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
        </>
    );
};
