/* eslint-disable react/no-unknown-property */
"use client";

import { Highlight } from "@highschool/lib/editor";

export const EditorGlobalStyles: React.FC<{ small?: boolean }> = ({
  small = false,
}) => {
  return (
    <style global jsx>{`
      mark {
        background-color: ${Highlight.Yellow};
        border-radius: 0.25em;
        box-decoration-break: clone;
        padding: ${small ? 0 : 0.125}rem 0;
        color: inherit;
      }
    `}</style>
  );
};
