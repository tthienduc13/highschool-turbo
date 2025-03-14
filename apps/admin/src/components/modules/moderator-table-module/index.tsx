"use client";

import { columns } from "../user-table-module/users-columns";
import { DataTable } from "../../core/table/table";
import { UsersDialogs } from "../user-table-module/users-dialogs";

import { UsersPrimaryButtons } from "./users-primary-buttons";

import { UserRole } from "@/domain/enums/user";
import { useAccountFilter } from "@/hooks/use-filter-account";
import TableProvider from "@/stores/table-context";

function ModeratorTableModule() {
  const filter = useAccountFilter({
    initSearch: "",
    initStatus: [],
    initRole: UserRole.Moderator,
  });

  return (
    <TableProvider>
      <DataTable
        columns={columns}
        extraButton={<UsersPrimaryButtons />}
        filter={filter}
        subTitle="Manage your Moderator roles here."
        title="Moderator List"
      />
      <UsersDialogs />
    </TableProvider>
  );
}

export default ModeratorTableModule;
