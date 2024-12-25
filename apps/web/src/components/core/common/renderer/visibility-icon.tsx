import { StudySetVisibility } from "@highschool/interfaces";
import { IconLink, IconLock, IconWorld } from "@tabler/icons-react";

export const visibilityIcon = (visibility: StudySetVisibility, size = 24) => {
    switch (visibility) {
        case StudySetVisibility.Public:
            return <IconWorld size={size} />;
        case StudySetVisibility.Unlisted:
            return <IconLink size={size} />;
        case StudySetVisibility.Private:
            return <IconLock size={size} />;
    }
};
