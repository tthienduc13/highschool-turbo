import { Metadata } from "next";

import OnboardAccountTypeModule from "@/components/modules/Onboard/AccountType";

export const metadata: Metadata = {
  title: "Loại tài khoản",
};

function OnboardAccountType() {
  return <OnboardAccountTypeModule />;
}
export default OnboardAccountType;
