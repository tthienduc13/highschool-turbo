"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { env } from "@highschool/env";

export const Logo = () => {
  const { data: session } = useSession();

  return (
    <>
      <div
        className="relative hidden hover:opacity-80 lg:block"
        style={{ height: `40px`, width: "auto" }}
      >
        <Link href={session?.user ? "/" : env.NEXT_PUBLIC_LANDING_URL}>
          <Image
            priority
            alt="logo"
            className="object-contain"
            height={40}
            src={"/logo-with-text.svg"}
            width={160}
          />
        </Link>
      </div>
      <div
        className="relative  hover:opacity-80 lg:hidden  "
        // style={{ height: `32px`, width: "auto" }}
      >
        <Link href={session?.user ? "/" : env.NEXT_PUBLIC_LANDING_URL}>
          <Image
            priority
            alt="logo"
            className="h-8 w-auto object-contain md:h-10"
            height={32}
            src={"/logo.svg"}
            width={32}
          />
        </Link>
      </div>
    </>
  );
};
