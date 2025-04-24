"use client";

import { useSession } from "next-auth/react";
import { createContext, useContext, useEffect, useState } from "react";
import { FlashcardContent } from "@highschool/interfaces";
import { Button } from "@highschool/ui/components/ui/button";
import {
  IconKeyframes,
  IconProgress,
  IconProgressBolt,
  IconProgressCheck,
  TablerIcon,
} from "@tabler/icons-react";
import { cn } from "@highschool/ui/lib/utils";

import { TermsSortSelect } from "./term-sort-select";
import { TermWrapper } from "./term-wrapper";

import { useSet } from "@/hooks/use-set";
import { useContainerContext } from "@/stores/use-container-store";

interface TermsOverviewContextProps {
  starredOnly: boolean;
}

const TermsOverviewContext = createContext<TermsOverviewContextProps>({
  starredOnly: false,
});

export const TermOverView = () => {
  const { status } = useSession();
  const { terms, injected } = useSet();
  const starredTerms = useContainerContext((s) => s.starredTerms);
  const studiable =
    status == "authenticated" && !!injected!.studiableLearnTerms.length;

  const [sortType, setSortType] = useState(studiable ? "stats" : "original");
  const [starredOnly, setStarredOnly] = useState(false);

  const termsListComponent = () => {
    switch (sortType) {
      case "original":
        return <TermsByOriginal />;
      case "alphabetical":
        return <TermsByAlphabetical />;
      case "stats":
        return <TermsByStats />;
    }
  };

  useEffect(() => {
    if (!starredTerms.length) setStarredOnly(false);
  }, [starredTerms.length]);

  if (!terms.length) return null;

  return (
    <TermsOverviewContext.Provider value={{ starredOnly }}>
      <div className="flex flex-col gap-8">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
          <h2 className="text-lg">
            <div className="flex flex-row items-center gap-3">
              <div className="flex flex-row items-center text-3xl font-bold">
                <IconKeyframes size={28} />
                <>{terms.length}</>
              </div>
              <p>thẻ trong bộ này</p>
            </div>
          </h2>
          <TermsSortSelect onChange={setSortType} />
        </div>
        {termsListComponent()}
      </div>
    </TermsOverviewContext.Provider>
  );
};

const TermsByStats = () => {
  const { terms } = useSet();

  const unLearnTerms = terms.filter((term) => term.currentState === 0);
  const learnedTerms = terms.filter((term) => term.currentState === 1);
  const dueToday = terms.filter((term) => term.currentState === 2);

  return (
    <>
      {!!dueToday.length && (
        <TermsCategory
          color="blue"
          heading="tới hạn ôn tập"
          icon={IconProgressCheck}
          subheading="Đây là những thẻ bạn cần học hôm nay. Hãy học ngay nhé!"
          terms={dueToday}
        />
      )}
      {!!unLearnTerms.length && (
        <TermsCategory
          color="red"
          heading="đang học"
          icon={IconProgressBolt}
          subheading="Bạn vẫn đang trong quá trình học những thẻ này. Cố lên nhé!"
          terms={unLearnTerms}
        />
      )}
      {!!learnedTerms.length && (
        <TermsCategory
          color="green"
          heading="đã học"
          icon={IconProgress}
          subheading="Bạn đã hoàn thành những thẻ này."
          terms={learnedTerms}
        />
      )}
    </>
  );
};

const TermsByOriginal = () => {
  const { terms } = useSet();

  return <TermsList slice={20} terms={terms} />;
};

const TermsByAlphabetical = () => {
  const { terms } = useSet();
  const sortOrder = terms
    .sort((a, b) =>
      a.flashcardContentTerm.localeCompare(b.flashcardContentTerm),
    )
    .map((x) => x.id);

  return <TermsList slice={20} sortOrder={sortOrder} terms={terms} />;
};

interface TermsCategoryProps {
  heading: string;
  subheading: string;
  terms: FlashcardContent[];
  icon: TablerIcon;
  color: string;
}

const TermsCategory: React.FC<TermsCategoryProps> = ({
  heading,
  subheading,
  terms,
  icon: Icon,
  color,
}) => {
  const starredTerms = useContainerContext((s) => s.starredTerms);
  const starredOnly = useContext(TermsOverviewContext).starredOnly;
  const internalTerms = starredOnly
    ? terms.filter((x) => starredTerms.includes(x.id))
    : terms;

  if (!internalTerms.length) return null;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-row items-center gap-4">
        <div
          className={cn(
            "h-16 w-[3px] rounded-full",
            `bg-${color}-500 dark:bg-${color}-300`,
          )}
        />
        <div className="flex flex-col gap-1">
          <div className="text-2xl font-bold">
            <div className="flex flex-row items-center gap-2">
              <div
                className={cn(
                  "flex flex-row items-center gap-1 text-3xl",
                  `text-${color}-500 dark:text-${color}-300:`,
                )}
              >
                <Icon size={30} />
                <>{terms.length}</>
              </div>
              <>{heading}</>
            </div>
          </div>
          <p className="font-medium text-gray-500">{subheading}</p>
        </div>
      </div>
      <TermsList terms={terms} />
    </div>
  );
};

interface TermsListProps {
  terms: FlashcardContent[];
  sortOrder?: string[];
  slice?: number;
}

const TermsList: React.FC<TermsListProps> = ({ terms, sortOrder, slice }) => {
  const session = useSession();
  const { flashcard } = useSet();

  const creator = session.data?.user?.id === flashcard.userId;

  const starredTerms = useContainerContext((s) => s.starredTerms);
  const internalSort =
    sortOrder || terms.sort((a, b) => a.rank - b.rank).map((x) => x.id);

  const starredOnly = useContext(TermsOverviewContext).starredOnly;
  const internalTerms = starredOnly
    ? terms.filter((x) => starredTerms.includes(x.id))
    : terms;

  const [showSlice, setShowSlice] = useState(slice);

  return (
    <>
      <div className="flex flex-col gap-[14px]">
        {internalTerms
          .sort(
            (a, b) => internalSort.indexOf(a.id) - internalSort.indexOf(b.id),
          )
          .slice(0, showSlice || terms.length)
          .map((term) => (
            <TermWrapper key={term.id} creator={creator} term={term} />
          ))}
      </div>
      {showSlice !== undefined && showSlice < terms.length && (
        <div className="flex w-full items-center justify-center">
          <Button
            size={"lg"}
            variant={"ghost"}
            onClick={() => {
              setShowSlice((s) => (s || 0) + 100);
            }}
          >
            Xem thêm
          </Button>
        </div>
      )}
    </>
  );
};
