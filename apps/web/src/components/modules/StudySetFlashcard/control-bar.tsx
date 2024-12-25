import { Hint } from "@/components/core/common/hint";
import { useContainerContext } from "@/stores/use-container-store";
import { useSetPropertiesStore } from "@/stores/use-set-properties";
import { Button } from "@highschool/ui/components/ui/button";
import {
    IconArrowsShuffle,
    IconPlayerPlay,
    IconSettings,
} from "@tabler/icons-react";
import { useSession } from "next-auth/react";

interface ControlsBarProps {
    onSettingsClick: () => void;
}

export const ControlsBar = ({ onSettingsClick }: ControlsBarProps) => {
    // const authed = useSession().status == "authenticated";
    // const setIsDirty = useSetPropertiesStore((s) => s.setIsDirty);
    // const enableCardsSorting = useContainerContext((s) => s.enableCardsSorting);
    const shuffle = useContainerContext((s) => s.shuffleFlashcards);
    const toggleShuffle = useContainerContext((s) => s.toggleShuffleFlashcards);
    const autoplay = useContainerContext((s) => s.autoplayFlashcards);
    const toggleAutoplay = useContainerContext(
        (s) => s.toggleAutoplayFlashcards
    );
    return (
        <div className="flex items-center justify-between">
            <div className="flex flex-row items-center gap-4">
                <Hint side="left" sideOffset={10} label="Trộn thẻ">
                    <Button
                        onClick={toggleShuffle}
                        className="rounded-full"
                        variant={shuffle ? "default" : "ghost"}
                        size={"icon"}
                    >
                        <IconArrowsShuffle className="!size-6" />
                    </Button>
                </Hint>
                <Hint side="right" sideOffset={10} label="Tự động chạy">
                    <Button
                        onClick={toggleAutoplay}
                        className="rounded-full"
                        variant={autoplay ? "default" : "ghost"}
                        size={"icon"}
                    >
                        <IconPlayerPlay className="!size-6" />
                    </Button>
                </Hint>
            </div>
            <Hint side="left" sideOffset={10} label="Cài đặt">
                <Button
                    onClick={onSettingsClick}
                    variant={"ghost"}
                    className="rounded-full"
                    size={"icon"}
                >
                    <IconSettings className="!size-6" />
                </Button>
            </Hint>
        </div>
    );
};
