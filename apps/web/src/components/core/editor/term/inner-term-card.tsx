"use client";

import { DraggableAttributes } from "@dnd-kit/core";
import { SyntheticListenerMap } from "@dnd-kit/core/dist/hooks/utilities";
import { Editor, EditorContent, JSONContent, useEditor } from "@tiptap/react";
import { motion } from "framer-motion";

import { memo, useCallback, useEffect, useRef, useState } from "react";

import { editorInput, getPlainText, hasRichText } from "@highschool/lib/editor";
import { Button } from "@highschool/ui/components/ui/button";
import { PopoverAnchor } from "@highschool/ui/components/ui/popover";

import { IconGripHorizontal, IconTrash } from "@tabler/icons-react";

import { editorEventChannel } from "@/events/editor";
import { useSetEditorContext } from "@/stores/use-set-editor-store";
import { languageName } from "@/utils/language";
import { resize } from "@/utils/resize-image";

import { PhotoView } from "../../providers/photo-provider/photo-view";
import {
  AddImageButton,
  RemoveImageButton,
} from "../../study-set/image-component";
import { CharacterSuggestions } from "../character-suggestion";
import { editorAttributes, editorConfig } from "../editor-config";
import { RichTextBar } from "../rich-text-bar";
import { DeloadedDisplayable } from "./deloaded-card";
import { SortableTermCardProps } from "./sortable-term-card";

export interface InnerTermCardProps extends SortableTermCardProps {
  attributes: DraggableAttributes;
  listeners: SyntheticListenerMap | undefined;
}

