"use client";

import React from "react";
import { usePathname, useSearchParams } from "next/navigation";
import LoadingBar, { type LoadingBarRef } from "react-top-loading-bar";

export const TopLoadingBar = () => {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const barRef = React.useRef<LoadingBarRef>(null);

    React.useEffect(() => {
        const setRegex = /^\/c([a-zA-Z0-9_-]{24})$/;
        const profileRegex = /^\/@([a-zA-Z0-9-_]+)$/;
        const folderRegex = /^\/@([a-zA-Z0-9-_]+)\/folders\/[^\/]*$/;

        const unified = new RegExp(
            `^(${[setRegex, profileRegex, folderRegex]
                .map((r) => r.source)
                .join("|")})$`
        );

        if (unified.test(pathname)) {
            barRef.current?.continuousStart(20, 750);
            setTimeout(() => {
                barRef.current?.complete();
            }, 1000); // Adjust this timeout as needed
        }
    }, [pathname, searchParams]);

    return (
        <LoadingBar
            ref={barRef}
            color="#ffa54c"
            height={3}
            waitingTime={500}
            transitionTime={500}
        />
    );
};

export default TopLoadingBar;
