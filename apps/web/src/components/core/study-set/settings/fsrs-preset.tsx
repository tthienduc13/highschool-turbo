import { useSession } from "next-auth/react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@highschool/ui/components/ui/select";
import { LimitedStudySetAnswerMode } from "@highschool/interfaces";
import { useUpdateContainerMutation } from "@highschool/react-query/queries";
import { IconProgressHelp } from "@tabler/icons-react";

import { Hint } from "../../common/hint";

import { useContainerContext } from "@/stores/use-container-store";
import { useSet } from "@/hooks/use-set";

const options: { label: string; value: LimitedStudySetAnswerMode }[] = [
  {
    label: "Thuật ngữ",
    value: LimitedStudySetAnswerMode.Term,
  },
  {
    label: "Định nghĩa",
    value: LimitedStudySetAnswerMode.Definition,
  },
];

export const FSRSPreset = () => {
  const { status } = useSession();

  const { flashcard } = useSet();
  const cardsAnswerWith = useContainerContext((s) => s.cardsAnswerWith);
  const setCardsAnswerWith = useContainerContext((s) => s.setCardsAnswerWith);

  const apiCardsAnswerWith = useUpdateContainerMutation();

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:gap-8">
      <div className="flex w-full flex-col gap-0">
        <div className="flex flex-row gap-2">
          <p className="font-bold">FSRS Preset</p>
          <Hint label="Thông tin ">
            <IconProgressHelp
              className="cursor-pointer text-blue-700 transition-transform duration-200 hover:scale-110 dark:text-blue-300"
              size={20}
            />
          </Hint>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Cá nhân hoá thẻ ghi nhớ của bạn với FSRS Preset
        </p>
      </div>
      <div className="w-60">
        <Select
          value={options.find((o) => o.value === cardsAnswerWith)?.value}
          onValueChange={(value) => {
            setCardsAnswerWith(value as LimitedStudySetAnswerMode);

            if (status == "authenticated")
              apiCardsAnswerWith.mutate({
                flashcardId: flashcard.id,
                values: { cardsAnswerWith: value as LimitedStudySetAnswerMode },
              });
          }}
        >
          <SelectTrigger className="h-10 w-48 border-gray-200 bg-white text-base focus-visible:ring-0 dark:border-gray-800/50 dark:bg-gray-800">
            <SelectValue className="text-base" placeholder="Chọn mặt trả lời" />
          </SelectTrigger>
          <SelectContent className="border-gray-200 bg-gray-100 dark:border-gray-800/50 dark:bg-gray-800">
            {options.map((option) => (
              <SelectItem
                key={option.value}
                className="text-base"
                value={option.value}
              >
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};
