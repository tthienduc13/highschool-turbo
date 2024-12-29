import { Metadata } from "next";

import OnboardThemeModule from "@/components/modules/Onboard/Theme";

export const metadata: Metadata = {
  title: "Chủ đề",
};

function OnboardTheme() {
  return <OnboardThemeModule />;
}

export default OnboardTheme;
