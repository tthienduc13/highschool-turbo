"use client";

import { WithFooter } from "@/components/core/common/with-footer";
import { Container } from "@/components/core/layouts/container";

import { HydrateProfileData } from "./hydrate-profile-data";
import { InnerProfile } from "./innder-profile";
import { ProfileLoading } from "./profile-loading";

function UserProfileModule() {
  return (
    <HydrateProfileData fallback={<ProfileLoading />}>
      <WithFooter>
        <Container maxWidth="4xl">
          <InnerProfile />
        </Container>
      </WithFooter>
    </HydrateProfileData>
  );
}

export default UserProfileModule;
