import { Button } from "@highschool/ui/components/ui/button";
import {
  IconArrowsShuffle,
  IconPlayerPlay,
  IconSettings,
} from "@tabler/icons-react";

import { Hint } from "@/components/core/common/hint";
import { useContainerContext } from "@/stores/use-container-store";

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
  const toggleAutoplay = useContainerContext((s) => s.toggleAutoplayFlashcards);

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-row items-center gap-4">
        <Hint label="Trộn thẻ" side="left" sideOffset={10}>
          <Button
            className="rounded-full"
            size={"icon"}
            variant={shuffle ? "default" : "ghost"}
            onClick={toggleShuffle}
          >
            <IconArrowsShuffle className="!size-6" />
          </Button>
        </Hint>
        <Hint label="Tự động chạy" side="right" sideOffset={10}>
          <Button
            className="rounded-full"
            size={"icon"}
            variant={autoplay ? "default" : "ghost"}
            onClick={toggleAutoplay}
          >
            <IconPlayerPlay className="!size-6" />
          </Button>
        </Hint>
      </div>
      <Hint label="Cài đặt" side="left" sideOffset={10}>
        <Button
          className="rounded-full"
          size={"icon"}
          variant={"ghost"}
          onClick={onSettingsClick}
        >
          <IconSettings className="!size-6" />
        </Button>
      </Hint>
    </div>
  );
};
