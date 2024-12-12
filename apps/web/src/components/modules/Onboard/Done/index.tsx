import { DefaultLayout } from "@/components/core/common/onboard/default-layout";
import { PresentWrapper } from "@/components/core/common/onboard/present-wrapper";

function OnboardDoneModule() {
    return (
        <PresentWrapper>
            <DefaultLayout
                heading="Bạn đã hoàn tất! 🎉"
                description="Bây giờ mọi thứ đã xong, bạn đã sẵn sàng bắt đầu sử dụng Highschool"
                action="Xong"
                // nextLoading={startedLoading}
                // onNext={async () => {
                //     setStartedLoading(true);
                //     await completeOnboarding.mutateAsync();
                // }}
            ></DefaultLayout>
        </PresentWrapper>
    );
}

export default OnboardDoneModule;
