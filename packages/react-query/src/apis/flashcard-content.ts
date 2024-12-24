import { FlashcardContent } from "@highschool/interfaces";
import axiosServices from "../lib/axios.ts";
import { endpointFlashcardContent } from "@highschool/endpoints";

// GET
export const getFlashcardContentsBySlug = async ({
    slug,
    pageNumber,
    pageSize,
}: {
    slug: string;
    pageNumber: number;
    pageSize: number;
}): Promise<FlashcardContent[]> => {
    try {
        const response = await axiosServices.get(
            `${endpointFlashcardContent.GET_LIST_BY_SLUG(slug)}`,
            {
                params: {
                    pageNumber,
                    pageSize,
                },
            }
        );
        return response.data;
    } catch (error) {
        console.log("Error in getFlashcardContentsBySlug", error);
        throw error;
    }
};
