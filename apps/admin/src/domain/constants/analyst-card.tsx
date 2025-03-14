import {
  IconBrandParsinta,
  IconCircleKey,
  IconFileTypeDoc,
  IconFlame,
  IconFolder,
  IconLock,
  IconLockOpen2,
  IconNews,
  IconPlayCardStar,
  IconScript,
  IconTrashX,
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
}

export const contentAnalysts: ContentAnalyst[] = [
  {
    id: "flashcard",
    title: "Flashcards",
    bgColor: "#F8EFE2",
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
    bgColor: "#EFF7E2",
    icon: <IconBrandParsinta className="size-5 text-green-500" />,
    items: [
      { title: "Published", data: 0, icon: IconLockOpen2 },
      { title: "Unpublished", data: 0, icon: IconLock },
    ],
  },
  {
    id: "news",
    title: "News",
    bgColor: "#e2f3f7",
    icon: <IconNews className="size-5 text-blue-500" />,
    items: [
      { title: "Hot", data: 0, icon: IconFlame },
      { title: "Deleted", data: 0, icon: IconTrashX },
    ],
  },
  {
    id: "material",
    title: "Materials",
    bgColor: "#EAE8F5",
    icon: <IconFileTypeDoc className="size-5 text-indigo-500" />,
    items: [
      { title: "Lessons", data: 0, icon: IconVocabulary },
      { title: "Folders", data: 0, icon: IconFolder },
      { title: "Documents", data: 0, icon: IconScript },
    ],
  },
];
