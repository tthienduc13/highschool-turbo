import { ColumnDef } from "@tanstack/react-table";
import { University } from "@highschool/interfaces";

import { DataTableColumnHeader } from "../../core/table/data-table-column-header";

import LongText from "@/components/ui/long-text";
import { DataTableRowActions } from "@/components/core/table/data-table-row-actions";

export const columns: ColumnDef<University>[] = [
  {
    id: "UniCode",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="UniCode" />
    ),
    cell: ({ row }) => (
      <div className="w-fit text-nowrap">{row.original.uniCode}</div>
    ),
    enableSorting: false,
  },
  {
    id: "Name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => {
      const { name } = row.original;

      return <LongText className="max-w-36">{name}</LongText>;
    },
    meta: { className: "w-36" },
    enableSorting: false,
  },
  {
    accessorKey: "Region",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Region" />
    ),
    cell: ({ row }) => {
      const { city } = row.original;

      return <LongText className="max-w-36">{city}</LongText>;
    },
    meta: { className: "w-36" },
    enableSorting: false,
  },
  {
    accessorKey: "Phone",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Phone" />
    ),
    cell: ({ row }) => <div>{row.original.contactPhone}</div>,
    enableSorting: false,
  },
  {
    accessorKey: "Email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
    cell: ({ row }) => (
      <LongText className="max-w-36">{row.original.contactEmail}</LongText>
    ),
    enableSorting: false,
  },
  {
    accessorKey: "universityMajor",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="UniversityMajor" />
    ),
    cell: ({ row }) => <div>{row.original.universityMajors.length}</div>,
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
