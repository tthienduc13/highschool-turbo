"use client";

import { useState } from "react";
import { Avatar, AvatarImage } from "@highschool/ui/components/ui/avatar";
import { Button } from "@highschool/ui/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@highschool/ui/components/ui/card";
import { Input } from "@highschool/ui/components/ui/input";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@highschool/ui/components/ui/tabs";
import { Badge } from "@highschool/ui/components/ui/badge";
import {
  IconBan,
  IconClock,
  IconMail,
  IconSearch,
  IconUsers,
} from "@tabler/icons-react";
import { MemberList, Zone } from "@highschool/interfaces";

interface ZoneMembersProps {
  memberList: MemberList;
  zone: Zone;
}

export function ZoneMembers({ memberList, zone }: ZoneMembersProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const members = memberList.members || [];
  const pendingInvites = memberList.pendingMembers || [];
  const bannedUsers = memberList.bannedMembers || [];

  const filteredMembers = members.filter(
    (member) =>
      member.user.fullName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.email.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const filteredInvites = pendingInvites.filter((invite) =>
    invite.email.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const filteredBanned = bannedUsers.filter(
    (user) =>
      user.user.fullName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Zone Members</CardTitle>
          <CardDescription>Manage members, invites, and bans</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-4 flex items-center gap-2">
          <IconSearch className="text-muted-foreground size-4" />
          <Input
            className="h-9"
            placeholder="Search members..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <Tabs defaultValue="members">
          <div className="flex items-center justify-between">
            <TabsList>
              <TabsTrigger className="flex items-center gap-2" value="members">
                <IconUsers className="size-4" />
                Members
                <Badge className="ml-1" variant="secondary">
                  {zone.zoneMembershipsCount}
                </Badge>
              </TabsTrigger>
              <TabsTrigger className="flex items-center gap-2" value="pending">
                <IconClock className="size-4" />
                Pending
                <Badge className="ml-1" variant="secondary">
                  {zone.pendingZoneInvitesCount}
                </Badge>
              </TabsTrigger>
              <TabsTrigger className="flex items-center gap-2" value="banned">
                <IconBan className="size-4" />
                Banned
                <Badge className="ml-1" variant="secondary">
                  {zone.zoneBansCount}
                </Badge>
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent className="mt-4" value="members">
            {filteredMembers.length === 0 ? (
              <div className="flex h-32 flex-col items-center justify-center rounded-md border border-dashed">
                <p className="text-muted-foreground text-sm">
                  No members found
                </p>
                {searchQuery && (
                  <Button
                    size="sm"
                    variant="link"
                    onClick={() => setSearchQuery("")}
                  >
                    Clear search
                  </Button>
                )}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredMembers.map((member) => (
                  <div
                    key={member.id}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage
                          alt={member.user.fullName?.[0]}
                          src={member.user.avatar ?? ""}
                        />
                      </Avatar>
                      <div>
                        <p className="font-medium">{member.user.fullName}</p>
                        <p className="text-muted-foreground text-xs">
                          {member.email}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <Badge variant="outline">{member.role}</Badge>
                      <div className="text-muted-foreground text-xs">
                        Joined {formatDate(member.createdAt.toString())}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent className="mt-4" value="pending">
            {filteredInvites.length === 0 ? (
              <div className="flex h-32 flex-col items-center justify-center rounded-md border border-dashed">
                <p className="text-muted-foreground text-sm">
                  No pending invites
                </p>
                {searchQuery && (
                  <Button
                    size="sm"
                    variant="link"
                    onClick={() => setSearchQuery("")}
                  >
                    Clear search
                  </Button>
                )}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredInvites.map((invite) => (
                  <div
                    key={invite.id}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <div className="bg-muted flex size-10 items-center justify-center rounded-full">
                        <IconMail className="text-muted-foreground size-4" />
                      </div>
                      <div>
                        <p className="font-medium">{invite.email}</p>
                        <p className="text-muted-foreground text-xs">
                          Invited {formatDate(invite.createdAt.toString())}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        Resend
                      </Button>
                      <Button size="sm" variant="destructive">
                        Cancel
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent className="mt-4" value="banned">
            {filteredBanned.length === 0 ? (
              <div className="flex h-32 flex-col items-center justify-center rounded-md border border-dashed">
                <p className="text-muted-foreground text-sm">No banned users</p>
                {searchQuery && (
                  <Button
                    size="sm"
                    variant="link"
                    onClick={() => setSearchQuery("")}
                  >
                    Clear search
                  </Button>
                )}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredBanned.map((user) => (
                  <div
                    key={user.id}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage
                          alt={user.user.fullName?.[0]}
                          src={user.user.avatar ?? ""}
                        />
                      </Avatar>
                      <div>
                        <p className="font-medium">{user.user.fullName}</p>
                        <p className="text-muted-foreground text-xs">
                          {user.email}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-xs">
                        <span className="text-muted-foreground">
                          Banned {formatDate(user.createdAt.toString())}
                        </span>
                        <p className="text-destructive">
                          Reason: {"Inappropriate content"}
                        </p>
                      </div>
                      <Button size="sm" variant="outline">
                        Unban
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
