import { DefaultLayout } from "@/components/core/common/onboard/default-layout";
import { PresentWrapper } from "@/components/core/common/onboard/present-wrapper";

function OnboardAccountInfoModule() {
    return (
        <PresentWrapper>
            <DefaultLayout
                heading="Cho chúng tôi hiểu bạn"
                description="Hãy điền đủ thông tin để có trải nghiệm tốt nhất"
            ></DefaultLayout>
        </PresentWrapper>
    );
}

export default OnboardAccountInfoModule;
