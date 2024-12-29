import { Metadata } from "next";

import SignInModule from "@/components/modules/SignIn";

export const metadata: Metadata = {
  title: "Đăng nhập",
};

function SignInPage() {
  return <SignInModule />;
}

export default SignInPage;
