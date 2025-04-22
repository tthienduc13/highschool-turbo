import { ColumnDef } from "@tanstack/react-table";
import { Report } from "@highschool/interfaces";
import { Badge } from "@highschool/ui/components/ui/badge";
import { IconPhoto } from "@tabler/icons-react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@highschool/ui/components/ui/avatar";

import { DataTableColumnHeader } from "../../../core/table/data-table-column-header";

import { StatusBadge } from "./status-badge";
import { ReportTableRowActions } from "./report-table-row-actions";

import LongText from "@/components/ui/long-text";
import { formatDate } from "@/lib/utils";

export const columns: ColumnDef<Report>[] = [
  {
    id: "reportTitle",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="title" />
    ),
    cell: ({ row }) => {
      const { reportTitle } = row.original;

      return <LongText className="min-w-52">{reportTitle}</LongText>;
    },
    meta: { className: "w-36" },
  },
  {
    accessorKey: "User",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Reporter" />
    ),
    cell: ({ row }) => (
      <div className="flex items-center gap-x-2">
        <Avatar className="size-8">
          <AvatarImage
            alt={row.original.user.fullname}
            src={row.original.user.profilePicture ?? ""}
          />
          <AvatarFallback>
            {row.original.user.fullname?.[0] ?? ""}
          </AvatarFallback>
        </Avatar>
        <LongText className="max-w-36">{row.original.user.fullname}</LongText>
      </div>
    ),
    enableSorting: false,
  },
  {
    id: "CreatedAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Created At" />
    ),
    cell: ({ row }) => (
      <div>{formatDate(row.original.createdAt.toString())}</div>
    ),
    enableSorting: false,
  },
  {
    id: "Status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => <StatusBadge status={row.original.status} />,
    enableSorting: false,
  },
  {
    accessorKey: "Images",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Images" />
    ),
    cell: ({ row }) =>
      row.original.imageReports.length > 0 ? (
        <Badge className="bg-slate-50" variant="outline">
          {row.original.imageReports.length}{" "}
          <IconPhoto className="ml-1 size-4" />
        </Badge>
      ) : (
        <span className="text-muted-foreground text-sm">None</span>
      ),
    enableSorting: false,
  },
  {
    id: "actions",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Actions" />
    ),
    cell: ReportTableRowActions,
  },
];
