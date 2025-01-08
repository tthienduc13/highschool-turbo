import { GameButton } from "@highschool/ui/components/ui/game-button";

import { IconPlus } from "@tabler/icons-react";

import { Logo } from "../logo";

export const AdminSidebar = () => {
  return (
    <div className="flex w-full flex-col items-center gap-4 px-2 py-4">
      <Logo />
      <GameButton className="flex items-center gap-2" withOverlay>
        <IconPlus className="!size-[20px]" />
        Tạo mới
      </GameButton>
    </div>
  );
};
