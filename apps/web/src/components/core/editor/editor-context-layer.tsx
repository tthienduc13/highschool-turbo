"use client";

import { useMutation } from "@tanstack/react-query";
import { nanoid } from "nanoid";

import { useEffect, useRef, useState } from "react";

import { useRouter } from "next/navigation";

import { DraftData, FlashcardContent } from "@highschool/interfaces";
import { richTextToHtml } from "@highschool/lib/editor";
import {
  addTerm,
  createFlashcardStatus,
  deleteFlashcardContent,
  patchFlashcard,
  patchFlashcardContent,
  reorderTerm,
} from "@highschool/react-query/apis";

import { SetLoading } from "@/components/core/study-set/set-loading";
import { Context, editorEventChannel } from "@/events/editor";
import {
  ClientTerm,
  SetEditorStore,
  SetEditorStoreContext,
  createSetEditorStore,
} from "@/stores/use-set-editor-store";

interface EditorContextLayerProps {
  children: React.ReactNode;
  mode: "create" | "edit";
  data: DraftData;
}

export const EditorContextLayer = ({
  children,
  mode,
  data,
}: EditorContextLayerProps) => {
  const router = useRouter();
  const storeRef = useRef<SetEditorStore>(null);
  const [savedLocally, setSavedLocally] = useState(false);

  if (!data || !data.flashcardContents) {
    return <SetLoading />;
  }

  const apiEditSet = useMutation({
    mutationKey: ["update-flashcard"],
    mutationFn: patchFlashcard,
    onSuccess: (data) => {
      storeRef.current!.getState().setSaveError(undefined);
      storeRef.current!.getState().setSlug(data.data!);
    },
  });

  const apiAddTerm = useMutation({
    mutationFn: addTerm,
    onSuccess: (response, { values: termInput }) => {
      if (!response || !response.data) {
        console.error("Invalid response data:", response);
        return;
      }

      const state = storeRef.current!.getState();

      const termToUpdate = state.terms.find((x) => x.rank === termInput.rank);
      if (termToUpdate) {
        state.setServerTermId(termToUpdate.clientKey, response.data.id);
      }

      const termIds = [response.data.id];
      state.addServerTerms(termIds);
    },
    onError: (error) => {
      console.error("Error adding term:", error);
    },
  });

  const apiDeleteTerm = useMutation({
    mutationKey: ["delete"],
    mutationFn: deleteFlashcardContent,
    onSuccess: (data, value) => {
      const state = storeRef.current!.getState();
      state.removeServerTerms([value.flashcardContentId]);
      return data;
    },
  });

  const apiEditTerm = useMutation({
    mutationFn: patchFlashcardContent,
  });

  const apiReorderTerm = useMutation({
    mutationKey: ["reorder-term"],
    mutationFn: reorderTerm,
  });

  const apiCreate = useMutation({
    mutationKey: ["create-flashcard-status"],
    mutationFn: createFlashcardStatus,
    onSuccess: () => {
      router.push(`/study-set/${storeRef.current!.getState().slug}`);
    },
    onError: (e) => {
      const state = storeRef.current!.getState();
      state.setIsLoading(false);
      state.setSaveError(e.message || "Đã có lỗi xảy ra, vui lòng thử lại");
    },
  });

  const isSaving =
    apiCreate.isPending ||
    apiEditSet.isPending ||
    apiAddTerm.isPending ||
    apiDeleteTerm.isPending ||
    apiEditTerm.isPending ||
    apiReorderTerm.isPending;

  useEffect(() => {
    const state = storeRef.current!.getState();
    state.setIsSaving(isSaving);
    if (isSaving) setSavedLocally(true);

    if (!isSaving && savedLocally) {
      state.setSavedAt(new Date());
      state.setSaveError(undefined);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSaving]);

  useEffect(() => {
    // Needed because IDs may be innacurate at the time the modal is opened
    const transform = (c: Context) => {
      const term = storeRef
        .current!.getState()
        .terms.find((x) => x.id === c.termId || x.clientKey === c.termId)!;

      return { termId: term.id, studySetId: c.studySetId };
    };

    const requestUploadUrl = (context: Context) => {
      // apiUploadImage.mutate(transform(context));
    };

    const complete = (context: Context) => {
      // apiUploadImageComplete.mutate(transform(context));
    };

    const setImage = (args: {
      context: Context;
      optimisticUrl: string;
      query?: string;
      index?: number;
    }) => {
      const context = transform(args.context);

      storeRef.current!.getState().setImage(context.termId, args.optimisticUrl);

      if (args.query !== undefined && args.index !== undefined) {
        // apiSetImage.mutate({
        //     studySetId: context.studySetId,
        //     id: context.termId,
        //     query: args.query,
        //     index: args.index,
        // });
        apiEditTerm.mutate({
          flashcardId: context.studySetId,
          values: {
            id: context.termId,
            image: args.optimisticUrl,
          },
        });
      }
    };

    editorEventChannel.on("imageSelected", setImage);
    editorEventChannel.on("requestUploadUrl", requestUploadUrl);
    editorEventChannel.on("uploadComplete", complete);
    return () => {
      editorEventChannel.off("imageSelected", setImage);
      editorEventChannel.off("requestUploadUrl", requestUploadUrl);
      editorEventChannel.off("uploadComplete", complete);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!storeRef.current) {
    storeRef.current = createSetEditorStore(
      {
        ...data,
        terms: data.flashcardContents.map((x: any) => ({
          ...x,
          clientKey: x.id ?? nanoid(),
        })) as ClientTerm[],
        mode: mode,
        serverTerms: data?.flashcardContents.map((x: FlashcardContent) => x.id),
        title: data.flashcardName,
        description: data.flashcardDescription,
        courseId: data.subjectId,
      },
      {
        deleteTerm: (termId) => {
          const state = storeRef.current!.getState();

          if (state.serverTerms.includes(termId))
            apiDeleteTerm.mutate({
              flashcardContentId: termId,
              flashcardId: data?.id!,
            });
        },
        removeImage: (id) => {
          apiEditTerm.mutate({
            flashcardId: data?.id!,
            values: {
              id: id,
              image: "",
            },
          });
        },
        editTerm: (
          termId,
          word,
          definition,
          wordRichText_,
          definitionRichText_,
        ) => {
          const state = storeRef.current!.getState();

          const { wordRichText, definitionRichText } = {
            wordRichText: wordRichText_
              ? richTextToHtml(wordRichText_)
              : undefined,
            definitionRichText: definitionRichText_
              ? richTextToHtml(definitionRichText_)
              : undefined,
          };

          if (state.serverTerms.includes(termId)) {
            apiEditTerm.mutate({
              flashcardId: data.id,
              values: {
                id: termId,
                flashcardContentTerm: word,
                flashcardContentDefinition: definition,
                flashcardContentTermRichText: wordRichText,
                flashcardContentDefinitionRichText: definitionRichText,
              },
            });
          } else {
            apiAddTerm.mutate({
              flashcardId: data.id,
              values: {
                flashcardContentTerm: word,
                flashcardContentDefinition: definition,
                flashcardContentTermRichText: wordRichText,
                flashcardContentDefinitionRichText: definitionRichText,
                rank: state.terms.find((x) => x.id == termId)!.rank,
              },
            });
          }
        },
        reorderTerm: (id, rank) => {
          void (async () => {
            const state = storeRef.current!.getState();

            const term = state.terms.find((x) => x.id === id)!;

            if (state.serverTerms.includes(term.id)) {
              await apiReorderTerm.mutateAsync({
                flashcardContentId: id,
                newRank: rank,
              });
            } else {
              await apiAddTerm.mutateAsync({
                flashcardId: data.id,
                values: {
                  flashcardContentTerm: term.flashcardContentTerm,
                  flashcardContentDefinition: term.flashcardContentDefinition,
                  rank: rank,
                },
              });
            }
          })();
        },
        onSubscribeDelegate: () => {
          void (async () => {
            const state = storeRef.current!.getState();

            await apiEditSet.mutateAsync({
              flashcardId: data?.id!,
              values: {
                flashcardName: state.title,
                flashcardDescription: state.description,
                subjectId: state.courseId,
                status: state.visibility,
              },
            });
          })();
        },
        onComplete: () => {
          const state = storeRef.current!.getState();
          const push = () => void router.push(`/${state.slug}`);

          if (mode == "edit") push();
          else {
            storeRef.current!.getState().setIsLoading(true);
            apiCreate.mutate({ flashcardId: data.id });
          }
        },
      },
    );
  }

  return (
    <SetEditorStoreContext.Provider value={storeRef.current}>
      {children}
    </SetEditorStoreContext.Provider>
  );
};
