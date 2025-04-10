import { InnerDashboard } from "./inner-dashboard";
import { HydrateDashboardData } from "./hydrate-user-dashboard";

import { Container } from "@/components/core/layouts/container";

function DashboardModule() {
  return (
    <HydrateDashboardData
    //  fallback={<ProfileLoading />}
    >
      <Container className="mt-10 max-w-6xl" maxWidth="6xl">
        <InnerDashboard />
      </Container>
    </HydrateDashboardData>
  );
}

export default DashboardModule;
