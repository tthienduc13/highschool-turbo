import { Metadata } from "next";

import OnboardIntroModule from "@/components/modules/Onboard/Intro";

export const metadata: Metadata = {
  title: "Chào mừng",
};

function OnboardIntro() {
  return <OnboardIntroModule />;
}

export default OnboardIntro;
