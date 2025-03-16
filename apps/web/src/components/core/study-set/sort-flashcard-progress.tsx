import { useRouter } from "next/navigation";
import { Card, CardContent } from "@highschool/ui/components/ui/card";
import { useState } from "react";
import Link from "next/link";
import {
  IconArrowLeft,
  IconArrowRight,
  IconBrain,
  IconCards,
  IconChevronRight,
  IconRotateClockwise,
  TablerIcon,
} from "@tabler/icons-react";
import { Button } from "@highschool/ui/components/ui/button";

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

  //   const apiDelete = api.studiableTerms.delete.useMutation();

  const termsThisRound = useSortFlashcardsContext((s) => s.termsThisRound);
  const index = useSortFlashcardsContext((s) => s.index);
  const studiableTerms = useSortFlashcardsContext((s) => s.studiableTerms);

  const stateGoBack = useSortFlashcardsContext((s) => s.goBack);
  const known = studiableTerms.filter((t) => t.correctness === 1).length;
  const stillLearning = studiableTerms.length - known;

  const goBack = () => {
    stateGoBack(true);

    void (async () => {
      const current = termsThisRound[index];

      if (!current) return;

      //   await apiDelete.mutateAsync({
      //     id: current.id,
      //     containerId: container.id,
      //     mode: "Flashcards",
      //   });
    })();
  };

  return (
    <Card
      className="w-full overflow-y-auto rounded-xl border-2 border-gray-200 bg-transparent p-8  shadow-none dark:border-gray-800/50 "
      style={{ height: h }}
    >
      <CardContent className=" flex h-full flex-col gap-0 bg-transparent p-0 ">
        {!!stillLearning && <AnyKeyPressLayer onSubmit={onNextRound} />}
        <div className="flex  flex-1 flex-col justify-between">
          <div className="grid grid-cols-1 gap-8 xl:grid-cols-2">
            <div className="flex h-full flex-col gap-6">
              <h2 className="text-xl font-bold">Kết quả của bạn</h2>
              <Card className="h-full rounded-2xl bg-white shadow-lg dark:bg-gray-800/50">
                <CardContent className="flex size-full items-center justify-center p-4">
                  <CircularTermMastery
                    known={known}
                    stillLearning={stillLearning}
                  />
                </CardContent>
              </Card>
            </div>

            <div className="flex flex-col gap-6">
              <h2 className="text-xl font-bold">
                {!stillLearning
                  ? "Bạn đã xem hết thẻ ghi nhớ"
                  : "Bước tiếp theo"}
              </h2>

              <div className="flex flex-col gap-4">
                {!!stillLearning ? (
                  <Actionable
                    description={`Tiếp tục ôn tập flashcard với ${stillLearning} thuật ngữ bạn vẫn đang học.`}
                    icon={IconCards}
                    name="Tiếp tục ôn tập"
                    onClick={onNextRound}
                  />
                ) : (
                  <Actionable
                    description="Tiếp tục học với các câu hỏi trắc nghiệm và tự luận."
                    href={`/study-set/${flashcard.slug}/learn`}
                    icon={IconBrain}
                    name="Tiếp tục với Học"
                  />
                )}
                <Actionable
                  description={`Đặt lại tiến trình của bạn và học lại tất cả ${studiableTerms.length} thẻ ghi nhớ lại từ đầu`}
                  icon={IconRotateClockwise}
                  name="Khởi động lại flashcards"
                  onClick={onResetProgress}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-between pt-6 md:flex-row">
          <Button
            className="text-blue-700 hover:text-blue-700"
            size={"default"}
            variant={"ghost"}
            onClick={goBack}
          >
            <IconArrowLeft className="!size-[18px]" size={18} />
            Quay lại thẻ cuối cùng
          </Button>

          {!!stillLearning && (
            <Button
              className="text-blue-700 hover:text-blue-700"
              size={"default"}
              variant="ghost"
              onClick={onNextRound}
            >
              Bấm nút bất kì để tiếp tục
              <IconArrowRight size={18} />
            </Button>
          )}
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
        className={`ease-in-out h-full cursor-pointer border-b-[3px] px-6 py-5 shadow-md transition-all duration-150 ${
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
