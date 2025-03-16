import { motion } from "framer-motion";
import { useState } from "react";
import { cn } from "@highschool/ui/lib/utils";

interface SegmentedProgressProps {
  steps: number;
  currentStep: number;
  clickable?: boolean;
  disableFrom?: number;
  onClick?: (step: number) => void;
}

export const SegmentedProgress = ({
  steps,
  currentStep,
  clickable = false,
  disableFrom,
  onClick,
}: SegmentedProgressProps) => {
  const [currentHover, setCurrentHover] = useState<number | null>(null);

  return (
    <div className="flex h-[12px] w-full flex-row items-center gap-2">
      {Array.from({ length: steps }).map((_, i) => (
        <Segment
          key={i}
          clickable={clickable && (!disableFrom || i < disableFrom)}
          currentStep={currentStep}
          height={i == currentHover ? "12px" : "6px"}
          step={i}
          width={
            i == currentHover
              ? "120%"
              : currentHover !== 0 &&
                  currentHover !== steps - 1 &&
                  (i + 1 == currentHover || i - 1 == currentHover)
                ? "90%"
                : (currentHover === 0 && i === 1) ||
                    (currentHover === steps - 1 && i === steps - 2)
                  ? "80%"
                  : "100%"
          }
          onClick={() => {
            if (!clickable || (disableFrom && i >= disableFrom)) return;
            onClick?.(i);
          }}
          onHover={(hover) => {
            if (!clickable || (disableFrom && i >= disableFrom)) return;
            if (hover) setCurrentHover(i);
            else setCurrentHover(null);
          }}
        />
      ))}
    </div>
  );
};

interface SegmentProps {
  step: number;
  currentStep: number;
  clickable: boolean;
  width: string;
  height: string;
  onHover: (hover: boolean) => void;
  onClick?: () => void;
}

const Segment = ({
  step,
  width,
  height,
  currentStep,
  clickable,
  onHover,
  onClick,
}: SegmentProps) => {
  return (
    <button
      className={
        (cn(
          "ease-cubic-ease group flex flex-row items-center gap-2 transition-all duration-200",
        ),
        clickable ? "cursor-pointer" : "cursor-default")
      }
      style={{ width: width }}
      onClick={onClick}
      onPointerEnter={() => onHover(true)}
      onPointerLeave={() => onHover(false)}
    >
      <div
        className={cn(
          "ease-cubic-ease relative w-full overflow-hidden rounded-full bg-gray-200 transition-all duration-200 dark:bg-gray-800/50",
          clickable && "group-hover:bg-gray-200 dark:group-hover:bg-gray-700",
        )}
        style={{ height: height }}
      >
        <motion.div
          animate={step > currentStep ? { width: 0 } : { width: "100%" }}
          initial={step >= currentStep ? { width: 0 } : { width: "100%" }}
          style={{
            position: "absolute",
            transition: "all 0.2s ease",
            top: 0,
            left: 0,
            height,
            backgroundColor: "#4b83ff",
            borderRadius: "3px",
          }}
          transition={{ easings: ["easeOut"], duration: 0.1 }}
        />
      </div>
    </button>
  );
};
