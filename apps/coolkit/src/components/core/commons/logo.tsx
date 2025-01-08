"use client";

import Image from "next/image";
import Link from "next/link";

export const Logo = () => {
  return (
    <>
      <div
        className="relative hidden hover:opacity-80 lg:block"
        style={{ height: `40px`, width: "auto" }}
      >
        <Link href={"/"}>
          <Image
            src={"/logo-with-text.svg"}
            alt="logo"
            height={40}
            width={160}
            priority
            className="object-contain"
          />
        </Link>
      </div>
      <div
        className="relative block hover:opacity-80 lg:hidden"
        style={{ height: `32px`, width: "auto" }}
      >
        <Link href={"/"}>
          <Image
            src={"/logo.svg"}
            alt="logo"
            height={32}
            width={32}
            priority
            className="object-contain"
          />
        </Link>
      </div>
    </>
  );
};
