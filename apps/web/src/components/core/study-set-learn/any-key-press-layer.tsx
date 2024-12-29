import { useShortcut } from "@highschool/hooks";

export const AnyKeyPressLayer = ({ onSubmit }: { onSubmit: () => void }) => {
  useShortcut([], onSubmit, {
    ctrlKey: false,
    anyKey: true,
    allowInput: true,
  });
  return null;
};
