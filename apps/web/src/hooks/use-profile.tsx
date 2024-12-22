import { ProfileContext } from "@/components/modules/UserProfile/hydrate-profile-data";
import { useContext } from "react";

export const useProfile = () => useContext(ProfileContext);
