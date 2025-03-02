// import { IconBell } from "@tabler/icons-react";
// import dynamic from "next/dynamic";
import { Bell, Inbox, Notifications } from "@novu/nextjs";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@highschool/ui/components/ui/popover";
import { IconBell } from "@tabler/icons-react";

import { useMe } from "@/hooks/use-me";

export const UserNotification = () => {
  const me = useMe();

  return (
    <Inbox applicationIdentifier={"2T6E0LAU8aRZ"} subscriberId={me?.userId!}>
      <Popover>
        <PopoverTrigger asChild>
          <button>
            <Bell
              renderBell={(unreadCount) => (
                <div className="relative">
                  <IconBell className="size-5" />
                  {unreadCount > 0 && (
                    <span className="absolute -right-1 -top-1 flex size-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                      {unreadCount}
                    </span>
                  )}
                </div>
              )}
            />
          </button>
        </PopoverTrigger>
        <PopoverContent align="center" className="w-[350px] p-0" sideOffset={5}>
          <Notifications />
        </PopoverContent>
      </Popover>
    </Inbox>
  );
};
