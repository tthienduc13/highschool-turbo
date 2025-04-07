/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { RefObject, useEffect, useRef, useState } from "react";
import {
  IconAlignCenter,
  IconCards,
  IconFileDescription,
  IconHelpOctagon,
} from "@tabler/icons-react";
import { Skeleton } from "@highschool/ui/components/ui/skeleton";

import { Tab } from ".";

type TabItemProps = {
  ref: RefObject<HTMLDivElement | null>;
  label: string;
  icon: React.ReactNode;
  value: Tab;
};

interface TabsProps {
  tab: Tab;
  onTabChange: React.Dispatch<React.SetStateAction<Tab>>;
  isLoading: boolean;
}

export const Tabs = ({ tab, onTabChange, isLoading }: TabsProps) => {
  const [activeTabStyle, setActiveTabStyle] = useState<React.CSSProperties>({});

  const detailTabRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const quizRef = useRef<HTMLDivElement>(null);
  const flashcardRef = useRef<HTMLDivElement>(null);

  const tabs: TabItemProps[] = [
    {
      ref: detailTabRef,
      label: "Lesson Detail",
      icon: <IconFileDescription size={16} />,
      value: "detail",
    },
    {
      ref: contentRef,
      label: "Create Theory",
      icon: <IconAlignCenter size={16} />,
      value: "theory",
    },
    {
      ref: flashcardRef,
      label: "Create Flashcard",
      icon: <IconCards size={16} />,
      value: "flashcard",
    },
    {
      ref: quizRef,
      label: "Create Quiz",
      icon: <IconHelpOctagon size={16} />,
      value: "quiz",
    },
  ];

  useEffect(() => {
    const updateActiveTabStyle = () => {
      const tabRef =
        tab === "detail"
          ? detailTabRef.current
          : tab === "theory"
            ? contentRef.current
            : tab === "flashcard"
              ? flashcardRef.current
              : tab === "quiz"
                ? quizRef.current
                : null;

      if (tabRef) {
        setActiveTabStyle({
          width: tabRef.clientWidth,
          left: tabRef.offsetLeft,
        });
      }
    };

    updateActiveTabStyle();
    window.addEventListener("resize", updateActiveTabStyle);

    return () => window.removeEventListener("resize", updateActiveTabStyle);
  }, [tab]);

  const handleTabChange = (newTab: Tab) => {
    onTabChange(newTab);
  };

  if (isLoading) {
    return (
      <div className="no-scrollbar relative w-full overflow-x-scroll border-b">
        <div className="flex flex-row items-center justify-between  py-2 md:justify-start md:gap-5">
          {tabs.map(({ value }) => (
            <Skeleton key={value} className="h-8 w-[100px]" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="no-scrollbar relative w-full overflow-x-scroll border-b">
      <div className="flex flex-row items-center justify-between  py-2 md:justify-start md:gap-5">
        {tabs.map(({ ref, label, icon, value }) => (
          <div
            key={value}
            ref={ref}
            className={`flex cursor-pointer items-center gap-1 rounded-md p-2 text-xs ${
              tab === value
                ? "text-blue text-primary bg-primary/10 border-primary font-bold"
                : "text-muted-foreground hover:bg-background font-semibold hover:shadow"
            }`}
            onClick={() => handleTabChange(value)}
          >
            {icon}
            {label}
          </div>
        ))}
      </div>
      <div
        className="bg-primary absolute bottom-0 h-[2px] transition-all duration-300"
        style={activeTabStyle}
      />
    </div>
  );
};
