"use client";

import { columns } from "../user-table-module/users-columns";
import { UsersTable } from "../user-table-module/users-table";
import { UsersDialogs } from "../user-table-module/users-dialogs";

import { UsersPrimaryButtons } from "./users-primary-buttons";

import { UserRole } from "@/domain/enums/user";
import UsersProvider from "@/stores/users-context";
import { useAccountFilter } from "@/hooks/use-filter-account";

function ModeratorTableModule() {
  const filter = useAccountFilter({
    initSearch: "",
    initStatus: [],
    initRole: UserRole.Moderator,
  });

  return (
    <UsersProvider>
      <UsersTable
        columns={columns}
        extraButton={<UsersPrimaryButtons />}
        filter={filter}
        subTitle="Manage your Moderator roles here."
        title="Moderator List"
      />
      <UsersDialogs />
    </UsersProvider>
  );
}

export default ModeratorTableModule;
