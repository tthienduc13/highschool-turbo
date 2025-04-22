import React, { useEffect } from "react";
import { Button } from "@highschool/ui/components/ui/button";
import { IconReload } from "@tabler/icons-react";

import { TermMastery } from "./term-mastery";

import { useCramContext } from "@/stores/use-study-set-cram-store";
import { effectChannel } from "@/events/effect";

export const CompletedView = () => {
  const hasMissedTerms = useCramContext((s) => s.hasMissedTerms) === true;

  useEffect(() => {
    effectChannel.emit("confetti");
  }, []);

  const [resetModalOpen, setResetModalOpen] = React.useState(false);

  const canReview = hasMissedTerms;

  return (
    <>
      {/* <ConfirmModal
        body={
          <Text>
            Are you sure you want to reset your progress for{" "}
            {plural(numTerms, "term")}?
          </Text>
        }
        heading="Reset Progress"
        isLoading={resetProgress.isLoading}
        isOpen={resetModalOpen}
        onClose={() => {
          setResetModalOpen(false);
        }}
        onConfirm={async () => {
          await resetProgress.mutateAsync({ entityId: id });
        }}
      /> */}
      <div className="flex min-h-[calc(100vh-240px)] w-full items-center justify-center">
        <div className="flex flex-col gap-20 pb-20">
          <div className="flex flex-row items-center justify-center">
            <TermMastery />
          </div>
          <div className="flex flex-col items-center justify-center gap-6 text-center">
            <div className="text-xl font-bold">
              Congratulations, you&apos;ve learned everything!
            </div>
            {canReview && (
              <p>
                Keep reviewing your most missed terms to make sure they stick.
              </p>
            )}
          </div>
          <div className="flex w-full items-center justify-center">
            <div className="flex w-full flex-col items-center justify-center gap-3">
              {canReview ? (
                <Button>Review missed terms</Button>
              ) : (
                <Button className="w-full">Finish Learn</Button>
              )}
              <Button
                className="w-full"
                variant="ghost"
                onClick={() => {
                  setResetModalOpen(true);
                }}
              >
                <IconReload />
                Reset progress
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
