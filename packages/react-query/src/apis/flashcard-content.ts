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

// PATCH
export const patchFlashcardContent = async ({
    flashcardId,
    values,
}: {
    flashcardId: string;
    values: Partial<
        Pick<
            FlashcardContent,
            | "flashcardContentTerm"
            | "flashcardContentDefinition"
            | "image"
            | "id"
            | "flashcardContentTermRichText"
            | "flashcardContentDefinitionRichText"
            | "rank"
        >
    >;
}) => {
    try {
        const cleanValues = Object.fromEntries(
            Object.entries(values).filter(([_, value]) => value !== undefined)
        );
        const { data } = await axiosServices.patch(
            endpointFlashcardContent.EDIT_CONTENT(flashcardId),
            cleanValues
        );
        return data;
    } catch (error) {
        console.error("Error while patching flashcard content", error);
        throw error;
    }
};
