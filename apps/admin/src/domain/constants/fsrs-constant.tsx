import { FSRSCategory, FSRSParameter } from "@highschool/interfaces";
import {
    IconAdjustments,
    IconHourglassEmpty,
    IconBrain,
    IconTrash,
    IconRefresh,
    IconTrendingDown,
    IconChartBar,
    IconHelp,
} from "@tabler/icons-react";
import { JSX } from "react";

export interface categoryPreset {
    color: string;
    lightColor: string;
    borderColor: string;
    textColor: string;
    icon: JSX.Element;
    title: string;
}

// export const categoryConfig = {
//     initialDifficulty: {
//         color: "bg-red-500",
//         lightColor: "bg-red-100",
//         borderColor: "border-red-300",
//         textColor: "text-red-800",
//         icon: <IconAdjustments size={16} />,
//         title: "Initial Difficulty",
//     },
//     difficultyAdjustment: {
//         color: "bg-orange-500",
//         lightColor: "bg-orange-100",
//         borderColor: "border-orange-300",
//         textColor: "text-orange-800",
//         icon: <IconBrain size={16} />,
//         title: "Difficulty Adjustment",
//     },
//     stabilityAdjustment: {
//         color: "bg-blue-500",
//         lightColor: "bg-blue-100",
//         borderColor: "border-blue-300",
//         textColor: "text-blue-800",
//         icon: <IconHourglassEmpty size={16} />,
//         title: "Stability Adjustment",
//     },
//     forgettingAdjustment: {
//         color: "bg-purple-500",
//         lightColor: "bg-purple-100",
//         borderColor: "border-purple-300",
//         textColor: "text-purple-800",
//         icon: <IconTrash size={16} />,
//         title: "Forgetting Adjustment",
//     },
//     retrievabilityAdjustment: {
//         color: "bg-green-500",
//         lightColor: "bg-green-100",
//         borderColor: "border-green-300",
//         textColor: "text-green-800",
//         icon: <IconRefresh size={16} />,
//         title: "Retrievability Adjustment",
//     },
//     decayRate: {
//         color: "bg-yellow-500",
//         lightColor: "bg-yellow-100",
//         borderColor: "border-yellow-300",
//         textColor: "text-yellow-800",
//         icon: <IconTrendingDown size={16} />,
//         title: "Decay Rate",
//     },
//     multiplicativeFactor: {
//         color: "bg-teal-500",
//         lightColor: "bg-teal-100",
//         borderColor: "border-teal-300",
//         textColor: "text-teal-800",
//         icon: <IconChartBar size={16} />,
//         title: "Multiplicative Factor",
//     },
//     other: {
//         color: "bg-gray-500",
//         lightColor: "bg-gray-100",
//         borderColor: "border-gray-300",
//         textColor: "text-gray-800",
//         icon: <IconHelp size={16} />,
//         title: "Unknown Impact",
//     },
// };

export const categoryConfig = {
    initialDifficulty: {
        color: "bg-red-500",
        lightColor: "bg-red-100",
        borderColor: "border-red-300",
        textColor: "text-red-800",
        icon: <IconAdjustments size={16} />,
        title: "Initial Difficulty",
        description:
            "Represents how hard the item is when first learned. A higher value indicates the item starts out more difficult to recall.",
    },
    difficultyAdjustment: {
        color: "bg-orange-500",
        lightColor: "bg-orange-100",
        borderColor: "border-orange-300",
        textColor: "text-orange-800",
        icon: <IconBrain size={16} />,
        title: "Difficulty Adjustment",
        description:
            "Adjusts the item's difficulty over time based on your recall performance, making future scheduling more adaptive.",
    },
    stabilityAdjustment: {
        color: "bg-blue-500",
        lightColor: "bg-blue-100",
        borderColor: "border-blue-300",
        textColor: "text-blue-800",
        icon: <IconHourglassEmpty size={16} />,
        title: "Stability Adjustment",
        description:
            "Modifies how long the memory stays stable over time. Affects how much the memory decays after each review.",
    },
    forgettingAdjustment: {
        color: "bg-purple-500",
        lightColor: "bg-purple-100",
        borderColor: "border-purple-300",
        textColor: "text-purple-800",
        icon: <IconTrash size={16} />,
        title: "Forgetting Adjustment",
        description:
            "Influences how the model treats forgotten reviews, helping it adjust future intervals and item difficulty accordingly.",
    },
    retrievabilityAdjustment: {
        color: "bg-green-500",
        lightColor: "bg-green-100",
        borderColor: "border-green-300",
        textColor: "text-green-800",
        icon: <IconRefresh size={16} />,
        title: "Retrievability Adjustment",
        description:
            "Takes into account the estimated probability of successful recall at the time of review, impacting scheduling decisions.",
    },
    decayRate: {
        color: "bg-yellow-500",
        lightColor: "bg-yellow-100",
        borderColor: "border-yellow-300",
        textColor: "text-yellow-800",
        icon: <IconTrendingDown size={16} />,
        title: "Decay Rate",
        description:
            "Represents the rate at which memory strength decays over time. Higher values mean faster forgetting.",
    },
    multiplicativeFactor: {
        color: "bg-teal-500",
        lightColor: "bg-teal-100",
        borderColor: "border-teal-300",
        textColor: "text-teal-800",
        icon: <IconChartBar size={16} />,
        title: "Multiplicative Factor",
        description:
            "Used to scale other factors, amplifying or dampening their influence in the FSRS formula. Controls sensitivity.",
    },
    other: {
        color: "bg-gray-500",
        lightColor: "bg-gray-100",
        borderColor: "border-gray-300",
        textColor: "text-gray-800",
        icon: <IconHelp size={16} />,
        title: "Other Impact",
        description:
            "Parameters that influence the model in ways that are not yet fully understood or are minor contributors.",
    },
};

