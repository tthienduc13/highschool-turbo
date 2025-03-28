import { useContext } from "react";

import { DashboardContext } from "@/components/modules/Dashboard/hydrate-user-dashboard";

export const useDashboard = () => useContext(DashboardContext);
