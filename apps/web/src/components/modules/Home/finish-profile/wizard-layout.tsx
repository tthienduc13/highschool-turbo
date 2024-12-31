import { SegmentedProgress } from "@/components/core/common/onboard/segmented-progress";
import { Skeleton } from "@highschool/ui/components/ui/skeleton";
import { motion } from "framer-motion";

export interface WizardLayoutProps {
  title: string;
  description: string | React.ReactNode;
  steps: number;
  currentStep: number;
  enableSkeleton?: boolean;
  isLoaded?: boolean;
  cardIn?: boolean;
}

export const WizardLayout: React.FC<
  React.PropsWithChildren<WizardLayoutProps>
> = ({
  title,
  description: _description,
  steps,
  currentStep,
  children,
  enableSkeleton,
  isLoaded,
  cardIn = true,
}) => {
  const description = (
    <p className="text-gray-600 dark:text-gray-400 text-sm whitespace-pre-wrap">
      {_description}
    </p>
  );
  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col">
        <div className=" text-base md:text-lg font-medium text-gray-600 dark:text-gray-400">
          Bước {currentStep + 1} trên {steps}
        </div>
        <SegmentedProgress steps={steps} currentStep={currentStep} />
      </div>
      <div className="flex flex-col gap-2">
        <h2 className="md:text-xl text-lg font-bold">{title}</h2>
        {enableSkeleton ? <Skeleton>{description}</Skeleton> : description}
      </div>
      <motion.div
        // initial={{
        //   opacity: 0,
        //   transform: "translateY(-20px)",
        // }}
        animate={
          cardIn
            ? {
                opacity: 1,
                transform: "translateY(0)",
              }
            : undefined
        }
      >
        {children}
      </motion.div>
    </div>
  );
};
