"use client";

import { editorEventChannel } from "@/events/editor";
import { useSet } from "@/hooks/use-set";
import { FlashcardContent } from "@highschool/interfaces";
import {
    editorInput,
    EditorTerm,
    getPlainText,
    getRichTextJson,
    hasRichText,
    richTextToHtml,
} from "@highschool/lib/editor";
import { IconEditCircle, IconStar, IconStarFilled } from "@tabler/icons-react";
import { EditorContent, JSONContent, useEditor } from "@tiptap/react";
import { useSession } from "next-auth/react";
import { memo, useEffect, useState } from "react";
import { editorConfig } from "../editor/editor-config";
import { useEditFlashcardContentMutation } from "@highschool/react-query/queries";
import { useOutsideClick } from "@highschool/hooks";
import { Card, CardContent } from "@highschool/ui/components/ui/card";
import { cn } from "@highschool/ui/lib/utils";
import { Display } from "@highschool/lib/display";
import { PhotoView } from "../providers/photo-provider/photo-view";
import { resize } from "@/utils/resize-image";
import { AddImageButton, RemoveImageButton } from "./image-component";
import { Button } from "@highschool/ui/components/ui/button";
import { CreatorOnly } from "../common/creator-only";
import { RichTextBar } from "../editor/rich-text-bar";

export interface DisplayableTermProps {
    flashcardContent: FlashcardContent;
}

