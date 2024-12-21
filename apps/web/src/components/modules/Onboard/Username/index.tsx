"use client";

import { ChangeUsernameInput } from "@/components/core/common/change-username-input";
import { DefaultLayout } from "@/components/core/common/onboard/default-layout";
import { PresentWrapper } from "@/components/core/common/onboard/present-wrapper";
import { mutationEventChannel } from "@/events/mutation";
import { getSafeRedirectUrl } from "@/utils/urls";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

import { Avatar, AvatarImage } from "@highschool/ui/components/ui/avatar";
import { useMe } from "@/hooks/use-me";
import { Button } from "@highschool/ui/components/ui/button";
import { IconUpload } from "@tabler/icons-react";
import { UploadAvatarModal } from "@/components/core/common/upload-avatar";

function OnboardUsernameModule() {
    const me = useMe();
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
                <div className="flex flex-col gap-2 items-center justify-center pb-6 w-full md:max-w-sm mx-auto">
                    <UploadAvatarModal
                        isOpen={changeAvatarOpen}
                        onClose={() => setChangeAvatarOpen(false)}
                    />
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
                    <div className="flex flex-row items-center gap-6 mt-3 w-full">
                        <Avatar className="h-[60px] w-[60px]">
                            <AvatarImage
                                src={me?.image!}
                                alt={me?.fullname ?? "Highschool User"}
                            ></AvatarImage>
                        </Avatar>
                        <div className="flex flex-col gap-[10px]">
                            <div className="text-gray-600 text-sm dark:text-gray-400">
                                Kích thước gợi ý 256x256
                            </div>
                            <div className="flex flex-row items-center gap-2">
                                <Button
                                    onClick={() => setChangeAvatarOpen(true)}
                                    variant={"outline"}
                                    size={"sm"}
                                >
                                    <IconUpload />
                                    Tải lên ảnh đại diện
                                </Button>
                                <Button variant={"outline"} size={"sm"}>
                                    Xoá ảnh đại diện
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </DefaultLayout>
        </PresentWrapper>
    );
}

export default OnboardUsernameModule;
