"use client";

import React from "react";
import { Skeleton } from "@highschool/ui/components/ui/skeleton";
import { motion } from "framer-motion";

import { useUnauthedRedirect } from "@/hooks/use-unauth-redirect";
import { Container } from "@/components/core/layouts/container";
import { SegmentedProgress } from "@/components/core/common/onboard/segmented-progress";

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
  cardIn = true,
}) => {
  useUnauthedRedirect();
  const description = (
    <div className="whitespace-pre-wrap text-base text-gray-600 dark:text-gray-400">
      {_description}
    </div>
  );

  return (
    <Container className="pb-20" maxWidth="2xl">
      <div className="flex flex-col gap-2">
        <div className="flex flex-col gap-8 p-8">
          <div className="flex flex-col gap-2">
            <h2 className="text-sm font-semibold text-gray-600 dark:text-gray-400">
              Bước {currentStep + 1} trên {steps}
            </h2>
            <SegmentedProgress currentStep={currentStep} steps={steps} />
          </div>
          <div className="flex flex-col gap-4">
            <h2 className="text-3xl font-bold">{title}</h2>
            {enableSkeleton ? <Skeleton>{description}</Skeleton> : description}
          </div>
        </div>
        <motion.div
          animate={
            cardIn
              ? {
                  opacity: 1,
                  transform: "translateY(0)",
                }
              : undefined
          }
          initial={{
            opacity: 0,
            transform: "translateY(-20px)",
          }}
        >
          {children}
        </motion.div>
      </div>
    </Container>
  );
};
