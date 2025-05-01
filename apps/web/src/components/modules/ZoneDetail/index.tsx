import React from "react";
import { Col, Grid } from "@tremor/react";

import { Container } from "@/components/core/layouts/container";
import { ZoneDisplay } from "@/components/core/zone/zone-display";
import { ZoneActivity } from "@/components/core/zone/dashboard/activity";
import { OrganizationUsers } from "@/components/core/zone/dashboard/users";
import { ZoneMembers } from "@/components/core/zone/zone-members";
import { ZoneResource } from "@/components/core/zone/dashboard/resources";
import ZoneLayout from "@/components/core/layouts/zone-layout";

function ZoneDetailModule() {
  return (
    <ZoneLayout>
      <Container className="px-0" maxWidth="6xl">
        <div className="flex flex-col gap-12">
          {/* {org && isUpgraded && org.published && <OrganizationWelcome />} */}
          <div className="flex flex-col gap-6">
            <ZoneDisplay />
            <Grid
              className="mt-6 gap-6"
              numItems={1}
              numItemsLg={3}
              numItemsSm={1}
            >
              <Col className="h-[500]" numColSpanLg={2}>
                <ZoneActivity />
              </Col>
              <Col className="mt-6 space-y-6 lg:mt-0" numColSpan={1}>
                <OrganizationUsers />
                <ZoneResource />
              </Col>
            </Grid>
          </div>
          <ZoneMembers />
        </div>
      </Container>
    </ZoneLayout>
  );
}

export default ZoneDetailModule;
