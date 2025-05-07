import React from "react";
import {
  IconDotsVertical,
  IconExternalLink,
  TablerIcon,
} from "@tabler/icons-react";
import { Member } from "@highschool/interfaces";
import { cn } from "@highschool/ui/lib/utils";
import { Skeleton } from "@highschool/ui/components/ui/skeleton";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@highschool/ui/components/ui/dropdown-menu";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@highschool/ui/components/ui/avatar";
import { Button } from "@highschool/ui/components/ui/button";

export interface MemberComponentAction {
  label: string;
  icon: TablerIcon;
  destructive?: boolean;
  onClick: (id: string) => void;
}

export interface MemberComponentProps {
  id: string;
  email: string;
  user?: Pick<Member, "email" | "user">;
  isMe?: boolean;
  pending?: boolean;
  skeleton?: boolean;
  additionalTags?: React.ReactNode;
  canManage?: boolean;
  actions?: MemberComponentAction[];
}

export const MemberComponentRaw: React.FC<MemberComponentProps> = ({
  id,
  email,
  user,
  isMe,
  pending,
  skeleton,
  additionalTags,
  canManage = false,
  actions = [],
}) => {
  const borderColor = "border-gray-200 dark:border-gray-700";
  const hoverColor = "hover:bg-gray-50 dark:hover:bg-gray-750";
  const mutedColor = "text-gray-600 dark:text-gray-400";

  const Tags: React.FC<{ isMobile?: boolean }> = ({ isMobile = false }) => {
    return (
      <div className={cn("flex flex-row items-center gap-2")}>
        {isMe && (
          <div className="rounded bg-blue-500/40 px-2 text-[10px]">Bạn</div>
        )}
        {pending && (
          <div className="rounded bg-orange-500/40 px-2 text-[10px]">
            Đang chờ duyệt
          </div>
        )}
        {additionalTags}
      </div>
    );
  };

  return (
    <div
      className={cn(
        "flex flex-row items-center justify-between px-[18px] py-[14px] border-y border-solid my-[-1px] max-w-full transition-colors duration-200",
        borderColor,
        hoverColor,
        "first:rounded-t-lg",
        "last:rounded-b-lg",
      )}
    >
      <div className="flex w-full min-w-0 flex-col items-start space-y-0 md:w-auto md:flex-row md:items-center md:space-x-4">
        <div className="flex w-full justify-between space-x-4 md:w-auto md:justify-start md:space-x-0">
          {skeleton ? (
            <Skeleton className="size-9 rounded-full" />
          ) : (
            <Avatar className="size-9">
              <AvatarImage
                alt={user?.user?.username || email}
                src={user?.user?.avatar || undefined}
              />
              <AvatarFallback>{email.charAt(0).toUpperCase()}</AvatarFallback>
            </Avatar>
          )}
          <div className="flex flex-row gap-4 space-x-4 md:hidden">
            <Tags isMobile={false} />
            <Options
              actions={actions}
              canManage={canManage}
              id={id}
              isMe={isMe}
              skeleton={skeleton}
              user={user}
            />
          </div>
        </div>
        <div className="flex min-w-0 max-w-full flex-col space-y-0.5 whitespace-nowrap">
          {skeleton ? (
            <Skeleton className="h-5 w-36" />
          ) : (
            <div className="flex gap-2 overflow-hidden whitespace-nowrap">
              <p className="overflow-hidden text-ellipsis text-sm font-bold">
                {user?.user?.fullName || user?.user?.username || email}
              </p>
              <Tags />
            </div>
          )}
          {skeleton ? (
            <Skeleton className="h-5 w-24" />
          ) : (
            <p
              className={cn(
                "text-sm overflow-hidden text-ellipsis",
                mutedColor,
              )}
            >
              {pending ? "Invited" : email}
            </p>
          )}
        </div>
      </div>
      <Options
        actions={actions}
        canManage={canManage}
        id={id}
        isMe={isMe}
        skeleton={skeleton}
        user={user}
      />
    </div>
  );
};

const Options: React.FC<
  Pick<
    MemberComponentProps,
    "id" | "user" | "skeleton" | "isMe" | "canManage" | "actions"
  >
> = ({ id, user, skeleton, isMe, canManage = false, actions = [] }) => {
  const [menuOpen, setMenuOpen] = React.useState(false);

  const menuBg = "bg-white dark:bg-gray-800";
  const redMenuColor = "text-red-600 dark:text-red-200";

  const openCallback = React.useCallback(() => {
    setMenuOpen(true);
  }, []);
  const closeCallback = React.useCallback(() => {
    setMenuOpen(false);
  }, []);

  if (skeleton) {
    return (
      <div className={cn("md:block")}>
        <Skeleton className="h-8 w-16 rounded-md" />
      </div>
    );
  }

  return (
    <div className={cn("relative hidden md:block")}>
      <div className="flex flex-row items-center gap-2">
        {user && (
          <Button asChild className="size-8" size="sm" variant="outline">
            <Link
              className="flex  items-center justify-center"
              href={`/profile/${user?.user?.username || ""}`}
            >
              <IconExternalLink size="16" />
            </Link>
          </Button>
        )}
        {!isMe && canManage && (
          <DropdownMenu open={menuOpen} onOpenChange={setMenuOpen}>
            <DropdownMenuTrigger asChild>
              <Button className="size-8" size="sm" variant="outline">
                <div className="flex w-8 justify-center">
                  <IconDotsVertical size="18" />
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className={cn("min-w-[10rem] overflow-hidden shadow-lg", menuBg)}
            >
              {actions.map((a, i) => (
                <DropdownMenuItem
                  key={i}
                  className={cn(
                    "text-sm py-1.5",
                    a.destructive && redMenuColor,
                  )}
                  onClick={() => a.onClick?.(id)}
                >
                  <span className="mr-2">
                    <a.icon size={16} />
                  </span>
                  {a.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </div>
  );
};

export const MemberComponent = React.memo(MemberComponentRaw);
