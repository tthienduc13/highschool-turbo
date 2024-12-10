import { cn } from "@highschool/ui/lib/utils";
import { motion } from "framer-motion";
import { useState } from "react";

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
    <div className="flex flex-row gap-2 h-12 items-center w-full">
      {Array.from({ length: steps }).map((_, i) => (
        <Segment
          key={i}
          step={i}
          currentStep={currentStep}
          clickable={clickable && (!disableFrom || i < disableFrom)}
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
          height={i == currentHover ? "12px" : "6px"}
          onHover={(hover) => {
            if (!clickable || (disableFrom && i >= disableFrom)) return;
            if (hover) setCurrentHover(i);
            else setCurrentHover(null);
          }}
          onClick={() => {
            if (!clickable || (disableFrom && i >= disableFrom)) return;
            onClick?.(i);
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
    <div
      style={{ width: width }}
      onPointerEnter={() => onHover(true)}
      onPointerLeave={() => onHover(false)}
      onClick={onClick}
      className={
        (cn(
          "flex flex-row group items-center gap-2 transition-all duration-200 ease-cubic-ease",
        ),
        clickable ? "cursor-pointer" : "cursor-default")
      }
    >
      <div
        style={{ height: height }}
        className={cn(
          "bg-gray-200 dark:bg-gray-800/50 w-full rounded-full relative overflow-hidden transition-all duration-200 ease-cubic-ease",
          clickable && "group-hover:bg-gray-200 dark:group-hover:bg-gray-700",
        )}
      >
        <motion.div
          initial={step >= currentStep ? { width: 0 } : { width: "100%" }}
          animate={step > currentStep ? { width: 0 } : { width: "100%" }}
          transition={{ easings: ["easeOut"], duration: 0.1 }}
          style={{
            position: "absolute",
            transition: "all 0.2s ease",
            top: 0,
            left: 0,
            height,
            backgroundColor: "#4b83ff",
            borderRadius: "3px",
          }}
        />
      </div>
    </div>
  );
};
