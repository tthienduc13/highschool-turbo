"use client";

import { useParams } from "next/navigation";

import UpdateDocumentModule from "@/components/modules/documents/update";

function UpdateDocumentPage() {
    const { slug } = useParams<{ slug: string }>();

    return <UpdateDocumentModule slug={slug} />;
}

export default UpdateDocumentPage;
