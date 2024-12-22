import OnboardCommandMenuModule from "@/components/modules/Onboard/CommandMenu";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Menu lệnh",
};

function OnboardCommandMenu() {
    return <OnboardCommandMenuModule />;
}

export default OnboardCommandMenu;
