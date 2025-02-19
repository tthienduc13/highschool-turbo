import type React from "react";

import { IconSearch } from "@tabler/icons-react";
import { Label } from "@highschool/ui/components/ui/label";

import { SidebarInput } from "../../common/sidebar";

export function SearchForm({ ...props }: React.ComponentProps<"form">) {
  return (
    <form {...props}>
      <div className="relative">
        <Label className="sr-only" htmlFor="search">
          Tìm kiếm
        </Label>
        <SidebarInput
          className="h-8 pl-7"
          id="search"
          placeholder="Type to search..."
        />
        <IconSearch className="pointer-events-none absolute left-2 top-1/2 size-4 -translate-y-1/2 select-none opacity-50" />
      </div>
    </form>
  );
}
