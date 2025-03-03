"use client";

import { columns } from "../user-table-module/users-columns";
import { UsersTable } from "../user-table-module/users-table";

import { UserRole } from "@/domain/enums/user";
import UsersProvider from "@/stores/users-context";
import { useAccountFilter } from "@/hooks/use-filter-account";

function TeacherTableModule() {
  const filter = useAccountFilter({
    initSearch: "",
    initStatus: [],
    initRole: UserRole.Teacher,
  });

  return (
    <UsersProvider>
      <UsersTable
        columns={columns}
        filter={filter}
        subTitle="Manage your Teachers roles here."
        title="Teacher List"
      />
    </UsersProvider>
  );
}

export default TeacherTableModule;
