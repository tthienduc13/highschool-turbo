"use client";

import { motion } from "framer-motion";

import { createContext, useContext } from "react";

import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

import { useMediaQuery } from "@highschool/hooks";

import { useMe } from "@/hooks/use-me";
import { getSafeRedirectUrl } from "@/utils/urls";

import { Loading } from "../loading";
import { SegmentedProgress } from "./segmented-progress";

const computeMap = (isMobile = false) => {
  const base = [
    "",
    "/theme",
    "/account-type",
    "/username",
    "/command-menu",
    "/subscribe",
    "/done",
  ];
  const remove = (index: string) => base.splice(base.indexOf(index), 1);

  if (isMobile) remove("/command-menu");

  return base;
};

interface PresentWrapperContextProps {
  nextStep: () => void;
}

const PresentWrapperContext = createContext<PresentWrapperContextProps>({
  nextStep: () => undefined,
});

export const PresentWrapper: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const callbackUrl = searchParams.get("callbackUrl");
  const isMobile = useMediaQuery("(max-width: 768px)");

  // useUnauthedRedirect();
  const me = useMe();

  // const hasMembership = !!me?.orgMembership;

  const map = computeMap(isMobile);

  const currentStep = pathname.replace("/onboard", "");

  const getFinalizedCallbackUrl = () => {
    if (!callbackUrl) return "/";

    return getSafeRedirectUrl(callbackUrl);
    return "";
  };

  const nextStep = () => {
    const next = map[map.indexOf(currentStep)! + 1];
    if (next) {
      router.replace(
        `/onboard${next}?callbackUrl=${encodeURIComponent(callbackUrl || "")}`,
      );
    } else {
      router.push(getFinalizedCallbackUrl());
    }
  };

  if (!me) return <Loading fullHeight />;

  return (
    <PresentWrapperContext.Provider value={{ nextStep }}>
      <div className="relative flex min-h-screen w-screen items-center justify-center">
        <div className="mx-auto max-w-3xl py-20">
          <motion.div
            initial={{
              opacity: -1,
              translateY: -16,
            }}
            animate={{
              opacity: 1,
              translateY: 0,
              transition: {
                duration: 0.3,
                ease: "easeOut",
              },
            }}
            exit={{
              opacity: -1,
              translateY: -16,
              transition: {
                duration: 0.3,
                ease: "easeIn",
              },
            }}
          >
            {children}
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 w-full">
          <div className="mx-auto w-full max-w-xs px-4">
            <SegmentedProgress
              steps={map.length}
              currentStep={map.indexOf(currentStep)}
              clickable
              disableFrom={!me.username ? 3 : undefined}
              onClick={async (i) => {
                await router.replace(
                  `/onboard${map[i]!}?callbackUrl=${encodeURIComponent(callbackUrl || "")}`,
                );
              }}
            />
          </div>
        </div>
      </div>
    </PresentWrapperContext.Provider>
  );
};

export const useNextStep = () => useContext(PresentWrapperContext).nextStep;
