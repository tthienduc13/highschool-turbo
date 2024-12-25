import { Grade } from "@highschool/interfaces";
import {
    IconNumber10Small,
    IconNumber11Small,
    IconNumber12Small,
} from "@tabler/icons-react";

export const gradeRenderer = (grade: Grade) => {
    switch (grade) {
        case Grade.Grade10:
            return <IconNumber10Small />;
        case Grade.Grade11:
            return <IconNumber11Small />;
        case Grade.Grade12:
            return <IconNumber12Small />;
        default:
            return null;
    }
};

export const gradeTextRenderer = (grade: Grade) => {
    switch (grade) {
        case Grade.Grade10:
            return "Lớp 10";
        case Grade.Grade11:
            return "Lớp 11";
        case Grade.Grade12:
            return "Lớp 12";
        default:
            return null;
    }
};
