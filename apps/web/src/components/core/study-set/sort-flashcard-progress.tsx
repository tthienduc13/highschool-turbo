import { useRouter } from "next/navigation";
import { Card, CardContent } from "@highschool/ui/components/ui/card";
import { useState } from "react";
import Link from "next/link";
import {
  IconBrain,
  IconCards,
  IconChevronRight,
  IconRefresh,
  TablerIcon,
} from "@tabler/icons-react";

import { AnyKeyPressLayer } from "../study-set-learn/any-key-press-layer";

import { CircularTermMastery } from "./circular-term-mastery";

import { useSet } from "@/hooks/use-set";
import { useSortFlashcardsContext } from "@/stores/use-sort-flashcard-store";

export interface SortFlashcardProgressProps {
  h?: string;
  onNextRound: () => void;
  onResetProgress: () => void;
}

export const SortFlashcardProgress: React.FC<SortFlashcardProgressProps> = ({
  h = "500px",
  onNextRound,
  onResetProgress,
}) => {
  const { flashcard } = useSet();
  const router = useRouter();

  const dueCards = useSortFlashcardsContext((s) => s.dueCards);
  const index = useSortFlashcardsContext((s) => s.index);
  const dueCardCount = useSortFlashcardsContext((s) => s.dueCardCount);
  const totalCardCount = useSortFlashcardsContext((s) => s.totalCardCount);

  const stateGoBack = useSortFlashcardsContext((s) => s.goBack);

  // Count known and still learning cards
  const known = dueCards.filter((t) => t.isReview).length;
  const stillLearning = dueCards.filter((t) => !t.isReview).length;

  // If there are no due cards, show 100% progress
  const isComplete = dueCardCount === 0 || known + stillLearning === 0;

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
                {isComplete && (
                  <Actionable
                    description="Ôn tập lại toàn bộ thẻ ngày hôm nay để bạn chắc chắn hơn về kiến thức của mình"
                    href={`/flashcard/${flashcard.id}`}
                    icon={IconRefresh}
                    name="Ôn lại các thẻ"
                  />
                )}
                {isComplete ? (
                  <Actionable
                    description="Bạn đã hoàn thành tất cả các thẻ ghi nhớ. Bạn có thể xem lại hoặc tiếp tục học những nội dung mới"
                    href={`/flashcard/${flashcard.id}`}
                    icon={IconBrain}
                    name="Tiếp tục học"
                  />
                ) : !!stillLearning ? (
                  <Actionable
                    description={`Tiếp tục ôn tập flashcard với ${stillLearning} thuật ngữ bạn vẫn đang học.`}
                    icon={IconCards}
                    name="Tiếp tục ôn tập"
                    onClick={onNextRound}
                  />
                ) : (
                  <Actionable
                    description="Bạn đã hoàn thành tất cả các thẻ ghi nhớ. Bạn có thể xem lại hoặc tiếp tục học những nội dung mới"
                    href={`/flashcard/${flashcard.id}`}
                    icon={IconBrain}
                    name="Quay lại trang chính"
                  />
                )}
              </div>
            </div>
          </div>

          {/* <div className="mt-8 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <Button
                variant="outline"
                className="flex items-center gap-2"
                onClick={goBack}
              >
                <IconChevronRight className="h-4 w-4 rotate-180" />
                Quay lại
              </Button>
              <Button
                variant="outline"
                className="flex items-center gap-2"
                onClick={onResetProgress}
              >
                <IconRotateClockwise className="h-4 w-4" />
                Làm lại
              </Button>
            </div>
          </div> */}
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
  const [isHovered, setIsHovered] = useState(false);

  const CardWrapper = ({ children }: { children: React.ReactNode }) => {
    if (href) {
      return (
        <Link className="block h-full" href={href}>
          {children}
        </Link>
      );
    }

    // eslint-disable-next-line jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events
    return <div onClick={onClick}>{children}</div>;
  };

  return (
    <CardWrapper>
      <Card
        className={`h-full cursor-pointer border-b-[3px] px-6 py-5 shadow-md transition-all duration-150 ease-in-out ${
          isHovered
            ? "translate-y-[-2px] border-blue-500"
            : "border-gray-200 dark:border-gray-700"
        }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center">
            <div className="mr-3 hidden text-blue-400 sm:block">
              <Icon size={32} />
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <div className="block text-blue-300 sm:hidden">
                  <Icon size={20} />
                </div>
                <h3 className="text-lg font-semibold">{name}</h3>
              </div>
              {description && (
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {description}
                </p>
              )}
            </div>
          </div>
          <div className="hidden sm:block">
            <IconChevronRight className="size-5 text-gray-400" />
          </div>
        </div>
      </Card>
    </CardWrapper>
  );
}
