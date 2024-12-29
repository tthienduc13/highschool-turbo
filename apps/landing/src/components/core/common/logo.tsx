import Image from "next/image";
import Link from "next/link";

import { cn } from "@highschool/ui/lib/utils";

interface LogoProps {
  className?: string;
}

export const Logo = ({ className }: LogoProps) => {
  return (
    <Link href="/" className={cn(className, "hover:opacity-80")}>
      <Image
        src={"/logo.svg"}
        alt="Mobile logo"
        width={32}
        height={32}
        priority
        className="block md:hidden"
      />
      <Image
        src={"/logo-with-text.svg"}
        alt="Logo with text"
        width={100}
        height={50}
        sizes="(max-width: 768px) 32px, 100px"
        className="hidden w-full md:block md:h-10"
      />
    </Link>
  );
};
