import { DefaultLayout } from "@/components/core/common/onboard/default-layout";
import { PresentWrapper } from "@/components/core/common/onboard/present-wrapper";
import { Button } from "@highschool/ui/components/ui/button";
import { Card, CardContent } from "@highschool/ui/components/ui/card";
import {
    IconBrandFacebook,
    IconBrandFacebookFilled,
} from "@tabler/icons-react";

function OnboardSubscribeModule() {
    return (
        <PresentWrapper>
            <DefaultLayout
                heading="Đăng kí để nhận cập nhật"
                description="Chúng tôi luôn thêm tính năng và phát triển mới. Hãy đăng kí nhận tin mới nhất"
            >
                <Card className="bg-white dark:bg-gray-800/50 p-6 shadow-lg max-w-md w-full mx-4">
                    <CardContent className="p-0">
                        <div className="flex flex-col md:flex-row justify-between items-center gap-4 md:gap-0">
                            <div className="flex flex-col">
                                <div className="font-bold">
                                    Theo dõi Facebook
                                </div>
                                <div className="text-sm text-gray-600 dark:text-gray-400">
                                    Tính năng, chia sẻ,...
                                </div>
                            </div>
                            <Button className="w-full md:w-fit">
                                <IconBrandFacebookFilled size={18} />
                                @highschoolapp
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </DefaultLayout>
        </PresentWrapper>
    );
}

export default OnboardSubscribeModule;
