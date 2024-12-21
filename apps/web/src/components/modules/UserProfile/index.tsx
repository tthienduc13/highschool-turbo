"use client";

import { HydrateProfileData } from "./hydrate-profile-data";
import { ProfileLoading } from "./profile-loading";
import { InnerProfile } from "./innder-profile";

function UserProfileModule() {
    return (
        <HydrateProfileData fallback={<ProfileLoading />}>
            <InnerProfile />
        </HydrateProfileData>
    );
}

export default UserProfileModule;
