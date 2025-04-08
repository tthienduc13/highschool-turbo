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
    IconLink,
    IconLock,
    IconShield,
    IconUpload,
} from "@tabler/icons-react";
import { Textarea } from "@highschool/ui/components/ui/textarea";
import { cn } from "@highschool/ui/lib/utils";
import {
    FlashcardAttachToType,
    FlashcardContentModify,
    StudySetVisibility,
} from "@highschool/interfaces";
import { Badge } from "@highschool/ui/components/ui/badge";

import { ComboboxTag } from "../combo-tag";
import { FLashcardContent } from "../flashcard-content";
import { flashcardDefaults } from "../flashcard";

import { ComboCourses } from "./combo-courses";
import { ImportTermModal } from "./import-term-modal";
import { ImportFlashcardContentButtonExcel } from "./button-import-excel";

function CreateFLashcardModule() {
    const [title, setTitle] = useState("Set Title");
    const [importOpen, setImportOpen] = useState(false);
    const [description, setDescription] = useState("");
    const [tags, setTags] = useState<string[]>([]);
    const [entityId, setEntityId] = useState("");
    const [flashcardType, setFlashcardType] = useState<FlashcardAttachToType>(
        FlashcardAttachToType.Lesson,
    );
    const [flashcardContents, setFlashcardContents] =
        useState<FlashcardContentModify[]>(flashcardDefaults);
    const [isEditingTitle, setIsEditingTitle] = useState(false);
    const handleSave = () => {
        console.log("entityId: ", entityId);
        console.log("flashcardType: ", flashcardType);
        console.log("flashcards: ", flashcardContents);
    };

    const handleAddTerms = (terms: { term: string; definition: string }[]) => {
        setFlashcardContents((prev) => [
            ...prev,
            ...terms.map((term, index) => ({
                flashcardContentTerm: term.term,
                flashcardContentDefinition: term.definition,
                flashcardContentTermRichText: "",
                flashcardContentDefinitionRichText: "",
                rank: prev.length + index + 1,
            })),
        ]);
    };

    return (
        <div className="py-8">
            <Card className="fixed z-10 mb-6 flex w-[77vw] items-center justify-between p-4 shadow-lg">
                <div className="flex items-center gap-3">
                    <IconEdit className="size-5 text-slate-600" />
                    <div>
                        <h2 className="text-lg font-bold">Create a new set</h2>
                        <p className="text-sm text-slate-500">8 terms saved just now</p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <Button
                        className="bg-blue-600 hover:bg-blue-700"
                        onClick={handleSave}
                    >
                        Create
                    </Button>
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

            <div className="mb-6 mt-24">
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
                        className="min-h-[150px] w-[30vw] resize-none border-0 bg-slate-100"
                        placeholder="Add a description..."
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <div className="w-[20vw]">
                        <span className="font-bold">Tags: </span>
                        <ComboboxTag setTags={setTags} />
                        <div className="flex flex-wrap gap-2">
                            {tags.length > 0 &&
                                tags.map((tag) => (
                                    <Badge
                                        key={tag}
                                        className="mt-2 rounded-sm px-1 font-normal"
                                        variant="secondary"
                                    >
                                        {tag}
                                    </Badge>
                                ))}
                        </div>
                    </div>
                    <div>
                        <ComboCourses
                            apiSetEntityId={setEntityId}
                            apiSetFlashcardType={setFlashcardType}
                        />
                    </div>
                </div>
            </div>

            <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
                <div className="flex flex-wrap items-center gap-2">
                    <Button
                        className="gap-2 bg-white"
                        variant="outline"
                        onClick={() => setImportOpen(true)}
                    >
                        <IconUpload className="size-4 rotate-90" />
                        Import terms
                    </Button>
                    <ImportFlashcardContentButtonExcel onImport={handleAddTerms} />
                    <ImportTermModal
                        isOpen={importOpen}
                        onClose={() => {
                            setImportOpen(false);
                        }}
                        onImport={(terms) => {
                            setImportOpen(false);
                            handleAddTerms(terms);
                        }}
                    />
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
                                {StudySetVisibility.Public}
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <IconLock className="mr-2 size-4" />
                                {StudySetVisibility.Private}
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <IconLink className="mr-2 size-4" />
                                {StudySetVisibility.Unlisted}
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <IconShield className="mr-2 size-4" />
                                {StudySetVisibility.Closed}
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>

            <div className="flex flex-col">
                <FLashcardContent
                    flashcards={flashcardContents}
                    setFlashcards={setFlashcardContents}
                />
            </div>
        </div>
    );
}

export default CreateFLashcardModule;
