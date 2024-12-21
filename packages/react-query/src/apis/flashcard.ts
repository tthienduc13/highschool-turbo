// GET

import { Flashcard, Pagination } from "@highschool/interfaces";
import fetchPaginatedData from "./common.ts";
import { endpointUser } from "@highschool/endpoints";

export const getUserFlashcard = async ({
    username,
    pageSize,
    pageNumber,
}: {
    username: string;
    pageSize: number;
    pageNumber: number;
}): Promise<Pagination<Flashcard>> => {
    return fetchPaginatedData<Flashcard>(
        endpointUser.USER_FLASHCARD(username),
        {
            pageNumber,
            pageSize,
        }
    );
};
