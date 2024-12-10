"use client";

import { EnterWrapper } from "@/components/core/common/auth/enter-wrapper";
import { AuthWrapper } from "@/components/core/common/auth/wrapper";
import { useRouter } from "next/navigation";

function SignInModule() {
    const router = useRouter();
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
