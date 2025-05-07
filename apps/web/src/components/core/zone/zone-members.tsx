"use client";

import { useSession } from "next-auth/react";
import React from "react";
import { IconBan, IconPlus, IconSearch, IconUserX } from "@tabler/icons-react";
import {
  useAllMembersQuery,
  useZoneDetailQuery,
} from "@highschool/react-query/queries";
import { useParams } from "next/navigation";
import { Button } from "@highschool/ui/components/ui/button";
import { Input } from "@highschool/ui/components/ui/input";
import { Member, MemberRole } from "@highschool/interfaces";
import { cn } from "@highschool/ui/lib/utils";

import { InviteMemberModal } from "./invite-member-modal";
import { RemoveMemberModal } from "./remove-member-modal";
import { MemberComponent } from "./member-component";

export const ZoneMembers = () => {
  const params = useParams();
  const id = params.id as string;
  const { data: session } = useSession();

  const { data: zone } = useZoneDetailQuery(id);
  const { data: zoneMember } = useAllMembersQuery(id);

  const me = zoneMember
    ? zoneMember.members.find((m) => m.email == session?.user?.email)
    : undefined;

  const others = zoneMember
    ? zoneMember.members.filter((m) => m.email != session?.user?.email)
    : [];
  const pending = zoneMember ? zoneMember.pendingMembers : [];

  const [inviteModalOpen, setInviteModalOpen] = React.useState(false);

  const [removeMember, setRemoveMember] = React.useState<string | undefined>();
  const [removeMemberType, setRemoveMemberType] = React.useState<
    "user" | "ban"
  >("user");
  const [search, setSearch] = React.useState("");

  const filterFn = (m: NonNullable<Member>) => {
    const refined = search.trim().toLowerCase();

    if (!refined.length) return true;

    return (
      m.user.username.toLowerCase().includes(refined) ||
      m.user.fullName?.toLowerCase().includes(refined) ||
      m.email?.toLowerCase().includes(refined)
    );
  };

  const pendingFilterFn = (m: (typeof pending)[number]) => {
    const refined = search.trim().toLowerCase();

    if (!refined.length) return true;

    return m.email?.toLowerCase().includes(refined);
  };

  const canManage = (targetRole: MemberRole) =>
    me
      ? me.role === MemberRole.Owner &&
        (targetRole !== "Owner" || me.role === "Owner")
      : false;

  const removeMemberCallback = React.useCallback((id: string) => {
    setRemoveMemberType("user");
    setRemoveMember(id);
  }, []);

  const banMemberCallback = React.useCallback((id: string) => {
    setRemoveMemberType("ban");
    setRemoveMember(id);
  }, []);

  return (
    <div className="mt-10 flex flex-col gap-10 pb-20">
      <div className="flex flex-col gap-6">
        {zone && (
          <>
            <InviteMemberModal
              isOpen={inviteModalOpen}
              zoneId={zone.id}
              onClose={() => setInviteModalOpen(false)}
            />
            <RemoveMemberModal
              id={removeMember || ""}
              isOpen={!!removeMember}
              type={removeMemberType}
              onClose={() => setRemoveMember(undefined)}
            />
          </>
        )}
        <div className="flex flex-row items-center gap-2">
          <div className="flex w-full flex-1 flex-row rounded-md bg-white shadow-sm dark:bg-gray-800">
            <div className="flex size-10 items-center justify-center pl-2">
              <IconSearch
                className="pointer-events-none  text-gray-500"
                size={18}
              />
            </div>
            <Input
              className="h-10 border-none !text-base shadow-none focus-within:ring-0 focus-visible:ring-0 "
              placeholder="Tìm kiếm thành viên"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          {/* <OrganizationAdminOnly> */}
          <Button onClick={() => setInviteModalOpen(true)}>
            <IconPlus size={18} /> Mời
          </Button>
          {/* </OrganizationAdminOnly> */}
        </div>
        {zone ? (
          <div className="rounded-lg border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
            {me && filterFn(me) && (
              <MemberComponent
                isMe
                additionalTags={
                  <>
                    {me.role === MemberRole.Owner && (
                      <div
                        className={cn(
                          "rounded px-2 text-[10px] ",
                          "bg-purple-500/40",
                        )}
                      >
                        {me.role.toLocaleLowerCase() === "owner"
                          ? "Chủ sở hữu"
                          : me.role.toLocaleLowerCase() === "teacher"
                            ? "Người hướng dẫn"
                            : "Học sinh"}
                      </div>
                    )}
                  </>
                }
                email={me.email}
                id={me.id}
                user={me}
              />
            )}
            {others.filter(filterFn).map((m) => (
              <MemberComponent
                key={m.id}
                actions={[
                  {
                    label: "Cấm ",
                    icon: IconBan,
                    onClick: banMemberCallback,
                    destructive: true,
                  },
                  {
                    label: "Xoá",
                    icon: IconUserX,
                    onClick: removeMemberCallback,
                    destructive: true,
                  },
                ]}
                additionalTags={
                  <>
                    {m.role.toLowerCase() !== "Member" && (
                      <div
                        className={cn(
                          "rounded px-2 text-[10px] ",
                          m.role.toLowerCase() === "owner"
                            ? "bg-purple-500/40"
                            : "bg-gray-200/40",
                        )}
                      >
                        {m.role.toLocaleLowerCase() === "owner"
                          ? "Chủ sở hữu"
                          : m.role.toLocaleLowerCase() === "teacher"
                            ? "Người hướng dẫn"
                            : "Học sinh"}
                      </div>
                    )}
                  </>
                }
                canManage={canManage(m.role)}
                email={m.email}
                id={String(m.id)}
                user={m}
              />
            ))}
            {pending.filter(pendingFilterFn).map((m) => (
              <MemberComponent
                key={m.id}
                pending
                actions={[
                  {
                    label: "Cấm ",
                    icon: IconBan,
                    onClick: banMemberCallback,
                    destructive: true,
                  },
                  {
                    label: "Xoá",
                    icon: IconUserX,
                    onClick: removeMemberCallback,
                    destructive: true,
                  },
                ]}
                canManage={canManage(MemberRole.Student)}
                email={m.email}
                id={String(m.id)}
                user={m}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-lg border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
            {Array.from({ length: 10 }).map((_, i) => (
              <MemberComponent
                key={i}
                skeleton
                email="placeholder@example.com"
                id=""
                user={{
                  email: "placeholder@example.com",
                  user: {
                    userId: i.toString(),
                    role: "",
                    fullName: "Jonathan Doe",
                    username: "johndoe",
                    avatar: null,
                  },
                }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
