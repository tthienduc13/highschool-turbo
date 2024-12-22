import { Flashcard, StudySetVisibility } from "@highschool/interfaces";
import { GenericCard } from "./generic-card";
import { visibilityIcon } from "./visibility-icon";
import { IconPointFilled, IconProgress } from "@tabler/icons-react";

export interface StudySetCardProps {
    studySet: Pick<Flashcard, "id" | "flashcardName" | "status" | "star">;
    numTerms: number;
    // collaborators?: { total: number; avatars: string[] };
    draft?: boolean;
    user: {
        fullname: string | null;
        image: string | null;
    };
    verified?: boolean;
    removable?: boolean;
    onRemove: () => void;
}

export const StudySetCard = ({
    studySet,
    numTerms,
    // collaborators,
    draft,
    user,
    verified = false,
    removable = false,
    onRemove,
}: StudySetCardProps) => {
    return (
        <GenericCard
            title={studySet.flashcardName || "Chưa đặt tên"}
            numItems={numTerms}
            star={studySet.star}
            url={
                !draft
                    ? `/study-set/${studySet.id}`
                    : `/study-set/${studySet.id}/edit`
            }
            itemsLabel={"thẻ"}
            label={
                draft ? (
                    <>
                        <IconProgress size={16} />
                        <div className="flex flex-row gap-1 items-center text-sm">
                            <p>Bản nháp</p>
                            <IconPointFilled size={8} />
                            <p>{numTerms} thẻ</p>
                        </div>
                    </>
                ) : undefined
            }
            reverseTitle={draft}
            rightIcon={
                studySet.status !== StudySetVisibility.Public
                    ? visibilityIcon(studySet.status, 16)
                    : undefined
            }
            user={user}
            // bottom={
            //     studySet.type == "Collab" ? (
            //         <GenericCollaboratorsFooter
            //             avatars={collaborators?.avatars || []}
            //             total={collaborators?.total || 0}
            //         />
            //     ) : undefined
            // }
            verified={verified}
            removable={removable}
            onRemove={onRemove}
        />
    );
};
