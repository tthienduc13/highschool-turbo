import { useEffect, useState } from "react";
import { Card, CardContent } from "@highschool/ui/components/ui/card";
import {
  IconCircleCheck,
  IconCircleX,
  IconHourglassLow,
} from "@tabler/icons-react";

import AnimatedCircularProgressBar from "../../common/animated-progress-bar";
import { getQuestionTypeIcon, getQuestionTypeName } from "../utils";

import { effectChannel } from "@/events/effect";
import {
  TestStoreProps,
  useTestContext,
} from "@/stores/use-study-set-test-store";
import { formatElapsedTime } from "@/utils/time";

export const ResultCard = () => {
  const result = useTestContext((s) => s.result!);
  const questionCount = useTestContext((s) => s.questionCount);

  const startedAt = useTestContext((s) => s.startedAt);
  const endedAt = useTestContext((s) => s.endedAt);

  const [perc, setPerc] = useState(0);

  useEffect(() => {
    requestAnimationFrame(() => {
      const computedPerc = (result.score / questionCount) * 100;

      setPerc(Math.floor(computedPerc));

      if ((result.score * 1.0) / questionCount >= 0.93) {
        effectChannel.emit("prepareConfetti");
        requestAnimationFrame(() => {
          effectChannel.emit("confetti");
        });
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const divider = (
    <div className="h-full w-0.5 rounded-full bg-gray-200 dark:bg-gray-700" />
  );
  const horizontalDivider = (
    <div className="my-2 h-0.5 w-full rounded-full bg-gray-100 dark:bg-gray-700" />
  );

  return (
    <Card className="rounded-3xl border-2 border-gray-100 bg-white px-8 py-6 dark:border-gray-800/50 dark:bg-gray-800">
      <CardContent className="p-0">
        <div className="flex flex-col items-stretch gap-4 md:flex-row">
          <div className="flex flex-row items-center gap-4">
            <AnimatedCircularProgressBar
              className="h-[140px] w-[140px]"
              gaugePrimaryColor="#7faeff"
              gaugeSecondaryColor="#f3f4f6"
              max={100}
              min={0}
              value={perc}
            />
            <div className="flex h-full w-full items-center justify-center">
              <div className="flex flex-col gap-2">
                <div className="flex flex-row gap-2">
                  <IconCircleCheck className="text-blue/70" />
                  <div className="text-lg font-bold">
                    {result.score}{" "}
                    <span className="text-lg font-medium">chính xác</span>
                  </div>
                </div>
                <div className="flex flex-row gap-2">
                  <IconCircleX className="text-gray-400 dark:text-gray-500" />
                  <div className="text-lg font-bold">
                    {questionCount - result.score}{" "}
                    <span className="text-lg font-medium">chính xác</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="hidden md:block">{divider}</div>
          <div className="block md:hidden">{horizontalDivider}</div>
          <div className="flex w-full flex-row items-stretch gap-4 md:w-auto">
            <div className="flex flex-col gap-4">
              <div className="w-40 text-lg font-bold">Theo dạng câu</div>
              <div className="flex flex-col gap-2">
                {result.byType.map((props) => (
                  <ByTypeComponent key={props.type} {...props} />
                ))}
              </div>
            </div>
            <div className="hidden md:block">{divider}</div>
            <div className="block md:hidden">{horizontalDivider}</div>
            <div className="flex flex-col gap-4">
              <div className="text-lg font-bold">Thời gian</div>
              <div className="flex flex-row gap-2">
                <IconHourglassLow size={18} />
                <div className="font-semibold">
                  {formatElapsedTime(
                    (endedAt || new Date()).getTime() -
                      (startedAt || new Date()).getTime(),
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const ByTypeComponent: React.FC<
  NonNullable<TestStoreProps["result"]>["byType"][number]
> = ({ type, score, total }) => {
  const Icon = getQuestionTypeIcon(type);

  return (
    <div
      key={type}
      className="flex flex-row items-center justify-between gap-6"
    >
      <div className="flex flex-row gap-2">
        <div>
          <Icon size={20} />
        </div>
        <div className="text-sm font-semibold">{getQuestionTypeName(type)}</div>
      </div>
      <div className="font-bold">
        {score} / {total}
      </div>
    </div>
  );
};
