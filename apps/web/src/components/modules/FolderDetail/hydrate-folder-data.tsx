"use client";

import { createContext } from "react";

import { useParams } from "next/navigation";

import { UserFolder } from "@highschool/interfaces";
import { useFolderDetailQuery } from "@highschool/react-query/queries";

import { Loading } from "@/components/core/common/loading";

import { FolderNotPublic } from "./folder-not-public";

interface HydrateFolderDataProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}
export const emptyFolderContext: UserFolder = {
  folderUser: {
    id: "",
    name: "",
    countFlashCard: 0,
    countDocument: 0,
    createdAt: new Date(0),
  },
  flashcards: [],
  documents: [],
};

export const FolderContext = createContext<UserFolder>(emptyFolderContext);
export const HydrateFolderData = ({
  children,
  fallback,
}: HydrateFolderDataProps) => {
  const params = useParams();
  const { data, isLoading, error } = useFolderDetailQuery({
    folderId: params.folderId as string,
    pageSize: 100,
    pageNumber: 1,
  });

  if (isLoading) {
    return fallback ?? <Loading />;
  }

  if (error || data?.status === 404) {
    return <FolderNotPublic />;
  }

  return (
    <FolderContext.Provider value={data?.data || emptyFolderContext}>
      {children}
    </FolderContext.Provider>
  );
};
