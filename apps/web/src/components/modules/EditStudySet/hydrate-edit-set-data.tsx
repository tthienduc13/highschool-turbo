"use client";

import { useSession } from "next-auth/react";

import { useEffect } from "react";

import { useParams, useRouter } from "next/navigation";

import { DraftData } from "@highschool/interfaces";
import {
  useContentsByIdQuery,
  useFlashcardByIdQuery,
} from "@highschool/react-query/queries";

import { EditorContextLayer } from "@/components/core/editor/editor-context-layer";
import { EditorLoading } from "@/components/core/editor/editor-loading";

interface HydrateEditSetDataProps {
  children: React.ReactNode;
}

export const HydrateEditSetData = ({ children }: HydrateEditSetDataProps) => {
  const params = useParams();
  const session = useSession();
  const router = useRouter();

  const {
    data: flashcardData,
    isSuccess: flashcardSuccess,
    isFetching: flashcardFetching,
    isLoading: flashcardLoading,
  } = useFlashcardByIdQuery({
    id: params.id as string,
  });

  const {
    data: flashcardContentData,
    isSuccess: flashcardContentSuccess,
    isFetching: flashcardContentFetching,
    isLoading: flashcardContentLoading,
  } = useContentsByIdQuery({
    id: params.id as string,
    pageNumber: 1,
    pageSize: 1000,
  });

  const data: DraftData | null =
    flashcardSuccess && flashcardContentSuccess
      ? {
          id: flashcardData.id,
          userId: flashcardData.userId,
          subjectId: flashcardData.subjectId,
          flashcardName: flashcardData.flashcardName,
          slug: flashcardData.slug,
          flashcardDescription: flashcardData.flashcardDescription,
          status: flashcardData.status,
          createdBy: flashcardData.createdBy,
          created: flashcardData.created,
          flashcardContents: flashcardContentData,
          numberOfFlashcardContent: flashcardData.numberOfFlashcardContent,
        }
      : null;

  const isLoading =
    flashcardContentFetching ||
    flashcardContentLoading ||
    flashcardFetching ||
    flashcardLoading;

  useEffect(() => {
    if (flashcardData && flashcardData?.userId !== session.data?.user?.userId) {
      router.replace(`/study-set/${flashcardData?.slug}`);
    }
  }, [flashcardData, router, session]);

  if (!flashcardData || !flashcardContentData || isLoading)
    return <EditorLoading />;

  return (
    <EditorContextLayer data={data!} mode="edit">
      {children}
    </EditorContextLayer>
  );
};
