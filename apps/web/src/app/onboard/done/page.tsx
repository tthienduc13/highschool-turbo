import { Metadata } from "next";

import OnboardDoneModule from "@/components/modules/Onboard/Done";

export const metadata: Metadata = {
  title: "Bạn đã hoàn tất! 🎉",
};

function OnboardDone() {
  return <OnboardDoneModule />;
}

export default OnboardDone;
