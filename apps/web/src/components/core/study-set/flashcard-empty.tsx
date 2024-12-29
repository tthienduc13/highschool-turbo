import { HighschoolMessage } from "@/components/core/common/highschool-message";

export interface FlashcardsEmptyProps {
  h?: string;
}

export const FlashcardsEmpty = ({ h = "500px" }: FlashcardsEmptyProps) => {
  return (
    <div
      style={{ minHeight: h }}
      className={`flex w-full items-center justify-center overflow-hidden rounded-xl border p-8 shadow-xl`}
    >
      <div className="flex w-full flex-col">
        <HighschoolMessage message="Không có thẻ ghi nhớ" />
      </div>
    </div>
  );
};
