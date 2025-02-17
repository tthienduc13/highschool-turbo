import { StudySetVisibility } from "@highschool/interfaces";
import { IconLink, IconLock, IconWorld } from "@tabler/icons-react";

export const visibilityIcon = (visibility: StudySetVisibility, size = 24) => {
  switch (visibility) {
    case StudySetVisibility.Public:
      return <IconWorld className={`!size-[${size}px]`} size={size} />;
    case StudySetVisibility.Unlisted:
      return <IconLink className={`!size-[${size}px]`} size={size} />;
    case StudySetVisibility.Private:
      return <IconLock className={`!size-[${size}px]`} size={size} />;
  }
};
