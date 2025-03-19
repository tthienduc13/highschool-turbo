"use client";

import { useSession } from "next-auth/react";

import AdminDashboardModule from "./admin";
import ModeratorDashboardModule from "./moderator";

import { UserRole } from "@/domain/enums/user";

function OverviewModule() {
    const { data } = useSession();

    const module =
        data?.user.roleName === UserRole[UserRole.Admin] ? (
            <AdminDashboardModule />
        ) : (
            <ModeratorDashboardModule />
        );

    return module;
}

export default OverviewModule;
