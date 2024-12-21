import { useQuery } from "@tanstack/react-query";
import { getUserFlashcard } from "../apis/flashcard.ts";

export const useUserFlashcardQuery = ({
    pageSize,
    pageNumber,
    username,
}: {
    pageSize: number;
    pageNumber: number;
    username: string;
}) => {
    return useQuery({
        queryKey: ["user-flashcard", username, pageNumber, pageSize],
        queryFn: () =>
            getUserFlashcard({
                pageNumber: pageNumber,
                pageSize: pageSize,
                username: username,
            }),
        enabled: !!username,
    });
};
