import OnboardDoneModule from "@/components/modules/Onboard/Done";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Bạn đã hoàn tất! 🎉",
};

function OnboardDone() {
    return <OnboardDoneModule />;
}

export default OnboardDone;