export const DisplayableTerm = ({ flashcardContent }: DisplayableTermProps) => {
    const authed = useSession().status == "authenticated";
    const { flashcard } = useSet();

    // const starMutation = api.container.starTerm.useMutation();
    // const unstarMutation = api.container.unstarTerm.useMutation();
    // const removeImage = api.terms.removeImage.useMutation();

    // const { container } = useSet();
    // const starredTerms = useContainerContext((s) => s.starredTerms);
    // const starTerm = useContainerContext((s) => s.starTerm);
    // const unstarTerm = useContainerContext((s) => s.unstarTerm);

    // const starred = starredTerms.includes(term.id);
    // const Star = starred ? IconStarFilled : IconStar;

    const [isEditing, setIsEditing] = useState(false);
    const [assetUrl, setAssetUrl] = useState(flashcardContent.image);

    useEffect(() => {
        setAssetUrl(flashcardContent.image);
    }, [flashcardContent.image]);

    useEffect(() => {
        const handle = (args: { id: string; url: string }) => {
            if (args.id == flashcardContent.id) setAssetUrl(args.url);
        };

        editorEventChannel.on("propagateImageUrl", handle);
        return () => {
            editorEventChannel.off("propagateImageUrl", handle);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const termEditor = useEditor({
        ...editorConfig(flashcardContent.rank + 1),
        immediatelyRender: false,
        content: editorInput(flashcardContent as EditorTerm, "term"),
    });
    const definitionEditor = useEditor({
        ...editorConfig(flashcardContent.rank + 1),
        immediatelyRender: false,
        content: editorInput(flashcardContent as EditorTerm, "definition"),
    });

    const edit = useEditFlashcardContentMutation({ slug: flashcard.slug });

    const [cache, setCache] = useState({
        term: flashcardContent.flashcardContentTerm,
        definition: flashcardContent.flashcardContentDefinition,
        termRichText: getRichTextJson(
            flashcardContent.flashcardContentTermRichText
        ) as JSONContent | null,
        definitionRichText: getRichTextJson(
            flashcardContent.flashcardContentDefinitionRichText
        ) as JSONContent | null,
    });

    useEffect(() => {
        setCache({
            term: flashcardContent.flashcardContentTerm,
            definition: flashcardContent.flashcardContentDefinition,
            termRichText: getRichTextJson(
                flashcardContent.flashcardContentTermRichText
            ) as JSONContent | null,
            definitionRichText: getRichTextJson(
                flashcardContent.flashcardContentDefinitionRichText
            ) as JSONContent | null,
        });
    }, [
        flashcardContent.flashcardContentTerm,
        flashcardContent.flashcardContentDefinition,
        flashcardContent.flashcardContentTermRichText,
        flashcardContent.flashcardContentDefinitionRichText,
    ]);

    const getEditorPlainTexts = () => {
        const termJson = termEditor!.getJSON();
        const definitionJson = definitionEditor!.getJSON();
        const term = getPlainText(termJson);
        const definition = getPlainText(definitionJson);
        return { term, definition, termJson, definitionJson };
    };

    const doEdit = () => {
        setIsEditing((e) => {
            if (e) {
                const { term, definition, termJson, definitionJson } =
                    getEditorPlainTexts();

                const termRichText = hasRichText(termJson, term);
                const definitionRichText = hasRichText(
                    definitionJson,
                    definition
                );

                const values = {
                    term,
                    definition,
                    termRichText: termRichText ? termJson : null,
                    definitionRichText: definitionRichText
                        ? definitionJson
                        : null,
                };

                setCache(values);

                const hasChanged =
                    values.term != cache.term ||
                    values.definition != cache.definition ||
                    JSON.stringify(values.termRichText) !=
                        JSON.stringify(cache.termRichText) ||
                    JSON.stringify(values.definitionRichText) !=
                        JSON.stringify(cache.definitionRichText);

                if (hasChanged) {
                    edit.mutateAsync({
                        flashcardId: flashcardContent.flashcardId,
                        values: {
                            id: flashcardContent.id,
                            flashcardContentTerm: term,
                            flashcardContentDefinition: definition,
                            flashcardContentTermRichText: termRichText
                                ? richTextToHtml(termJson)
                                : undefined,
                            flashcardContentDefinitionRichText:
                                definitionRichText
                                    ? richTextToHtml(definitionJson)
                                    : undefined,
                        },
                    });
                }
            }

            return false;
        });
    };

    const ref = useOutsideClick(doEdit);

    return (
        <Card
            ref={ref}
            className={cn(
                "p-0 md:p-5 border-[1.5px] transition-all duration-150 ease-in-out shadow-md rounded-xl dark:bg-gray-800/50",
                isEditing
                    ? "border-blue-100 dark:border-[#4b83ff50]"
                    : "border-gray-100 dark:border-gray-700"
            )}
        >
            <CardContent className="p-0 flex flex-col-reverse md:flex-row items-stretch md:gap-6">
                <div className="w-full flex flex-col md:flex-row gap-2 md:gap-6 px-3 md:px-0 py-3 md:py-0">
                    {isEditing ? (
                        <div className="flex flex-col gap-2 w-full">
                            <RichTextBar activeEditor={termEditor} />
                            <EditorContent
                                editor={termEditor}
                                onKeyDown={(e) => {
                                    if (
                                        [
                                            " ",
                                            "ArrowRight",
                                            "ArrowLeft",
                                        ].includes(e.key)
                                    )
                                        e.stopPropagation();
                                }}
                            />
                        </div>
                    ) : (
                        <div className="w-full whitespace-pre-wrap overflow-wrap-anywhere leading-[25px]">
                            <Display
                                text={cache.term}
                                richText={cache.termRichText!}
                            />
                        </div>
                    )}
                    <div className="bg-gray-100 dark:bg-gray-700 h-full rounded-full w-[4px]" />
                    {isEditing ? (
                        <div className="flex flex-col gap-2 w-full">
                            <RichTextBar activeEditor={definitionEditor} />
                            <EditorContent
                                editor={definitionEditor}
                                onKeyDown={(e) => {
                                    if (
                                        [
                                            " ",
                                            "ArrowRight",
                                            "ArrowLeft",
                                        ].includes(e.key)
                                    )
                                        e.stopPropagation();
                                }}
                            />
                        </div>
                    ) : (
                        <div className="w-full whitespace-pre-wrap overflow-wrap-anywhere leading-[25px]">
                            <Display
                                text={cache.definition}
                                richText={cache.definitionRichText!}
                            />
                        </div>
                    )}
                    <div className="min-w-[100px]">
                        {assetUrl && (
                            <div className="min-w-[100px] h-[80px] mt-3 md:mt-0 relative">
                                <PhotoView
                                    src={resize({ src: assetUrl, width: 500 })}
                                >
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                        width={100}
                                        height={80}
                                        alt="Term asset"
                                        src={resize({
                                            src: assetUrl,
                                            width: 500,
                                        })}
                                        style={{
                                            cursor: "zoom-in",
                                            width: 100,
                                            height: 80,
                                            objectFit: "cover",
                                            aspectRatio: "5 / 4",
                                            borderRadius: "6px",
                                        }}
                                    />
                                </PhotoView>
                                {isEditing && (
                                    <RemoveImageButton
                                        onClick={() => {
                                            setAssetUrl(null);
                                            // removeImage.mutate({
                                            //     id: term.id,
                                            //     studySetId: term.studySetId,
                                            // });
                                        }}
                                    />
                                )}
                            </div>
                        )}
                        {isEditing && !assetUrl && (
                            <AddImageButton
                                onClick={() => {
                                    editorEventChannel.emit(
                                        "openSearchImages",
                                        {
                                            termId: flashcardContent.id,
                                            studySetId:
                                                flashcardContent.flashcardId,
                                        }
                                    );
                                }}
                            />
                        )}
                    </div>
                </div>
                <div className="h-full border-b-2 border-gray-100 px-1 py-2 dark:border-gray-700 md:border-b-0 md:px-0 md:py-0">
                    <div className="flex w-full justify-end">
                        <div className="flex h-6 w-full items-center justify-between md:justify-end md:space-x-1">
                            <CreatorOnly userId={flashcard.userId}>
                                <Button
                                    size="icon"
                                    variant={isEditing ? "default" : "ghost"}
                                    className="h-8 w-8 scale-75 rounded-full md:scale-100"
                                    onClick={() => {
                                        if (isEditing) {
                                            doEdit();
                                        }
                                        setIsEditing(!isEditing);
                                    }}
                                >
                                    <IconEditCircle size={18} />
                                    <span className="sr-only">Edit</span>
                                </Button>
                            </CreatorOnly>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export const DisplayableTermPure = memo(DisplayableTerm);
