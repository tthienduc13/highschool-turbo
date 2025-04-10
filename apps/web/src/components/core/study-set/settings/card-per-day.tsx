import { useSession } from "next-auth/react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@highschool/ui/components/ui/select";
import { useUpdateContainerMutation } from "@highschool/react-query/queries";

import { useContainerContext } from "@/stores/use-container-store";
import { useSet } from "@/hooks/use-set";

const options: { label: string; value: number }[] = [
  {
    label: "10",
    value: 10,
  },
  {
    label: "20",
    value: 20,
  },
  {
    label: "30",
    value: 30,
  },
  {
    label: "40",
    value: 40,
  },
  {
    label: "50",
    value: 50,
  },
];

export const CardPerDaySection = () => {
  const { status } = useSession();

  const { flashcard } = useSet();
  const cardPerDay = useContainerContext((s) => s.cardPerDay);
  const setCardPerDay = useContainerContext((s) => s.setCardPerDay);

  const apiCardsAnswerWith = useUpdateContainerMutation();

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:gap-8">
      <div className="flex w-full flex-col gap-0">
        <p className="font-bold">Số thẻ </p>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Đặt ra mục tiêu học bao nhiêu thẻ một ngày
        </p>
      </div>
      <div className="w-20">
        <Select
          value={cardPerDay?.toString()}
          onValueChange={(value) => {
            setCardPerDay(Number(value));

            if (status == "authenticated")
              apiCardsAnswerWith.mutate({
                flashcardId: flashcard.id,
                values: { cardsPerDay: Number(value) },
              });
          }}
        >
          <SelectTrigger className="h-10 w-20 border-gray-200 bg-white text-base focus-visible:ring-0 dark:border-gray-800/50 dark:bg-gray-800">
            <SelectValue className="text-base" placeholder="" />
          </SelectTrigger>
          <SelectContent className="border-gray-200 bg-gray-100 dark:border-gray-800/50 dark:bg-gray-800">
            {options.map((option) => (
              <SelectItem
                key={option.value}
                className="text-base"
                value={option.value.toString()}
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
