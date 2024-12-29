import { useContext } from "react";

import { ProfileContext } from "@/components/modules/UserProfile/hydrate-profile-data";

export const useProfile = () => useContext(ProfileContext);
