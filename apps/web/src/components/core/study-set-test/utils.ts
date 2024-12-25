import { TestQuestionType } from "@highschool/interfaces";
import {
    IconLayersSubtract,
    IconLayoutGrid,
    IconPencil,
    IconToggleRight,
    TablerIcon,
} from "@tabler/icons-react";

export const getQuestionTypeName = (type: TestQuestionType) => {
    switch (type) {
        case TestQuestionType.TrueFalse:
            return "Đúng / Sai";
        case TestQuestionType.MultipleChoice:
            return "Câu hỏi chọn";
        case TestQuestionType.Match:
            return "Nối";
        case TestQuestionType.Write:
            return "Viết";
    }
};

export const getQuestionTypeIcon = (type: TestQuestionType): TablerIcon => {
    switch (type) {
        case TestQuestionType.TrueFalse:
            return IconToggleRight;
        case TestQuestionType.MultipleChoice:
            return IconLayoutGrid;
        case TestQuestionType.Match:
            return IconLayersSubtract;
        case TestQuestionType.Write:
            return IconPencil;
        default:
            throw new Error(`Unhandled TestQuestionType: ${type}`);
    }
};
