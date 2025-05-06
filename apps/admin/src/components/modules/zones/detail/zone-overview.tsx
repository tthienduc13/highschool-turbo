import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@highschool/ui/components/ui/card";
import { Separator } from "@highschool/ui/components/ui/separator";
import { Badge } from "@highschool/ui/components/ui/badge";
import {
    IconCalendar,
    IconFile,
    IconFolder,
    IconLayoutGrid,
    IconPencil,
    IconStatusChange,
} from "@tabler/icons-react";
import { Member, Zone } from "@highschool/interfaces";
import { Avatar, AvatarImage } from "@highschool/ui/components/ui/avatar";

import { formatDate } from "@/lib/utils";

interface ZoneOverviewProps {
    zone: Zone;
    author?: Member;
}

export function ZoneOverview({ zone, author }: ZoneOverviewProps) {
    const totalContent =
        zone.documentIds.length +
        zone.flashcardIds.length +
        zone.folderIds.length +
        zone.assignments.length;

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Zone Overview</CardTitle>
                    <CardDescription>Basic information about this zone</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div>
                        <h3 className="text-muted-foreground mb-1 text-sm font-medium">
                            Description
                        </h3>
                        <p className="text-sm">{zone.description}</p>
                    </div>

                    <Separator />

                    <div className="space-y-3">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <IconStatusChange className="text-muted-foreground size-4" />
                                <span className="text-sm">Status</span>
                            </div>
                            <span className="text-sm font-medium">{zone.status ?? ""}</span>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <IconCalendar className="text-muted-foreground size-4" />
                                <span className="text-sm">Created at</span>
                            </div>
                            <span className="text-sm font-medium">
                                {formatDate(zone.createdAt ?? "")}
                            </span>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <IconCalendar className="text-muted-foreground size-4" />
                                <span className="text-sm">Updated at</span>
                            </div>
                            <span className="text-sm font-medium">
                                {formatDate(zone.updatedAt ?? "")}
                            </span>
                        </div>

                        {zone.deletedAt && (
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <IconCalendar className="text-destructive size-4" />
                                    <span className="text-sm">Deleted at</span>
                                </div>
                                <span className="text-sm font-medium">
                                    {formatDate(zone.deletedAt)}
                                </span>
                            </div>
                        )}
                    </div>

                    <Separator />

                    <div className="space-y-3">
                        <h3 className="text-muted-foreground text-sm font-medium">
                            Content Summary
                        </h3>
                        <div className="grid grid-cols-2 gap-3">
                            <div className="flex items-center gap-2">
                                <IconFile className="text-muted-foreground size-4" />
                                <span className="text-sm">Documents</span>
                                <Badge className="ml-auto" variant="secondary">
                                    {zone.documentIds.length}
                                </Badge>
                            </div>
                            <div className="flex items-center gap-2">
                                <IconLayoutGrid className="text-muted-foreground size-4" />
                                <span className="text-sm">Flashcards</span>
                                <Badge className="ml-auto" variant="secondary">
                                    {zone.flashcardIds.length}
                                </Badge>
                            </div>
                            <div className="flex items-center gap-2">
                                <IconFolder className="text-muted-foreground size-4" />
                                <span className="text-sm">Folders</span>
                                <Badge className="ml-auto" variant="secondary">
                                    {zone.folderIds.length}
                                </Badge>
                            </div>
                            <div className="flex items-center gap-2">
                                <IconPencil className="text-muted-foreground size-4" />
                                <span className="text-sm">Assigns</span>
                                <Badge className="ml-auto" variant="secondary">
                                    {zone.assignments.length}
                                </Badge>
                            </div>
                        </div>
                    </div>

                    <Separator />

                    <div className="bg-muted rounded-md p-3">
                        <div className="text-center">
                            <div className="text-2xl font-bold">{totalContent}</div>
                            <p className="text-muted-foreground text-xs">
                                Total Content Items
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Author Detail</CardTitle>
                    <CardDescription>Author information</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center gap-2">
                        <Avatar className="size-8">
                            <AvatarImage
                                alt={author?.user.fullName ?? ""}
                                src={author?.user.avatar ?? ""}
                            />
                        </Avatar>
                        <p className="break-all text-xs">{author?.email ?? ""}</p>
                    </div>

                    <Separator />

                    <div className="flex items-center gap-2">
                        <h3 className="text-muted-foreground text-sm font-medium">
                            Full Name:
                        </h3>
                        <p className="break-all text-xs">{author?.user.fullName ?? ""}</p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
