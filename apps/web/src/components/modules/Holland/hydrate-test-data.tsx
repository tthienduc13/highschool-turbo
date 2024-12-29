import { useRef } from "react";

import { useHollandTestQuery } from "@highschool/react-query/queries";

import { Loading } from "@/components/core/common/loading";
import {
  HollandTestContext,
  HollandTestStore,
  createHollandTestStore,
} from "@/stores/use-holland-store";

interface HydrateHollandTestDataProps {
  children: React.ReactNode;
}

export const HydrateHollandTestData = ({
  children,
}: HydrateHollandTestDataProps) => {
  const { data, isLoading, isError, error } = useHollandTestQuery();
  const storeRef = useRef<HollandTestStore | null>(null);

  if (data && !storeRef.current) {
    storeRef.current = createHollandTestStore({
      testQuestions: data,
    });
  }

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    console.error("Failed to load Holland test data:", error);
    return <div>Error loading Holland test data. Please try again later.</div>;
  }

  if (!storeRef.current) {
    return <div>Unable to initialize Holland test store.</div>;
  }

  return (
    <HollandTestContext.Provider value={storeRef.current}>
      {children}
    </HollandTestContext.Provider>
  );
};
