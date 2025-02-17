"use client";

import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { patchFlashcardContent } from "@highschool/react-query/apis";

import { Context, editorEventChannel } from "@/events/editor";

const SearchImagesModal = dynamic(
  () =>
    import("@/components/core/study-set/search-image-modal").then(
      (mod) => mod.SearchImagesModal,
    ),
  {
    ssr: false,
  },
);

export const TermImageLayer = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const apiEditTerm = useMutation({
    mutationFn: patchFlashcardContent,
  });

  useEffect(() => {
    const open = () => setModalOpen(true);

    const requestUploadUrl = (context: Context) => {
      // apiUploadImage.mutate(context);
    };

    const complete = (context: Context) => {
      // apiUploadImageComplete.mutate(context);
    };

    const setImage = (args: {
      context: Context;
      optimisticUrl: string;
      query?: string;
      index?: number;
    }) => {
      editorEventChannel.emit("propagateImageUrl", {
        id: args.context.termId,
        url: args.optimisticUrl,
      });

      if (args.query !== undefined && args.index !== undefined) {
        apiEditTerm.mutate({
          flashcardId: args.context.studySetId,
          values: {
            id: args.context.termId,
            image: args.optimisticUrl,
          },
        });
      }
    };

    editorEventChannel.on("openSearchImages", open);
    editorEventChannel.on("imageSelected", setImage);
    editorEventChannel.on("requestUploadUrl", requestUploadUrl);
    editorEventChannel.on("uploadComplete", complete);

    return () => {
      editorEventChannel.off("openSearchImages", open);
      editorEventChannel.off("imageSelected", setImage);
      editorEventChannel.off("requestUploadUrl", requestUploadUrl);
      editorEventChannel.off("uploadComplete", complete);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <SearchImagesModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
  );
};
