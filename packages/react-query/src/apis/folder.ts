import {
  Folder,
  Pagination,
  ResponseModel,
  UserFolder,
} from "@highschool/interfaces";
import { folderEndpoints } from "@highschool/endpoints";

import axiosServices from "../lib/axios.ts";

import fetchPaginatedData from "./common.ts";

// GET

export const getUserFolderList = async ({
  pageSize,
  pageNumber,
  userName,
  flashcardId,
  documentId,
}: {
  pageSize: number;
  pageNumber: number;
  userName?: string;
  flashcardId?: string;
  documentId?: string;
}): Promise<Pagination<Folder[]>> => {
  return fetchPaginatedData<Folder[]>(folderEndpoints.getUserFolders, {
    pageNumber,
    pageSize,
    userName,
    flashcardId,
    documentId,
  });
};

export const getFolderDetail = async ({
  folderId,
  pageSize,
  pageNumber,
}: {
  folderId: string;
  pageSize: number;
  pageNumber: number;
}): Promise<ResponseModel<UserFolder>> => {
  try {
    const { data } = await axiosServices.get(folderEndpoints.getFolderDetail, {
      params: { pageNumber, pageSize, id: folderId },
    });

    return data;
  } catch (error) {
    console.log("Error while fetching folder detail", error);
    throw error;
  }
};

// POST

export const createFolder = async ({
  folderName,
  flashcardIds,
  documentIds,
}: {
  folderName: string;
  flashcardIds?: string[];
  documentIds?: string[];
}): Promise<ResponseModel<string>> => {
  try {
    const { data } = await axiosServices.post(`${folderEndpoints.create}`, {
      folderName,
      flashcardIds,
      documentIds,
    });

    return data;
  } catch (error) {
    console.log("Error while creating folder", error);
    throw error;
  }
};

export const addToFolder = async ({
  folderId,
  flashcardIds,
  documentIds,
}: {
  folderId: string;
  flashcardIds?: string[];
  documentIds?: string[];
}) => {
  try {
    const { data } = await axiosServices.post(
      folderEndpoints.addToFolder(folderId),
      {
        flashcardIds,
        documentIds,
      },
    );

    return data;
  } catch (error) {
    console.log("Error while adding to folder", error);
    throw error;
  }
};

// PATCH
export const updateFolder = async ({
  folderId,
  folderName,
  flashcardIds,
  documentIds,
}: {
  folderId: string;
  folderName: string;
  flashcardIds?: string[];
  documentIds?: string[];
}): Promise<ResponseModel<string>> => {
  try {
    const { data } = await axiosServices.patch(
      folderEndpoints.update(folderId),
      {
        folderName,
        flashcardIds,
        documentIds,
      },
    );

    return data;
  } catch (error) {
    console.log("Error while updating folder", error);
    throw error;
  }
};

// DELETE

export const deleteFolder = async ({ folderId }: { folderId: string }) => {
  try {
    const { data } = await axiosServices.delete(
      folderEndpoints.delete(folderId),
    );

    return data;
  } catch (error) {
    console.log("Error while deleting folder", error);
    throw Error;
  }
};

export const removeFlashcardFromFolder = async ({
  flashcardId,
  folderId,
}: {
  flashcardId: string;
  folderId: string;
}): Promise<ResponseModel<string>> => {
  try {
    const { data } = await axiosServices.delete(
      folderEndpoints.removeFlashcard(flashcardId),
      { params: { folderId } },
    );

    return data;
  } catch (error) {
    console.log("Error while removing flashcard from folder", error);
    throw Error;
  }
};

export const removeDocumentFromFolder = async ({
  documentId,
  folderId,
}: {
  documentId: string;
  folderId: string;
}): Promise<ResponseModel<string>> => {
  try {
    const { data } = await axiosServices.delete(
      folderEndpoints.removeDocument(documentId),
      { params: { folderId } },
    );

    return data;
  } catch (error) {
    console.log("Error while removing document from folder", error);
    throw Error;
  }
};
