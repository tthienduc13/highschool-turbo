import { InnerDashboard } from "./inner-dashboard";
import { HydrateDashboardData } from "./hydrate-user-dashboard";

import { WithFooter } from "@/components/core/common/with-footer";
import { Container } from "@/components/core/layouts/container";

function DashboardModule() {
  return (
    <HydrateDashboardData
    //  fallback={<ProfileLoading />}
    >
      <WithFooter>
        <Container maxWidth="7xl">
          <InnerDashboard />
        </Container>
      </WithFooter>
    </HydrateDashboardData>
  );
}

export default DashboardModule;
