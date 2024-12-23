import { Pagination } from "@highschool/interfaces";
import fetchPaginatedData from "../common/api";
import { Avatar } from "./type";
import { endPointUser } from "../common/endpoint";

export const GetAvatars = async ({
    page,
    pageSize,
    sortBy,
    isAscending
}: {
    page: number,
    pageSize: number,
    sortBy?: string,
    isAscending?: boolean
}): Promise<Pagination<Avatar>> => {
    return await fetchPaginatedData<Avatar>(
        endPointUser.GET_AVATAR,
        {
            page,
            pageSize,
            sortBy,
            isAscending
        }
    );
}