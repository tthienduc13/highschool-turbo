import { ScriptFormatter } from "@highschool/lib/script-formatter";
import { IconCircleCheckFilled, IconCircleX } from "@tabler/icons-react";

import { Clickable } from "./clickable";

export const EvaluatedFalse: React.FC<{ children: string }> = ({
  children,
}) => {
  return (
    <Clickable disabled evaluation={false}>
      <div className="flex flex-row items-center gap-2 text-start">
        <IconCircleX size={18} />
        <p className="pointer-events-auto cursor-text select-text whitespace-pre-wrap font-medium">
          <ScriptFormatter>{children}</ScriptFormatter>
        </p>
      </div>
    </Clickable>
  );
};

export interface EvaluatedTrueProps {
  withColor?: boolean;
  children: string;
}

export const EvaluatedTrue: React.FC<EvaluatedTrueProps> = ({
  withColor = true,
  children,
}) => {
  const icon = <IconCircleCheckFilled size={18} />;

  return (
    <Clickable disabled hasIcon>
      <div className="flex flex-row items-center gap-2 text-start">
        {withColor ? (
          <div className="text-green-500 dark:text-green-200">{icon}</div>
        ) : (
          <div>{icon}</div>
        )}

        <p className="pointer-events-auto cursor-text select-text whitespace-pre-wrap font-medium">
          <ScriptFormatter>{children}</ScriptFormatter>
        </p>
      </div>
    </Clickable>
  );
};
