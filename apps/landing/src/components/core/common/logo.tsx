import Image from "next/image";
import Link from "next/link";
import { cn } from "@highschool/ui/lib/utils";

interface LogoProps {
  className?: string;
}

export const Logo = ({ className }: LogoProps) => {
  return (
    <Link className={cn(className, "hover:opacity-80")} href="/">
      <Image
        priority
        alt="Mobile logo"
        className="block md:hidden"
        height={32}
        src={"/logo.svg"}
        width={32}
      />
      <Image
        alt="Logo with text"
        className="hidden w-full md:block md:h-10"
        height={50}
        sizes="(max-width: 768px) 32px, 100px"
        src={"/logo-with-text.svg"}
        width={100}
      />
    </Link>
  );
};
