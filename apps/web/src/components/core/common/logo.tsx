"use client";

import { env } from "@highschool/env";
import { useMediaQuery } from "@highschool/hooks";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

export const Logo = () => {
    const { data: session } = useSession();
    const isDesktop = useMediaQuery("(min-width: 1024px)");
    const logoSrc = isDesktop ? "/logo-with-text.svg" : "/logo.svg";
    const logoHeight = isDesktop ? 40 : 32;
    const logoWidth = isDesktop ? 160 : 32;

    return (
        <div
            className="relative hover:opacity-80"
            style={{ height: `${logoHeight}px`, width: "auto" }}
        >
            <Link href={session?.user ? "/" : env.NEXT_PUBLIC_LANDING_URL}>
                <Image
                    src={logoSrc}
                    alt="logo"
                    height={logoHeight}
                    width={logoWidth}
                    priority
                    className="object-contain "
                />
            </Link>
        </div>
    );
};
