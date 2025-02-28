import { IconUserPlus } from "@tabler/icons-react";
import { Button } from "@highschool/ui/components/ui/button";

import { useUsers } from "@/stores/users-context";

export function UsersPrimaryButtons() {
  const { setOpen } = useUsers();

  return (
    <div className="flex gap-2">
      <Button
        className="space-x-1"
        onClick={() => {
          setOpen("add");
        }}
      >
        <span>Add User</span> <IconUserPlus size={18} />
      </Button>
    </div>
  );
}
