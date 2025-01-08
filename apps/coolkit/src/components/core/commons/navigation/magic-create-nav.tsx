import { IconCrystalBall } from "@tabler/icons-react";

import { ButtonKet } from "@/components/ui/button";

export const MagicCreateNav = () => {
  return (
    <div className="flex items-center gap-4">
      <ButtonKet className="gap-3 rounded-xl bg-[#4ECDC4] px-4 py-8 hover:bg-[#4ECDC477]">
        <IconCrystalBall className="scale-125" />
        <span className="text-[1rem] font-medium">Quick Host</span>
      </ButtonKet>
    </div>
  );
};
