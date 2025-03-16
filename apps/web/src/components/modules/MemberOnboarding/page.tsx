"use client";

import { IconArrowRight, IconUserPlus } from "@tabler/icons-react";
import { Button } from "@highschool/ui/components/ui/button";
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Card, CardContent } from "@highschool/ui/components/ui/card";
import { Skeleton } from "@highschool/ui/components/ui/skeleton";
import { useZoneDetailQuery } from "@highschool/react-query/queries";
import dynamic from "next/dynamic";

import { WizardLayout } from "@/components/core/zone/wizard-layout";
import { OnboardingMember } from "@/components/core/zone/onboarding-member";
import { useMe } from "@/hooks/use-me";

const InviteMemberModal = dynamic(
  () =>
    import("@/components/core/zone/invite-member-modal").then(
      (mod) => mod.InviteMemberModal,
    ),
  { ssr: false },
);

function MemberOnboardingModule() {
  const params = useParams();
  const me = useMe();

  const router = useRouter();

  const { data: zone } = useZoneDetailQuery(params.id as string);
  const [inviteModalOpen, setInviteModalOpen] = useState(false);

  return (
    <WizardLayout
      currentStep={1}
      description="Mời thêm quản trị viên tổ chức tham gia. Thành viên có thể quản lý hoạt động tổ chức, lớp học, giáo viên và học sinh.."
      steps={5}
      title="Mời thành viên"
    >
      {zone && (
        <InviteMemberModal
          isOpen={inviteModalOpen}
          //   token={org.inviteToken?.token}
          zoneId={zone.id}
          onClose={() => setInviteModalOpen(false)}
        />
      )}
      <div className="flex flex-col gap-6">
        <div className="flex flex-row items-center justify-between px-8">
          {!zone ? (
            <Skeleton className="h-8 w-[200px]" />
          ) : (
            <Button size="sm" onClick={() => setInviteModalOpen(true)}>
              <IconUserPlus size={16} />
              Thêm thành viên vào Zone
            </Button>
          )}

          {!zone ? (
            <Skeleton className="h-8 w-[100px]" />
          ) : (
            <Button
              size="sm"
              variant="ghost"
              onClick={async () => {
                //   await router.push(`/new/${org!.id}/domain-setup`);
              }}
            >
              {/* {(org?.members?.length || 1) + (org?.pendingInvites.length || 0) >
            1 ? (
              <>
                Tiếp tục <IconArrowRight className="!size-[18px]" />
              </>
            ) : (
              <>
                Bỏ qua <IconArrowRight className="!size-[18px]" />
              </>
            )} */}
              Bỏ qua <IconArrowRight className="!size-[18px]" />
            </Button>
          )}
        </div>
        <Card className="rounded-xl p-0 shadow-lg">
          <CardContent className="p-8 pb-4">
            {!zone ? (
              <Skeleton className="h-10 w-full" />
            ) : (
              <div className="flex flex-col gap-4">
                <div className="-ml-4 -mt-4 flex flex-col gap-0">
                  <OnboardingMember
                    isMe
                    image={me?.image}
                    isLoaded={!!me}
                    label={me?.roleName || "Chủ"}
                    nameOrEmail={me?.name}
                  />
                  {/* {others
                  .filter((m) => visible.includes(m.id))
                  .map((m) => (
                    <OnboardingMember
                      key={m.id}
                      image={m.user.image}
                      label={m.role}
                      nameOrEmail={m.user.name}
                    />
                  ))}
                {pending
                  .filter((m) => visible.includes(m.id))
                  .map((m) => (
                    <OnboardingMember
                      key={m.id}
                      pending
                      image={m.user?.image}
                      label={m.role}
                      nameOrEmail={m.user?.name ?? m.email}
                    />
                  ))} */}
                </div>
                {/* {numHidden > 0 && (
                <HStack color="gray.500" ml="2">
                  <IconUsers size={16} />
                  <HStack spacing="1">
                    <Text fontSize="sm">{plural(all.length, "member")}</Text>
                    <IconPointFilled size={8} />
                    <Text fontSize="sm">{numHidden} hidden</Text>
                  </HStack>
                </HStack>
              )} */}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </WizardLayout>
  );
}

export default MemberOnboardingModule;
