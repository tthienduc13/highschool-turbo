import { endpointFolder } from "@highschool/endpoints";
import axiosServices from "../lib/axios.ts";
import { Folder, Pagination, ResponseModel } from "@highschool/interfaces";
import fetchPaginatedData from "./common.ts";

// GET

export const getUserFolderList = async ({
    pageSize,
    pageNumber,
}: {
    pageSize: number;
    pageNumber: number;
}): Promise<Pagination<Folder>> => {
    return fetchPaginatedData<Folder>(endpointFolder.GET_USER_FOLDER, {
        pageNumber,
        pageSize,
    });
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
            }
        );
        return data;
    } catch (error) {
        console.log("Error while creating folder", error);
        throw error;
    }
};
