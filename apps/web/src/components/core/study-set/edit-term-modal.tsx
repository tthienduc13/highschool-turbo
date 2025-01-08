import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Content, EditorContent, useEditor } from "@tiptap/react";

import { useEffect, useState } from "react";

import { Modal } from "@highschool/components/modal";
import { FlashcardContent } from "@highschool/interfaces";
import {
  EditorTerm,
  editorInput,
  getPlainText,
  hasRichText,
  richTextToHtml,
} from "@highschool/lib/editor";
import { patchFlashcardContent } from "@highschool/react-query/apis";

import { editorEventChannel } from "@/events/editor";
import { resize } from "@/utils/resize-image";

import { editorConfig } from "../editor/editor-config";
import { RichTextBar } from "../editor/rich-text-bar";
import { PhotoView } from "../providers/photo-provider/photo-view";
import { AddImageButton, RemoveImageButton } from "./image-component";

export interface EditTermModalProps {
  term: FlashcardContent | null;
  isOpen: boolean;
  onClose: () => void;
  onDefinition: boolean;
}

export const EditTermModal = ({
  term,
  isOpen,
  onClose,
  onDefinition,
}: EditTermModalProps) => {
  const queryClient = useQueryClient();
  const [termAssetUrl, setTermAssetUrl] = useState<string | null>(null);
  const [cachedAssetUrl, setCachedAssetUrl] = useState<string | null>(null);

  const wordEditor = useEditor({
    ...editorConfig(),
    immediatelyRender: false,
    content: term ? editorInput(term as EditorTerm, "term") : "",
  });
  const definitionEditor = useEditor({
    ...editorConfig(),
    immediatelyRender: false,
    content: term ? editorInput(term as EditorTerm, "definition") : "",
  });

  useEffect(() => {
    if (!term || !isOpen) return;

    const termContent = term ? editorInput(term as EditorTerm, "term") : "";

    const definitionContent = term
      ? editorInput(term as EditorTerm, "definition")
      : "";

    wordEditor?.commands.setContent(termContent as Content);
    definitionEditor?.commands.setContent(definitionContent as Content);
    setTermAssetUrl(term.image);
    setCachedAssetUrl(term.image);

    if (onDefinition) {
      definitionEditor?.commands.focus();
    } else {
      wordEditor?.commands.focus();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [term, isOpen]);

  useEffect(() => {
    const handle = (args: { id: string; url: string }) => {
      if (isOpen && args.id == term?.id) {
        setTermAssetUrl(args.url);
        setCachedAssetUrl(args.url);
      }
    };

    editorEventChannel.on("propagateImageUrl", handle);
    return () => {
      editorEventChannel.off("propagateImageUrl", handle);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  const apiEditTerm = useMutation({
    mutationFn: patchFlashcardContent,
  });

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      isPending={apiEditTerm.isPending}
      title="Chỉnh sửa thẻ"
      onConfirm={async () => {
        if (!term) return;

        const wordJson = wordEditor!.getJSON();
        const definitionJson = definitionEditor!.getJSON();
        const word = getPlainText(wordJson);
        const definition = getPlainText(definitionJson);

        const wordRichText = hasRichText(wordJson, word);
        const definitionRichText = hasRichText(definitionJson, definition);

        if (!cachedAssetUrl && termAssetUrl) {
          await apiEditTerm.mutateAsync(
            {
              flashcardId: term.flashcardId,
              values: {
                id: term.id,
                image: null,
              },
            },
            {
              onSuccess: () => {
                queryClient.invalidateQueries({
                  queryKey: ["flashcard-content"],
                });
              },
            },
          );
        }

        apiEditTerm.mutate(
          {
            ...term,
            flashcardId: term.flashcardId,
            values: {
              id: term.id,
              flashcardContentTerm: word,
              flashcardContentDefinition: definition,
              flashcardContentTermRichText: wordRichText
                ? richTextToHtml(wordJson)
                : undefined,
              flashcardContentDefinitionRichText: definitionRichText
                ? richTextToHtml(definitionJson)
                : undefined,
            },
          },
          {
            onSuccess: () => {
              queryClient.invalidateQueries({
                queryKey: ["flashcard-content"],
              });
              onClose();
            },
          },
        );
      }}
    >
      <div className="flex flex-col gap-6">
        <div className="flex w-full flex-col gap-2">
          <RichTextBar activeEditor={wordEditor} />
          <EditorContent
            editor={wordEditor}
            onKeyDown={(e) => {
              if ([" ", "ArrowRight", "ArrowLeft"].includes(e.key))
                e.stopPropagation();
            }}
          />
        </div>
        <div className="flex w-full flex-col gap-2">
          <RichTextBar activeEditor={definitionEditor} />
          <EditorContent
            editor={definitionEditor}
            onKeyDown={(e) => {
              if ([" ", "ArrowRight", "ArrowLeft"].includes(e.key))
                e.stopPropagation();
            }}
          />
        </div>
        {cachedAssetUrl ? (
          <div className="relative mt-3 h-[80px] w-[100px] md:mt-0">
            <PhotoView src={resize({ src: cachedAssetUrl, width: 500 })}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                width={100}
                height={80}
                alt="Term asset"
                src={resize({ src: cachedAssetUrl, width: 500 })}
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
            <RemoveImageButton
              onClick={() => {
                if (!term) return;
                setCachedAssetUrl(null);
              }}
            />
          </div>
        ) : (
          <div className="h-[80px] w-[100px]">
            <AddImageButton
              onClick={() => {
                if (!term) return;
                editorEventChannel.emit("openSearchImages", {
                  termId: term.id,
                  studySetId: term.flashcardId,
                });
              }}
            />
          </div>
        )}
      </div>
    </Modal>
  );
};
