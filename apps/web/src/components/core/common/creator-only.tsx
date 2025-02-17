"use client";

import { useSession } from "next-auth/react";

interface CreatorOnlyProps {
  userId: string;
  children: React.ReactNode;
}

export const CreatorOnly = ({ userId, children }: CreatorOnlyProps) => {
  const { data: session } = useSession();

  if (session?.user.userId == userId) {
    return <>{children}</>;
  }

  return null;
};
