import { motion } from "framer-motion";

import { useMediaQuery } from "@highschool/hooks";
import { LimitedStudySetAnswerMode } from "@highschool/interfaces";
import { Button } from "@highschool/ui/components/ui/button";
import { Separator } from "@highschool/ui/components/ui/separator";
import { cn } from "@highschool/ui/lib/utils";

import { IconTransfer } from "@tabler/icons-react";

import { useContainerContext } from "@/stores/use-container-store";

import { InteractorModes } from "./interactor-mode";

export const Interactor = () => {
  const isMobile = useMediaQuery("(max-width: 390px)");
  const toggleHideFlashcard = useContainerContext((s) => s.toggleHideFlashcard);
  const setHideWith = useContainerContext((s) => s.setFlashcardHideWith);
  const hideFlashcard = useContainerContext((s) => s.hideFlashcard);
  const flashcardHideWith = useContainerContext((s) => s.flashcardHideWith);
  return (
    <div>
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2">
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
          className="flex w-fit flex-row gap-4 rounded-2xl border border-gray-100 bg-white p-4 shadow-2xl dark:border-gray-800/50 dark:bg-gray-800"
        >
          <div className="border-input flex flex-row items-center overflow-hidden rounded-xl border">
            <Button
              onClick={toggleHideFlashcard}
              size={isMobile ? "sm" : "lg"}
              variant={"ghost"}
              className={cn("rounded-none", !isMobile && "!text-base")}
            >
              {hideFlashcard ? "Hiện" : "Ẩn"}{" "}
              {flashcardHideWith === LimitedStudySetAnswerMode.Term
                ? "định nghĩa"
                : "thuật ngữ"}
            </Button>
            {hideFlashcard && <Separator className="h-8 w-[1px]" />}
            {hideFlashcard && (
              <Button
                onClick={() => {
                  setHideWith(
                    flashcardHideWith === LimitedStudySetAnswerMode.Term
                      ? LimitedStudySetAnswerMode.Definition
                      : LimitedStudySetAnswerMode.Term,
                  );
                }}
                variant={"ghost"}
                size={"icon"}
                className="h-10 w-10 rounded-none"
              >
                <IconTransfer className="!size-5" />
              </Button>
            )}
          </div>
          <InteractorModes />
        </motion.div>
      </div>
    </div>
  );
};
