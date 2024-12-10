import SignInModule from "@/components/modules/SignIn";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Đăng nhập",
};

function SignInPage() {
    return <SignInModule />;
}

export default SignInPage;
