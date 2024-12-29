"use client";

import { HydrateProfileData } from "./hydrate-profile-data";
import { InnerProfile } from "./innder-profile";
import { ProfileLoading } from "./profile-loading";

function UserProfileModule() {
  return (
    <HydrateProfileData fallback={<ProfileLoading />}>
      <InnerProfile />
    </HydrateProfileData>
  );
}

export default UserProfileModule;
