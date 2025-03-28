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

import { useFlashcardStore } from "@/stores/use-ai-flashcard-store";

enum FlashcardDifficulty {
  Easy = "easy",
  Medium = "medium",
  Hard = "hard",
}

// Map for Vietnamese translations of difficulty levels
const DIFFICULTY_TRANSLATIONS = {
  [FlashcardDifficulty.Easy]: "Dễ",
  [FlashcardDifficulty.Medium]: "Trung bình",
  [FlashcardDifficulty.Hard]: "Khó",
};

// Example text content based on length
const EXAMPLE_TEXT = {
  front: {
    short: "Từ vựng cơ bản",
    medium: "Cấu trúc câu đơn giản và từ vựng cơ bản",
    long: "Cấu trúc câu phức tạp, từ vựng và ngữ pháp nâng cao cho các chủ đề học thuật",
  },
  back: {
    short:
      "Định nghĩa và ví dụ ngắn gọn. Giải thích thêm về cách sử dụng từ vựng này trong câu.",
    medium:
      "Định nghĩa chi tiết, ví dụ và một số cách sử dụng phổ biến. Bao gồm phân tích ngữ pháp và các từ đồng nghĩa, trái nghĩa. Thêm các ví dụ câu để minh họa cách sử dụng từ một cách chính xác.",
    long: "Định nghĩa đầy đủ, nhiều ví dụ, ngữ cảnh sử dụng, và thông tin ngữ pháp chi tiết. Phân tích cách từ này được sử dụng trong các tình huống khác nhau, các biến thể của từ và cách phát âm chuẩn. Bao gồm các thành ngữ, cụm từ phổ biến liên quan, và các lỗi thường gặp khi sử dụng từ này. Thêm nhiều ví dụ câu trong các ngữ cảnh khác nhau.",
  },
};

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
              <SelectItem disabled value="30">
                30(Cho người đăng kí)
              </SelectItem>
              <SelectItem disabled value="50">
                50 (Cho người đăng kí)
              </SelectItem>
              <SelectItem disabled value="100">
                100 (Cho người đăng kí)
              </SelectItem>
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
              <SelectItem value={FlashcardDifficulty.Medium}>
                {DIFFICULTY_TRANSLATIONS[FlashcardDifficulty.Medium]}
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
            <CardContent className="flex h-[250px] w-full flex-col items-center justify-between gap-2 rounded-2xl px-6 py-4">
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
            <CardContent className="flex h-[250px] w-full flex-col items-center justify-between gap-2 rounded-2xl px-6 py-4">
              <p className="text-muted-foreground font-semibold uppercase tracking-widest">
                Mẫu mặt sau
              </p>
              <p className="flex grow  items-center justify-center overflow-y-scroll px-2 text-center text-base font-semibold">
                {getExampleText("back", options.backTextLength)}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </CardContent>
  );
};
