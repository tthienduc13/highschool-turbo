import { useInView } from "framer-motion";

import React from "react";

import { FlashcardContent } from "@highschool/interfaces";

import { DeloadedTerm } from "./deloaded-term";
import { DisplayableTermPure } from "./displayable-term";

interface TermWrapperProps {
  term: FlashcardContent;
  creator?: boolean;
}

export const TermWrapper: React.FC<TermWrapperProps> = ({ term, creator }) => {
  const innerRef = React.useRef<HTMLDivElement>(null);
  const inView = useInView(innerRef);

  return (
    <div ref={innerRef}>
      {inView ? (
        <DisplayableTermPure flashcardContent={term} />
      ) : (
        <DeloadedTerm term={term} creator={creator} />
      )}
    </div>
  );
};
