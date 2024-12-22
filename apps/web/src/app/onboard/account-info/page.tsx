import OnboardAccountInfoModule from "@/components/modules/Onboard/AccountInfo";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Thông tin tài khoản",
};

function OnboardAccountInfo() {
    return <OnboardAccountInfoModule />;
}

export default OnboardAccountInfo;
