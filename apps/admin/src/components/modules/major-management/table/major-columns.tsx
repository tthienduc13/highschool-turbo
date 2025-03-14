import { ColumnDef } from "@tanstack/react-table";
import { Major } from "@highschool/interfaces";

import { DataTableRowActions } from "@/components/core/table/data-table-row-actions";
import { DataTableColumnHeader } from "@/components/core/table/data-table-column-header";
import LongText from "@/components/ui/long-text";

export const columns: ColumnDef<Major>[] = [
  {
    accessorKey: "Major Code",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Code" />
    ),
    cell: ({ row }) => (
      <div className="w-fit text-nowrap">{row.original.majorCode}</div>
    ),
    enableSorting: false,
  },
  {
    id: "Name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => (
      <LongText className="max-w-[10vw]">{row.original.name}</LongText>
    ),
    enableSorting: false,
  },
  {
    id: "Description",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Description" />
    ),
    cell: ({ row }) => (
      <div className="min-w-[23vw]">{row.original.description}</div>
    ),
    enableSorting: false,
  },
  {
    id: "SkillYouLearn",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="SkillYouLearn" />
    ),
    cell: ({ row }) => (
      <div className="min-w-[23vw]">{row.original.skillYouLearn}</div>
    ),
    enableSorting: false,
  },
  {
    id: "actions",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Actions" />
    ),
    cell: DataTableRowActions,
  },
];
