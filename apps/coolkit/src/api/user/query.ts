
import { useQuery } from "@tanstack/react-query"
import { GetAvatars } from "./api"

export const useGetAvatarQuery = ({
    page,
    pageSize,
    sortBy,
    isAscending
}: {
    page: number,
    pageSize: number,
    sortBy?: string,
    isAscending?: boolean
}) => {
    return useQuery({
        queryKey: ["getAvatar", page, pageSize, sortBy, isAscending],
        queryFn: async () => GetAvatars({ page, pageSize, sortBy, isAscending })
    })
}