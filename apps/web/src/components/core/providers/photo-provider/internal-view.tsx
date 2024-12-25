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
                style={{ backdropFilter: "8px" }}
                className={cn(
                    "w-full h-full bg-[rgba(247, 250, 252, 75%)] relative dark:bg-[rgba(23, 25, 35, 40%)] transition-opacity duration-200 ease-in-out",
                    visible ? "opacity-100" : "opacity-0"
                )}
                onClick={() => {
                    setVisible(false);
                }}
            >
                {visible && <EscLayer onClose={() => setVisible(false)} />}
                <PhotoContainer
                    visible={visible}
                    src={currentSrc}
                    origin={currentRef}
                    borderRadius={borderRadius}
                />
            </div>
        </PhotoPortal>
    );
};

const EscLayer: React.FC<{ onClose: () => void }> = ({ onClose }) => {
    useShortcut(["Escape"], onClose, { ctrlKey: false, allowInput: false });

    return null;
};
