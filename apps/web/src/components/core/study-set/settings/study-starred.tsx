import { Switch } from "@highschool/ui/components/ui/switch";
import { useUpdateContainerMutation } from "@highschool/react-query/queries";
import { useEffect } from "react";

import { useContainerContext } from "@/stores/use-container-store";
import { useSet } from "@/hooks/use-set";
import { mutationEventChannel } from "@/events/mutation";

export const StudyStarredSection = () => {
  const { flashcard } = useSet();
  const starredTerms = useContainerContext((s) => s.starredTerms);
  const cardsStudyStarred = useContainerContext((s) => s.cardsStudyStarred);
  const enableCardsSorting = useContainerContext((s) => s.enableCardsSorting);
  const setCardsStudyStarred = useContainerContext(
    (s) => s.setCardsStudyStarred,
  );

  const apiSetCardsStudyStarred = useUpdateContainerMutation();

  useEffect(() => {
    const mutate = async (check: boolean) => {
      apiSetCardsStudyStarred.mutate({
        flashcardId: flashcard.id,
        values: {
          cardsStudyStarred: check,
        },
      });
    };

    mutationEventChannel.on("toggleStudyStarred", mutate);

    return () => {
      mutationEventChannel.off("toggleStudyStarred", mutate);
    };
  }, [enableCardsSorting]);

  return (
    <div className="flex flex-row items-center gap-9">
      <div className="flex w-full flex-col gap-2">
        <p className="font-bold">Chỉ học thuật ngữ có gắn sao</p>
      </div>
      <Switch
        checked={cardsStudyStarred}
        className="data-[state=checked]:bg-primary"
        disabled={starredTerms.length == 0 || enableCardsSorting}
        onCheckedChange={(check) => {
          setCardsStudyStarred(check);
          mutationEventChannel.emit("toggleStudyStarred", check);
        }}
      />
    </div>
  );
};
