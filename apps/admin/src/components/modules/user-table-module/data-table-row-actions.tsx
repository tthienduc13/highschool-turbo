import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { Row } from "@tanstack/react-table";
import { IconEdit, IconInfoCircle, IconTrash } from "@tabler/icons-react";
import { Button } from "@highschool/ui/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@highschool/ui/components/ui/dropdown-menu";
import { UserPreview } from "@highschool/interfaces";

import { useUsers } from "@/stores/users-context";

interface DataTableRowActionsProps {
  row: Row<UserPreview>;
}

export function DataTableRowActions({ row }: DataTableRowActionsProps) {
  const { setOpen, setCurrentRow } = useUsers();

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button
          className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
          variant="ghost"
        >
          <DotsHorizontalIcon className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        <DropdownMenuItem
          onClick={() => {
            setCurrentRow(row.original);
            setOpen("view");
          }}
        >
          View
          <DropdownMenuShortcut>
            <IconInfoCircle size={16} />
          </DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            setCurrentRow(row.original);
            setOpen("edit");
          }}
        >
          Edit
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
