import OnboardUsernameModule from "@/components/modules/Onboard/Username";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Tên người dùng",
};

function OnboardUsername() {
    return <OnboardUsernameModule />;
}

export default OnboardUsername;
