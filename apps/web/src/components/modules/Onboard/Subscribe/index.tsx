import { Button } from "@highschool/ui/components/ui/button";
import { Card, CardContent } from "@highschool/ui/components/ui/card";

import {
  IconBrandFacebook,
  IconBrandFacebookFilled,
} from "@tabler/icons-react";

import { DefaultLayout } from "@/components/core/common/onboard/default-layout";
import { PresentWrapper } from "@/components/core/common/onboard/present-wrapper";

function OnboardSubscribeModule() {
  return (
    <PresentWrapper>
      <DefaultLayout
        heading="Đăng kí để nhận cập nhật"
        description="Chúng tôi luôn thêm tính năng và phát triển mới. Hãy đăng kí nhận tin mới nhất"
      >
        <Card className="mx-4 w-full max-w-md bg-white p-6 shadow-lg dark:bg-gray-800/50">
          <CardContent className="p-0">
            <div className="flex flex-col items-center justify-between gap-4 md:flex-row md:gap-0">
              <div className="flex flex-col">
                <div className="font-bold">Theo dõi Facebook</div>
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
