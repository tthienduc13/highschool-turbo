import React from "react";
import { IconArrowRightDashed } from "@tabler/icons-react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@highschool/ui/components/ui/command";
import { ScrollArea } from "@highschool/ui/components/ui/scroll-area";
import { useSession } from "next-auth/react";

import { useSearch } from "@/stores/search-context";
import { UserRole } from "@/domain/enums/user";
import { navAdmin, navModerator } from "@/domain/constants/sidebar";

export function CommandMenu() {
  const { open, setOpen } = useSearch();
  const { data } = useSession();

  const sidebarData =
    data?.user.roleName === UserRole[UserRole.Admin] ? navAdmin : navModerator;

  return (
    <CommandDialog modal open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <ScrollArea className="h-72 pr-1" type="hover">
          <CommandEmpty>No results found.</CommandEmpty>
          {sidebarData.navMain.map((group) => (
            <CommandGroup key={group.title} heading={group.title}>
              {group.items.map((navItem, i) => {
                if (navItem.url)
                  return (
                    <CommandItem
                      key={`${navItem.url}-${i}`}
                      value={navItem.title}
                    >
                      <a className="mr-2 flex h-4 w-4 items-center justify-center">
                        <IconArrowRightDashed className="size-2 text-muted-foreground/80" />
                      </a>
                      {navItem.title}
                    </CommandItem>
                  );
              })}
            </CommandGroup>
          ))}
          <CommandSeparator />
        </ScrollArea>
      </CommandList>
    </CommandDialog>
  );
}
