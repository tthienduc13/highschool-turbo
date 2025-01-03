import { Pagination } from "@highschool/interfaces";
import fetchPaginatedData from "../common/api";
import { Avatar } from "./type";
import { endPointUser } from "../common/endpoint";
import axiosServices from "@/lib/axios";

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

export const GetOwnerAvatars = async (): Promise<string[]> => {
    const response = await axiosServices.get(endPointUser.GET_OWNER_AVATAR);

    return response.data;
}