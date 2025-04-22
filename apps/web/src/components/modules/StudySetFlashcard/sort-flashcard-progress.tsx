import { Card, CardContent } from "@highschool/ui/components/ui/card";
import {
  IconCards,
  IconChevronRight,
  IconRefresh,
  TablerIcon,
} from "@tabler/icons-react";
import Link from "next/link";

import { useReviewContext } from "./hydrate-fsrs-data";

import { useStudySetFSRSContext } from "@/stores/use-study-set-fsrs-store";
import { CircularTermMastery } from "@/components/core/study-set/circular-term-mastery";

interface SortFlashcardProgressProps {
  h?: string;
  state: "stillLearning" | "known";
}

export const SortFlashcardProgress = ({
  h,
  state,
}: SortFlashcardProgressProps) => {
  const knownCardsCount = useStudySetFSRSContext((s) => s.knownCount);
  const stilLearningCardsCount = useStudySetFSRSContext((s) => s.unknownCount);
  const { setIsReview, setIsDirty } = useReviewContext();

  const handleKeepLearning = (review: boolean) => {
    setIsReview(review);
    setIsDirty(true);
  };

  const handleLeanNew = () => {
    setIsReview(true);
    setIsDirty(true);
  };

  return (
    <Card
      className="w-full overflow-y-auto rounded-xl border-2 border-gray-200 bg-transparent p-8  shadow-none dark:border-gray-800/50 "
      style={{ height: h }}
    >
      <CardContent className=" flex h-full flex-col gap-0 bg-transparent p-0 ">
        <div className="flex  flex-1 flex-col justify-between">
          <div className="grid grid-cols-1 gap-8 xl:grid-cols-2">
            <div className="flex h-full flex-col gap-6">
              <h2 className="text-xl font-bold">Kết quả của bạn</h2>
              <Card className="h-full rounded-2xl bg-white shadow-lg dark:bg-gray-800/50">
                <CardContent className="flex size-full items-center justify-center p-4">
                  <CircularTermMastery
                    known={knownCardsCount}
                    state={state}
                    stillLearning={stilLearningCardsCount}
                  />
                </CardContent>
              </Card>
            </div>

            <div className="flex flex-col gap-6">
              <h2 className="text-xl font-bold">
                {/* {completed
                  ? "Bạn đã hoàn thành tất cả thẻ ghi nhớ"
                  : !stillLearning
                    ? "Bạn đã xem hết thẻ ghi nhớ"
                    : "Bước tiếp theo"} */}
                Bước tiếp theo
              </h2>

              <div className="flex flex-col gap-4">
                {/* {manualRevalidate ? (
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
                )} */}

                <Actionable
                  description="Ôn tập lại các thẻ bạn đã học để củng cố kiến thức"
                  icon={IconRefresh}
                  name="Ôn tập thẻ đã học"
                  onClick={() => handleKeepLearning(false)}
                />

                <Actionable
                  description="Tiếp tục ôn tập và xem lại các thẻ bạn chưa nắm vững"
                  icon={IconCards}
                  name="Học thẻ mới"
                  onClick={handleLeanNew}
                />
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
          <div className="flex flex-1 flex-col gap-1 text-left">
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
