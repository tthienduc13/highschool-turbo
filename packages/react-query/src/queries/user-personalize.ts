import { useQuery } from "@tanstack/react-query";
import { getRecentView } from "../apis/user-personalize.ts";

export const useRecentViewQuery = () => {
    return useQuery({
        queryKey: ["recent-view"],
        queryFn: getRecentView,
        refetchOnMount: true,
        refetchOnWindowFocus: true,
    });
};
