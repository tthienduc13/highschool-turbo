import { Skeleton } from "@highschool/ui/components/ui/skeleton";

export const EditorLoading = () => {
  return (
    <div className="flex flex-col gap-8">
      <TopBarSkeleton />
      <TitlePropertiesSkeleton />
      <ButtonAreaSkeleton />
      <div className="flex flex-col gap-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-[150px] w-full rounded-xl" />
        ))}
      </div>
    </div>
  );
};

function ButtonAreaSkeleton() {
  return (
    <div className="flex flex-col items-start justify-between space-y-4 md:flex-row md:items-center md:space-x-6 md:space-y-0">
      <div className="flex flex-col items-start space-y-2 sm:flex-row sm:items-center sm:space-x-2 sm:space-y-0">
        <Skeleton className="h-10 w-[120px] rounded-lg" />
      </div>
      <div className="flex w-full items-center justify-end gap-2">
        <Skeleton className="size-10 rounded-full" />
        <Skeleton className="size-10 rounded-full" />
      </div>
    </div>
  );
}

function TitlePropertiesSkeleton() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-6">
        <div className="flex h-[36px] items-center md:h-[45px] lg:h-[72px]">
          <Skeleton className="h-[27px] max-w-[300px] rounded-md md:h-[34px] lg:h-[52px]" />
        </div>
        <Skeleton className="h-[14px] w-28 rounded-md" />
      </div>
      <div className="flex flex-col gap-8 md:flex-row">
        <Skeleton className="h-36 w-full" />
      </div>
    </div>
  );
}

function TopBarSkeleton() {
  return (
    <Skeleton className="sticky top-2 z-50 -ml-2 w-[calc(100%+16px)] rounded-xl border-2 shadow-xl sm:-ml-5 sm:w-[calc(100%+40px)]">
      <div className="flex flex-row items-center justify-between rounded-xl px-5 py-4">
        <div className="flex flex-col gap-2">
          <Skeleton className="h-[18px] w-24" />
        </div>
        <Skeleton className="h-10 w-20" />
      </div>
    </Skeleton>
  );
}
