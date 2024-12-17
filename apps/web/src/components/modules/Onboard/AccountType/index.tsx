"use client";

import { DefaultLayout } from "@/components/core/common/onboard/default-layout";
import {
    PresentWrapper,
    useNextStep,
} from "@/components/core/common/onboard/present-wrapper";
import { UserType } from "@highschool/interfaces";
import { useUpdateBaseUserInfoMutation } from "@highschool/react-query/queries";
import { cn } from "@highschool/ui/lib/utils";
import { IconBooks, IconSchool } from "@tabler/icons-react";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

function OnboardAccountTypeModule() {
    const next = useNextStep();
    const { data: session, update } = useSession();
    const [selectedType, setSelectedType] = useState<UserType>("Student");
    const [loading, setLoading] = useState(false);

    const updateRole = useUpdateBaseUserInfoMutation();

    useEffect(() => {
        if (updateRole.isSuccess) {
            next();
        }
    });
    return (
        <PresentWrapper>
            <DefaultLayout
                heading="Bạn là học sinh hay giáo viên?"
                description="Hãy chọn đúng để có trải nghiệm tốt nhất"
                nextLoading={loading}
                onNext={async () => {
                    setLoading(true);
                    await updateRole.mutateAsync({
                        roleName: selectedType.toLocaleLowerCase(),
                    });
                    update({
                        user: { ...session?.user, roleName: selectedType },
                    });
                }}
            >
                <div className=" border-2 rounded-xl grid grid-cols-2 overflow-hidden">
                    <div
                        onClick={() => setSelectedType("Student")}
                        className={cn(
                            "flex items-center justify-center w-36 md:w-48 h-24 md:h-32 cursor-pointer ",
                            selectedType === "Student" &&
                                "bg-gray-200 dark:bg-gray-700"
                        )}
                    >
                        <div
                            className={cn(
                                "flex flex-row items-center gap-2 transition-colors duration-150 ease-cubic-ease",
                                selectedType === "Student" &&
                                    "text-blue-500 dark:text-blue-300"
                            )}
                        >
                            <IconBooks size={18} />
                            <div className="font-semibold ">Học sinh</div>
                        </div>
                    </div>
                    <div
                        onClick={() => setSelectedType("Teacher")}
                        className={cn(
                            "flex items-center justify-center w-36 md:w-48 h-24 md:h-32 cursor-pointer ",
                            selectedType === "Teacher" &&
                                "bg-gray-200 dark:bg-gray-700"
                        )}
                    >
                        <div
                            className={cn(
                                "flex flex-row items-center gap-2 transition-colors duration-150 ease-cubic-ease",
                                selectedType === "Teacher" &&
                                    "text-blue-500 dark:text-blue-300"
                            )}
                        >
                            <IconSchool size={18} />
                            <div className="font-semibold ">Giáo viên</div>
                        </div>
                    </div>
                </div>
            </DefaultLayout>
        </PresentWrapper>
    );
}

export default OnboardAccountTypeModule;
