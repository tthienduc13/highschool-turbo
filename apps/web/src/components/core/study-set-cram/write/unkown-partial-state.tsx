import { MultipleAnswerMode, StudySetAnswerMode } from "@highschool/interfaces";
import { Separator } from "@highschool/ui/components/ui/separator";
import { useShortcut } from "@highschool/hooks";
import { Button } from "@highschool/ui/components/ui/button";

import { GenericLabel } from "../../common/generic-label";

import { useContainerContext } from "@/stores/use-container-store";
import { Question, useCramContext } from "@/stores/use-study-set-cram-store";
import { word } from "@/utils/terms";

export interface UnknownPartialStateProps {
  active: Question;
  guess?: string;
}

export const UnknownPartialState: React.FC<UnknownPartialStateProps> = ({
  active,
  guess,
}) => {
  const setMultipleAnswerMode = useContainerContext(
    (s) => s.setMultipleAnswerMode,
  );
  const correctFromUnknown = useCramContext((s) => s.correctFromUnknown);
  const incorrectFromUnknown = useCramContext((s) => s.incorrectFromUnknown);

  const onRequireOne = () => {
    setMultipleAnswerMode(MultipleAnswerMode.One);
    correctFromUnknown(active.term.id);
  };

  const onRequireAll = () => {
    setMultipleAnswerMode(MultipleAnswerMode.All);
    incorrectFromUnknown(active.term.id);
  };

  return (
    <div className="flex flex-col gap-6">
      <PartialShotcutLayer
        onRequireAll={onRequireAll}
        onRequireOne={onRequireOne}
      />
      <div className="flex flex-col gap-2">
        <GenericLabel>Câu trả lời của bạn</GenericLabel>
        <div className="w-full rounded-xl  border-2 border-gray-200 px-5 py-4 text-gray-900 dark:border-gray-600 dark:text-white">
          <p className="whitespace-normal text-start font-medium text-gray-600 dark:text-gray-400">
            {guess}
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <GenericLabel>
          {` ${
            active.answerMode == StudySetAnswerMode.FlashcardContentDefinition
              ? "Định nghĩa"
              : "Thuật ngữ"
          } ban đầu
          `}
        </GenericLabel>
        <p className="whitespace-normal text-start font-medium text-gray-600 dark:text-gray-400">
          {word(active.answerMode, active.term, "answer")}
        </p>
      </div>
      <Separator />
      <div className="flex flex-col gap-2">
        <GenericLabel>
          Câu trả lời này có vẻ có 2 đáp án. Chúng ta đánh giá như nào nhỉ?
        </GenericLabel>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <ChoiceOption i={0} text="1 đáp án đúng" onSelect={onRequireOne} />
          </div>
          <div>
            <ChoiceOption
              i={1}
              text="Tất cả đáp án đúng"
              onSelect={onRequireAll}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

interface ChoiceOptionProps {
  i: number;
  text: string;
  onSelect: () => void;
  disabled?: boolean;
}

const ChoiceOption: React.FC<ChoiceOptionProps> = ({
  i,
  text,
  onSelect,
  disabled = false,
}) => {
  return (
    <Button
      className="size-full rounded-xl border-2 border-gray-200 px-8 py-5 dark:border-gray-600"
      disabled={disabled}
      variant="outline"
      onClick={onSelect}
    >
      <div className="flex w-full items-center gap-4">
        <div className="flex size-6 min-w-6 flex-row items-center justify-center rounded-full border-2 border-gray-300 dark:border-gray-500">
          <p className="font-heading text-[11px] leading-none text-gray-800 dark:text-gray-200">
            {i + 1}
          </p>
        </div>
        <p className="whitespace-normal text-start text-lg font-medium text-black dark:text-white">
          {text}
        </p>
      </div>
    </Button>
  );
};

interface PartialShotcutLayerProps {
  onRequireOne: () => void;
  onRequireAll: () => void;
}

const PartialShotcutLayer: React.FC<PartialShotcutLayerProps> = ({
  onRequireOne,
  onRequireAll,
}) => {
  useShortcut(["1"], onRequireOne, {
    ctrlKey: false,
    allowInput: true,
  });
  useShortcut(["2"], () => onRequireAll, {
    ctrlKey: false,
    allowInput: true,
  });

  return <></>;
};
