"use client";

import { useParams } from "next/navigation";

import ZoneDetailModule from "@/components/modules/zones/detail";

function ZoneDetailPage() {
    const { id } = useParams<{ id: string }>();

    return <ZoneDetailModule id={id} />;
}

export default ZoneDetailPage;
