"use client";

import { useSession } from "next-auth/react";

import { createContext, useContext, useEffect, useState } from "react";

import { FlashcardContent } from "@highschool/interfaces";
import { Button } from "@highschool/ui/components/ui/button";

import { IconKeyframes, TablerIcon } from "@tabler/icons-react";

import { useSet } from "@/hooks/use-set";
import { useContainerContext } from "@/stores/use-container-store";

import { TermsSortSelect } from "./term-sort-select";
import { TermWrapper } from "./term-wrapper";

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
      // case "stats":
      //     return <TermsByStats />;
      case "original":
        return <TermsByOriginal />;
      case "alphabetical":
        return <TermsByAlphabetical />;
    }
  };

  useEffect(() => {
    if (!starredTerms.length) setStarredOnly(false);
  }, [starredTerms.length]);

  if (!terms.length) return null;

  return (
    <TermsOverviewContext.Provider value={{ starredOnly }}>
      <div className="flex flex-col gap-8">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <h2 className="text-lg">
            <div className="flex flex-row items-center gap-3">
              <div className="flex flex-row items-center text-3xl font-bold">
                <IconKeyframes size={28} />
                <>{terms.length}</>
              </div>
              <p>thẻ trong bộ này</p>
            </div>
          </h2>
          <TermsSortSelect studiable={studiable} onChange={setSortType} />
        </div>
        {termsListComponent()}
      </div>
    </TermsOverviewContext.Provider>
  );
};

// const TermsByStats = () => {
//     const { terms, injected } = useSet();

//     let familiarTerms = injected?.studiableLearnTerms
//         .filter((x) => x.correctness != 0 && x.correctness != 2)
//         .map((x) => terms.find((t) => t.id === x.id)!)
//         .filter((x) => x);

//     let unstudiedTerms = terms.filter((x) => {
//         const studiableTerm = injected?.studiableLearnTerms.find(
//             (s) => s.id === x.id
//         );
//         return !studiableTerm || studiableTerm.correctness === 0;
//     });

//     let masteredTerms = injected?.studiableLearnTerms
//         .filter((x) => x.correctness === 2)
//         .map((x) => terms.find((t) => t.id === x.id)!)
//         .filter((x) => x);

//     familiarTerms = container.learnMode == "Learn" ? familiarTerms : [];
//     unstudiedTerms = container.learnMode == "Learn" ? unstudiedTerms : [];
//     masteredTerms = container.learnMode == "Learn" ? masteredTerms : terms;

//     return (
//         <>
//             {!!familiarTerms.length && (
//                 <TermsCategory
//                     heading="still studying"
//                     icon={IconProgressBolt}
//                     subheading="You're still learning these terms. Keep it up!"
//                     terms={familiarTerms}
//                     color="orange"
//                 />
//             )}
//             {!!unstudiedTerms.length && (
//                 <TermsCategory
//                     heading="not studied"
//                     icon={IconProgress}
//                     subheading="You haven't studied these terms yet."
//                     terms={unstudiedTerms}
//                     color="gray"
//                 />
//             )}
//             {!!masteredTerms.length && (
//                 <TermsCategory
//                     heading="mastered"
//                     icon={IconProgressCheck}
//                     subheading="You've mastered these terms. Great job!"
//                     terms={masteredTerms}
//                     color="blue"
//                 />
//             )}
//         </>
//     );
// };

const TermsByOriginal = () => {
  const { terms } = useSet();

  return <TermsList terms={terms} slice={20} />;
};

const TermsByAlphabetical = () => {
  const { terms } = useSet();
  const sortOrder = terms
    .sort((a, b) =>
      a.flashcardContentTerm.localeCompare(b.flashcardContentTerm),
    )
    .map((x) => x.id);

  return <TermsList terms={terms} sortOrder={sortOrder} slice={20} />;
};

// interface TermsCategoryProps {
//     heading: string;
//     subheading: string;
//     terms: FlashcardContent[];
//     icon: TablerIcon;
//     color: string;
// }

// const TermsCategory: React.FC<TermsCategoryProps> = ({
//     heading,
//     subheading,
//     terms,
//     icon: Icon,
//     color,
// }) => {
//     const headingColor = useColorModeValue(`${color}.500`, `${color}.300`);

//     const starredTerms = useContainerContext((s) => s.starredTerms);
//     const starredOnly = useContext(TermsOverviewContext).starredOnly;
//     const internalTerms = starredOnly
//         ? terms.filter((x) => starredTerms.includes(x.id))
//         : terms;

//     if (!internalTerms.length) return null;

//     return (
//         <div className="flex flex-col gap-6" spacing={6}>
//             <div className="flex flex-row gap-4" spacing="4">
//                 <Box
//                     h="64px"
//                     w="3px"
//                     bg={headingColor}
//                     rounded="full"
//                     opacity="0.3"
//                 />
//                 <Stack spacing="1">
//                     <Heading size="md">
//                         <HStack spacing="2">
//                             <HStack
//                                 spacing="1"
//                                 color={headingColor}
//                                 fontSize="2xl"
//                             >
//                                 <Icon size={20} />
//                                 <>{terms.length}</>
//                             </HStack>
//                             <>{heading}</>
//                         </HStack>
//                     </Heading>
//                     <Text color="gray.500" fontWeight={500}>
//                         {subheading}
//                     </Text>
//                 </Stack>
//             </div>
//             <TermsList terms={terms} />
//         </div>
//     );
// };

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
            <TermWrapper term={term} key={term.id} creator={creator} />
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
