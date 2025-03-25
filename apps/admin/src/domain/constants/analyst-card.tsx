import {
  IconBrandParsinta,
  IconCircleKey,
  IconFileTypeDoc,
  IconFolder,
  IconLock,
  IconLockOpen2,
  IconPlayCardStar,
  IconScript,
  IconVocabulary,
  TablerIcon,
} from "@tabler/icons-react";
import React from "react";

export interface ItemData {
  title: string;
  data: number;
  icon: TablerIcon;
}

export interface ContentAnalyst {
  id: string;
  title: string;
  bgColor: string;
  icon: React.ReactNode;
  items: ItemData[];
  darkColor?: string;
}

export const contentAnalysts: ContentAnalyst[] = [
  {
    id: "flashcard",
    title: "Flashcards",
    bgColor: "bg-[#F8EFE2]",
    icon: <IconPlayCardStar className="size-5 text-orange-400" />,
    items: [
      { title: "Open", data: 0, icon: IconLockOpen2 },
      { title: "Hiden", data: 0, icon: IconLock },
      { title: "Link", data: 0, icon: IconCircleKey },
    ],
  },
  {
    id: "course",
    title: "Courses",
    bgColor: "bg-[#EFF7E2]",
    icon: <IconBrandParsinta className="size-5 text-green-500" />,
    items: [
      { title: "Published", data: 0, icon: IconLockOpen2 },
      { title: "Unpublished", data: 0, icon: IconLock },
    ],
  },
  // {
  //   id: "news",
  //   title: "News",
  //   bgColor: "bg-[#e2f3f7]",
  //   icon: <IconNews className="size-5 text-blue-500" />,
  //   items: [
  //     { title: "Hot", data: 0, icon: IconFlame },
  //     { title: "Deleted", data: 0, icon: IconTrashX },
  //   ],
  // },
  {
    id: "material",
    title: "Materials",
    bgColor: "bg-[#EAE8F5]",
    icon: <IconFileTypeDoc className="size-5 text-indigo-500" />,
    items: [
      { title: "Lessons", data: 0, icon: IconVocabulary },
      { title: "Folders", data: 0, icon: IconFolder },
      { title: "Documents", data: 0, icon: IconScript },
    ],
  },
];

// Your data should follow this structure
export const yearData = [
  {
    date: "1/24",
    students: 8200,
    teachers: 620,
    moderators: 110,
  },
  {
    date: "2/24",
    students: 8350,
    teachers: 635,
    moderators: 115,
  },
  {
    date: "3/24",
    students: 8500,
    teachers: 645,
    moderators: 118,
  },
  {
    // April
    month: 3,
    date: "4/24",
    students: 8650,
    teachers: 655,
    moderators: 120,
  },
  {
    // May
    month: 4,
    date: "5/24",
    students: 8800,
    teachers: 665,
    moderators: 122,
  },
  {
    // June
    month: 5,
    date: "6/24",
    students: 8950,
    teachers: 675,
    moderators: 124,
  },
  {
    // July
    month: 6,
    date: "7/24",
    students: 9100,
    teachers: 685,
    moderators: 126,
  },
  {
    // August
    month: 7,
    date: "8/24",
    students: 9250,
    teachers: 695,
    moderators: 128,
  },
  {
    // September
    month: 8,
    date: "9/24",
    students: 9400,
    teachers: 705,
    moderators: 130,
  },
  {
    // October
    month: 9,
    date: "10/24",
    students: 9550,
    teachers: 715,
    moderators: 132,
  },
  {
    // November
    month: 10,
    date: "11/24",
    students: 9700,
    teachers: 725,
    moderators: 134,
  },
  {
    // December
    month: 11,
    date: "12/24",
    students: 9850,
    teachers: 735,
    moderators: 136,
  },
];

export const monthData = [
  { date: "2024-03-01", students: 2150, teachers: 165, moderators: 32 },
  { date: "2024-03-02", students: 1850, teachers: 145, moderators: 28 },
  { date: "2024-03-03", students: 1750, teachers: 135, moderators: 26 },
  { date: "2024-03-04", students: 2250, teachers: 175, moderators: 34 },
  { date: "2024-03-05", students: 2350, teachers: 180, moderators: 35 },
  { date: "2024-03-06", students: 2400, teachers: 185, moderators: 36 },
  { date: "2024-03-07", students: 2450, teachers: 190, moderators: 37 },
  { date: "2024-03-08", students: 2500, teachers: 195, moderators: 38 },
  { date: "2024-03-09", students: 1900, teachers: 150, moderators: 29 },
  { date: "2024-03-10", students: 1800, teachers: 140, moderators: 27 },
  { date: "2024-03-11", students: 2550, teachers: 200, moderators: 39 },
  { date: "2024-03-12", students: 2600, teachers: 205, moderators: 40 },
  { date: "2024-03-13", students: 2650, teachers: 210, moderators: 41 },
  { date: "2024-03-14", students: 2700, teachers: 215, moderators: 42 },
  { date: "2024-03-15", students: 2750, teachers: 220, moderators: 43 },
  { date: "2024-03-16", students: 1950, teachers: 155, moderators: 30 },
  { date: "2024-03-17", students: 1850, teachers: 145, moderators: 28 },
  { date: "2024-03-18", students: 2800, teachers: 225, moderators: 44 },
  { date: "2024-03-19", students: 2850, teachers: 230, moderators: 45 },
  { date: "2024-03-20", students: 2900, teachers: 235, moderators: 46 },
  { date: "2024-03-21", students: 2950, teachers: 240, moderators: 47 },
  { date: "2024-03-22", students: 3000, teachers: 245, moderators: 48 },
  { date: "2024-03-23", students: 2000, teachers: 160, moderators: 31 },
  { date: "2024-03-24", students: 1900, teachers: 150, moderators: 29 },
  { date: "2024-03-25", students: 3050, teachers: 250, moderators: 49 },
  { date: "2024-03-26", students: 3100, teachers: 255, moderators: 50 },
  { date: "2024-03-27", students: 3150, teachers: 260, moderators: 51 },
  { date: "2024-03-28", students: 3200, teachers: 265, moderators: 52 },
  { date: "2024-03-29", students: 3250, teachers: 270, moderators: 53 },
  { date: "2024-03-30", students: 2050, teachers: 165, moderators: 32 },
  { date: "2024-03-31", students: 1950, teachers: 155, moderators: 30 },
];

export const weekData = [
  { date: "2024-03-11", students: 2550, teachers: 200, moderators: 39 }, // Monday
  { date: "2024-03-12", students: 2600, teachers: 205, moderators: 40 }, // Tuesday
  { date: "2024-03-13", students: 2650, teachers: 210, moderators: 41 }, // Wednesday
  { date: "2024-03-14", students: 2700, teachers: 215, moderators: 42 }, // Thursday
  { date: "2024-03-15", students: 2750, teachers: 220, moderators: 43 }, // Friday
  { date: "2024-03-16", students: 1950, teachers: 155, moderators: 30 }, // Saturday
  { date: "2024-03-17", students: 1850, teachers: 145, moderators: 28 }, // Sunday
];
