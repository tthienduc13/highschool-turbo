import { HighschoolMessage } from "@/components/core/common/highschool-message";

export interface FlashcardsEmptyProps {
  h?: string;
}

export const FlashcardsEmpty = ({ h = "500px" }: FlashcardsEmptyProps) => {
  return (
    <div
      className={`flex w-full items-center justify-center overflow-hidden rounded-xl border-2 border-gray-200 p-8 shadow-xl dark:border-gray-700`}
      style={{ minHeight: h }}
    >
      <div className="flex w-full flex-col">
        <HighschoolMessage message="Không có thẻ ghi nhớ" />
      </div>
    </div>
  );
};
