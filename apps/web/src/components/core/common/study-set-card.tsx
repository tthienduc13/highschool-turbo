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
  draft?: boolean;
  userLoading?: boolean;
  user: {
    fullname: string | null;
    image: string | null;
  };
  verified?: boolean;
  removable?: boolean;
  onRemove: () => void;
  bottom?: React.ReactNode;
}

export const StudySetCard = ({
  studySet,
  numTerms,
  userLoading,
  bottom,
  draft,
  user,
  verified = false,
  removable = false,
  onRemove,
}: StudySetCardProps) => {
  return (
    <GenericCard
      bottom={bottom}
      grade={studySet.grade}
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
      numItems={numTerms}
      removable={removable}
      reverseTitle={draft}
      rightIcon={
        studySet.status !== StudySetVisibility.Public
          ? visibilityIcon(studySet.status, 16)
          : undefined
      }
      title={studySet.flashcardName || "Chưa đặt tên"}
      url={
        !draft
          ? `/study-set/${studySet.slug}`
          : `/study-set/${studySet.slug}/edit`
      }
      user={user}
      userLoading={userLoading}
      verified={verified}
      onRemove={onRemove}
    />
  );
};
