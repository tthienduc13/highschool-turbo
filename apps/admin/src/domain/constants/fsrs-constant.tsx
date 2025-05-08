import { FSRSCategory, FSRSParameter } from "@highschool/interfaces";
import {
  IconAdjustments,
  IconHourglassEmpty,
  IconBrain,
  IconTrash,
  IconRefresh,
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
  initialStability: {
    color: "bg-red-500",
    lightColor: "bg-red-100",
    borderColor: "border-red-300",
    textColor: "text-red-800",
    icon: <IconAdjustments size={16} />,
    title: "Initial Stability",
    description:
      "Parameters that determine initial memory stability after the first review of a card, based on the rating given (Again, Hard, Good, Easy).",
  },
  difficultyAdjustment: {
    color: "bg-orange-500",
    lightColor: "bg-orange-100",
    borderColor: "border-orange-300",
    textColor: "text-orange-800",
    icon: <IconBrain size={16} />,
    title: "Difficulty Adjustment",
    description:
      "Parameters that control how card difficulty (D) is calculated and adjusted based on your performance, affecting how hard a card is to remember.",
  },
  stabilityAdjustment: {
    color: "bg-blue-500",
    lightColor: "bg-blue-100",
    borderColor: "border-blue-300",
    textColor: "text-blue-800",
    icon: <IconHourglassEmpty size={16} />,
    title: "Stability Adjustment",
    description:
      "Parameters that determine how memory stability (S) increases after successful reviews, affecting how long you can retain memories over time.",
  },
  forgettingAdjustment: {
    color: "bg-purple-500",
    lightColor: "bg-purple-100",
    borderColor: "border-purple-300",
    textColor: "text-purple-800",
    icon: <IconTrash size={16} />,
    title: "Forgetting Adjustment",
    description:
      "Parameters that control how stability is calculated after you forget a card (press 'Again'), determining how quickly you'll see the card again.",
  },
  sameDayReviews: {
    color: "bg-green-500",
    lightColor: "bg-green-100",
    borderColor: "border-green-300",
    textColor: "text-green-800",
    icon: <IconRefresh size={16} />,
    title: "Same-Day Reviews",
    description:
      "Parameters that control how stability is adjusted when reviewing the same card multiple times within a single day.",
  },
  // decayRate: {},
  // multiplicativeFactor: {},
  // other: {},
  // retrievabilityFormula: {
  //   color: "bg-yellow-500",
  //   lightColor: "bg-yellow-100",
  //   borderColor: "border-yellow-300",
  //   textColor: "text-yellow-800",
  //   icon: <IconTrendingDown size={16} />,
  //   title: "Retrievability Formula",
  //   description:
  //     "Parameters related to the memory retrievability formula. In FSRS 5, retrievability is calculated using a power function R(t,S) = (1 + t/S*factor)^decay.",
  // },
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
    name: "w0 - Initial Stability (Again)",
    description:
      "Initial memory stability when first review is rated 'Again'. This is how stable your memory is if you couldn't recall the card on first review.",
    category: FSRSCategory.initialStability,
    impact: "high",
    isLocked: false,
  },
  {
    value: 1.18385,
    name: "w1 - Initial Stability (Hard)",
    description:
      "Initial memory stability when first review is rated 'Hard'. This is how stable your memory is if you found the card difficult to recall on first review.",
    category: FSRSCategory.initialStability,
    impact: "high",
    isLocked: false,
  },
  {
    value: 3.173,
    name: "w2 - Initial Stability (Good)",
    description:
      "Initial memory stability when first review is rated 'Good'. This is how stable your memory is if you successfully recalled the card on first review.",
    category: FSRSCategory.initialStability,
    impact: "high",
    isLocked: false,
  },
  {
    value: 15.69105,
    name: "w3 - Initial Stability (Easy)",
    description:
      "Initial memory stability when first review is rated 'Easy'. This is how stable your memory is if you found the card very easy to recall on first review.",
    category: FSRSCategory.initialStability,
    impact: "high",
    isLocked: false,
  },
  {
    value: 7.1949,
    name: "w4 - Default Difficulty",
    description:
      "Default difficulty value for new cards. Difficulty ranges from 1-10, with higher values meaning harder cards.",
    category: FSRSCategory.difficultyAdjustment,
    impact: "medium",
    isLocked: false,
  },
  {
    value: 0.5345,
    name: "w5 - Initial Difficulty Factor",
    description:
      "Controls how the initial card difficulty is calculated based on first review rating. Affects the exponential decrease in difficulty for better initial ratings.",
    category: FSRSCategory.difficultyAdjustment,
    impact: "medium",
    isLocked: false,
  },
  {
    value: 1.4604,
    name: "w6 - Difficulty Change Rate",
    description:
      "Controls how much difficulty changes with each review. Higher values make difficulty change more dramatically based on your performance.",
    category: FSRSCategory.difficultyAdjustment,
    impact: "high",
    isLocked: false,
  },
  {
    value: 0.0046,
    name: "w7 - Difficulty Mean Reversion",
    description:
      "Controls how much difficulty tends to revert to a baseline over time. Higher values make difficulty more resistant to extreme values.",
    category: FSRSCategory.difficultyAdjustment,
    impact: "low",
    isLocked: false,
  },
  {
    value: 1.54575,
    name: "w8 - Stability Scaling Factor",
    description:
      "Exponential scaling factor in the stability increase formula. Controls the overall magnitude of stability increases after successful reviews.",
    category: FSRSCategory.stabilityAdjustment,
    impact: "high",
    isLocked: false,
  },
  {
    value: 0.1192,
    name: "w9 - Stability Decay Factor",
    description:
      "Controls how the stability increase is affected by the current stability. Higher values reduce the stability increase for already stable memories.",
    category: FSRSCategory.stabilityAdjustment,
    impact: "medium",
    isLocked: false,
  },
  {
    value: 1.01925,
    name: "w10 - Retrievability Impact",
    description:
      "Controls how retrievability affects stability increases. Higher values increase the stability gain more when reviewing cards with lower retrievability.",
    category: FSRSCategory.stabilityAdjustment,
    impact: "high",
    isLocked: false,
  },
  {
    value: 1.9395,
    name: "w11 - Forgotten Stability Factor",
    description:
      "Scaling factor for stability after forgetting a card. Controls the overall magnitude of stability retained after a lapse.",
    category: FSRSCategory.forgettingAdjustment,
    impact: "high",
    isLocked: false,
  },
  {
    value: 0.11,
    name: "w12 - Difficulty Impact on Forgetting",
    description:
      "Controls how card difficulty affects stability after forgetting. Higher values reduce the stability drop more for easier cards.",
    category: FSRSCategory.forgettingAdjustment,
    impact: "medium",
    isLocked: false,
  },
  {
    value: 0.29605,
    name: "w13 - Prior Stability Impact",
    description:
      "Controls how previous stability affects stability after forgetting. Higher values make prior stability more important in calculating new stability.",
    category: FSRSCategory.forgettingAdjustment,
    impact: "medium",
    isLocked: false,
  },
  {
    value: 2.2698,
    name: "w14 - Retrievability Impact on Forgetting",
    description:
      "Controls how retrievability affects stability after forgetting. Higher values increase the stability loss more for lower retrievability.",
    category: FSRSCategory.forgettingAdjustment,
    impact: "high",
    isLocked: false,
  },
  {
    value: 0.2315,
    name: "w15 - Hard Rating Stability Multiplier",
    description:
      "Multiplier for stability when rating a card as 'Hard'. Values below 1 reduce the stability increase for hard cards.",
    category: FSRSCategory.stabilityAdjustment,
    impact: "medium",
    isLocked: false,
  },
  {
    value: 2.9898,
    name: "w16 - Easy Rating Stability Multiplier",
    description:
      "Multiplier for stability when rating a card as 'Easy'. Values above 1 increase the stability boost for easy cards.",
    category: FSRSCategory.stabilityAdjustment,
    impact: "medium",
    isLocked: false,
  },
  {
    value: 0.51655,
    name: "w17 - Same-Day Review Effect",
    description:
      "Controls how much same-day reviews affect stability. Used in the formula for updating stability on same-day reviews.",
    category: FSRSCategory.sameDayReviews,
    impact: "medium",
    isLocked: false,
  },
  {
    value: 0.6621,
    name: "w18 - Same-Day Review Grade Adjustment",
    description:
      "Controls how the rating affects same-day review stability adjustment. Higher values increase the impact of the grade on stability adjustments.",
    category: FSRSCategory.sameDayReviews,
    impact: "medium",
    isLocked: false,
  },
];
