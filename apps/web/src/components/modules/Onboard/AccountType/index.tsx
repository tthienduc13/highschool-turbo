"use client";

import { useSession } from "next-auth/react";
import { useState } from "react";
import { UserType } from "@highschool/interfaces";
import { useUpdateBaseUserInfoMutation } from "@highschool/react-query/queries";
import { cn } from "@highschool/ui/lib/utils";
import { IconBooks, IconSchool } from "@tabler/icons-react";
import { ACCESS_TOKEN } from "@highschool/lib/constants";
import { setClientCookie } from "@highschool/lib/cookies";

import { DefaultLayout } from "@/components/core/common/onboard/default-layout";
import {
  PresentWrapper,
  useNextStep,
} from "@/components/core/common/onboard/present-wrapper";
import { updateAccessTokenCookie } from "@/actions/auth";

function OnboardAccountTypeModule() {
  const next = useNextStep();
  const { data: session, update } = useSession();
  const [selectedType, setSelectedType] = useState<UserType>("Student");
  const [loading, setLoading] = useState(false);

  const updateRole = useUpdateBaseUserInfoMutation();

  return (
    <PresentWrapper>
      <DefaultLayout
        description="Hãy chọn đúng để có trải nghiệm tốt nhất"
        heading="Bạn là học sinh hay giáo viên?"
        nextLoading={loading}
        onNext={async () => {
          setLoading(true);
          try {
            const result = await updateRole.mutateAsync({
              roleName: selectedType.toLowerCase(),
            });

            if (result.data?.accessToken) {
              // 1. Set client-side cookie for immediate client access
              setClientCookie(ACCESS_TOKEN, result.data.accessToken);

              // 2. Update the server-side HTTP-only cookie via server action
              await updateAccessTokenCookie(result.data.accessToken);

              // 3. Update the session with the new role and token
              await update({
                ...session,
                user: {
                  ...session?.user,
                  roleName: selectedType,
                  accessToken: result.data.accessToken,
                },
              });

              // Move to next step
              next();
            }
          } catch (error) {
            console.error("Failed to update role:", error);
          } finally {
            setLoading(false);
          }
        }}
      >
        <div className="grid grid-cols-2 overflow-hidden rounded-xl border-2">
          <button
            className={cn(
              "flex h-24 w-36 cursor-pointer items-center justify-center md:h-32 md:w-48",
              selectedType === "Student" && "bg-gray-200 dark:bg-gray-700",
            )}
            onClick={() => setSelectedType("Student")}
          >
            <div
              className={cn(
                "ease-cubic-ease flex flex-row items-center gap-2 transition-colors duration-150",
                selectedType === "Student" &&
                  "text-blue-500 dark:text-blue-300",
              )}
            >
              <IconBooks size={18} />
              <div className="font-semibold">Học sinh</div>
            </div>
          </button>
          <button
            className={cn(
              "flex h-24 w-36 cursor-pointer items-center justify-center md:h-32 md:w-48",
              selectedType === "Teacher" && "bg-gray-200 dark:bg-gray-700",
            )}
            onClick={() => setSelectedType("Teacher")}
          >
            <div
              className={cn(
                "ease-cubic-ease flex flex-row items-center gap-2 transition-colors duration-150",
                selectedType === "Teacher" &&
                  "text-blue-500 dark:text-blue-300",
              )}
            >
              <IconSchool size={18} />
              <div className="font-semibold">Giáo viên</div>
            </div>
          </button>
        </div>
      </DefaultLayout>
    </PresentWrapper>
  );
}

export default OnboardAccountTypeModule;
