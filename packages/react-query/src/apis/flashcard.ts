// GET

import { Flashcard, Pagination } from "@highschool/interfaces";
import fetchPaginatedData from "./common.ts";
import { endpointFlashcard, endpointUser } from "@highschool/endpoints";
import axiosServices from "../lib/axios.ts";

export const getUserFlashcard = async ({
    username,
    pageSize,
    pageNumber,
}: {
    username: string;
    pageSize: number;
    pageNumber: number;
}): Promise<Pagination<Flashcard[]>> => {
    return fetchPaginatedData<Flashcard[]>(
        endpointUser.USER_FLASHCARD(username),
        {
            pageNumber,
            pageSize,
        }
    );
};

export const getTopFlashcard = async (): Promise<Flashcard[]> => {
    try {
        const { data } = await axiosServices.get(
            endpointFlashcard.GET_TOP_FLASHCARD
        );
        return data;
    } catch (error) {
        console.error("Error while getting top flashcard", error);
        throw error;
    }
};

export const getFlashcardBySlug = async ({
    slug,
}: {
    slug: string;
}): Promise<Flashcard> => {
    try {
        const { data } = await axiosServices.get(
            endpointFlashcard.GET_BY_SLUG(slug)
        );
        return data;
    } catch (error) {
        console.error("Error while getting flashcard by slug", error);
        throw error;
    }
};
