import { Metadata } from "next";

import OnboardSubscribeModule from "@/components/modules/Onboard/Subscribe";

export const metadata: Metadata = {
  title: "Đăng kí theo dõi",
};

function OnboardSubscribe() {
  return <OnboardSubscribeModule />;
}

export default OnboardSubscribe;
