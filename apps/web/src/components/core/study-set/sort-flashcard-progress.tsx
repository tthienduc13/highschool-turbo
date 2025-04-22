import { useRouter } from "next/navigation";
import { Card, CardContent } from "@highschool/ui/components/ui/card";
import Link from "next/link";
import {
  IconBrain,
  IconCards,
  IconChevronRight,
  IconRefresh,
  TablerIcon,
} from "@tabler/icons-react";

import { AnyKeyPressLayer } from "../common/any-key-press-layer";

import { CircularTermMastery } from "./circular-term-mastery";

import { useSet } from "@/hooks/use-set";
import { useSortFlashcardsContext } from "@/stores/use-sort-flashcard-store";

export interface SortFlashcardProgressProps {
  h?: string;
  onNextRound: () => void;
  onResetProgress: () => void;
  manualRevalidate?: boolean;
}

export const SortFlashcardProgress: React.FC<SortFlashcardProgressProps> = ({
  h = "500px",
  onNextRound,
  onResetProgress,
  manualRevalidate = false,
}) => {
  const { flashcard } = useSet();
  const router = useRouter();

  const dueCards = useSortFlashcardsContext((s) => s.dueCards);
  const index = useSortFlashcardsContext((s) => s.index);
  const dueCardCount = useSortFlashcardsContext((s) => s.dueCardCount);
  const totalCardCount = useSortFlashcardsContext((s) => s.totalCardCount);
  const allCardsRated = useSortFlashcardsContext((s) => s.allCardsRated);
  const allCardsKnown = useSortFlashcardsContext((s) => s.allCardsKnown);

  const stateGoBack = useSortFlashcardsContext((s) => s.goBack);

  // Count known and still learning cards
  const known = dueCards.filter((t) => t.isReview).length;
  const stillLearning = dueCards.filter((t) => !t.isReview).length;

  // If there are no due cards, show 100% progress
  const isComplete = dueCardCount === 0 || known + stillLearning === 0;

  // Calculate progress percentage
  const progressPercentage = isComplete
    ? 100
    : allCardsRated
      ? Math.round((known / (known + stillLearning)) * 100)
      : Math.round((index / dueCards.length) * 100);

  const goBack = () => {
    stateGoBack(true);
  };

  return (
    <Card
      className="w-full overflow-y-auto rounded-xl border-2 border-gray-200 bg-transparent p-8  shadow-none dark:border-gray-800/50 "
      style={{ height: h }}
    >
      <CardContent className=" flex h-full flex-col gap-0 bg-transparent p-0 ">
        {!!stillLearning && !isComplete && (
          <AnyKeyPressLayer onSubmit={onNextRound} />
        )}
        <div className="flex  flex-1 flex-col justify-between">
          <div className="grid grid-cols-1 gap-8 xl:grid-cols-2">
            <div className="flex h-full flex-col gap-6">
              <h2 className="text-xl font-bold">Kết quả của bạn</h2>
              <Card className="h-full rounded-2xl bg-white shadow-lg dark:bg-gray-800/50">
                <CardContent className="flex size-full items-center justify-center p-4">
                  <CircularTermMastery
                    known={isComplete ? totalCardCount : known}
                    progressPercentage={progressPercentage}
                    state="stillLearning"
                    stillLearning={isComplete ? 0 : stillLearning}
                  />
                </CardContent>
              </Card>
            </div>

            <div className="flex flex-col gap-6">
              <h2 className="text-xl font-bold">
                {isComplete
                  ? "Bạn đã hoàn thành tất cả thẻ ghi nhớ"
                  : !stillLearning
                    ? "Bạn đã xem hết thẻ ghi nhớ"
                    : "Bước tiếp theo"}
              </h2>

              <div className="flex flex-col gap-4">
                {manualRevalidate ? (
                  // Show revalidate button if manual revalidation is needed
                  <Actionable
                    description="Bạn cần cập nhật dữ liệu để tiếp tục học"
                    icon={IconRefresh}
                    name="Cập nhật dữ liệu"
                    onClick={onNextRound}
                  />
                ) : allCardsKnown ? (
                  // If all cards were rated as known (3), show options to review or learn new
                  <>
                    <Actionable
                      description="Ôn tập lại toàn bộ thẻ ngày hôm nay để bạn chắc chắn hơn về kiến thức của mình"
                      icon={IconRefresh}
                      name="Ôn lại các thẻ"
                      onClick={onNextRound}
                    />
                    <Actionable
                      description="Bạn đã hoàn thành tất cả các thẻ ghi nhớ. Bạn có thể tiếp tục học những nội dung mới"
                      href={`/flashcard/${flashcard.id}`}
                      icon={IconBrain}
                      name="Tiếp tục học"
                    />
                  </>
                ) : allCardsRated ? (
                  // If all cards were rated but not all as known, show option to keep reviewing
                  <Actionable
                    description="Tiếp tục ôn tập các thẻ bạn chưa nắm vững"
                    icon={IconRefresh}
                    name="Tiếp tục ôn tập"
                    onClick={onNextRound}
                  />
                ) : (
                  // If not all cards were rated, show option to continue rating
                  <Actionable
                    description="Bạn chưa đánh giá tất cả các thẻ. Tiếp tục để hoàn thành"
                    icon={IconCards}
                    name="Tiếp tục đánh giá"
                    onClick={onNextRound}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
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
          <div className="flex flex-col gap-1">
            <h3 className="text-lg font-semibold">{name}</h3>
            {description && (
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {description}
              </p>
            )}
          </div>
          <IconChevronRight className="ml-auto size-6 text-gray-400" />
        </CardContent>
      </Card>
    </CardWrapper>
  );
}
