import { Flashcard, StudySetVisibility } from "@highschool/interfaces";

import { IconPointFilled, IconProgress } from "@tabler/icons-react";

import { GenericCard } from "./generic-card";
import { visibilityIcon } from "./renderer/visibility-icon";

export interface StudySetCardProps {
  studySet: Pick<
    Flashcard,
    "id" | "flashcardName" | "status" | "grade" | "slug"
  >;
  numTerms: number;
  // collaborators?: { total: number; avatars: string[] };
  draft?: boolean;
  userLoading?: boolean;
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
  userLoading,
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
      grade={studySet.grade}
      url={
        !draft
          ? `/study-set/${studySet.slug}`
          : `/study-set/${studySet.slug}/edit`
      }
      itemsLabel={"thẻ"}
      label={
        draft ? (
          <>
            <IconProgress size={16} />
            <div className="flex flex-row items-center gap-1 text-sm">
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
      userLoading={userLoading}
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
