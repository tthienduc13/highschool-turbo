"use client";

import React, { useEffect } from "react";

interface UseShortcutOptions {
    ctrlKey?: boolean;
    shiftKey?: boolean | string;
    altKey?: boolean;
    metaKey?: boolean;
    allowInput?: boolean;
    anyKey?: boolean;
    node?: null;
}

export const useShortcut = (
    keys: (string | number)[],
    callback: (e: KeyboardEvent) => void,
    opts: UseShortcutOptions = {
        ctrlKey: true,
        allowInput: false,
        anyKey: false,
        node: null,
    }
) => {
    const callbackRef = React.useRef(callback);
    React.useLayoutEffect(() => {
        callbackRef.current = callback;
    });

    const handleKeyPress = React.useCallback(
        (event: KeyboardEvent) => {
            if (opts.shiftKey !== undefined) {
                if (
                    (opts.shiftKey === true && !event.shiftKey) ||
                    (opts.shiftKey === false && event.shiftKey) ||
                    (typeof opts.shiftKey === "string" &&
                        keys.some((k) => k == opts.shiftKey) &&
                        !event.shiftKey)
                ) {
                    return;
                }
            }

            if (
                (opts.ctrlKey == event.ctrlKey &&
                    keys.some((key) => event.key === key)) ||
                (opts.altKey == event.altKey &&
                    keys.some((key) => event.key === key)) ||
                (opts.metaKey == event.metaKey &&
                    keys.some((key) => event.key === key)) ||
                (opts.anyKey &&
                    !(event.ctrlKey || event.altKey || event.metaKey))
            ) {
                if (
                    opts.allowInput &&
                    (event.target instanceof HTMLInputElement ||
                        event.target instanceof HTMLTextAreaElement)
                )
                    return;

                event.preventDefault();
                callbackRef.current(event);
            }
        },
        [keys, opts]
    );

    useEffect(() => {
        const targetNode = opts.node ?? document;
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        targetNode && targetNode.addEventListener("keydown", handleKeyPress);

        return () =>
            targetNode &&
            targetNode.removeEventListener("keydown", handleKeyPress);
    }, [handleKeyPress, opts.node]);
};
