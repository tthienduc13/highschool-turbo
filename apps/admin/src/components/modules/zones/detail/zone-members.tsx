"use client";

import { useState } from "react";
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@highschool/ui/components/ui/avatar";
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
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@highschool/ui/components/ui/dropdown-menu";
import { Badge } from "@highschool/ui/components/ui/badge";
import {
    IconBan,
    IconClock,
    IconDotsCircleHorizontal,
    IconMail,
    IconSearch,
    IconUserPlus,
    IconUsers,
} from "@tabler/icons-react";

interface Member {
    id: string;
    name: string;
    email: string;
    role: string;
    joinedAt: string;
}

interface PendingInvite {
    id: string;
    email: string;
    invitedAt: string;
}

interface BannedUser {
    id: string;
    name: string;
    email: string;
    bannedAt: string;
    reason: string;
}

interface ZoneMembersProps {
    zone: {
        members?: Member[];
        pendingInvites?: PendingInvite[];
        bannedUsers?: BannedUser[];
        zoneMembershipsCount: number;
        pendingZoneInvitesCount: number;
        zoneBansCount: number;
    };
}

export function ZoneMembers({ zone }: ZoneMembersProps) {
    const [searchQuery, setSearchQuery] = useState("");

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
        });
    };

    const members = zone.members || [];
    const pendingInvites = zone.pendingInvites || [];
    const bannedUsers = zone.bannedUsers || [];

    const filteredMembers = members.filter(
        (member) =>
            member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            member.email.toLowerCase().includes(searchQuery.toLowerCase()),
    );

    const filteredInvites = pendingInvites.filter((invite) =>
        invite.email.toLowerCase().includes(searchQuery.toLowerCase()),
    );

    const filteredBanned = bannedUsers.filter(
        (user) =>
            user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.email.toLowerCase().includes(searchQuery.toLowerCase()),
    );

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <div>
                    <CardTitle>Zone Members</CardTitle>
                    <CardDescription>Manage members, invites, and bans</CardDescription>
                </div>
                <Button size="sm">
                    <IconUserPlus className="mr-2 size-4" />
                    Invite Member
                </Button>
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
                                                    alt={member.name}
                                                    src={`/placeholder.svg`}
                                                />
                                                <AvatarFallback>
                                                    {member.name.substring(0, 2).toUpperCase()}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <p className="font-medium">{member.name}</p>
                                                <p className="text-muted-foreground text-xs">
                                                    {member.email}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <Badge variant="outline">{member.role}</Badge>
                                            <div className="text-muted-foreground text-xs">
                                                Joined {formatDate(member.joinedAt)}
                                            </div>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button
                                                        className="size-8"
                                                        size="icon"
                                                        variant="ghost"
                                                    >
                                                        <IconDotsCircleHorizontal className="size-4" />
                                                        <span className="sr-only">Open menu</span>
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                    <DropdownMenuItem>Change role</DropdownMenuItem>
                                                    <DropdownMenuItem>View activity</DropdownMenuItem>
                                                    <DropdownMenuSeparator />
                                                    <DropdownMenuItem className="text-destructive">
                                                        Remove from zone
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem className="text-destructive">
                                                        Ban user
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
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
                                                    Invited {formatDate(invite.invitedAt)}
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
                                                <AvatarImage alt={user.name} src={`/placeholder.svg`} />
                                                <AvatarFallback>
                                                    {user.name.substring(0, 2).toUpperCase()}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <p className="font-medium">{user.name}</p>
                                                <p className="text-muted-foreground text-xs">
                                                    {user.email}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <div className="text-xs">
                                                <span className="text-muted-foreground">
                                                    Banned {formatDate(user.bannedAt)}
                                                </span>
                                                <p className="text-destructive">
                                                    Reason: {user.reason}
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
