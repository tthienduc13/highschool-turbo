"use client";

import { ChangeUsernameInput } from "@/components/core/common/change-username-input";
import { DefaultLayout } from "@/components/core/common/onboard/default-layout";
import { PresentWrapper } from "@/components/core/common/onboard/present-wrapper";
import { mutationEventChannel } from "@/events/mutation";
import { getSafeRedirectUrl } from "@/utils/urls";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

function OnboardUsernameModule() {
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get("callbackUrl");
    const returnUrl = searchParams.get("returnUrl");
    const [image, setImage] = useState<string | null>(null);
    const callback = returnUrl ? getSafeRedirectUrl(returnUrl as string) : null;

    const [disabled, setDisabled] = useState(false);
    const [loading, setLoading] = useState(false);
    const [changeAvatarOpen, setChangeAvatarOpen] = useState(false);
    return (
        <PresentWrapper>
            <DefaultLayout
                heading="Chọn tên người dùng"
                description="Bạn có thể thay đổi tên người dùng và hình đại diện bất kỳ lúc nào trong cài đặt."
                defaultNext={!callback}
                nextDisabled={disabled}
                nextLoading={loading}
                onNext={async () => {
                    mutationEventChannel.emit("submitUsername");

                    // if (callback)
                    //     await router.replace({
                    //         pathname: callback,
                    //         query: {
                    //             callbackUrl,
                    //         },
                    //     });
                }}
            >
                <div className="flex flex-col items-center justify-center pb-6 w-full md:max-w-md mx-auto">
                    <ChangeUsernameInput
                        showButton={false}
                        onChange={async () => {
                            // await utils.user.me.invalidate();
                        }}
                        disabledIfUnchanged={false}
                        onActionStateChange={(disabled) =>
                            setDisabled(disabled)
                        }
                        onLoadingChange={(loading) => setLoading(loading)}
                    />
                </div>
            </DefaultLayout>
        </PresentWrapper>
    );
}

export default OnboardUsernameModule;
