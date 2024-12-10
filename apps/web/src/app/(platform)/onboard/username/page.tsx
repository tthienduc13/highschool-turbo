import { DefaultLayout } from "@/components/core/common/onboard/default-layout";
import { PresentWrapper } from "@/components/core/common/onboard/present-wrapper";

function OnboardUsername() {
    return (
        <PresentWrapper>
            <DefaultLayout
                heading="Chọn tên người dùng"
                description="Có thể thay đổi tên và avatar trong cài đặt"
            >
                <div> user name</div>
            </DefaultLayout>
        </PresentWrapper>
    );
}

export default OnboardUsername;
