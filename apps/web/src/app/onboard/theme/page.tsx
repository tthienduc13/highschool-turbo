import OnboardThemeModule from "@/components/modules/Onboard/Theme";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Chủ đề",
};

function OnboardTheme() {
    return <OnboardThemeModule />;
}

export default OnboardTheme;
