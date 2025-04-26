import { Modal } from "@highschool/components";
import { Rating as ReactRating } from "@smastrom/react-rating";
import { useState } from "react";
import "@smastrom/react-rating/style.css";
import { useRateFlashcardMutation } from "@highschool/react-query/queries";
import { toast } from "sonner";

interface RatingModalProps {
  flashcardId: string;
  isOpen: boolean;
  onClose: () => void;
}

export const RatingModal = ({
  isOpen,
  onClose,
  flashcardId,
}: RatingModalProps) => {
  const [ratingCount, setRatingCount] = useState<number>(0);
  const [isReadOnly, setIsReadOnly] = useState<boolean>(false);
  const apiRateFlashcard = useRateFlashcardMutation();
  const handleRate = async (selectedValue: number) => {
    try {
      setIsReadOnly(true);
      apiRateFlashcard.mutateAsync(
        {
          star: selectedValue,
          flashcardId: flashcardId,
        },
        {
          onSuccess: (data) => {
            toast.success(data.message);
            onClose();
          },
        },
      );
    } catch (error) {
      setRatingCount(0);
      console.log("Error rating", error);
    }
  };

  return (
    <Modal
      withoutFooter
      description="Để lại đánh giá giúp cho tác giả có thêm động lực sáng tạo hơn"
      isOpen={isOpen}
      title="Đánh giá bộ thẻ này"
      onClose={onClose}
    >
      <div className="flex w-full flex-col items-center justify-center gap-2 pb-6">
        <ReactRating
          className="size-10"
          readOnly={isReadOnly}
          style={{ maxWidth: 250 }}
          value={ratingCount}
          onChange={(selectedValue: number) => handleRate(selectedValue)}
        />
      </div>
    </Modal>
  );
};
