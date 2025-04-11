import { Modal } from "@highschool/components/modal";
import { useSession } from "next-auth/react";
import { Separator } from "@highschool/ui/components/ui/separator";
import { useResetFlashcardMutation } from "@highschool/react-query/queries";
import { toast } from "sonner";

import { StudyStarredSection } from "./settings/study-starred";
import { CardsAnswerModeSection } from "./settings/answer-mode";
import { CardPerDaySection } from "./settings/card-per-day";

import { useSet } from "@/hooks/use-set";
import { useSetPropertiesStore } from "@/stores/use-set-properties";

interface SettingModal {
  isOpen: boolean;
  onClose: () => void;
}

export const SettingModal = ({ isOpen, onClose }: SettingModal) => {
  const { status } = useSession();
  const { flashcard } = useSet();
  const setIsDirty = useSetPropertiesStore((s) => s.setIsDirty);

  const apiResetFlashcardProgress = useResetFlashcardMutation();

  return (
    <Modal
      withoutCancel
      buttonLabel="Đặt lại bộ thẻ"
      isDisabled={apiResetFlashcardProgress.isPending}
      isOpen={isOpen}
      isPending={apiResetFlashcardProgress.isPending}
      title="Cài đặt"
      withoutFooter={status == "unauthenticated"}
      onClose={() => {
        onClose();
      }}
      onConfirm={() => {
        apiResetFlashcardProgress.mutate(
          {
            flashcardId: flashcard.id,
          },
          {
            onSuccess: (data) => {
              toast.success(data.message);
            },
          },
        );

        onClose();
        setIsDirty(true);
      }}
      //   isPending={apiResetCardsProgress.isLoading}
    >
      <div className="flex flex-col gap-6">
        {/* <CardsSortingSection />
        <Separator /> */}
        <CardPerDaySection />
        <Separator />
        <CardsAnswerModeSection />
        <StudyStarredSection />
      </div>
    </Modal>
  );
};
