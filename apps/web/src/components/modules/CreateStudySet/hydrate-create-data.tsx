import { useEffect } from "react";

import { useRouter } from "next/navigation";

import { DraftData } from "@highschool/interfaces";
import {
  useFlashcardDraftMutation,
  useFlashcardDraftQuery,
} from "@highschool/react-query/queries";

import { EditorContextLayer } from "@/components/core/editor/editor-context-layer";
import { EditorLoading } from "@/components/core/editor/editor-loading";

interface HydrateCreateDataProps {
  children: React.ReactNode;
}

export const HydrateCreateData = ({ children }: HydrateCreateDataProps) => {
  const apiGetDraft = useFlashcardDraftMutation();
  const router = useRouter();

  useEffect(() => {
    apiGetDraft.mutate(undefined, {
      onSuccess: (data) => {
        if (data.status === 400 && typeof data.data === "string") {
          router.push(`/study-set/edit/${data.data}`);
        }
      },
    });
  }, []);

  if (apiGetDraft.isPending) {
    return <EditorLoading />;
  }

  if (apiGetDraft.isError) {
    return null;
  }

  return (
    <EditorContextLayer
      mode="create"
      data={apiGetDraft.data?.data as DraftData}
    >
      {children}
    </EditorContextLayer>
  );
};
