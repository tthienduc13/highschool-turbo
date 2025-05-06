import { ColumnDef } from "@tanstack/react-table";
import { ZonePreview, ZoneStatus } from "@highschool/interfaces";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@highschool/ui/components/ui/avatar";
import { Badge } from "@highschool/ui/components/ui/badge";

import { DataTableColumnHeader } from "../../../core/table/data-table-column-header";

import { ZoneTableRowActions } from "./university-table-row-actions";

import LongText from "@/components/ui/long-text";
import { formatDate } from "@/lib/utils";

export const columns: ColumnDef<ZonePreview>[] = [
  {
    id: "ZoneName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ZoneName" />
    ),
    cell: ({ row }) => (
      <div className="flex items-center gap-x-2">
        <Avatar className="size-8">
          <AvatarImage alt={"image"} src={row.original.logoUrl ?? ""} />
          <AvatarFallback>Thumbnail</AvatarFallback>
        </Avatar>
        <LongText className="max-w-36">{row.original.name}</LongText>
      </div>
    ),
    meta: { className: "min-w-12" },
    enableSorting: false,
  },
  {
    id: "Content",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Content" />
    ),
    cell: ({ row }) => (
      // <div className="flex flex-col gap-2">
      //   <span>
      //     {row.original.documentCount +
      //       row.original.folderCount +
      //       row.original.flashcardCount}{" "}
      //     items
      //   </span>
      //   <div className="flex flex-wrap gap-2">
      //     <Badge>{row.original.documentCount} docs</Badge>
      //     <Badge>{row.original.folderCount} folders</Badge>
      //     <Badge>{row.original.flashcardCount} cards</Badge>
      //   </div>
      // </div>
      <div className="space-x-2">
        <Badge variant={"outline"}>{row.original.memberCount} members</Badge>
        <Badge variant={"secondary"}>
          {row.original.assignmentCount} assignments
        </Badge>
      </div>
    ),
    meta: { className: "w-22" },
    enableSorting: false,
  },
  {
    accessorKey: "Author",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Author" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-x-2">
          <Avatar className="size-8">
            <AvatarImage
              alt={row.original.author?.authorName[0] ?? ""}
              src={row.original.author?.authorImage ?? ""}
            />
          </Avatar>
          <LongText className="max-w-36">
            {row.original.author?.authorName}
          </LongText>
        </div>
      );
    },
    meta: { className: "w-36" },
    enableSorting: false,
  },
  {
    accessorKey: "Status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => (
      <Badge
        variant={
          row.original.status == ZoneStatus.Banned ? "destructive" : "default"
        }
      >
        {row.original.status}
      </Badge>
    ),
    enableSorting: false,
  },
  {
    accessorKey: "CreatedAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Created At" />
    ),
    cell: ({ row }) => <div>{formatDate(row.original.createdAt)}</div>,
    enableSorting: false,
  },
  {
    id: "actions",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Actions" />
    ),
    cell: ZoneTableRowActions,
  },
];
