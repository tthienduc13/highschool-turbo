/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { useShortcut } from "@highschool/hooks";
import { cn } from "@highschool/ui/lib/utils";

import { PhotoContainer } from "./photo-container";
import { PhotoPortal } from "./photo-portal";

interface InternalViewProps {
  visible: boolean;
  setVisible: (visible: boolean) => void;
  currentRef: HTMLElement | null;
  currentSrc?: string;
  borderRadius: number;
}

export const InternalView: React.FC<InternalViewProps> = ({
  visible,
  setVisible,
  currentRef,
  currentSrc,
  borderRadius,
}) => {
  return (
    <PhotoPortal pointerEvents={visible ? "auto" : "none"}>
      <div
        className={cn(
          "dark:bg-[#00000033]transition-opacity relative flex h-full w-full items-center justify-center bg-[#FFFFFF80] duration-200 ease-in-out",
          visible ? "opacity-100" : "opacity-0",
        )}
        style={{ backdropFilter: "8px" }}
        onClick={() => {
          setVisible(false);
        }}
      >
        {visible && <EscLayer onClose={() => setVisible(false)} />}
        <PhotoContainer
          borderRadius={borderRadius}
          origin={currentRef}
          src={currentSrc}
          visible={visible}
        />
      </div>
    </PhotoPortal>
  );
};

const EscLayer: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  useShortcut(["Escape"], onClose, { ctrlKey: false, allowInput: false });

  return null;
};
