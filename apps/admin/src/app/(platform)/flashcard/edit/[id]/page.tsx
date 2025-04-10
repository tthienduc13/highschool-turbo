"use client";

import { useParams } from "next/navigation";

import EditFLashcardModule from "@/components/modules/flashcard/edit";

function EditFlashcardPage() {
    const { id } = useParams();
    const flashcardIs = Array.isArray(id) ? id[0] : id;

    return <EditFLashcardModule id={flashcardIs} />;
}

export default EditFlashcardPage;
