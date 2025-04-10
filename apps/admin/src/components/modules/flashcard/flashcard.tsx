import {
    IconBook,
    IconFileText,
    IconPencil,
    IconTestPipe,
} from "@tabler/icons-react";

export const getTypeIcon = (type: string) => {
    switch (type) {
        case "Subject":
            return <IconBook className="size-4" />;
        case "Chapter":
            return <IconFileText className="size-4" />;
        case "Lesson":
            return <IconPencil className="size-4" />;
        case "SubjectCurriculum":
            return <IconTestPipe className="size-4" />;
        default:
            return <IconBook className="size-4" />;
    }
};

export const getStatusColor = (status: string) => {
    switch (status) {
        case "Open":
            return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
        case "Close":
            return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
        case "Hidden":
            return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
        case "Link":
            return "bg-red-100 text-yellow-800 dark:bg-red-900 dark:text-yellow-300";
        default:
            return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
    }
};
