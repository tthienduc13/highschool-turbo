import OnboardSubscribeModule from "@/components/modules/Onboard/Subscribe";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Đăng kí theo dõi",
};

function OnboardSubscribe() {
    return <OnboardSubscribeModule />;
}

export default OnboardSubscribe;
