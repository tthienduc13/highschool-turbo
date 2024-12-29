export interface FlashcardsEmptyProps {
  h?: string;
}

export const FlashcardsEmpty = ({ h = "500px" }: FlashcardsEmptyProps) => {
  return (
    <div
      style={{ minHeight: h }}
      className={`flex w-full items-center justify-center overflow-hidden rounded-xl border p-8 shadow-xl`}
    >
      <div className="w-full">
        <div className="text-muted-foreground text-center text-lg">
          Không có thẻ nào trong bộ học phần này
        </div>
      </div>
    </div>
  );
};