export const InnerTermCard: React.FC<InnerTermCardProps> = ({
  isCurrent,
  flashcardContent,
  deletable,
  justCreated,
  termLanguage,
  definitionLanguage,
  isLast,
  openMenu,
  editTerm,
  deleteTerm,
  anyFocus,
  onTabOff,
  attributes,
  listeners,
}) => {
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    setInitialized(true);
  }, [setInitialized]);

  const cardRef = useRef<HTMLDivElement>(null);

  const [termFocused, setTermFocused] = useState(false);
  const [definitionFocused, setDefinitionFocused] = useState(false);

  const termFocusedRef = useRef(termFocused);
  termFocusedRef.current = termFocused;
  const definitionFocusedRef = useRef(definitionFocused);
  definitionFocusedRef.current = definitionFocused;

  const [lastFocused, setLastFocused] = useState<"term" | "definition" | null>(
    null,
  );

  useEffect(() => {
    if (termFocused || definitionFocused) {
      anyFocus();
      setLastFocused(termFocused ? "term" : "definition");
    }
  }, [termFocused, definitionFocused, anyFocus]);

  const [termEmpty, setTermEmpty] = useState(false);
  const [definitionEmpty, setDefinitionEmpty] = useState(false);
  const [added, setAdded] = useState(false);

  const id = useSetEditorContext((s) => s.id);
  const readonly = useSetEditorContext((s) => s.readonly);
  const setCurrentActive = useSetEditorContext((s) => s.setCurrentActiveRank);
  const removeImage = useSetEditorContext((s) => s.removeImage);

  const termEditor = useEditor({
    ...editorConfig(flashcardContent.rank + 1),
    content: editorInput(flashcardContent, "term"),
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      setTermEmpty(editor.isEmpty);
    },
    onCreate: ({ editor }) => {
      setTermEmpty(editor.isEmpty);
      if (justCreated) editor.chain().focus();
    },
  });
  const termRef = useRef(termEditor);
  termRef.current = termEditor;

  const definitionEditor = useEditor({
    ...editorConfig(flashcardContent.rank + 2),
    content: editorInput(flashcardContent, "definition"),
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      setDefinitionEmpty(editor.isEmpty);
    },
    onCreate: ({ editor }) => {
      setDefinitionEmpty(editor.isEmpty);
    },
  });
  const definitionRef = useRef(definitionEditor);
  definitionRef.current = definitionEditor;

  const activeEditor = termFocused
    ? termRef.current
    : definitionFocused
      ? definitionRef.current
      : null;

  useEffect(() => {
    if (termFocused || definitionFocused)
      setCurrentActive(flashcardContent.rank);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [termFocused, definitionFocused]);

  useEffect(() => {
    if (!initialized) return;
    termEditor?.commands.setContent(editorInput(flashcardContent, "term"));
    definitionEditor?.commands.setContent(
      editorInput(flashcardContent, "definition"),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    flashcardContent.flashcardContentTerm,
    flashcardContent.flashcardContentDefinition,
  ]);

  useEffect(() => {
    termRef.current?.setOptions({
      editorProps: {
        attributes: editorAttributes(flashcardContent.rank + 1),
      },
    });
    definitionRef.current?.setOptions({
      editorProps: {
        attributes: editorAttributes(flashcardContent.rank + 2),
      },
    });
  }, [flashcardContent.rank]);

  const handleInsert = (c: string, editor: Editor) => {
    const cursor = editor.state.selection.$anchor.pos;
    editor.commands.insertContentAt(cursor, c);
  };

  const LanguageButton = ({ type }: { type: "term" | "definition" }) => {
    if (!isCurrent || lastFocused !== type) return null;

    return (
      <PopoverAnchor asChild>
        <Button
          size="sm"
          className="text-primary hover:text-primary/80 hover:bg-primary/10 py-0 text-sm"
          variant="ghost"
          onPointerDown={() => {
            openMenu(type);
          }}
        >
          {languageName(type == "term" ? termLanguage : definitionLanguage)}
        </Button>
      </PopoverAnchor>
    );
  };
  const LanguageButtonPure = memo(LanguageButton);

  const insertTerm = useCallback(
    (c: string) => handleInsert(c, termRef.current!),
    [],
  );
  const insertDefinition = useCallback(
    (c: string) => handleInsert(c, definitionRef.current!),
    [],
  );

  const blurWord = useCallback(() => {
    setTermFocused(false);
    // Timeout is neccesary if clicked to or tabbed immediately
    setTimeout(() => {
      editIfDirty(definitionFocusedRef.current);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [flashcardContent, termEditor, definitionEditor]);

  const blurDefinition = useCallback(() => {
    setDefinitionFocused(false);
    setTimeout(() => {
      editIfDirty(termFocusedRef.current);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [flashcardContent, termEditor, definitionEditor]);

  const getEditorPlainTexts = () => {
    const termJson = termEditor!.getJSON();
    const definitionJson = definitionEditor!.getJSON();
    const term = getPlainText(termJson);
    const definition = getPlainText(definitionJson);
    return { term, definition, termJson, definitionJson };
  };

  const getTermDelta = () => {
    const { term, definition, termJson, definitionJson } =
      getEditorPlainTexts();

    const termRichText = hasRichText(termJson, term);
    const definitionRichText = hasRichText(definitionJson, definition);

    const compareJson = (
      one?: JSONContent | JSON | null,
      two?: JSONContent | JSON | null,
    ) => {
      const left = JSON.stringify(one || "");
      const right = JSON.stringify(two || "");
      return left === right;
    };

    const isDirty =
      term !== flashcardContent.flashcardContentTerm ||
      definition !== flashcardContent.flashcardContentDefinition ||
      ((termRichText || flashcardContent.flashcardContentTermRichText) &&
        !compareJson(
          termJson,
          flashcardContent.flashcardContentTermRichText,
        )) ||
      ((definitionRichText ||
        flashcardContent.flashcardContentDefinitionRichText) &&
        !compareJson(
          definitionJson,
          flashcardContent.flashcardContentDefinitionRichText,
        ));

    return {
      term,
      definition,
      termJson,
      definitionJson,
      termRichText,
      definitionRichText,
      isDirty,
    };
  };

  const editIfDirty = (focused: boolean) => {
    const {
      isDirty,
      term,
      definition,
      termJson,
      definitionJson,
      termRichText,
      definitionRichText,
    } = getTermDelta();

    if (isDirty && !focused) {
      setAdded(true);

      console.log(getTermDelta());

      editTerm(
        flashcardContent.id,
        term,
        definition,
        termRichText ? (termJson as JSON) : undefined,
        definitionRichText ? (definitionJson as JSON) : undefined,
      );
    }
  };

  if (!initialized) {
    return;
  }

  return (
    <motion.div
      ref={cardRef}
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      className="flex flex-col gap-2"
    >
      <div className="flex items-center justify-between rounded-t-xl border border-b-2 border-gray-50 px-5 py-[10px] dark:border-gray-700">
        <div className="w-[72px] font-bold">{flashcardContent.rank + 1}</div>
        {isCurrent && !readonly && <RichTextBar activeEditor={activeEditor} />}
        <div className="flex flex-row items-center">
          <Button
            aria-label="Reorder"
            size={"icon"}
            variant={"ghost"}
            {...attributes}
            {...listeners}
            disabled={readonly}
            className="cursor-grab rounded-full"
          >
            <IconGripHorizontal size={18} className="!size-[18px]" />
          </Button>
          <Button
            className="rounded-full"
            aria-label="Delete"
            variant="ghost"
            size={"icon"}
            disabled={readonly || !deletable}
            onClick={() => deleteTerm(flashcardContent.id)}
          >
            <IconTrash size={18} className="!size-[18px]" />
          </Button>
        </div>
      </div>
      <div className="flex flex-col items-start gap-6 px-5 pb-4 sm:flex-row">
        <div className="flex w-full flex-col gap-2">
          <div className="relative w-full">
            {(initialized || justCreated) && !readonly ? (
              <EditorContent
                editor={termEditor}
                onFocus={() => setTermFocused(true)}
                onBlur={blurWord}
              >
                {termEmpty && (
                  <div className="editor-placeholder pointer-events-none absolute left-0 top-[7px] text-gray-500">
                    Nhập thuật ngữ
                  </div>
                )}
              </EditorContent>
            ) : (
              <DeloadedDisplayable>
                {flashcardContent.flashcardContentTerm}
              </DeloadedDisplayable>
            )}
            {isCurrent && (
              <CharacterSuggestions
                language={termLanguage}
                focused={termFocused}
                onSelect={insertTerm}
                onLanguageClick={() => openMenu("term")}
              />
            )}
          </div>
          <div className="flex h-6 items-center justify-between">
            <div className="text-muted-foreground text-sm">Thuật ngữ</div>
            <LanguageButtonPure type="term" />
          </div>
        </div>
        <div className="flex w-full flex-col gap-2">
          <div className="relative w-full">
            {(initialized || justCreated) && !readonly ? (
              <EditorContent
                editor={definitionEditor}
                placeholder={`Nhập định nghĩa`}
                onFocus={() => setDefinitionFocused(true)}
                onBlur={blurDefinition}
                onKeyDown={(e) => {
                  if (isLast && e.key == "Tab" && !e.shiftKey) {
                    e.preventDefault();
                    onTabOff();
                  }
                }}
              >
                {definitionEmpty && (
                  <div className="editor-placeholder pointer-events-none absolute left-0 top-[7px] text-gray-500">
                    Nhập định nghĩa
                  </div>
                )}
              </EditorContent>
            ) : (
              <DeloadedDisplayable>
                {flashcardContent.flashcardContentDefinition}
              </DeloadedDisplayable>
            )}
            {isCurrent && !readonly && (
              <CharacterSuggestions
                language={definitionLanguage}
                focused={definitionFocused}
                onSelect={insertDefinition}
                onLanguageClick={() => openMenu("definition")}
              />
            )}
          </div>
          <div className="flex h-6 items-center justify-between">
            <div className="text-muted-foreground text-sm">Định nghĩa</div>
            <LanguageButtonPure type="definition" />
          </div>
        </div>
        <div className="relative mt-1 h-[60px] min-w-20">
          {flashcardContent.image ? (
            <>
              <PhotoView
                src={resize({
                  src: flashcardContent.image,
                  width: 500,
                })}
                borderRadius={12}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  width="80x"
                  height="60px"
                  src={resize({
                    src: flashcardContent.image,
                    width: 500,
                  })}
                  alt={`Image for ${flashcardContent.flashcardContentDefinition}`}
                  style={{
                    cursor: "zoom-in",
                    objectFit: "cover",
                    width: "80px",
                    height: "60px",
                    borderRadius: "0.75rem",
                  }}
                />
              </PhotoView>
              {!readonly && (
                <RemoveImageButton
                  onClick={() => removeImage(flashcardContent.id)}
                />
              )}
            </>
          ) : (
            <AddImageButton
              disabled={readonly}
              onClick={() => {
                const {
                  isDirty,
                  term,
                  definition,
                  termJson,
                  definitionJson,
                  termRichText,
                  definitionRichText,
                } = getTermDelta();

                if (!isDirty && !added) {
                  editTerm(
                    flashcardContent.id,
                    term,
                    definition,
                    termRichText ? (termJson as JSON) : undefined,
                    definitionRichText ? (definitionJson as JSON) : undefined,
                  );
                }

                editorEventChannel.emit("openSearchImages", {
                  termId: flashcardContent.id,
                  studySetId: id,
                });
              }}
            />
          )}
        </div>
      </div>
    </motion.div>
  );
};
