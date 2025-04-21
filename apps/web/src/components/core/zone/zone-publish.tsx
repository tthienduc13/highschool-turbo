"use client";

import React from "react";
import { toast } from "sonner";
import { useParams, useRouter } from "next/navigation";
import { cn } from "@highschool/ui/lib/utils";
import { motion } from "framer-motion";
import { IconAirBalloon } from "@tabler/icons-react";
import { useTheme } from "next-themes";

import { GlowingButton } from "../common/glowing-button";

import { WizardLayout } from "./wizard-layout";

export default function ZonePublishModule() {
  const router = useRouter();
  const params = useParams();

  const { theme } = useTheme();

  const [isLoading, setIsLoading] = React.useState(false);

  const handlePublish = () => {
    toast.success("Thiết lập zone thành công");
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    router.push(`/zone/${params.id as string}`);
  };

  const balloonFill = theme === "dark" ? "#2D3748" : "#E2E8F0";

  return (
    <WizardLayout
      currentStep={2}
      description={"That's it! Your organization is ready to be published."}
      steps={3}
      title="Publish"
    >
      <div className="mt-12 flex w-full items-center justify-center px-8">
        <div className="w-full max-w-sm">
          <div className="group w-full transition-all duration-700 ease-in-out">
            <GlowingButton
              isLoading={isLoading}
              onClick={() => handlePublish()}
            >
              <div
                className={cn(
                  "group-hover:-translate-y-16 transition-all duration-700 ease-in-out group-hover:text-blue-500 text-gray-200 dark:text-gray-700 opacity-90 absolute translate-y-2.5",
                )}
              >
                <motion.div>
                  <IconAirBalloon
                    size={120}
                    style={{
                      strokeWidth: 1,
                      fill: balloonFill,
                    }}
                  />
                </motion.div>
              </div>
              <div className="absolute left-[calc(50%-60px)] translate-y-5 rotate-[-10deg] text-gray-200 opacity-0 transition-all duration-700 ease-in-out group-hover:-translate-x-6 group-hover:-translate-y-14 group-hover:text-blue-500 group-hover:opacity-70 dark:text-gray-700  ">
                <IconAirBalloon
                  size={48}
                  style={{
                    strokeWidth: 2,
                    fill: balloonFill,
                  }}
                />
              </div>
              <div className="group-hover:rotate-(5deg) absolute left-1/2 translate-y-5 text-gray-200 opacity-0 transition-all duration-700 ease-in-out group-hover:-translate-y-20 group-hover:translate-x-8 group-hover:text-blue-500 group-hover:opacity-50 dark:text-gray-700   ">
                <IconAirBalloon
                  size={48}
                  style={{
                    strokeWidth: 2,
                    fill: balloonFill,
                  }}
                />
              </div>
              <div
                className={cn(
                  "absolute top-0  flex items-center justify-center size-full rounded-xl",
                  theme === "dark"
                    ? "bg-gradient-to-t from-gray-800 to-transparent"
                    : "bg-gradient-to-t from-gray-50 to-transparent",
                )}
              />
              <div className="z-20 w-full px-6">
                <h2 className="text-xl font-semibold">Tạo công khai</h2>
              </div>
            </GlowingButton>
          </div>
        </div>
      </div>
    </WizardLayout>
  );
}
