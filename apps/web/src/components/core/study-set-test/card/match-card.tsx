import {
  Active,
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  Over,
  TouchSensor,
  useDraggable,
  useDroppable,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import React from "react";
import { MatchData, StudySetAnswerMode } from "@highschool/interfaces";
import { ScriptFormatter } from "@highschool/lib/script-formatter";
import { Button } from "@highschool/ui/components/ui/button";
import { cn } from "@highschool/ui/lib/utils";
import { IconX } from "@tabler/icons-react";

import { SquareAssetPreview } from "../../study-set/square-asset-preview";
import { EvaluatedFalse, EvaluatedTrue } from "../evaluated";
import { GenericLabel } from "../generic-label";

import { CardProps } from "./common";

import { useCardSelector } from "@/hooks/use-card-selector";
import { InteractivePointerSensor } from "@/lib/sensor";
import { useTestContext } from "@/stores/use-study-set-test-store";
import { word } from "@/utils/terms";

type _Over = Over & { id: string };
type _Active = Active & { id: string };
type DragEnd = DragEndEvent & { over: _Over | null; active: _Active | null };

const Header: React.FC<Pick<CardProps, "i">> = ({ i }) => {
  const { question } = useCardSelector<MatchData>(i);

  return (
    <>
      <div className="text-sm font-semibold text-gray-500">Nối câu đúng</div>

      <div className="text-lg font-semibold">
        Kéo{" "}
        {question.answerMode === StudySetAnswerMode.FlashcardContentDefinition
          ? "định nghĩa"
          : "thuật ngữ"}{" "}
        tới{" "}
        {question.answerMode === StudySetAnswerMode.FlashcardContentDefinition
          ? "thuật ngữ"
          : "định nghĩa"}{" "}
        khớp nhau
      </div>
    </>
  );
};

export const MatchCard: React.FC<CardProps> = ({ i, result }) => {
  if (result) return <ResultsMatchCard i={i} />;

  return <InteractiveMatchCard i={i} />;
};

export const InteractiveMatchCard: React.FC<CardProps> = ({ i }) => {
  const { question, data, answer } = useCardSelector<MatchData>(i);

  const answerQuestion = useTestContext((s) => s.answerQuestion);

  const handleDragEnd = ({ over, active }: DragEnd) => {
    if (over) {
      if (!answer.find((a) => a.zone === over.id)) {
        answerQuestion<MatchData>(
          i,
          [
            ...answer.filter((a) => a.term !== active.id),
            {
              zone: over.id,
              term: active.id,
            },
          ],
          data.terms.length == answer.length + 1,
        );
      } else {
        // Swap the two
        const newAnswer = answer;
        const oldIndex = newAnswer.findIndex((a) => a.term === active.id);
        const newIndex = newAnswer.findIndex((a) => a.zone === over.id)!;

        if (oldIndex !== -1) {
          // Swap the two elements in the array
          const oldZone = newAnswer[oldIndex]!.zone;

          newAnswer[oldIndex]!.zone = newAnswer[newIndex]!.zone;
          newAnswer[newIndex]!.zone = oldZone;
        } else {
          // Move the element to the new index
          newAnswer[newIndex]!.term = active.id;
        }
        answerQuestion<MatchData>(
          i,
          Array.from(newAnswer),
          data.terms.length == answer.length,
        );
      }
    } else {
      answerQuestion<MatchData>(
        i,
        answer.filter((a) => a.term !== active.id),
        false,
      );
    }
  };

  const clearZone = (id: string) => {
    answerQuestion<MatchData>(
      i,
      Array.from(answer.filter((a) => a.zone !== id)),
      false,
    );
  };

  const options = data.terms.filter(
    (t) => !answer.find((a) => a.term === t.id),
  );
  const getInZone = (id: string) => answer.find((a) => a.zone === id);

  const sensors = useSensors(
    useSensor(InteractivePointerSensor),
    useSensor(KeyboardSensor),
    useSensor(TouchSensor),
  );

  return (
    <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
      <div className="flex flex-col gap-2">
        <Header i={i} />
        <div className="mt-4 flex flex-col gap-2">
          <div className="flex flex-row flex-wrap gap-3">
            {options.map((term) => (
              <Draggable key={term.id} id={term.id}>
                <ExternalWrapper id={term.id}>
                  <div className="whitespace-pre-wrap">
                    <ScriptFormatter>
                      {word(question.answerMode, term, "answer")}
                    </ScriptFormatter>
                  </div>
                </ExternalWrapper>
              </Draggable>
            ))}
          </div>
          <div className="mt-8 grid grid-cols-2 gap-6">
            {data.zones.map((term, id) => (
              <React.Fragment key={id}>
                <div
                  className={`order-[ flex items-center${id + 1}] md:order-[${id}]`}
                >
                  <Droppable answerMode={question.answerMode} id={term.id}>
                    {!!getInZone(term.id) && (
                      <Draggable id={getInZone(term.id)!.term}>
                        <InternalWrapper
                          id={getInZone(term.id)!.term}
                          onRemove={() => clearZone(term.id)}
                        >
                          <div className="whitespace-pre-wrap">
                            {" "}
                            <ScriptFormatter>
                              {word(
                                question.answerMode,
                                data.terms.find(
                                  (x) => x.id == getInZone(term.id)?.term,
                                )!,
                                "answer",
                              )}
                            </ScriptFormatter>
                          </div>
                        </InternalWrapper>
                      </Draggable>
                    )}
                  </Droppable>
                </div>
                <div
                  className={`order-[ flex items-center${id}] md:order-[${id + 1}]`}
                >
                  <div className="flex w-full flex-row items-center justify-between gap-4">
                    <div className="whitespace-pre-wrap">
                      {" "}
                      <ScriptFormatter>
                        {word(question.answerMode, term, "prompt")}
                      </ScriptFormatter>
                    </div>
                    {question.answerMode ==
                      StudySetAnswerMode.FlashcardContentTerm &&
                      term.image && (
                        <SquareAssetPreview
                          rounded={8}
                          size={56}
                          src={term.image}
                        />
                      )}
                  </div>
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </DndContext>
  );
};

const ResultsMatchCard: React.FC<CardProps> = ({ i }) => {
  const { question, data, answer, remarks } = useCardSelector<MatchData>(i);

  const evaluateZone = (id: string): boolean => {
    const term = answer.find((a) => a.zone === id);

    if (!term) return false;

    return term.term === id;
  };
  const getAnswer = (id: string) => {
    const termId = answer.find((a) => a.zone === id)?.term;

    if (!termId) return undefined;

    return data.terms.find((t) => t.id === termId);
  };

  const remark = (id: string) =>
    remarks?.find((r) => r.id === id)?.remark ?? "";

  return (
    <div className="flex flex-col gap-2">
      <Header i={i} />
      <div className="mt-4 flex flex-col gap-8">
        {data.zones.map((term, i) => (
          <React.Fragment key={i}>
            <div key={term.id} className="flex flex-col gap-6">
              <div className="flex w-full flex-row items-center justify-between gap-4">
                <div className="whitespace-pre-wrap text-lg">
                  <ScriptFormatter>
                    {word(question.answerMode, term, "prompt")}
                  </ScriptFormatter>
                </div>
                {question.answerMode ==
                  StudySetAnswerMode.FlashcardContentTerm &&
                  term.image && (
                    <SquareAssetPreview
                      rounded={8}
                      size={80}
                      src={term.image}
                    />
                  )}
              </div>
              <div
                className={cn(
                  `grid grid-cols-1 gap-4`,
                  evaluateZone(term.id) || !getAnswer(term.id)
                    ? "lg:grid-cols-1"
                    : "lg:grid-cols-2",
                )}
              >
                {!evaluateZone(term.id) && (
                  <div className="flex flex-col gap-2">
                    <GenericLabel evaluation={evaluateZone(term.id)}>
                      {remark(term.id)}
                    </GenericLabel>
                    {!!getAnswer(term.id) && (
                      <EvaluatedFalse>
                        {word(
                          question.answerMode,
                          getAnswer(term.id)!,
                          "answer",
                        )}
                      </EvaluatedFalse>
                    )}
                  </div>
                )}
                <div className="flex flex-col gap-2">
                  {!evaluateZone(term.id) ? (
                    <GenericLabel>
                      {question.answerMode ==
                      StudySetAnswerMode.FlashcardContentDefinition
                        ? "Định nghĩa"
                        : "Thuật ngữ"}{" "}
                      chính xác
                    </GenericLabel>
                  ) : (
                    <GenericLabel evaluation={evaluateZone(term.id)}>
                      {remark(term.id)}
                    </GenericLabel>
                  )}
                  <EvaluatedTrue>
                    {word(question.answerMode, term, "answer")}
                  </EvaluatedTrue>
                </div>
              </div>
            </div>
            {i < data.zones.length - 1 && (
              <div className="h-[2px] w-full rounded-full bg-gray-200 dark:bg-gray-700" />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

const Draggable: React.FC<React.PropsWithChildren & { id: string }> = ({
  children,
  id,
}) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id,
    });
  const style = {
    transform: CSS.Translate.toString(transform),
    zIndex: isDragging ? 100 : undefined,
    touchAction: "manipulation",
  };

  return (
    <div
      ref={setNodeRef}
      className="relative"
      style={style}
      {...listeners}
      {...attributes}
    >
      {children}
    </div>
  );
};

const Droppable: React.FC<
  React.PropsWithChildren<{ id: string; answerMode: StudySetAnswerMode }>
> = ({ children, id, answerMode }) => {
  const { isOver, setNodeRef } = useDroppable({
    id,
  });

  return (
    <div
      ref={setNodeRef}
      className={cn(
        "relative min-h-14 w-full rounded-xl border-2 transition-all duration-150 ease-in-out",
        isOver
          ? "border-gray-200 dark:border-gray-500"
          : "border-gray-100 dark:border-gray-600",
      )}
    >
      <div className="absolute left-0 top-0 flex size-full flex-row items-center justify-center text-sm text-gray-500">
        <div>
          Kéo{" "}
          {answerMode === StudySetAnswerMode.FlashcardContentDefinition
            ? "định nghĩa"
            : "thuật ngữ"}{" "}
          tại đây
        </div>
      </div>
      {children}
    </div>
  );
};

const ExternalWrapper: React.FC<React.PropsWithChildren<{ id: string }>> = ({
  children,
  id,
}) => {
  const { isDragging } = useDraggable({
    id,
  });

  return (
    <div
      className={cn(
        "rounded-xl border-2 border-gray-200 bg-gray-50 px-3 py-2 transition-all duration-150 ease-in-out hover:border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500",
        isDragging ? "shadow-lg" : "shadow-sm",
      )}
    >
      {children}
    </div>
  );
};

const InternalWrapper: React.FC<
  React.PropsWithChildren<{ id: string; onRemove: () => void }>
> = ({ children, id, onRemove }) => {
  const { isDragging } = useDraggable({
    id,
  });

  return (
    <div
      className={cn(
        "h-full w-full rounded-[10px] border-2 border-gray-300 bg-gray-50 px-3 py-2 transition-all duration-150 ease-in-out dark:border-gray-600 dark:bg-gray-700",
        isDragging ? "shadow-lg" : "shadow-sm",
      )}
    >
      <div className="flex w-full flex-row items-center justify-between">
        {children}
        <Button
          aria-label="Remove"
          className="rounded-full"
          size={"icon"}
          variant="ghost"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onRemove();
          }}
        >
          <IconX size={18} style={{ pointerEvents: "none" }} />
        </Button>
      </div>
    </div>
  );
};
