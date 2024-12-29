import { Button } from "@highschool/ui/components/ui/button";

import { IconBell } from "@tabler/icons-react";

export const UserNotification = () => {
  return (
    <Button variant={"ghost"} size={"icon"} className="rounded-xl">
      <IconBell className="!size-[20px]" />
    </Button>
  );
};
