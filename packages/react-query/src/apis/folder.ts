import { endpointFolder } from "@highschool/endpoints";
import {
  Folder,
  Pagination,
  ResponseModel,
  UserFolder,
} from "@highschool/interfaces";

import axiosServices from "../lib/axios.ts";
import fetchPaginatedData from "./common.ts";

// GET

export const getUserFolderList = async ({
  pageSize,
  pageNumber,
  isMyFolder = true,
  flashcardId,
  documentId,
}: {
  pageSize: number;
  pageNumber: number;
  isMyFolder?: boolean;
  flashcardId?: string;
  documentId?: string;
}): Promise<Pagination<Folder[]>> => {
  return fetchPaginatedData<Folder[]>(endpointFolder.GET_USER_FOLDER, {
    pageNumber,
    pageSize,
    isMyFolder,
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
    const { data } = await axiosServices.get(endpointFolder.GET_FOLDER_DETAIL, {
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
    const { data } = await axiosServices.post(
      `${endpointFolder.CREATE_FOLDER}`,
      {
        folderName,
        flashcardIds,
        documentIds,
      },
    );
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
      endpointFolder.ADD_TO_FOLDER(folderId),
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
      endpointFolder.UPDATE_FOLDER(folderId),
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
      endpointFolder.DELETE_FOLDER(folderId),
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
      endpointFolder.REMOVE_FLASHCARD(flashcardId),
      { params: { folderId } },
    );
    return data;
  } catch (error) {
    console.log("Error while removing flashcard from folder", error);
    throw Error;
  }
};
