import { useRef } from "react";

import { useMBTITestQuery } from "@highschool/react-query/queries";

import { Loading } from "@/components/core/common/loading";
import {
  MBTITestContext,
  MBTITestStore,
  createMBTITestStore,
} from "@/stores/use-mbti-store";

interface HydrateMBTITestDataProps {
  children: React.ReactNode;
}

export const HydrateMBTITestData = ({ children }: HydrateMBTITestDataProps) => {
  const { data, isLoading, isError, error } = useMBTITestQuery();
  const storeRef = useRef<MBTITestStore | null>(null);

  if (data && !storeRef.current) {
    storeRef.current = createMBTITestStore({
      testQuestions: data,
    });
  }

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    console.error("Failed to load MBTI test data:", error);
    return <div>Error loading MBTI test data. Please try again later.</div>;
  }

  if (!storeRef.current) {
    return <div>Unable to initialize MBTI test store.</div>;
  }

  return (
    <MBTITestContext.Provider value={storeRef.current}>
      {children}
    </MBTITestContext.Provider>
  );
};
