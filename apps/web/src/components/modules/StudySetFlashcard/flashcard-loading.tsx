import { LoadingFlashcard } from "@/components/core/study-set/loading-flashcard";
import { TitleBar } from "./title-bar";

interface FlashcardsLoadingProps {
    titlePlaceholder?: string;
}

export const FlashcardsLoading: React.FC<FlashcardsLoadingProps> = ({
    titlePlaceholder,
}) => {
    return (
        <div className="w-full h-[calc(100vh-80px)] min-h-[720px] p-0 overflow-hidden">
            <div className="max-w-7xl mx-auto h-[calc(100vh-180px)] w-full min-h-[620px]">
                <div className="flex flex-col gap-6">
                    <TitleBar.Skeleton />
                    <LoadingFlashcard h="max(calc(100vh - 240px), 560px)" />
                </div>
            </div>
        </div>
    );
};
