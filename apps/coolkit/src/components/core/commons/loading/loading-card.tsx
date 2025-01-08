import { Skeleton } from "@highschool/ui/components/ui/skeleton";

export const LoadingCard = () => {
  return (
    <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          key={index}
          className="border-border group overflow-hidden rounded-lg border bg-white transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
        >
          <Skeleton className="h-[30vh] w-full" />
        </div>
      ))}
    </div>
  );
};
