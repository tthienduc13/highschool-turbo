"use client";

import { useEffect, useRef } from "react";
import { useMBTITestQuery } from "@highschool/react-query/queries";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { MBTITestQuestion } from "@highschool/interfaces";

import {
  createMBTITestStore,
  MBTITestContext,
  MBTITestStore,
} from "@/stores/use-mbti-test-store";

interface HydrateMBTITestDataProps {
  children: React.ReactNode;
}

export const HydrateMBTITestData = ({ children }: HydrateMBTITestDataProps) => {
  const router = useRouter();
  const { data, isError } = useMBTITestQuery();

  useEffect(() => {
    if (isError) {
      toast.error("Có lỗi xảy ra khi tải dữ liệu, vui lòng thử lại sau");
      router.push("/");
    }
  }, [isError, router]);

  if (!data?.length) {
    return null;
  }

  return <ContextLayer data={data}>{children}</ContextLayer>;
};

interface ContextLayerProps {
  data: MBTITestQuestion[];
  children: React.ReactNode;
}

const ContextLayer = ({ data, children }: ContextLayerProps) => {
  const storeRef = useRef<MBTITestStore | null>(null);

  if (!storeRef.current) {
    storeRef.current = createMBTITestStore();
  }

  useEffect(() => {
    storeRef.current?.getState().initialize(data);
  }, [data]);

  return (
    <MBTITestContext.Provider value={storeRef.current}>
      {children}
    </MBTITestContext.Provider>
  );
};
