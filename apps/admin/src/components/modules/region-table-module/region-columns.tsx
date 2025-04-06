import { ColumnDef } from "@tanstack/react-table";
import { City } from "@highschool/interfaces";

import { DataTableColumnHeader } from "../../core/table/data-table-column-header";

import LongText from "@/components/ui/long-text";

export const columns: ColumnDef<City>[] = [
  {
    id: "ID",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ID" />
    ),
    cell: ({ row }) => (
      <div className="w-fit text-nowrap">{row.original.provinceId}</div>
    ),
  },
  {
    id: "Name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => {
      const { provinceName } = row.original;

      return <LongText className="max-w-50 min-w-44">{provinceName}</LongText>;
    },
  },
  {
    accessorKey: "Number School",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Number School" />
    ),
    cell: ({ row }) => <div>{row.original.numberSchool}</div>,
    enableSorting: false,
  },
  // {
  //   id: "actions",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="Actions" />
  //   ),
  //   cell: DataTableRowActions,
  // },
];
