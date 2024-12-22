import OnboardIntroModule from "@/components/modules/Onboard/Intro";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Chào mừng",
};

function OnboardIntro() {
    return <OnboardIntroModule />;
}

export default OnboardIntro;
