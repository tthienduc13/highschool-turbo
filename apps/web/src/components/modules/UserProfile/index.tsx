"use client";

import { HydrateProfileData } from "./hydrate-profile-data";
import { InnerProfile } from "./innder-profile";
import { ProfileLoading } from "./profile-loading";

import { Container } from "@/components/core/layouts/container";
import { WithFooter } from "@/components/core/common/with-footer";

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
