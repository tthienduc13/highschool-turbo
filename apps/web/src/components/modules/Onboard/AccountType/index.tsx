"use client";

import { DefaultLayout } from "@/components/core/common/onboard/default-layout";
import { PresentWrapper } from "@/components/core/common/onboard/present-wrapper";
import { UserType } from "@highschool/interfaces";
import { cn } from "@highschool/ui/lib/utils";
import { IconBooks, IconSchool } from "@tabler/icons-react";
import { useState } from "react";

function OnboardAccountTypeModule() {
    const [selectedType, setSelectedType] = useState<UserType>("Student");
    console.log(selectedType);
    return (
        <PresentWrapper>
            <DefaultLayout
                heading="Bạn là học sinh hay giáo viên?"
                description="Hãy chọn đúng để có trải nghiệm tốt nhất"
                // defaultNext={false}
                // nextLoading={loading}
                // onNext={async () => {
                //     setLoading(true);
                //     await setUserType.mutateAsync({
                //         type,
                //     });
                // }}
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
