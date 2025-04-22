import { useState } from "react";

import { CorrectState } from "./write/correct-state";
import { IncorrectState } from "./write/incorrect-state";
import { InputState } from "./write/input-state";
import { UnknownPartialState } from "./write/unkown-partial-state";

import { Question, useCramContext } from "@/stores/use-study-set-cram-store";

export interface WriteCardProps {
  active: Question;
}

export const WriteCard: React.FC<WriteCardProps> = ({ active }) => {
  const status = useCramContext((s) => s.status);

  const [guess, setGuess] = useState<string | undefined>();

  if (status === "correct") return <CorrectState guess={guess || ""} />;
  if (status === "incorrect")
    return <IncorrectState active={active} guess={guess} />;
  if (status === "unknownPartial")
    return <UnknownPartialState active={active} guess={guess} />;

  return <InputState active={active} onSubmit={setGuess} />;
};
