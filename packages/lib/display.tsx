import type { JSONContent } from "@tiptap/react";
import React from "react";
import { FilterXSS, escapeAttrValue, getDefaultWhiteList } from "xss";

import { ScriptFormatter } from "./script-formatter";
import { richTextToHtml } from "./editor";

const whitelist = getDefaultWhiteList();
// Style attribute should still be safe from xss, just saves compute time on other elements
whitelist.mark?.push("style");

const xss = new FilterXSS({
    whiteList: whitelist,
    onIgnoreTagAttr: function (_tag, name, value) {
        if (name.substring(0, 5) === "data-") {
            return `${name}="${escapeAttrValue(value)}"`;
        }
    },
});

export const Display: React.FC<{
    text: string;
    richText?: JSON | JSONContent;
}> = ({ text, richText }) => {
    return richText ? (
        <p
            dangerouslySetInnerHTML={{
                __html: xss.process(
                    richTextToHtml(richText as JSONContent, true)
                ),
            }}
        />
    ) : (
        <ScriptFormatter>{text}</ScriptFormatter>
    );
};
