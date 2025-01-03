import { Skeleton } from '@highschool/ui/components/ui/skeleton';

export const LoadingCard = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="group bg-white rounded-lg overflow-hidden border border-border transition-all duration-200 hover:shadow-lg hover:-translate-y-1"
                >
                    <Skeleton className="h-[30vh] w-full" />
                </div>
            ))}

        </div>
    )
}