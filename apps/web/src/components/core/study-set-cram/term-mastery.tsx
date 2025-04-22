import { NumberTicker } from "@highschool/components";
import { Card, CardContent } from "@highschool/ui/components/ui/card";
import { cn } from "@highschool/ui/lib/utils";

import { useCramContext } from "@/stores/use-study-set-cram-store";

export const useTermMastery = () => {
  const terms = useCramContext((s) => s.studiableTerms);
  const unstudied = terms.filter((t) => t.correctness === 0);
  const familiar = terms.filter(
    (t) => t.correctness == 1 || t.correctness == -1,
  );
  const mastered = terms.filter((t) => t.correctness === 2);

  return [unstudied, familiar, mastered];
};

export const TermMastery = () => {
  const [unstudied, familiar, mastered] = useTermMastery();

  return (
    <div className={cn("grid w-full gap-4", "grid-cols-3")}>
      <GridStat label="Chưa học" value={unstudied?.length || 0} />
      <GridStat label="Đã biết" value={familiar?.length || 0} />
      <GridStat label="Đã thuộc" value={mastered?.length || 0} />
    </div>
  );
};

export interface GridStatProps {
  value: number | string;
  label: string;
  bg?: string;
}

export const GridStat: React.FC<GridStatProps> = ({ value, label, bg }) => {
  return (
    <Card
      className={`rounded-2xl border-b-4 border-b-orange-300 pb-4 pt-3 shadow-lg ${bg || "bg-card"}`}
    >
      <CardContent className="p-0 text-center">
        <NumberTicker
          className="font-outfit text-3xl font-extrabold md:text-4xl"
          value={Number(value)}
        />

        <p className="font-semibold text-gray-500">{label}</p>
      </CardContent>
    </Card>
  );
};
