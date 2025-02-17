import { Card } from "@highschool/ui/components/ui/card";
import { Skeleton } from "@highschool/ui/components/ui/skeleton";

const SkeletonWrapper: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <div className="flex h-[21px]">
      <Skeleton className="h-[14px] w-fit rounded-md opacity-50">
        {children}
      </Skeleton>
    </div>
  );
};

export const LearnLoading = () => {
  return (
    <Card className="relative w-full rounded-2xl border-2 border-gray-100 bg-white shadow-xl dark:border-gray-700 dark:bg-gray-800">
      <div className="h-1" />
      <div className="space-y-6 px-8 py-6">
        <div className="flex h-[30px] items-center">
          <SkeletonWrapper />
        </div>
        <div className="min-h-[60px] md:min-h-[140px]">
          <Skeleton className="w-fit rounded-lg" />
        </div>
        <div className="space-y-3">
          <div className="mb-2">
            <SkeletonWrapper />
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-auto">
                <Skeleton className="h-[68px] rounded-xl" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
};
