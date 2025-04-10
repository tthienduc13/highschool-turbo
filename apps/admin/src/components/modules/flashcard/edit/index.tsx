"use client";

import { useEffect, useState } from "react";
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
import {
    useContentsByIdQuery,
    useCreateFlashcardStatus,
    useEditSetMutation,
    useGetDraftFlashcardQuery,
} from "@highschool/react-query/queries";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { ComboboxTag } from "../combo-tag";
import { FLashcardContent } from "../flashcard-content";
import { ComboCourses } from "../flashcard-content-management/combo-courses";
import { ImportTermModal } from "../flashcard-content-management/import-term-modal";
import { ImportFlashcardContentButtonExcel } from "../flashcard-content-management/button-import-excel";
import { EditorLoading } from "../editor-loading";
import { deleteFlashcardContent } from "../../../../../../../packages/react-query/src/apis/flashcard-content";

interface EditFLashcardModuleProps {
    id?: string;
}

function EditFLashcardModule({ id }: EditFLashcardModuleProps) {
    const router = useRouter();

    const [importOpen, setImportOpen] = useState(false);
    const [isEditingTitle, setIsEditingTitle] = useState(false);
    const { data: flashcard, isPending: draftLoading } =
        useGetDraftFlashcardQuery({
            id: id ?? "",
        });
    const { data: contents } = useContentsByIdQuery({
        pageNumber: 1,
        pageSize: 30,
        id: id ?? "",
    });
    const { mutateAsync: createFlashcardStatus } = useCreateFlashcardStatus();
    const apiDeleteTerm = useMutation({
        mutationKey: ["delete"],
        mutationFn: deleteFlashcardContent,
        onSuccess: (data, value) => {
            // Delete flashcard content from the list
            setFlashcardContents((prev) =>
                prev.filter((item) => item.id !== value.flashcardContentId),
            );

            return data;
        },
    });

    const [flashcardContents, setFlashcardContents] = useState<
        FlashcardContentModify[]
    >((contents as FlashcardContentModify[]) ?? []);
    const { mutateAsync: updateFlashcard } = useEditSetMutation();

    const [title, setTitle] = useState(flashcard?.flashcardName);
    const [description, setDescription] = useState(
        flashcard?.flashcardDescription ?? "",
    );
    const [tags, setTags] = useState<string[]>(flashcard?.tags ?? []);
    const [entityId, setEntityId] = useState(flashcard?.entityId ?? "");
    const [status, setStatus] = useState(
        flashcard?.status ?? StudySetVisibility.Private,
    );
    const [flashcardType, setFlashcardType] = useState<FlashcardAttachToType>(
        flashcard?.flashcardType ?? FlashcardAttachToType.Lesson,
    );

    useEffect(() => {
        if (!flashcard && !draftLoading) {
            router.push("/flashcard/create");
        }
    }, [draftLoading]);

    useEffect(() => {
        if (flashcard) {
            setTitle(flashcard.flashcardName);
            setDescription(flashcard.flashcardDescription ?? "");
            setTags(flashcard.tags ?? []);
            setEntityId(flashcard.entityId);
            setStatus(flashcard.status ?? StudySetVisibility.Private);
            setFlashcardType(flashcard.flashcardType ?? FlashcardAttachToType.Lesson);
        }
    }, [flashcard]);

    useEffect(() => {
        if (contents) {
            setFlashcardContents(contents);
        }
    }, [contents]);

    if (draftLoading) {
        return <EditorLoading />;
    }

    const handleSave = async () => {
        // Create flashcard information
        await updateFlashcard({
            flashcardId: id ?? "",
            values: {
                entityId: entityId,
                flashcardDescription: description,
                flashcardName: title ?? "",
                flashcardType: flashcardType,
                status: status,
                tags: tags,
            },
        });

        // Create flashcard status information
        const result = await createFlashcardStatus({
            flashcardId: id ?? "",
        });

        if (result && (result.status === 200 || result.status === 2021)) {
            toast.success("Flashcard saved successfully!");
        } else {
            toast.error(result.message ?? "Error saving flashcard!");
        }
    };

    const handleDeleteTerm = async (
        rank: number,
        flashcardContentId?: string,
    ) => {
        if (flashcardContentId) {
            await apiDeleteTerm.mutateAsync({
                flashcardId: id ?? "",
                flashcardContentId: flashcardContentId,
            });
        } else {
            setFlashcardContents((prev) => prev.filter((item) => item.rank !== rank));
        }
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
                        <h2 className="text-lg font-bold">Modify a set</h2>
                        <p className="text-sm text-slate-500">
                            {flashcard?.numberOfFlashcardContent} terms saved just now
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <Button
                        className="bg-blue-600 hover:bg-blue-700"
                        onClick={handleSave}
                    >
                        Save
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
                                {status}
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem
                                onClick={() => setStatus(StudySetVisibility.Public)}
                            >
                                <IconGlobe className="mr-2 size-4" />
                                {StudySetVisibility.Public}
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={() => setStatus(StudySetVisibility.Private)}
                            >
                                <IconLock className="mr-2 size-4" />
                                {StudySetVisibility.Private}
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={() => setStatus(StudySetVisibility.Unlisted)}
                            >
                                <IconLink className="mr-2 size-4" />
                                {StudySetVisibility.Unlisted}
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={() => setStatus(StudySetVisibility.Closed)}
                            >
                                <IconShield className="mr-2 size-4" />
                                {StudySetVisibility.Closed}
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>

            <div className="flex flex-col">
                <FLashcardContent
                    deleteTerm={handleDeleteTerm}
                    flashcardId={id ?? ""}
                    flashcards={flashcardContents}
                    setFlashcards={setFlashcardContents}
                />
            </div>
        </div>
    );
}

export default EditFLashcardModule;
