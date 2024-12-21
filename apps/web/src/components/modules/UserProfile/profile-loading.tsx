import { Skeleton } from "@highschool/ui/components/ui/skeleton";
import { ProfileArea } from "./profile-area";

export const ProfileLoading = () => {
    return (
        <div className="max-w-4xl mx-auto flex flex-col gap-12">
            <ProfileArea.Skeleton />
            <div className="mb-5 md:mb-10 flex flex-row gap-2">
                <Skeleton className="h-9 w-32" />
                <Skeleton className="h-9 w-32" />
                <Skeleton className="h-9 w-32" />
            </div>
        </div>
    );
};
