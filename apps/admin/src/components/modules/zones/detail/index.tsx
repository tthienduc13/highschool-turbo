"use client";

import { useZoneDetailQuery } from "@highschool/react-query/queries";
import { Badge } from "@highschool/ui/components/ui/badge";
import { Button } from "@highschool/ui/components/ui/button";
import { IconArrowLeft, IconTrash } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { ZoneOverview } from "./zone-overview";
import { ZoneMembers } from "./zone-members";
import { ZoneContent } from "./zone-content";

interface ZoneDetailModuleProps {
    id: string;
}

export default function ZoneDetailModule({ id }: ZoneDetailModuleProps) {
    const router = useRouter();
    const { data: zone, isPending: isLoading } = useZoneDetailQuery(id);

    useEffect(() => {
        if (!zone && !isLoading) {
            return router.push("/zones");
        }
    }, [isLoading]);

    return (
        <div className="flex flex-col gap-6">
            <div className="flex items-center gap-4">
                <Button asChild size="icon" variant="outline">
                    <Link href="/zones">
                        <IconArrowLeft className="size-4" />
                        <span className="sr-only">Back</span>
                    </Link>
                </Button>
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">{zone?.name}</h1>
                    <p className="text-muted-foreground">Zone ID: {zone?.id}</p>
                </div>
                <div className="ml-auto flex gap-2">
                    <Button variant="destructive">
                        <IconTrash className="mr-2 size-4" />
                        Delete
                    </Button>
                </div>
            </div>

            <div className="relative h-48 w-full overflow-hidden rounded-lg">
                <Image
                    fill
                    alt={`${zone?.name} banner`}
                    className="object-cover"
                    src={zone?.bannerUrl || "/placeholder.svg"}
                />
                <div className="absolute bottom-4 left-4 flex items-center gap-4">
                    <div className="border-background bg-background size-20 overflow-hidden rounded-lg border-4">
                        <Image
                            alt={zone?.name ?? ""}
                            className="size-full object-cover"
                            height={80}
                            src={zone?.logoUrl || "/placeholder.svg"}
                            width={80}
                        />
                    </div>
                    <div className="bg-background/80 rounded-lg p-2 backdrop-blur-sm">
                        <h2 className="text-xl font-bold">{zone?.name}</h2>
                        {zone?.deletedAt ? (
                            <Badge variant="destructive">Deleted</Badge>
                        ) : (
                            <Badge variant="default">Active</Badge>
                        )}
                    </div>
                </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
                {/* Left column - Zone overview */}
                <div className="lg:col-span-1">
                    {zone && <ZoneOverview zone={zone} />}
                </div>

                {/* Right column - Zone members and content */}
                <div className="space-y-6 lg:col-span-2">
                    {zone && <ZoneMembers zone={zone} />}
                    {zone && <ZoneContent zone={zone} />}
                </div>
            </div>
        </div>
    );
}
