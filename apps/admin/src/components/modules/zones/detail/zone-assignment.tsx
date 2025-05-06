"use client";

import { useState } from "react";
import { Badge } from "@highschool/ui/components/ui/badge";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@highschool/ui/components/ui/card";
import { Input } from "@highschool/ui/components/ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@highschool/ui/components/ui/table";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@highschool/ui/components/ui/select";
import { Zone } from "@highschool/interfaces";
import {
    IconCalendar,
    IconClock,
    IconSearch,
    IconUsers,
} from "@tabler/icons-react";
import { Assignment } from "@highschool/interfaces/assignment";

interface ZoneAssignmentsProps {
    zone: Zone;
}

export function ZoneAssignments({ zone }: ZoneAssignmentsProps) {
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");

    // Mock assignments data based on the provided model
    const assignments = zone.assignments || [];

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    const getAssignmentStatus = (assignment: Assignment) => {
        const now = new Date();
        const availableAt = new Date(assignment.availableAt);
        const dueAt = new Date(assignment.dueAt);
        const lockedAt = new Date(assignment.lockedAt);

        if (now < availableAt) {
            return { label: "Upcoming", variant: "secondary" as const };
        } else if (now >= availableAt && now < dueAt) {
            return { label: "Active", variant: "default" as const };
        } else if (now >= dueAt && now < lockedAt) {
            return { label: "Past Due", variant: "outline" as const };
        } else {
            return { label: "Locked", variant: "destructive" as const };
        }
    };

    const filteredAssignments = assignments.filter((assignment) => {
        // Filter by search query
        const matchesSearch =
            assignment.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (assignment.type?.toLowerCase() || "").includes(
                searchQuery.toLowerCase(),
            );

        // Filter by status
        if (statusFilter === "all") return matchesSearch;

        const status = getAssignmentStatus(assignment).label.toLowerCase();

        return matchesSearch && status === statusFilter.toLowerCase();
    });

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <div>
                    <CardTitle>Zone Assignments</CardTitle>
                    <CardDescription>
                        {assignments.length} assignment{assignments.length !== 1 ? "s" : ""}{" "}
                        in this zone
                    </CardDescription>
                </div>
            </CardHeader>
            <CardContent>
                <div className="mb-4 flex flex-col gap-4 sm:flex-row">
                    <div className="flex flex-1 items-center gap-2">
                        <IconSearch className="text-muted-foreground size-4" />
                        <Input
                            className="h-9"
                            placeholder="Search assignments..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Filter by status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Statuses</SelectItem>
                            <SelectItem value="draft">Draft</SelectItem>
                            <SelectItem value="upcoming">Upcoming</SelectItem>
                            <SelectItem value="active">Active</SelectItem>
                            <SelectItem value="past due">Past Due</SelectItem>
                            <SelectItem value="locked">Locked</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="rounded-md border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Assignment</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Questions</TableHead>
                                <TableHead className="hidden md:table-cell">
                                    Available
                                </TableHead>
                                <TableHead className="hidden md:table-cell">Due</TableHead>
                                <TableHead className="hidden lg:table-cell">
                                    Submissions
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredAssignments.length === 0 ? (
                                <TableRow>
                                    <TableCell className="h-24 text-center" colSpan={7}>
                                        No assignments found.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                filteredAssignments.map((assignment) => {
                                    const status = getAssignmentStatus(assignment);

                                    return (
                                        <TableRow key={assignment.id}>
                                            <TableCell>
                                                <div>
                                                    <div className="font-medium">{assignment.title}</div>
                                                    <div className="text-muted-foreground text-xs">
                                                        {assignment.type ? assignment.type : "No type"}
                                                        {assignment.totalTime &&
                                                            ` • ${assignment.totalTime} min`}
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <Badge variant={status.variant}>{status.label}</Badge>
                                            </TableCell>
                                            <TableCell>{assignment.totalQuestion}</TableCell>
                                            <TableCell className="hidden md:table-cell">
                                                <div className="flex flex-col text-xs">
                                                    <div className="flex items-center gap-1">
                                                        <IconCalendar className="size-3" />
                                                        {formatDate(assignment.availableAt)}
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell className="hidden md:table-cell">
                                                <div className="flex flex-col text-xs">
                                                    <div className="flex items-center gap-1">
                                                        <IconClock className="size-3" />
                                                        {formatDate(assignment.dueAt)}
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell className="hidden lg:table-cell">
                                                <div className="flex items-center gap-1">
                                                    <IconUsers className="size-3" />
                                                    <span>{assignment.submissionsCount}</span>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })
                            )}
                        </TableBody>
                    </Table>
                </div>
            </CardContent>
        </Card>
    );
}
