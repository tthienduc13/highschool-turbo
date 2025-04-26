import { DefaultData } from "@/components/core/study-set-remembered/types";
import { useRememberedContext } from "@/stores/use-study-set-remembered-store";

export const useCardRememberedSelector = <D extends DefaultData>(i: number) => {
  const question = useRememberedContext((s) => s.timeline[i]!);
  const answered = useRememberedContext((s) => s.timeline[i]!.answered);
  const data = useRememberedContext((s) => s.timeline[i]!.data) as D;
  const answer = useRememberedContext(
    (s) => s.timeline[i]!.data.answer,
  ) as D["answer"];
  const remarks = useRememberedContext((s) => s.result?.remarks[i]);

  return { question, answered, data, answer, remarks };
};
