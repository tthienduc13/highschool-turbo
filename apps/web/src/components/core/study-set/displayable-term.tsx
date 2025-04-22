"use client";

import { EditorContent, JSONContent, useEditor } from "@tiptap/react";
import { memo, useEffect, useState } from "react";
import { useOutsideClick } from "@highschool/hooks";
import {
  FlashcardContent,
  LimitedStudySetAnswerMode,
} from "@highschool/interfaces";
import { Display } from "@highschool/lib/display";
import {
  EditorTerm,
  editorInput,
  getPlainText,
  getRichTextJson,
  hasRichText,
  richTextToHtml,
} from "@highschool/lib/editor";
import {
  useEditFlashcardContentMutation,
  useStarTermMutation,
  useUnStarTermMutation,
} from "@highschool/react-query/queries";
import { Button } from "@highschool/ui/components/ui/button";
import { Card, CardContent } from "@highschool/ui/components/ui/card";
import { cn } from "@highschool/ui/lib/utils";
import { IconEditCircle, IconStar, IconStarFilled } from "@tabler/icons-react";
import { useSession } from "next-auth/react";

import { CreatorOnly } from "../common/creator-only";
import { editorConfig } from "../editor/editor-config";
import { RichTextBar } from "../editor/rich-text-bar";
import { PhotoView } from "../providers/photo-provider/photo-view";

import { AddImageButton, RemoveImageButton } from "./image-component";

import { resize } from "@/utils/resize-image";
import { useContainerContext } from "@/stores/use-container-store";
import { useSet } from "@/hooks/use-set";
import { editorEventChannel } from "@/events/editor";
import { menuEventChannel } from "@/events/menu";

export interface DisplayableTermProps {
  flashcardContent: FlashcardContent;
}

export const DisplayableTerm = ({ flashcardContent }: DisplayableTermProps) => {
  const { flashcard } = useSet();
  const authed = useSession().status == "authenticated";

  const hideFlashcard = useContainerContext((s) => s.hideFlashcard);
  const flashcardHideWith = useContainerContext((s) => s.flashcardHideWith);

  const apiStarTerm = useStarTermMutation();
  const apiUnStarMutation = useUnStarTermMutation();
  const starredTerms = useContainerContext((s) => s.starredTerms);
  const starTerm = useContainerContext((s) => s.starTerm);
  const unstarTerm = useContainerContext((s) => s.unstarTerm);

  const starred = starredTerms.includes(flashcardContent.id);
  const Star = starred ? IconStarFilled : IconStar;

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
      flashcardContent.flashcardContentTermRichText,
    ) as JSONContent | null,
    definitionRichText: getRichTextJson(
      flashcardContent.flashcardContentDefinitionRichText,
    ) as JSONContent | null,
  });

  useEffect(() => {
    setCache({
      term: flashcardContent.flashcardContentTerm,
      definition: flashcardContent.flashcardContentDefinition,
      termRichText: getRichTextJson(
        flashcardContent.flashcardContentTermRichText,
      ) as JSONContent | null,
      definitionRichText: getRichTextJson(
        flashcardContent.flashcardContentDefinitionRichText,
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
        const definitionRichText = hasRichText(definitionJson, definition);

        const values = {
          term,
          definition,
          termRichText: termRichText ? termJson : null,
          definitionRichText: definitionRichText ? definitionJson : null,
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
              flashcardContentDefinitionRichText: definitionRichText
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
        "rounded-xl border-[1.5px] p-0 shadow-md transition-all duration-150 ease-in-out md:p-5 dark:bg-gray-800/50",
        isEditing
          ? "border-blue-100 dark:border-[#4b83ff50]"
          : "border-gray-100 dark:border-gray-700",
      )}
    >
      <CardContent className="flex flex-col-reverse items-stretch p-0 md:flex-row md:gap-6">
        <div className="flex w-full flex-col gap-2 p-3 md:flex-row md:gap-6 md:p-0">
          {isEditing ? (
            <div className="flex w-full flex-col gap-2">
              <RichTextBar activeEditor={termEditor} />
              <EditorContent
                className="text-lg"
                editor={termEditor}
                onKeyDown={(e) => {
                  if ([" ", "ArrowRight", "ArrowLeft"].includes(e.key))
                    e.stopPropagation();
                }}
              />
            </div>
          ) : (
            <div
              className={cn(
                "overflow-wrap-anywhere w-full whitespace-pre-wrap text-lg leading-[25px]",
                hideFlashcard &&
                  flashcardHideWith === LimitedStudySetAnswerMode.Term &&
                  "blur",
              )}
            >
              <Display richText={cache.termRichText!} text={cache.term} />
            </div>
          )}
          <div className="h-full w-[4px] rounded-full bg-gray-100 dark:bg-gray-700" />
          {isEditing ? (
            <div className="flex w-full flex-col gap-2">
              <RichTextBar activeEditor={definitionEditor} />
              <EditorContent
                className="text-lg"
                editor={definitionEditor}
                onKeyDown={(e) => {
                  if ([" ", "ArrowRight", "ArrowLeft"].includes(e.key))
                    e.stopPropagation();
                }}
              />
            </div>
          ) : (
            <div
              className={cn(
                "overflow-wrap-anywhere w-full whitespace-pre-wrap text-lg leading-[25px]",
                hideFlashcard &&
                  flashcardHideWith === LimitedStudySetAnswerMode.Definition &&
                  "blur",
              )}
            >
              <Display
                richText={cache.definitionRichText!}
                text={cache.definition}
              />
            </div>
          )}
          <div className="min-w-[100px]">
            {assetUrl && (
              <div className="relative mt-3 h-[80px] min-w-[100px] md:mt-0">
                <PhotoView src={resize({ src: assetUrl, width: 500 })}>
                  <img
                    alt="Term asset"
                    height={80}
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
                    width={100}
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
                  editorEventChannel.emit("openSearchImages", {
                    termId: flashcardContent.id,
                    studySetId: flashcardContent.flashcardId,
                  });
                }}
              />
            )}
          </div>
        </div>
        <div className="h-full border-b-2 border-gray-100 px-1 py-2 md:border-b-0 md:p-0 dark:border-gray-700">
          <div className="flex w-full justify-end">
            <div className="flex h-6 w-full items-center justify-between md:justify-end md:space-x-1">
              <CreatorOnly userId={flashcard.userId}>
                <Button
                  className="size-8 scale-75 rounded-full md:scale-100"
                  size="icon"
                  variant={isEditing ? "default" : "ghost"}
                  onClick={() => {
                    if (isEditing) {
                      doEdit();
                    }
                    setIsEditing(!isEditing);
                  }}
                >
                  <IconEditCircle size={18} />
                </Button>
              </CreatorOnly>
              <Button
                className="size-8 scale-75 rounded-full md:scale-100"
                size="icon"
                variant={isEditing ? "default" : "ghost"}
                onClick={() => {
                  if (!authed) {
                    menuEventChannel.emit("openSignup", {
                      message:
                        "Tạo tài khoản miễn phí để tuỳ chỉnh và đánh dấu thuật ngữ",
                    });

                    return;
                  }

                  if (!starred) {
                    starTerm(flashcardContent.id);
                    apiStarTerm.mutate({
                      flashcardContentId: flashcardContent.id,
                    });
                  } else {
                    unstarTerm(flashcardContent.id);
                    apiUnStarMutation.mutate({
                      flashcardContentId: flashcardContent.id,
                    });
                  }
                }}
              >
                <Star />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export const DisplayableTermPure = memo(DisplayableTerm);
