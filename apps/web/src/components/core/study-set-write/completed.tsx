import { useEffect } from "react";
import { Card, CardContent } from "@highschool/ui/components/ui/card";
import { cn } from "@highschool/ui/lib/utils";
import Link from "next/link";
import { IconBrain, IconRefresh, TablerIcon } from "@tabler/icons-react";

import { effectChannel } from "@/events/effect";
import { useWritingContext } from "@/stores/use-study-set-writing-store";

export const Completed = () => {
  const totalCount = useWritingContext((s) => s.totalCardCount);
  const dueCardsCount = useWritingContext((s) => s.dueCardCount);
  const wrongCardsCount = useWritingContext((s) => s.wrongCardCount);
  const correctCardsCount = useWritingContext((s) => s.correctCardCount);

  useEffect(() => {
    requestAnimationFrame(() => {
      effectChannel.emit("prepareConfetti");
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex min-h-[calc(100vh-240px)] flex-col items-center justify-center gap-10">
      <div className={cn("grid w-full gap-4", "grid-cols-3")}>
        <GridStat label="Bạn chưa chắc" value={wrongCardsCount ?? 0} />
        <GridStat label="Bạn đã học" value={correctCardsCount ?? 0} />
        <GridStat
          label="Còn lại"
          value={totalCount - dueCardsCount + wrongCardsCount}
        />
      </div>
      <div className="flex size-full items-center justify-center">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 ">
          <Actionable
            description={
              wrongCardsCount === 0
                ? "Ôn tập lại toàn bộ thẻ ngày hôm nay để bạn chắc chắn hơn về kiến thức của mình"
                : "Tiếp tục học những thẻ ghi nhớ bạn chưa chắc chắn hoặc đã làm sai ngày hôm nay"
            }
            icon={IconRefresh}
            name={wrongCardsCount === 0 ? "Ôn lại" : "Tiếp tục học"}
            onClick={() => window.location.reload()}
          />
          <Actionable
            description="Bạn đã hoàn thành tất cả các thẻ ghi nhớ. Bạn có thể tiếp tục học những nội dung mới"
            icon={IconBrain}
            name="Học mới"
            onClick={() => window.location.reload()}
          />
        </div>
      </div>
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

interface ActionableProps {
  name: string;
  description?: string;
  icon: TablerIcon;
  onClick?: () => void;
  href?: string;
}

export function Actionable({
  name,
  description,
  icon: Icon,
  onClick,
  href,
}: ActionableProps) {
  const CardWrapper = ({ children }: { children: React.ReactNode }) => {
    if (href) {
      return (
        <Link className="block" href={href}>
          {children}
        </Link>
      );
    }

    return <button onClick={onClick}>{children}</button>;
  };

  return (
    <CardWrapper>
      <Card className="hover:border-primary dark:hover:border-primary cursor-pointer rounded-xl border-2 border-gray-200 bg-white p-4 transition-all hover:bg-gray-50 dark:border-gray-800 dark:bg-gray-800/50 dark:hover:bg-gray-800">
        <CardContent className="flex items-center gap-4 p-0">
          <div className="bg-primary/10 text-primary flex size-12 items-center justify-center rounded-full">
            <Icon size={24} />
          </div>
          <div className="flex flex-1 flex-col gap-1 text-left">
            <h3 className="text-lg font-semibold">{name}</h3>
            {description && (
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {description}
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </CardWrapper>
  );
}
