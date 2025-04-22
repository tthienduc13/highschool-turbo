import { ScriptFormatter } from "@highschool/lib/script-formatter";
import { cn } from "@highschool/ui/lib/utils";
import { useTheme } from "next-themes";
import React from "react";

import { AnimatedCheckCircle } from "../../common/animated-icons/animated-check-circle";
import { AnimatedXCircle } from "../../common/animated-icons/animated-x-icon";

export interface AnswerCardProps {
  text: string | React.ReactNode;
  correct: boolean;
  skipped?: boolean;
  showIcon?: boolean;
}

export const AnswerCard: React.FC<AnswerCardProps> = ({
  text,
  correct,
  skipped = false,
  showIcon = true,
}) => {
  const { theme } = useTheme();

  const greenText = theme === "dark" ? "text-green-200" : "text-green-600";
  const redText = theme === "dark" ? "text-red-200" : "text-red-600";

  const correctColor =
    theme === "dark" ? "rgba(154, 230, 180, 0.2)" : "rgba(47, 133, 90, 0.2)";

  const incorrectColor =
    theme === "dark" ? "rgba(252, 129, 129, 0.2)" : "rgba(197, 48, 48, 0.2)";

  const skipBorderColor = theme === "dark" ? "gray-200" : "gray.600";
  const grayColor = theme === "dark" ? "gray-200" : "gray.600";

  return (
    <div
      className={cn(
        "border-2 px-8 py-4 rounded-full w-full",
        `border-[${correct ? correctColor : !skipped ? incorrectColor : skipBorderColor}]`,
      )}
      color={correct ? greenText : !skipped ? redText : grayColor}
    >
      <div className="flex flex-row items-center gap-4">
        {showIcon ? (
          <div>
            {correct ? (
              <div
                className="size-6 scale-125"
                style={{ color: "green", transform: "scale(1.25)" }}
              >
                <AnimatedCheckCircle />
              </div>
            ) : (
              <div
                className="size-6 scale-125"
                style={{ color: "red", transform: "scale(1.25)" }}
              >
                <AnimatedXCircle />
              </div>
            )}
          </div>
        ) : (
          <div style={{ width: 24, height: 24 }} />
        )}
        <p
          className={cn(
            "font-medium text-start whitespace-normal",
            `text-[${correct ? greenText : !skipped ? redText : grayColor}]`,
          )}
        >
          {typeof text === "string" ? (
            <ScriptFormatter>{text}</ScriptFormatter>
          ) : (
            text
          )}
        </p>
      </div>
    </div>
  );
};
