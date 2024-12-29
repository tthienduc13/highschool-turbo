import { Metadata } from "next";

import OnboardCommandMenuModule from "@/components/modules/Onboard/CommandMenu";

export const metadata: Metadata = {
  title: "Menu lệnh",
};

function OnboardCommandMenu() {
  return <OnboardCommandMenuModule />;
}

export default OnboardCommandMenu;
