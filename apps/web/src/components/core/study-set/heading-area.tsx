import { useState } from "react";
import { ConfirmModal } from "../common/confirm-modal";
import { useSet } from "@/hooks/use-set";
import { visibilityIcon } from "../common/renderer/visibility-icon";
import { visibilityText } from "../common/renderer/visibility-text";
import { Button } from "@highschool/ui/components/ui/button";
import {
    IconBooks,
    IconEditCircle,
    IconSchool,
    IconTrash,
} from "@tabler/icons-react";
import { gradeRenderer, gradeTextRenderer } from "../common/renderer/grade";
import Link from "next/link";
import { useRouter } from "next/navigation";

export const HeadingArea = () => {
    const { flashcard } = useSet();
    const router = useRouter();
    let deleteSetLoading = false;
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);

    // TODO: ADD delete flashcard function
    return (
        <>
            <ConfirmModal
                isOpen={deleteModalOpen}
                onClose={() => setDeleteModalOpen(false)}
                heading="Xoá bộ thẻ ghi nhớ này?"
                body={
                    <p className="text-muted-foreground">
                        Bạn có chắc chắn muốn bộ thẻ ghi nhớ này và toàn bộ nội
                        dung? Hành động này không thể hoàn tác.
                    </p>
                }
                actionText="Delete"
                isLoading={deleteSetLoading}
                onConfirm={() => {
                    // deleteSet.mutate({ studySetId: id });
                    console.log("delete");
                }}
                destructive
            />
            <div className="flex flex-col gap-4">
                <h1 className="md:text-4xl text-2xl font-bold">
                    {flashcard.flashcardName}
                </h1>
                <div className="flex flex-row gap-2 text-lg text-gray-600 dark:text-gray-400 cursor-pointer">
                    <Link
                        href={"/course"}
                        className="flex flex-row items-center gap-2 hover:text-primary transition-all ease-in-out duration-200"
                    >
                        <IconBooks size={20} />
                        {flashcard.subjectName}
                    </Link>
                    <p>•</p>
                    <div className="flex flex-row items-center gap-2">
                        <IconSchool size={20} />
                        {gradeTextRenderer(flashcard.grade)}
                    </div>
                </div>
                <div className=" flex sm:flex-row flex-col sm:items-center justify-between gap-2">
                    <div className="flex flex-row items-center gap-2 text-gray-600 dark:text-gray-400">
                        <div className="flex flex-row items-center gap-2">
                            <div className="mb-0.5">
                                {visibilityIcon(flashcard.status, 18)}
                            </div>
                            <p> {visibilityText(flashcard.status)}</p>
                        </div>
                        <p>•</p>
                        <p> {flashcard.numberOfFlashcardContent} thẻ ghi nhớ</p>
                    </div>
                    <div className="border rounded-lg overflow-hidden flex flex-row w-fit">
                        <Button
                            size={"icon"}
                            variant={"ghost"}
                            className="rounded-none "
                            onClick={() =>
                                router.push(`/study-set/${flashcard.slug}/edit`)
                            }
                        >
                            <IconEditCircle />
                        </Button>
                        <Button
                            size={"icon"}
                            variant={"ghost"}
                            className="rounded-none"
                            // onClick={() => setDeleteOpen(true)}
                        >
                            <IconTrash />
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
};
