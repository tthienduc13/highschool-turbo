import { Row } from "@tanstack/react-table";
import {
  IconDotsCircleHorizontal,
  IconEdit,
  IconTrash,
} from "@tabler/icons-react";
import { Button } from "@highschool/ui/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@highschool/ui/components/ui/dropdown-menu";
import { ZonePreview } from "@highschool/interfaces";
import { useRouter } from "next/navigation";

import { useTable } from "@/stores/table-context";

interface ZoneTableRowActionsProps {
  row: Row<ZonePreview>;
}

export function ZoneTableRowActions({
  row,
}: Readonly<ZoneTableRowActionsProps>) {
  const { setOpen, setCurrentRow } = useTable();
  const router = useRouter();

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button
          className="data-[state=open]:bg-muted flex size-8 p-0"
          variant="ghost"
        >
          <IconDotsCircleHorizontal className="size-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        <DropdownMenuItem
          onClick={() => {
            setCurrentRow(row.original);
            router.push("/zones/" + row.original.id);
          }}
        >
          View
          <DropdownMenuShortcut>
            <IconEdit size={16} />
          </DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="!text-red-500"
          onClick={() => {
            setCurrentRow(row.original);
            setOpen("delete");
          }}
        >
          Delete
          <DropdownMenuShortcut>
            <IconTrash size={16} />
          </DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