export const impactConfig = {
    high: {
        color: "bg-red-500",
        textColor: "text-red-700",
        borderColor: "border-red-300",
        label: "High",
    },
    medium: {
        color: "bg-amber-500",
        textColor: "text-amber-700",
        borderColor: "border-amber-300",
        label: "Medium",
    },
    low: {
        color: "bg-emerald-500",
        textColor: "text-emerald-700",
        borderColor: "border-emerald-300",
        label: "Low",
    },
};

export const defaultParameters: FSRSParameter[] = [
    {
        value: 0.40255,
        name: "Request Retention",
        description:
            "Target retention rate for scheduling reviews. Higher values lead to more frequent reviews to ensure better memory retention.",
        category: FSRSCategory.retrievabilityAdjustment,
        impact: "high",
        isLocked: false,
    },
    {
        value: 1.18385,
        name: "Maximum Interval",
        description:
            "Maximum interval between reviews in days. Limits how far apart reviews can be scheduled.",
        category: FSRSCategory.multiplicativeFactor,
        impact: "medium",
        isLocked: false,
    },
    {
        value: 3.173,
        name: "Difficulty Weight",
        description:
            "Weight of card difficulty in spacing algorithm. Higher values make difficult cards appear more frequently.",
        category: FSRSCategory.difficultyAdjustment,
        impact: "high",
        isLocked: false,
    },
    {
        value: 15.69105,
        name: "Stability After Success",
        description:
            "How much stability increases after a successful review. Higher values increase intervals more aggressively.",
        category: FSRSCategory.stabilityAdjustment,
        impact: "high",
        isLocked: false,
    },
    {
        value: 7.1949,
        name: "Stability After Failure",
        description:
            "How much stability decreases after a failed review. Lower values decrease intervals more aggressively.",
        category: FSRSCategory.forgettingAdjustment,
        impact: "high",
        isLocked: false,
    },
    {
        value: 0.5345,
        name: "Spacing Multiplier",
        description:
            "Multiplier for interval spacing. Higher values increase all intervals proportionally.",
        category: FSRSCategory.multiplicativeFactor,
        impact: "medium",
        isLocked: false,
    },
    {
        value: 1.4604,
        name: "Easy Bonus",
        description:
            "Bonus multiplier for 'Easy' responses. Higher values increase intervals more for easy cards.",
        category: FSRSCategory.difficultyAdjustment,
        impact: "medium",
        isLocked: false,
    },
    {
        value: 0.0046,
        name: "Hard Penalty",
        description:
            "Penalty multiplier for 'Hard' responses. Lower values decrease intervals more for hard cards.",
        category: FSRSCategory.difficultyAdjustment,
        impact: "medium",
        isLocked: false,
    },
    {
        value: 1.54575,
        name: "New Card Stability",
        description:
            "Initial stability for new cards. Higher values start new cards with longer intervals.",
        category: FSRSCategory.initialDifficulty,
        impact: "high",
        isLocked: false,
    },
    {
        value: 0.1192,
        name: "New Card Ease",
        description:
            "Initial ease factor for new cards. Higher values make new cards start with easier scheduling.",
        category: FSRSCategory.initialDifficulty,
        impact: "medium",
        isLocked: false,
    },
    {
        value: 1.01925,
        name: "Learning Threshold",
        description:
            "Stability threshold for considering a card 'learned'. Higher values require more reviews before graduation.",
        category: FSRSCategory.stabilityAdjustment,
        impact: "medium",
        isLocked: false,
    },
    {
        value: 1.9395,
        name: "Lapse Stability Reduction",
        description:
            "How much stability is reduced after a lapse. Higher values make forgotten cards reappear sooner.",
        category: FSRSCategory.forgettingAdjustment,
        impact: "high",
        isLocked: false,
    },
    {
        value: 0.11,
        name: "Review Ease Factor",
        description:
            "Base ease factor for review cards. Higher values increase intervals more aggressively for all reviews.",
        category: FSRSCategory.retrievabilityAdjustment,
        impact: "medium",
        isLocked: false,
    },
    {
        value: 0.29605,
        name: "Minimum Ease",
        description:
            "Minimum allowed ease factor. Prevents cards from becoming too difficult with repeated failures.",
        category: FSRSCategory.other,
        impact: "low",
        isLocked: false,
    },
    {
        value: 2.2698,
        name: "Ease Bonus",
        description:
            "Bonus applied to ease after correct answers. Higher values increase ease more after successful reviews.",
        category: FSRSCategory.retrievabilityAdjustment,
        impact: "low",
        isLocked: false,
    },
    {
        value: 0.2315,
        name: "Interval Modifier",
        description:
            "Global modifier for all intervals. Higher values increase all intervals proportionally.",
        category: FSRSCategory.multiplicativeFactor,
        impact: "high",
        isLocked: false,
    },
    {
        value: 2.9898,
        name: "Fuzz Factor",
        description:
            "Random variation applied to intervals. Higher values add more randomness to scheduled reviews.",
        category: FSRSCategory.other,
        impact: "low",
        isLocked: false,
    },
    {
        value: 0.51655,
        name: "Forgetting Curve Decay",
        description:
            "Rate of memory decay in the forgetting curve. Higher values model faster forgetting.",
        category: FSRSCategory.decayRate,
        impact: "high",
        isLocked: false,
    },
    {
        value: 0.6621,
        name: "Forgetting okokkok Decay",
        description:
            "Rate of memory decay in the forgetting curve. Higher values model faster forgetting.",
        category: FSRSCategory.decayRate,
        impact: "high",
        isLocked: false,
    },
];
