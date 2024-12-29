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
      <motion.div initial={{ y: -10 }} animate={{ y: 0 }}>
        <div
          className="rounded-b-xl border-2 border-t-0 border-gray-100 bg-white p-4 shadow-xl dark:border-gray-700 dark:bg-gray-800"
          onMouseDown={(e) => e.preventDefault()}
        >
          <div className="flex flex-col gap-4">
            <div className="flex flex-wrap items-center">
              {characters.map((c, i) => (
                <Button
                  key={i}
                  size="sm"
                  variant="outline"
                  className="m-1 inline-block"
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
                size="sm"
                className="m-1"
                variant="outline"
                aria-label="Toggle uppercase"
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => {
                  setUppercased(!uppercased);
                }}
              >
                <IconArrowBarUp size={18} className="!size-[18px]" />
              </Button>
            </div>
            <Button
              size="sm"
              className="w-fit"
              variant="outline"
              onClick={onLanguageClick}
            >
              <IconLanguage size={18} className="!size-[18px]" />
              {languageName(language)}
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
