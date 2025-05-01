import { Card, CardContent } from "@highschool/ui/components/ui/card";
import { Label } from "@highschool/ui/components/ui/label";
import {
  RadioGroup,
  RadioGroupItem,
} from "@highschool/ui/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@highschool/ui/components/ui/select";
import { FlashcardDifficulty } from "@highschool/interfaces";

import {
  DIFFICULTY_TRANSLATIONS,
  useFlashcardStore,
} from "@/stores/use-ai-flashcard-store";

export const FlashcardSettings = () => {
  const { options, updateOption, getExampleText } = useFlashcardStore();

  const handleOptionChange = (key: keyof typeof options, value: string) => {
    updateOption(key, value);
  };

  return (
    <CardContent className="flex flex-col gap-6">
      <div className="flex flex-row items-center gap-6">
        <div className="w-full space-y-2">
          <div className="text-lg font-semibold text-gray-800 dark:text-gray-200">
            Số lượng thẻ
          </div>
          <Select
            value={options.maxFlashcards}
            onValueChange={(value) =>
              handleOptionChange("maxFlashcards", value)
            }
          >
            <SelectTrigger
              className="h-10 w-full rounded-2xl border-2 border-gray-200 text-lg font-semibold focus-visible:ring-0 dark:border-gray-800/50"
              id="max-flashcards"
            >
              <SelectValue className="text-base" placeholder="Select maximum" />
            </SelectTrigger>
            <SelectContent className="!text-base">
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="20">20</SelectItem>
              <SelectItem value="30">30</SelectItem>
              <SelectItem value="40">40</SelectItem>
              <SelectItem value="50">50</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="w-full space-y-2">
          <div className="text-lg font-semibold text-gray-800 dark:text-gray-200">
            Độ khó
          </div>
          <Select
            value={options.level}
            onValueChange={(value) => handleOptionChange("level", value)}
          >
            <SelectTrigger
              className="h-10 w-full rounded-2xl border-2 border-gray-200 text-lg font-semibold focus-visible:ring-0 dark:border-gray-800/50"
              id="difficulty-level"
            >
              <SelectValue className="text-base" placeholder="Chọn độ khó" />
            </SelectTrigger>
            <SelectContent className="!text-lg">
              <SelectItem value={FlashcardDifficulty.Easy}>
                {DIFFICULTY_TRANSLATIONS[FlashcardDifficulty.Easy]}
              </SelectItem>
              <SelectItem value={FlashcardDifficulty.Normal}>
                {DIFFICULTY_TRANSLATIONS[FlashcardDifficulty.Normal]}
              </SelectItem>
              <SelectItem value={FlashcardDifficulty.Hard}>
                {DIFFICULTY_TRANSLATIONS[FlashcardDifficulty.Hard]}
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Front Card Section */}
      <div className="flex w-full flex-col">
        <div className="grid w-full grid-cols-8 gap-6 ">
          <div className=" col-span-3 flex flex-col gap-4">
            <h2 className="text-lg font-semibold uppercase tracking-[2px] text-gray-800 dark:text-gray-200">
              Mặt trước
            </h2>
            <RadioGroup
              className="flex flex-col space-y-2"
              value={options.frontTextLength}
              onValueChange={(value) =>
                handleOptionChange("frontTextLength", value)
              }
            >
              <div className="flex items-center space-x-3">
                <RadioGroupItem
                  className="size-5"
                  id="front-short"
                  value="short"
                />
                <Label className="cursor-pointer text-lg" htmlFor="front-short">
                  Ngắn
                </Label>
              </div>
              <div className="flex items-center space-x-3">
                <RadioGroupItem
                  className="size-5"
                  id="front-medium"
                  value="medium"
                />
                <Label
                  className="cursor-pointer text-lg"
                  htmlFor="front-medium"
                >
                  Trung bình
                </Label>
              </div>
              <div className="flex items-center space-x-3">
                <RadioGroupItem
                  className="size-5"
                  id="front-long"
                  value="long"
                />
                <Label className="cursor-pointer text-lg" htmlFor="front-long">
                  Dài
                </Label>
              </div>
            </RadioGroup>
          </div>
          <Card className="col-span-5 w-full rounded-2xl border-2 border-gray-200 dark:border-gray-800/50 ">
            <CardContent className="no-scrollbar flex h-[250px] w-full flex-col items-center justify-between gap-2 rounded-2xl px-6 py-4">
              <p className="text-muted-foreground font-semibold uppercase tracking-widest">
                Mẫu mặt trước
              </p>
              <p className="flex h-full grow items-center justify-center text-center text-base font-semibold">
                {getExampleText("front", options.frontTextLength)}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Back Card Section */}
      <div className="mt-4 flex w-full flex-col">
        <div className="grid w-full grid-cols-8 gap-6 ">
          <div className=" col-span-3 flex flex-col gap-4">
            <h2 className="text-lg font-semibold uppercase tracking-[2px] text-gray-800 dark:text-gray-200">
              Mặt sau
            </h2>
            <RadioGroup
              className="flex flex-col space-y-2"
              value={options.backTextLength}
              onValueChange={(value) =>
                handleOptionChange("backTextLength", value)
              }
            >
              <div className="flex items-center space-x-3">
                <RadioGroupItem
                  className="size-5"
                  id="back-medium"
                  value="medium"
                />
                <Label className="cursor-pointer text-lg" htmlFor="back-medium">
                  Trung bình
                </Label>
              </div>
              <div className="flex items-center space-x-3">
                <RadioGroupItem
                  className="size-5"
                  id="back-long"
                  value="long"
                />
                <Label className="cursor-pointer text-lg" htmlFor="back-long">
                  Dài
                </Label>
              </div>
            </RadioGroup>
          </div>
          <Card className="col-span-5 w-full rounded-2xl border-2 border-gray-200 dark:border-gray-800/50 ">
            <CardContent className=" flex h-[250px] w-full flex-col items-center justify-between gap-2 rounded-2xl px-6 py-4">
              <p className="text-muted-foreground font-semibold uppercase tracking-widest">
                Mẫu mặt sau
              </p>
              <p className="no-scrollbar flex grow  items-center justify-center overflow-y-scroll px-2 text-center text-base font-semibold">
                {getExampleText("back", options.backTextLength)}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </CardContent>
  );
};
