import { ColumnDef } from "@tanstack/react-table";
import { School } from "@highschool/interfaces";

import { DataTableColumnHeader } from "../../core/table/data-table-column-header";

import LongText from "@/components/ui/long-text";

export const columns: ColumnDef<School>[] = [
  {
    id: "School",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="School" />
    ),
    cell: ({ row }) => {
      const { schoolName } = row.original;

      return <LongText className="min-w-52">{schoolName}</LongText>;
    },
    meta: { className: "w-36" },
  },
  {
    accessorKey: "Province",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Province" />
    ),
    cell: ({ row }) => (
      <div className="w-fit text-nowrap">{row.original.provinceName}</div>
    ),
    enableSorting: false,
  },
  {
    id: "Number Documents",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Number Documents" />
    ),
    cell: ({ row }) => <div>{row.original.numberDocuments}</div>,
    enableSorting: false,
  },
  // {
  //   id: "actions",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="Actions" />
  //   ),
  //   cell: MasterDataTableRowActions,
  // },
];
