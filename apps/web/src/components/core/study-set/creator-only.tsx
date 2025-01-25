import { useSession } from "next-auth/react";

import React from "react";

import { useSet } from "@/hooks/use-set";

export interface SetCreatorOnlyProps {
  studySetId?: string;
  fallback?: React.ReactElement;
}

export const SetCreatorOnly: React.FC<
  React.PropsWithChildren<SetCreatorOnlyProps>
> = ({ children, studySetId, fallback }) => {
  const session = useSession();
  const { flashcard } = useSet();

  if (flashcard.userId === session.data?.user.userId) {
    return <>{children}</>;
  }
  return fallback ?? null;
};
