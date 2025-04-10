"use client";

import { useParams } from "next/navigation";

import CreatePresetModule from "@/components/modules/fsrs-management/create-preset";

function UpdatePresetPage() {
    const { id } = useParams<{ id: string }>();

    return <CreatePresetModule id={id} />;
}

export default UpdatePresetPage;
