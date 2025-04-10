import { FlashcardLearn } from "@highschool/interfaces";
import { useFSRSByIdQuery } from "@highschool/react-query/queries";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { toast } from "sonner";

import {
  createWritingStore,
  WritingContext,
  WritingStore,
} from "@/stores/use-study-set-writing-store";

interface HydrateWritingDataProps {
  children: React.ReactNode;
  placeholder?: React.ReactNode;
  slug: string;
}

export const HydrateWritingData = ({
  slug,
  children,
  placeholder,
}: HydrateWritingDataProps) => {
  const id = "01960be8-5cf8-7ea2-b97f-fb9e00be0694";
  const router = useRouter();

  //   const {
  //     data: fsrsData,
  //     isLoading,
  //     refetch,
  //   } = useFSRSBySlugQuery({
  //     slug: slug,
  //     isReview: false,
  //   });

  const {
    data: fsrsData,
    isLoading,
    isError,
  } = useFSRSByIdQuery({
    flashcardId: id,
    isReview: false,
  });

  useEffect(() => {
    if (isError) {
      toast.error("Có lỗi xảy ra khi tải dữ liệu, vui lòng thử lại sau");
      router.push(`/study-set/${slug}`);
    }
  }, [isError]);

  if (isLoading) {
    return <>{placeholder}</>;
  }

  return <ContextLayer data={fsrsData!}>{children}</ContextLayer>;
};

interface ContextLayerProps {
  data: FlashcardLearn;
  children: React.ReactNode;
}

const ContextLayer = ({ data, children }: ContextLayerProps) => {
  const storeRef = useRef<WritingStore | null>(null);

  if (!storeRef.current) {
    storeRef.current = createWritingStore();
  }

  const getVal = (data: FlashcardLearn) => {
    return {
      dueCardCount: data.dueCardCount,
      totalCardCount: data.totalCardCount,
      dueCards: data.dueCards ?? [],
      cardCounter: 0,
      completed: false,
    };
  };

  useEffect(() => {
    if (storeRef.current) {
      storeRef.current.setState(getVal(data));
    }
  }, [data]);

  return (
    <WritingContext.Provider value={storeRef.current}>
      {children}
    </WritingContext.Provider>
  );
};
