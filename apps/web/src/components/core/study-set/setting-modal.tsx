import { Modal } from "@highschool/components/modal";
import { useSession } from "next-auth/react";
import { Separator } from "@highschool/ui/components/ui/separator";

import { StudyStarredSection } from "./settings/study-starred";
import { CardsSortingSection } from "./settings/card-sorting";
import { CardsAnswerModeSection } from "./settings/answer-mode";

import { useSet } from "@/hooks/use-set";
import { useSetPropertiesStore } from "@/stores/use-set-properties";
import { useContainerContext } from "@/stores/use-container-store";

interface SettingModal {
  isOpen: boolean;
  onClose: () => void;
}

export const SettingModal = ({ isOpen, onClose }: SettingModal) => {
  const { status } = useSession();
  const { flashcard } = useSet();
  const setIsDirty = useSetPropertiesStore((s) => s.setIsDirty);
  const cardsStudyStarred = useContainerContext((s) => s.cardsStudyStarred);

  const setDirtyProps = {
    onSuccess: () => {
      onClose();
      setIsDirty(true);
    },
  };

  //   const apiResetCardsProgress =
  //     api.container.resetCardsProgress.useMutation(setDirtyProps);

  return (
    <Modal
      withoutCancel
      buttonLabel="Đặt lại bộ thẻ"
      isOpen={isOpen}
      title="Cài đặt"
      withoutFooter={status == "unauthenticated"}
      onClose={() => {
        const isDirty =
          flashcard.container?.cardsStudyStarred !== cardsStudyStarred;

        if (status == "authenticated" && isDirty) setIsDirty(true);

        onClose();
      }}
      onConfirm={() => {
        onClose();
        setIsDirty(true);
      }}
      //   isPending={apiResetCardsProgress.isLoading}
    >
      <div className="flex flex-col gap-6">
        <CardsSortingSection />
        <Separator />
        <CardsAnswerModeSection />
        <StudyStarredSection />
      </div>
    </Modal>
  );
};
