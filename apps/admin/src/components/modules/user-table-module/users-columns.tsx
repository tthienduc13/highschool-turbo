import { ColumnDef } from "@tanstack/react-table";
import { UserPreview } from "@highschool/interfaces";
import { Badge } from "@highschool/ui/components/ui/badge";
import { cn } from "@highschool/ui/lib/utils";

import { DataTableColumnHeader } from "../../core/table/data-table-column-header";

import { callTypes, userTypes } from "@/domain/constants/user";
import LongText from "@/components/ui/long-text";
import { DataTableRowActions } from "@/components/core/table/data-table-row-actions";

export const columns: ColumnDef<UserPreview>[] = [
  // {
  //   id: "select",
  //   header: ({ table }) => (
  //     <Checkbox
  //       aria-label="Select all"
  //       checked={
  //         table.getIsAllPageRowsSelected() ||
  //         (table.getIsSomePageRowsSelected() && "indeterminate")
  //       }
  //       className="translate-y-[2px]"
  //       onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
  //     />
  //   ),
  //   meta: {
  //     className: cn(
  //       "sticky md:table-cell left-0 z-10 rounded-tl",
  //       "bg-background transition-colors duration-200 group-hover/row:bg-muted group-data-[state=selected]/row:bg-muted",
  //     ),
  //   },
  //   cell: ({ row }) => (
  //     <Checkbox
  //       aria-label="Select row"
  //       checked={row.getIsSelected()}
  //       className="translate-y-[2px]"
  //       onCheckedChange={(value) => row.toggleSelected(!!value)}
  //     />
  //   ),
  //   enableSorting: false,
  //   enableHiding: false,
  // },
  {
    accessorKey: "username",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Username" />
    ),
    cell: ({ row }) => (
      <LongText className="max-w-36 ">{row.getValue("username")}</LongText>
    ),
    meta: {
      className: cn(
        "drop-shadow-[0_1px_2px_rgb(0_0_0_/_0.1)] dark:drop-shadow-[0_1px_2px_rgb(255_255_255_/_0.1)] lg:drop-shadow-none",
        "bg-background transition-colors duration-200 group-hover/row:bg-muted group-data-[state=selected]/row:bg-muted",
        "sticky md:table-cell",
      ),
    },
    enableHiding: false,
  },
  {
    id: "fullName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => {
      const { fullname } = row.original;

      return <LongText className="max-w-36">{fullname}</LongText>;
    },
    meta: { className: "w-36" },
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
    cell: ({ row }) => (
      <div className="w-fit text-nowrap">{row.getValue("email")}</div>
    ),
  },
  {
    accessorKey: "phoneNumber",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Phone" />
    ),
    cell: ({ row }) => <div>{row.getValue("phoneNumber")}</div>,
    enableSorting: false,
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const { status } = row.original;
      const badgeColor = callTypes.get(status);

      return (
        <div className="flex space-x-2">
          <Badge className={cn("capitalize", badgeColor)} variant="outline">
            {row.getValue("status")}
          </Badge>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
    enableHiding: false,
    enableSorting: false,
  },
  {
    accessorKey: "role",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Role" />
    ),
    cell: ({ row }) => {
      const { roleName } = row.original;
      const userType = userTypes.find(
        ({ value }: { value: string }) => value === roleName,
      );

      if (!userType) {
        return null;
      }

      return (
        <div className="flex items-center gap-x-2">
          {userType.icon && (
            <userType.icon className="text-muted-foreground" size={16} />
          )}
          <span className="text-sm capitalize">{row.getValue("role")}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: "actions",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Actions" />
    ),
    cell: DataTableRowActions,
  },
];
