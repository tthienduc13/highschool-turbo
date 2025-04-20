"use client";

import { Avatar, AvatarImage } from "@highschool/ui/components/ui/avatar";
import { Skeleton } from "@highschool/ui/components/ui/skeleton";
import { cn } from "@highschool/ui/lib/utils";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

import { useDashboard } from "@/hooks/use-user-dashboard";

export const ProfileArea = () => {
  const { user, stats } = useDashboard();

  return (
    <div className="flex flex-row items-center gap-4 md:gap-6">
      <div className="relative">
        <Avatar className="size-16 ">
          <AvatarImage alt={user.fullName} src={user.profilePicture} />
        </Avatar>
        {stats.currentLoginStreak > 4 && (
          <DotLottieReact
            autoplay
            loop
            className="absolute -bottom-5 left-1/2 -z-10 size-48 -translate-x-1/2 "
            src="/animation/flame.lottie"
          />
        )}
      </div>
      <div
        className={cn(
          "flex h-16 flex-col",
          user.fullName ? "justify-between" : "justify-center",
        )}
      >
        {user.fullName && (
          <div className="flex flex-row items-center gap-2">
            <h1 className="text-2xl font-bold md:text-4xl">{user.fullName}</h1>
          </div>
        )}
        <p className="text-muted-foreground">@{user.username}</p>
      </div>
    </div>
  );
};

ProfileArea.Skeleton = function ProfileAreaSkeleton() {
  return (
    <div className="flex flex-row items-center gap-4 md:gap-6">
      <Skeleton className="size-16 rounded-full" />
      <div className="flex h-16 flex-col justify-between">
        <Skeleton className="h-6 w-48 md:h-9" />
        <Skeleton className="h-4 w-32" />
      </div>
    </div>
  );
};
