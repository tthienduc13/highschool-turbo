import { Avatar, AvatarImage } from "@highschool/ui/components/ui/avatar";
import { Skeleton } from "@highschool/ui/components/ui/skeleton";
import { cn } from "@highschool/ui/lib/utils";

import { IconDiscountCheck } from "@tabler/icons-react";

import { useProfile } from "@/hooks/use-profile";

export const ProfileArea = () => {
  const profile = useProfile();
  return (
    <div className="flex flex-row items-center gap-4 md:gap-6">
      <Avatar className="size-16">
        <AvatarImage src={profile.profilePicture} alt={profile.fullname} />
      </Avatar>
      <div
        className={cn(
          "flex h-16 flex-col",
          profile.fullname ? "justify-between" : "justify-center",
        )}
      >
        {profile.fullname && (
          <div className="flex flex-row items-center gap-2">
            <h1 className="text-2xl font-bold md:text-4xl">
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
    <div className="flex flex-row items-center gap-4 md:gap-6">
      <Skeleton className="h-16 w-16 rounded-full" />
      <div className="flex h-16 flex-col justify-between">
        <Skeleton className="h-6 w-48 md:h-9" />
        <Skeleton className="h-4 w-32" />
      </div>
    </div>
  );
};
