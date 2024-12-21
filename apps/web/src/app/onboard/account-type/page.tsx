import OnboardAccountTypeModule from "@/components/modules/Onboard/AccountType";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Loại tài khoản",
};

function OnboardAccountType() {
    return <OnboardAccountTypeModule />;
}
export default OnboardAccountType;
