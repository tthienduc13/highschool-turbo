import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { TestQuestionType } from "@highschool/interfaces";
import { Card, CardContent } from "@highschool/ui/components/ui/card";
import { cn } from "@highschool/ui/lib/utils";

import { MatchCard } from "./match-card";
import { MultipleChoiceCard } from "./multiple-choice-card";
import { TrueFalseCard } from "./true-false-card";

export interface CardWrapperProps {
  type: TestQuestionType;
  i: number;
  correctness?: boolean;
}

export const CardWrapper = ({ i, type, correctness }: CardWrapperProps) => {
  const { theme } = useTheme();

  const card = (type: TestQuestionType, i: number) => {
    const result = correctness !== undefined;

    switch (type) {
      case TestQuestionType.TrueFalse:
        return <TrueFalseCard i={i} result={result} />;
      case TestQuestionType.MultipleChoice:
        return <MultipleChoiceCard i={i} result={result} />;
      case TestQuestionType.Match:
        return <MatchCard i={i} result={result} />;
      // case TestQuestionType.Write:
      //   return <WriteCard i={i} result={result} />
      default:
        return null;
    }
  };
  const correctColor = theme === "dark" ? "#68d391" : "#38a169";
  const incorrectColor = theme === "dark" ? "#fc8181" : "#e53e3e";

  const shadowColor = correctness ? correctColor : incorrectColor;

  return (
    <div id={`test-card-${i}`}>
      <Card
        className={cn(
          "relative rounded-2xl border-2 border-gray-50 bg-white dark:border-gray-700 dark:bg-gray-800/50",
        )}
        style={{
          zIndex: 1000,
        }}
      >
        {correctness !== undefined && (
          <motion.div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              zIndex: -1,
            }}
            transition={{
              enter: {
                duration: 2,
              },
            }}
          >
            <div
              className="absolute inset-0 -z-10 rounded-2xl opacity-10 transition-opacity duration-300"
              style={{
                boxShadow: `0 -15px 60px -5px ${shadowColor}`,
              }}
            />
          </motion.div>
        )}
        <CardContent className="p-0">
          <div className="px-6 py-5 md:px-8 md:py-7">{card(type, i)}</div>
        </CardContent>
      </Card>
    </div>
  );
};
