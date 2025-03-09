import type React from "react";

import { useShortcut } from "@highschool/hooks";

export interface NavigateShortcutLayerProps {
  onNext: () => void;
  onPrevious: () => void;
}

export const NavigateShortcutLayer: React.FC<NavigateShortcutLayerProps> = ({
  onNext,
  onPrevious,
}) => {
  useShortcut(["ArrowRight"], onNext, {
    ctrlKey: false,
    allowInput: true,
  });

  useShortcut(["ArrowLeft"], onPrevious, {
    ctrlKey: false,
    allowInput: true,
  });

  return null;
};
