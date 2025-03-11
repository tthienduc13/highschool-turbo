import type React from "react";

import { useShortcut } from "@highschool/hooks";

export interface ChoiceShortcutLayerProps {
  choose: (index: number) => void;
}

export const ChoiceShortcutLayer: React.FC<ChoiceShortcutLayerProps> = ({
  choose,
}) => {
  useShortcut(["1"], () => choose(0), {
    ctrlKey: false,
    allowInput: true,
  });
  useShortcut(["2"], () => choose(1), {
    ctrlKey: false,
    allowInput: true,
  });
  useShortcut(["3"], () => choose(2), {
    ctrlKey: false,
    allowInput: true,
  });
  useShortcut(["4"], () => choose(3), {
    ctrlKey: false,
    allowInput: true,
  });
  useShortcut(["5"], () => choose(4), {
    ctrlKey: false,
    allowInput: true,
  });
  useShortcut(["6"], () => choose(5), {
    ctrlKey: false,
    allowInput: true,
  });
  useShortcut(["7"], () => choose(6), {
    ctrlKey: false,
    allowInput: true,
  });

  return null;
};
