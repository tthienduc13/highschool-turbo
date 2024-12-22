"use client";

import { DefaultLayout } from "@/components/core/common/onboard/default-layout";
import {
    PresentWrapper,
    useNextStep,
} from "@/components/core/common/onboard/present-wrapper";
import { useMutation } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { completeOnboard } from "@highschool/react-query/apis";

function OnboardDoneModule() {
    const { data: session, update } = useSession();
    const router = useRouter();
    const params = useSearchParams();
    const callbackUrl = params.get("callbackUrl");

    const [startedLoading, setStartedLoading] = useState(false);

    console.log(session?.user.isNewUser);

    const completedOnboard = useMutation({
        mutationKey: ["complete-onboard"],
        mutationFn: () => completeOnboard({ userId: session?.user.userId! }),
        onSuccess: async () => {
            await update({
                ...session,
                user: {
                    ...session?.user,
                    isNewUser: false,
                },
            });
        },
        onError: () => {
            router.replace(
                `/onboard/username?returnUrl=/onboarding/done&callbackUrl=${encodeURIComponent(
                    callbackUrl ?? ""
                )}`
            );
        },
    });

    const next = useNextStep();
    useEffect(() => {
        if (!session?.user.isNewUser) return;
        next();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [session?.user?.isNewUser]);
    return (
        <PresentWrapper>
            <DefaultLayout
                heading="Bạn đã hoàn tất! 🎉"
                description="Bây giờ mọi thứ đã xong, bạn đã sẵn sàng bắt đầu sử dụng Highschool"
                action="Xong"
                nextLoading={startedLoading}
                onNext={async () => {
                    setStartedLoading(true);
                    await completedOnboard.mutateAsync();
                }}
            ></DefaultLayout>
        </PresentWrapper>
    );
}

export default OnboardDoneModule;
