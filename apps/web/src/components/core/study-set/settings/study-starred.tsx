import { Switch } from "@highschool/ui/components/ui/switch";
import { useUpdateContainerMutation } from "@highschool/react-query/queries";

import { useContainerContext } from "@/stores/use-container-store";
import { useSetPropertiesStore } from "@/stores/use-set-properties";
import { useSet } from "@/hooks/use-set";

export const StudyStarredSection = () => {
  const { flashcard } = useSet();
  const setIsDirty = useSetPropertiesStore((s) => s.setIsDirty);
  const starredTerms = useContainerContext((s) => s.starredTerms);
  const cardsStudyStarred = useContainerContext((s) => s.cardsStudyStarred);
  const setCardsStudyStarred = useContainerContext(
    (s) => s.setCardsStudyStarred,
  );

  const apiSetCardsStudyStarred = useUpdateContainerMutation();

  return (
    <div className="flex flex-row items-center gap-9">
      <div className="flex w-full flex-col gap-2">
        <p className="font-bold">Chỉ học thuật ngữ có gắn sao</p>
      </div>
      <Switch
        checked={cardsStudyStarred}
        className="data-[state=checked]:bg-primary"
        disabled={starredTerms.length == 0}
        onCheckedChange={(checked) => {
          setIsDirty(true);
          setCardsStudyStarred(checked);
          apiSetCardsStudyStarred.mutate(
            {
              flashcardId: flashcard.id,
              values: {
                cardsStudyStarred: checked,
              },
            },
            { onSuccess: () => setIsDirty(false) },
          );
        }}
      />
    </div>
  );
};
