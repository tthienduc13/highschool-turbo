"use client";

import { useState } from "react";
import { PaginationState } from "@tanstack/react-table";
import { useUsersQuery } from "@highschool/react-query/queries";

import { columns } from "./users-columns";
import { UsersTable } from "./users-table";
import { UsersDialogs } from "./users-dialogs";

import { UserRole, UserStatus } from "@/domain/enums/user";
import UsersProvider from "@/stores/users-context";

function StudentTableModule() {
    const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
        pageIndex: 1,
        pageSize: 10,
    });

    const { data, isLoading } = useUsersQuery({
        page: pageIndex,
        eachPage: pageSize,
        roleName: UserRole.Student.toString(),
        status: UserStatus.All.toString(),
    });

    return (
        <UsersProvider>
            <UsersTable
                columns={columns}
                data={Array.isArray(data?.data) ? data.data : []}
            />
            <UsersDialogs />
        </UsersProvider>
    );
}

export default StudentTableModule;
