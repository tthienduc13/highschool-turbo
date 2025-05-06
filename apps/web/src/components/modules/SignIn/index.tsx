"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { EnterWrapper } from "@/components/core/common/auth/enter-wrapper";
import { AuthWrapper } from "@/components/core/common/auth/wrapper";

function SignInModule() {
  const router = useRouter();

  useEffect(() => {
    sessionStorage.removeItem("hasTriedSignIn");
  }, []);

  return (
    <EnterWrapper>
      <AuthWrapper
        mode="login"
        onUserExists={(callback) => {
          router.push(callback);
        }}
      />
    </EnterWrapper>
  );
}

export default SignInModule;
