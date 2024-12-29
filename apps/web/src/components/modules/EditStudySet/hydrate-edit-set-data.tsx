"use client";

import { useSession } from "next-auth/react";

import { useParams, useRouter } from "next/navigation";

import { DraftData } from "@highschool/interfaces";
import {
  useContentsBySlugQuery,
  useFlashcardBySlugQuery,
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

  const { data: flashcardData, isSuccess: flashcardSuccess } =
    useFlashcardBySlugQuery({
      slug: params.slug as string,
    });

  const { data: flashcardContentData, isSuccess: flashcardContentSuccess } =
    useContentsBySlugQuery({
      slug: params.slug as string,
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

  if (!flashcardData || !flashcardContentData) return <EditorLoading />;

  if (flashcardData.userId !== session.data?.user?.userId) {
    router.replace(`/study-set/${flashcardData.slug}`);
  }

  return (
    <EditorContextLayer data={data!} mode="edit">
      {children}
    </EditorContextLayer>
  );
};
