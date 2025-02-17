import { Button } from "@highschool/ui/components/ui/button";
import { IconBell } from "@tabler/icons-react";

export const UserNotification = () => {
  return (
    <Button className="rounded-xl" size={"icon"} variant={"ghost"}>
      <IconBell className="!size-[20px]" />
    </Button>
  );
};
