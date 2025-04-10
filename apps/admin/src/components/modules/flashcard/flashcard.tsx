import { FlashcardContentModify } from "@highschool/interfaces";
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

export const flashcardDefaults: FlashcardContentModify[] = [
    {
        flashcardContentTerm: "Photosynthesis",
        flashcardContentDefinition:
            "The process by which green plants use sunlight to synthesize nutrients from carbon dioxide and water.",
        image: "https://example.com/images/photosynthesis.png",
        flashcardContentTermRichText: "<b>Photosynthesis</b>",
        flashcardContentDefinitionRichText:
            "The process by which <i>green plants</i> convert sunlight into energy.",
        rank: 1,
        id: "",
    },
    {
        flashcardContentTerm: "Ecosystem",
        flashcardContentDefinition:
            "A community of interacting organisms and their physical environment.",
        flashcardContentTermRichText: "<b>Ecosystem</b>",
        flashcardContentDefinitionRichText:
            "A system involving interactions between <u>living</u> and <u>non-living</u> things.",
        rank: 2,
        id: "",
    },
    {
        flashcardContentTerm: "Mitochondria",
        flashcardContentDefinition: "The powerhouse of the cell.",
        image: null,
        flashcardContentTermRichText: "<b>Mitochondria</b>",
        flashcardContentDefinitionRichText:
            "The <i>powerhouse</i> of the cell where energy is produced.",
        rank: 3,
        id: "",
    },
    {
        flashcardContentTerm: "Gravity",
        flashcardContentDefinition:
            "The force that attracts a body toward the center of the earth.",
        flashcardContentTermRichText: "<b>Gravity</b>",
        flashcardContentDefinitionRichText:
            "The force that causes <strong>objects</strong> to fall toward the earth.",
        id: "",
    },
    {
        flashcardContentTerm: "Water Cycle",
        flashcardContentDefinition:
            "The continuous process by which water moves from Earth's surface to the atmosphere and back.",
        image: "https://example.com/images/water_cycle.jpg",
        flashcardContentTermRichText: "<b>Water Cycle</b>",
        flashcardContentDefinitionRichText:
            "The movement of water through <em>evaporation</em>, <em>condensation</em>, and <em>precipitation</em>.",
        id: "",
    },
];
