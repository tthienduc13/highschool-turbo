import { Card, CardContent } from "@highschool/ui/components/ui/card";
import { cn } from "@highschool/ui/lib/utils";

interface TermMasteryProps {
  unLearnCount?: number;
  studyingCount?: number;
  masteredCount?: number;
  excludeThisRound?: boolean;
}

export const TermMastery = ({
  unLearnCount,
  studyingCount,
  masteredCount,
}: TermMasteryProps) => {
  return (
    <div className={cn("grid w-full gap-4", "grid-cols-3")}>
      <GridStat label="Chưa học" value={unLearnCount ?? 0} />
      <GridStat label="Đang học" value={studyingCount ?? 0} />
      <GridStat label="Đã biết" value={masteredCount ?? 0} />
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
        <p className="font-outfit text-3xl font-extrabold md:text-4xl">
          {value}
        </p>
        <p className="font-semibold text-gray-500">{label}</p>
      </CardContent>
    </Card>
  );
};
