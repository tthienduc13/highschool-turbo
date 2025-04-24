"use client";

import { HydrateProfileData } from "./hydrate-profile-data";
import { InnerProfile } from "./inner-profile";
import { ProfileLoading } from "./profile-loading";

import { Container } from "@/components/core/layouts/container";
import { EnterWrapper } from "@/components/core/common/auth/enter-wrapper";

function UserProfileModule() {
  return (
    <EnterWrapper>
      <HydrateProfileData fallback={<ProfileLoading />}>
        <Container maxWidth="4xl">
          <InnerProfile />
        </Container>
      </HydrateProfileData>
    </EnterWrapper>
  );
}

export default UserProfileModule;
