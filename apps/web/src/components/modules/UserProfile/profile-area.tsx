import { useProfile } from "@/hooks/use-profile";
import { Avatar, AvatarImage } from "@highschool/ui/components/ui/avatar";
import { cn } from "@highschool/ui/lib/utils";
import { IconDiscountCheck } from "@tabler/icons-react";
import { Skeleton } from "@highschool/ui/components/ui/skeleton";

export const ProfileArea = () => {
    const profile = useProfile();
    return (
        <div className="flex flex-row gap-4 md:gap-6 items-center">
            <Avatar className="size-16">
                <AvatarImage
                    src={profile.profilePicture}
                    alt={profile.fullname}
                />
            </Avatar>
            <div
                className={cn(
                    "h-16 flex flex-col  ",
                    profile.fullname ? "justify-between" : "justify-center"
                )}
            >
                {profile.fullname && (
                    <div className="flex flex-row gap-2 items-center">
                        <h1 className="md:text-4xl text-2xl font-bold">
                            {profile.fullname}
                        </h1>
                        {profile.roleName.toLowerCase() === "teacher" && (
                            <IconDiscountCheck
                                className="text-blue-700"
                                aria-label="Giáo viên"
                            />
                        )}
                    </div>
                )}
                <p className="text-muted-foreground">@{profile.username}</p>
            </div>
        </div>
    );
};

ProfileArea.Skeleton = function ProfileAreaSkeleton() {
    return (
        <div className="flex flex-row gap-4 md:gap-6 items-center">
            <Skeleton className="h-16 w-16 rounded-full" />
            <div className="h-16 flex flex-col justify-between">
                <Skeleton className="md:h-9 h-6 w-48" />
                <Skeleton className="h-4 w-32" />
            </div>
        </div>
    );
};
