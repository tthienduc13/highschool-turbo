import { Metadata } from "next";

import OnboardUsernameModule from "@/components/modules/Onboard/Username";

export const metadata: Metadata = {
  title: "Tên người dùng",
};

function OnboardUsername() {
  return <OnboardUsernameModule />;
}

export default OnboardUsername;
