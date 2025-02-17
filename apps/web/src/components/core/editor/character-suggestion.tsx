/* eslint-disable jsx-a11y/no-static-element-interactions */
"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Button } from "@highschool/ui/components/ui/button";
import { IconArrowBarUp, IconLanguage } from "@tabler/icons-react";

import { Language, getSuggestions, languageName } from "@/utils/language";

interface CharacterSuggestionsProps {
  language: Language;
  focused: boolean;
  onSelect: (c: string) => void;
  onLanguageClick: () => void;
}

export const CharacterSuggestions = ({
  language,
  focused,
  onSelect,
  onLanguageClick,
}: CharacterSuggestionsProps) => {
  const characters = getSuggestions(language);
  const [uppercased, setUppercased] = useState(false);

  if (!focused || !characters.length) return null;

  return (
    <div className="absolute top-[cacl(100%+1px)] z-20 w-full">
      <motion.div animate={{ y: 0 }} initial={{ y: -10 }}>
        <div
          className="rounded-b-xl border-2 border-t-0 border-gray-100 bg-white p-4 shadow-xl dark:border-gray-700 dark:bg-gray-800"
          onMouseDown={(e) => e.preventDefault()}
        >
          <div className="flex flex-col gap-4">
            <div className="flex flex-wrap items-center">
              {characters.map((c, i) => (
                <Button
                  key={i}
                  className="m-1 inline-block"
                  size="sm"
                  variant="outline"
                  onClick={() =>
                    onSelect(uppercased ? c.toLocaleUpperCase() : c)
                  }
                  onMouseDown={(e) => e.preventDefault()}
                >
                  <div className="text-sm text-gray-900 dark:text-white">
                    {uppercased ? c.toLocaleUpperCase() : c}
                  </div>
                </Button>
              ))}
              <Button
                aria-label="Toggle uppercase"
                className="m-1"
                size="sm"
                variant="outline"
                onClick={() => {
                  setUppercased(!uppercased);
                }}
                onMouseDown={(e) => e.preventDefault()}
              >
                <IconArrowBarUp className="!size-[18px]" size={18} />
              </Button>
            </div>
            <Button
              className="w-fit"
              size="sm"
              variant="outline"
              onClick={onLanguageClick}
            >
              <IconLanguage className="!size-[18px]" size={18} />
              {languageName(language)}
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
