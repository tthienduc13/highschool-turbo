import { RecentView } from "@highschool/interfaces";
import axiosServices from "../lib/axios.ts";
import { endpointUserPersonalized } from "@highschool/endpoints";

// GET
export const getRecentView = async (): Promise<RecentView> => {
    try {
        const { data } = await axiosServices.get(
            endpointUserPersonalized.RECENT_VIEW
        );
        return data;
    } catch (error) {
        console.log("Error while getting recent view", error);
        throw error;
    }
};
