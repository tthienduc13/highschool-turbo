"use client";

import { useEffect, useRef } from "react";
import { useHollandTestQuery } from "@highschool/react-query/queries";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { HollandQuestion } from "@highschool/interfaces";

import {
  createHollandTestStore,
  HollandTestContext,
  HollandTestStore,
} from "@/stores/use-holland-test-store";

interface HydrateHollandTestDataProps {
  children: React.ReactNode;
}

export const HydrateHollandTestData = ({
  children,
}: HydrateHollandTestDataProps) => {
  const router = useRouter();
  const { data, isError } = useHollandTestQuery();

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
  data: HollandQuestion[];
  children: React.ReactNode;
}

const ContextLayer = ({ data, children }: ContextLayerProps) => {
  const storeRef = useRef<HollandTestStore | null>(null);

  if (!storeRef.current) {
    storeRef.current = createHollandTestStore();
  }

  useEffect(() => {
    storeRef.current?.getState().initialize(data);
  }, [data]);

  return (
    <HollandTestContext.Provider value={storeRef.current}>
      {children}
    </HollandTestContext.Provider>
  );
};
